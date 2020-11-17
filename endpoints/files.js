const multer = require('multer');
const fs = require('fs-extra');
const diskDirectory = './disk';
const path = require('path');
const ThumbnailGenerator = require('video-thumbnail-generator').default;
const filesController = require('../controllers/filesController.js')
const emailController = require('../controllers/emailController.js');

String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(
            /([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ?
            "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") :
        str2);
}

const type_error_msg =
    'Please provide type aka directory in request header. For example , if its an image for event then type = event';

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

module.exports = function(app, db, rootDir, middleware, responseController) {


    if (!fs.existsSync(diskDirectory)) {
        fs.mkdirSync(diskDirectory);
    }

    const storage = multer.diskStorage({
        destination: function(req, file, callback) {

            if (req.query.type.toLowerCase() === "bundle") {
                const sub_dir = diskDirectory + "/" + req.query.base;
                if (!fs.existsSync(sub_dir)) {
                    fs.mkdirSync(sub_dir);
                }

                const bundleDir = sub_dir + '/' + req.query.bundleName;
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
                    const itemDir = typeDir + '/' + req.query.itemName;
                    if (!fs.existsSync(itemDir)) {
                        fs.mkdirSync(itemDir);
                    }
                    callback(null, itemDir);
                } else {
                    callback(null, typeDir);
                }


            } else if (req.query.type.toLowerCase() === "training_videos") {

                const sub_dir = diskDirectory + "/" + req.query.base;
                if (!fs.existsSync(sub_dir)) {
                    fs.mkdirSync(sub_dir);
                }

                const bundleDir = sub_dir + '/' + String(req.query.membership.id);
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
                    const itemDir = typeDir + '/' + req.query.itemName;
                    if (!fs.existsSync(itemDir)) {
                        fs.mkdirSync(itemDir);
                    }
                    callback(null, itemDir);
                } else {
                    callback(null, typeDir);
                }

            } else {
                var type = req.query.type || 'others';
                type = type.charAt(0).toUpperCase() + type.slice(1)
                const sub_dir = diskDirectory + '/' + type;
                if (!fs.existsSync(sub_dir)) {
                    fs.mkdirSync(sub_dir);
                }


                // const sub_dir = diskDirectory + "/Others";
                // if (!fs.existsSync(sub_dir)) {
                // 	fs.mkdirSync(sub_dir);
                // }

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
            // var fileName = req.query.itemName || file.originalname;
            // const name = fileName + "-" + String(Date.now()) + '.' + file.originalname.split('.').pop();
            var name = String(Date.now()) + '.' + file.originalname.split('.').pop();
            name = name.replaceAll(" ", "");
            callback(null, name);
        }
    });

    const upload = multer({
        storage: storage,
        fileFilter: function(req, file, cb) {
            if (!req.query.type) {
                req.fileValidationError = type_error_msg;
                return cb(null, false, new Error(type_error_msg));
            }
            req.file = file;
            cb(null, true);
        }


    }).single('file');

    function makeDownloadUrl(req, fileName) {
        return process.env.base_url + '/download/' + fileName
    }


    app.delete('/file/:id', middleware.requireAdminAuthentication, function(req,
        res) {
        const id = parseInt(req.params.id) || -1;
        if (id === -1) {
            responseController.fail(res, 406,
                "Please include fileId in request url /file/:id");
            return
        }

        db.files.findOne({
                where: {
                    id: id
                }
            })
            .then(function(file) {
                if (!file) {
                    responseController.fail(res, 403, 'File does not exist');
                    return;
                }


                db.files.destroy({
                        where: {
                            id: id
                        }
                    })
                    .then(function(result) {
                        if (result) {
                            responseController.success(res, 200, 'File deleted successfully');
                        } else {
                            responseController.fail(res, 403, 'Failed to delete the file');
                        }
                    })
                    .catch(function(e) {
                        responseController.fail(res, 403, e);
                    });
            })
    });

    app.patch('/file/:id', middleware.requireAdminAuthentication, function(
        req, res) {
        const id = parseInt(req.params.id) || -1;
        if (id === -1) {
            responseController.fail(res, 406,
                "Please include fileId in request url /file/:id");
            return
        }
        if (isEmpty(req.body)) {
            responseController.fail(res, 406,
                "Request body is empty. Please include 'name' , 'stages' and/or 'thumb_url' field in the request body"
            );
            return;
        }

        db.files.update(req.body, {
                where: {
                    id: id
                }
            })
            .then(function(result) {
                if (result) {
                    responseController.success(res, 200, 'File updated successfully');
                } else {
                    responseController.fail(res, 403, 'Failed to update file ');
                }
            })
            .catch(function(e) {
                responseController.fail(res, 403, e);
            });

    });

    app.post('/file/upload', middleware.requireGlobalToken, function(req, res) {

        var type = req.query.type || "";
        if (type === "") {
            responseController.fail(res, 444, {
                message: "Please send 'type' in request headers. Only two type of file uploads are permitted, 1- BUNDLE , 2- OTHERS. If this file belongs to a bundle , please pass type , bundle_id and item_name in request headers. If type is NOT of OTHERS type , just pass type=OTHERS without any other fields"
            });
            return;
        }
        type = type.toLowerCase();
        if (type === "bundle") {
            console.log("==== INSIDE BUNDLE");
            const bundleId = parseInt(req.query.bundle_id) || -1;
            if (bundleId === -1) {
                responseController.fail(res, 444, {
                    message: "bundle_id is missing from the headers. bundle_id and item_name are required when type=BUNDLE"
                })
                return;
            }
            var itemName = req.query.item_name || '';
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
                    req.query.base = 'Bundles';
                    req.query.bundleName = bundleName;
                    req.query.itemName = itemName;
                    req.query.path = "bundles/" + bundleName + '/' + itemName;
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
                        var fileName = req.file.filename;
                        const path = req.query.path;
                        const fullUrl = makeDownloadUrl(req, fileName);
                        var fileObject = {};
                        console.log("==== FILE UPLOADED ");
                        if (req.file.mimetype.includes('vid')) {
                            fileName = fileName.replaceAll(" ", "");

                            const videoFilePath = rootDir + "/" + filesController.findFile(
                                diskDirectory,
                                fileName);
                            const thumbFilePath = videoFilePath.replace(
                                fileName,
                                '');

                            const tg = new ThumbnailGenerator({
                                sourcePath: videoFilePath,
                                thumbnailPath: thumbFilePath
                            });
                            tg.generateOneByPercentCb(50, {
                                size: '320x200'
                            }, (err, result) => {
                                db.files.create({
                                        name: req.query.item_name,
                                        mime: req.file.mimetype,
                                        url: fullUrl,
                                        thumb_url: makeDownloadUrl(req, result),
                                        bundleId: bundleId,
                                        stages: JSON.parse(req.query.stages) || []
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
                                    name: req.query.item_name,
                                    mime: req.file.mimetype,
                                    url: fullUrl,
                                    thumb_url: '',
                                    bundleId: bundleId,
                                    stages: JSON.parse(req.query.stages) || []
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
        } else if (type === "training_videos") {
            const membershipId = parseInt(req.query.membership_id) || -1;
            if (membershipId === -1) {
                responseController.fail(res, 444, {
                    message: "membershipId is missing from the headers. membershipId and item_name are required when type=training_videos"
                })
                return;
            }
            var itemName = req.query.item_name || '';
            if (itemName === '') {
                responseController.fail(res, 444, {
                    message: "item_name is missing from the headers. item_name is required when type=training_videos"
                })
                return;
            }
            console.log("==== FINDING MEMBERSHIP");
            db.membership.findOne({
                    where: {
                        id: membershipId
                    }
                })
                .then(function(membership) {
                    console.log("==== membership FOUND ");
                    if (membership === null || membership === undefined || !membership) {
                        responseController.fail(res, 404, {
                            message: "Membership with membershipId = " + membershipId +
                                " was not found. Please make sure the membershipId is correct and membership exists"
                        })
                        return;
                    }

                    itemName = itemName.replace(' ', '_');
                    req.query.base = 'TrainingVideos';
                    req.query.membership = membership;
                    req.query.itemName = itemName;
                    req.query.path = "TrainingVideos/" + String(membership.id) + '/' +
                        itemName;


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
                        const path = req.query.path;
                        const fullUrl = makeDownloadUrl(req, fileName);
                        var fileObject = {};
                        console.log("==== FILE UPLOADED ");
                        const videoFilePath = rootDir + "/" + filesController.findFile(
                            diskDirectory,
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
                                    name: req.query.item_name,
                                    mime: req.file.mimetype,
                                    url: fullUrl,
                                    thumb_url: makeDownloadUrl(req, result),
                                    membershipId: membershipId
                                })
                                .then(function(fileRes) {

                                    db.membership.update({
                                            status: 'training-videos-submitted'
                                        }, {
                                            where: {
                                                id: membership.id
                                            }
                                        })
                                        .then(function(updateRes) {
                                            res.json(fileRes)

                                            // TODO - SENT EMAIL TO THE SIRI RANDI
                                            db.user.findOne({
                                                    where: {
                                                        id: membership.userId
                                                    }
                                                })
                                                .then(function(user) {
                                                    emailController.sendFileUploadEmail(user, fullUrl)
                                                        .then(function() {

                                                        })
                                                        .catch(function(e) {
                                                            console.log();
                                                            console.log();
                                                            console.log();
                                                            console.log();
                                                            console.log("failed to send vidoe upload notification");
                                                            console.log(e);
                                                            console.log();
                                                        })

                                                })

                                        })



                                })
                                .catch(function(err) {
                                    res.status(402).send(err)
                                })

                        });
                    });
                })
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



    app.post('/file/create', middleware.requireAdminAuthentication, function(req, res) {

        var body = req.body || null;
        if (body === null || body === undefined) {
            res.status(403).json({
                message: "Please send request body"
            })
            return;
        }


        db.files.create({
                name: body.item_name,
                mime: body.mime,
                url: body.url,
                thumb_url: body.thumb_url,
                bundleId: body.bundle_id,
                stages: JSON.parse(body.stages) || []
            })
            .then(function(fileRes) {
                res.json(fileRes)
            })
            .catch(function(err) {
                res.status(402).send(err)
            })


    });



    app.get('/app/font', function(req, res) {
        const path = filesController.findFile('./', 'WebFont.ttf');
        if (path === undefined || path === 'undefined') {
            res.status(404).json({
                message: "No file with name = " + fileName + " was found"
            })
            return
        }
        return res.download(rootDir + "/" + path);
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
        const path = filesController.findFile(diskDirectory, req.params.fileName);
        if (path === undefined || path === 'undefined') {
            res.status(404).json({
                message: "No file with name = " + fileName + " was found"
            })
            return
        }

        if (!fileName.includes(".mp4")) {
            return res.download(rootDir + "/" + path);
        }



        const stat = fs.statSync(rootDir + "/" + path)
        const fileSize = stat.size
        const range = req.headers.range



        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(path, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }







    });


    app.get('/download/static/:fileName', function(req, res) {
        const fileName = req.params.fileName || null;
        if (fileName === null) {
            res.status(404).json({
                message: "Please provide file name in the url"
            })
            return
        }
        const path = filesController.findFile('./static', req.params.fileName);
        if (path === undefined || path === 'undefined') {
            res.status(404).json({
                message: "No file with name = " + fileName + " was found"
            })
            return
        }
        return res.download(rootDir + "/" + path);
    });


    app.post('/files/update/indexes', middleware.requireAdminAuthentication, function(req, res) {
        if (isEmpty(req.body)) {
            responseController.fail(res, 406,
                "Request body is empty. Please send files array with following structure { files : [ {id : 1 , index : 1} ]}"
            );
            return;
        }

        var promises = [];
        req.body.forEach((item, i) => {
            promises.push(
                db.files.update({ index: item.index }, { where: { id: item.id } })
            );
        });


        Promise
            .all(promises)
            .then(responses => {
                console.log('**********COMPLETE RESULTS****************');
                console.log(responses);
                responseController.success(res, 200, responses);
            })
            .catch(err => {
                console.log('**********ERROR RESULT****************');
                console.log(err);
                responseController.fail(res, 403, err)
            });


    });

};