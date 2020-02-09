const multer = require('multer');
const fs = require('fs');
const diskDirectory = './disk';
const path = require('path');
const ThumbnailGenerator = require('video-thumbnail-generator').default;


const type_error_msg =
	'Please provide type aka directory in request header. For example , if its an image for event then type = event';

module.exports = function(app, db, rootDir, middleware, responseController) {


	if (!fs.existsSync(diskDirectory)) {
		fs.mkdirSync(diskDirectory);
	}

	const storage = multer.diskStorage({
		destination: function(req, file, callback) {

			if (req.headers.type.toLowerCase() === "bundle") {
				const sub_dir = diskDirectory + "/" + req.headers.base;
				if (!fs.existsSync(sub_dir)) {
					fs.mkdirSync(sub_dir);
				}

				const bundleDir = sub_dir + '/' + req.headers.bundleName;
				if (!fs.existsSync(bundleDir)) {
					fs.mkdirSync(bundleDir);
				}

				var type = "";
				const mimeType = file.mimetype;
				if (mimeType.includes("vid")) {
					type = "Videos";
				} else if (mimeType.includes("image")) {
					type = "Images";
				} else {
					type = "Documents";
				}

				const typeDir = bundleDir + '/' + type;
				if (!fs.existsSync(typeDir)) {
					fs.mkdirSync(typeDir);
				}

				if (type === "Videos") {
					const itemDir = typeDir + '/' + req.headers.itemName;
					if (!fs.existsSync(itemDir)) {
						fs.mkdirSync(itemDir);
					}
					callback(null, itemDir);
				} else {
					callback(null, typeDir);
				}


			} else {
				const sub_dir = diskDirectory + "/Others";
				if (!fs.existsSync(sub_dir)) {
					fs.mkdirSync(sub_dir);
				}

				var type = "";
				const mimeType = file.mimetype;
				if (mimeType.includes("vid")) {
					type = "Videos";
				} else if (mimeType.includes("image")) {
					type = "Images";
				} else {
					type = "Documents";
				}
				const typeDir = sub_dir + '/' + type;
				if (!fs.existsSync(typeDir)) {
					fs.mkdirSync(typeDir);
				}
				callback(null, typeDir);
			}
		},
		filename: function(req, file, callback) {
			var fileName = req.headers.itemName || file.originalname;
			const name = fileName + "-" + String(Date.now()) + '.' +
				file.originalname
				.split('.').pop();
			callback(null, name);
		}
	});

	const upload = multer({
		storage: storage,
		fileFilter: function(req, file, cb) {
			if (!req.headers.type) {
				req.fileValidationError = type_error_msg;
				return cb(null, false, new Error(type_error_msg));
			}
			req.file = file;
			cb(null, true);
		}


	}).single('file');

	function makeDownloadUrl(req, fileName) {
		return req.protocol + '://' + req.headers.host +
			'/download/' + fileName;
	}

	app.post('/upload/file', middleware.requireGlobalToken, function(req, res) {

		var type = req.headers.type || "";
		if (type === "") {
			responseController.fail(res, 444, {
				message: "Please send 'type' in request headers. Only two type of file uploads are permitted, 1- BUNDLE , 2- OTHERS. If this file belongs to a bundle , please pass type , bundle_id and item_name in request headers. If type is NOT of OTHERS type , just pass type=OTHERS without any other fields"
			});
			return;
		}
		type = type.toLowerCase();
		if (type === "bundle") {
			console.log("==== INSIDE BUNDLE");
			const bundleId = parseInt(req.headers.bundle_id) || -1;
			if (bundleId === -1) {
				responseController.fail(res, 444, {
					message: "bundle_id is missing from the headers. bundle_id and item_name are required when type=BUNDLE"
				})
				return;
			}
			var itemName = req.headers.item_name || '';
			if (itemName === '') {
				responseController.fail(res, 444, {
					message: "item_name is missing from the headers. item_name is required when type=BUNDLE"
				})
				return;
			}
			console.log("==== FINDING BUNDLE");
			db.bundle.findOne({
					where: {
						id: bundleId
					}
				})
				.then(function(bundle) {
					console.log("==== BUNDLE FOUND ");
					if (bundle === null || bundle === undefined || !bundle) {
						responseController.fail(res, 404, {
							message: "Bundle with bundleId = " + bundleId +
								" was not found. Please make sure the bundleId is correct and bundle exists"
						})
						return;
					}
					var bundleName = bundle.name;
					bundleName = bundleName.replace(' ', '_');
					itemName = itemName.replace(' ', '_');
					req.headers.base = 'Bundles';
					req.headers.bundleName = bundleName;
					req.headers.itemName = itemName;
					req.headers.path = "bundles/" + bundleName + '/' + itemName;
					upload(req, res, function(err) {
						if (req.fileValidationError) {
							responseController.fail(res, 404, {
								message: req.fileValidationError
							})
							return;
						}
						if (err) {
							responseController.fail(res, 404, {
								message: "Error uploading file",
								error: String(err)
							})
							return;
						}
						if (req.file === undefined) {
							responseController.fail(res, 404, {
								message: "No file was found . Please attach a file and try again"
							})
							return;
						}
						const fileName = req.file.filename;
						const path = req.headers.path;
						const fullUrl = makeDownloadUrl(req, fileName);
						var fileObject = {};
						console.log("==== FILE UPLOADED ");
						if (req.file.mimetype.includes('vid')) {


							const videoFilePath = rootDir + "/" + findFile(diskDirectory,
								fileName);
							const thumbFilePath = videoFilePath.replace(
								fileName,
								'');

							console.log({
								sourcePath: videoFilePath,
								thumbnailPath: thumbFilePath
							});
							const tg = new ThumbnailGenerator({
								sourcePath: videoFilePath,
								thumbnailPath: thumbFilePath
							});
							tg.generateOneByPercentCb(50, {
								size: '640x400'
							}, (err, result) => {
								console.log(result);

								db.files.create({
										name: req.headers.item_name,
										mime: req.file.mimetype,
										url: fullUrl,
										thumb_url: makeDownloadUrl(req, result),
										bundleId: bundleId
									})
									.then(function(fileRes) {
										res.json(fileRes)
									})
									.catch(function(err) {
										res.status(402).send(err)
									})

							})
						} else {
							db.files.create({
									name: req.headers.item_name,
									mime: req.file.mimetype,
									url: fullUrl,
									thumb_url: '',
									bundleId: bundleId
								})
								.then(function(fileRes) {
									res.json(fileRes)
								})
								.catch(function(err) {
									res.status(402).send(err)
								})
						}
					});



				})
			return;
		} else if (type !== "others") {
			responseController.fail(res, 444, {
				message: "Only two type of file uploads are permitted, 1- BUNDLE , 2- OTHERS. If this file belongs to a bundle , please pass type , bundle_id and item_name in request headers. If type is NOT of OTHERS type , just pass type=OTHERS without any other fields"
			});
			return;
		}


		upload(req, res, function(err) {
			if (req.fileValidationError) {
				return res.status(404).json({
					"message": req.fileValidationError
				});
			}
			if (err) {
				return res.status(404).send({
					"message": "Error uploading file",
					"error": String(err)
				});
			}
			if (req.file === undefined) {
				return res.status(404).send({
					"message": "No file was found . Please attach a file and try again"
				});
			}


			const fileName = req.file.filename;
			const fullUrl = makeDownloadUrl(req, fileName);

			console.log({
				name: fileName,
				mime: req.file.mimetype,
				url: fullUrl
			});
			db.files.create({
					name: fileName,
					mime: req.file.mimetype,
					url: fullUrl
				})
				.then(function(fileRes) {
					res.json(fileRes)
				})
				.catch(function(err) {
					res.status(402).send(err)
				})

		});



	});

	//ENDPOINT FOR DOWNLOADING FILES
	app.get('/download/:fileName', function(req, res) {
		const fileName = req.params.fileName || null;
		if (fileName === null) {
			res.status(404).json({
				message: "Please provide file name in the url"
			})
			return
		}
		const path = findFile(diskDirectory, req.params.fileName);
		if (path === undefined || path === 'undefined') {
			res.status(404).json({
				message: "No file with name = " + fileName + " was found"
			})
			return
		}
		return res.download(rootDir + "/" + path);
	});

	function findFile(startPath, filter) {
		var a = []
		fromDir(startPath, filter, a)
		return a[0]
	}

	function fromDir(startPath, filter, arr) {
		if (!fs.existsSync(startPath)) {
			console.log("no dir ", startPath);
			return;
		}

		var files = fs.readdirSync(startPath);
		var p = "";
		for (var i = 0; i < files.length; i++) {
			var filename = path.join(startPath, files[i]);
			var stat = fs.lstatSync(filename);
			if (stat.isDirectory()) {
				fromDir(filename, filter, arr); //recurse
			} else if (filename.indexOf(filter) >= 0) {
				arr.push(filename)
				break;
			};
		};

	};


};
