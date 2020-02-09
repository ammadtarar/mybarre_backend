function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}

const multer = require('multer');
const fs = require('fs-extra');
const diskDirectory = './disk';
const path = require('path');

module.exports = function(app, middleware, db, underscore, responseController) {


	app.get('/bundle/:id', middleware.requireGlobalToken, function(req, res) {
		const bundleId = parseInt(req.params.id) || -1;
		if (bundleId === -1) {
			responseController.fail(res, 406,
				"Please include bundleId in request url /bundle/:bundleId");
			return;
		}
		db.bundle.findOne({
				where: {
					id: bundleId
				},
				include: [{
					model: db.files,
					as: 'files',
					attributes: {
						exclude: ['createdAt', 'updatedAt', 'bundleId']
					}
				}]
			})
			.then(function(bundle) {
				responseController.success(
					res,
					200,
					bundle
				);
			})
			.catch(function(e) {
				responseController.fail(res, 406, e);
			});
	});

	app.get('/bundle/list/all', middleware.requireGlobalToken, function(req, res) {
		var limit = parseInt(req.query.limit) || 10;
		var page = parseInt(req.query.page) || 0;
		if (page >= 1) {
			page = page - 1;
		}
		var where = {};
		if (!isEmpty(req.query)) {
			var fullQuery = [];
			const keyword = req.query.keyword || null;
			if (keyword !== null) {
				fullQuery.push({
					[db.Sequelize.Op.or]: [{
						name: {
							[db.Op.like]: '%' + keyword + '%'
						}
					}, {
						description: {
							[db.Op.like]: '%' + keyword + '%'
						}
					}, {
						type: {
							[db.Op.like]: '%' + keyword + '%'
						}
					}, {
						price: {
							[db.Op.like]: '%' + keyword + '%'
						}
					}]
				})
			}
			where = {
				[db.Sequelize.Op.and]: fullQuery
			}
		}
		db.bundle.findAndCountAll({
				where: where,
				limit: limit,
				offset: limit * page,
				order: [
					['createdAt', 'DESC']
				]
			})
			.then(function(bundles) {
				responseController.success(
					res,
					200,
					bundles
				);
			})
			.catch(function(e) {
				responseController.fail(res, 406, e);
			});
	});

	app.post('/bundle/create', middleware.requireAdminAuthentication, function(
		req, res) {
		var body = underscore.pick(req.body, 'name', 'description', 'price',
			'type');
		if (body === null || body === undefined || isEmpty(body)) {
			responseController.fail(res, 403,
				"Please send bundle name , description , price and type in request body"
			);
			return;
		}
		db.bundle.create(body)
			.then(function(bundle) {
				responseController.success(res, 201, bundle);
			})
			.catch(function(e) {
				responseController.fail(res, 403, e);
			})
	});


	app.patch('/bundle/:id', middleware.requireAdminAuthentication, function(
		req, res) {
		const bundleId = parseInt(req.params.id) || -1;
		if (bundleId === -1) {
			responseController.fail(res, 409,
				"Please include bundleId in request url /bundle/:bundleId");
			return;
		};
		var body = underscore.pick(req.body, 'name', 'description', 'price',
			'type');
		if (body === null || body === undefined || isEmpty(body)) {
			responseController.fail(res, 403,
				"Please send bundle name , description , price and type in request body"
			);
			return;
		}
		db.bundle.update(body, {
				where: {
					id: bundleId
				}
			})
			.then(function(bundle) {
				if (bundle) {
					responseController.success(res, 201, "Bundle update successfully");
				} else {
					responseController.fail(res, 403, "Failed to update bundle");
				}

			})
			.catch(function(e) {
				responseController.fail(res, 403, e);
			})
	});

	app.delete('/bundle/:id', middleware.requireGlobalToken, function(req, res) {
		const bundleId = parseInt(req.params.id) || -1;
		if (bundleId === -1) {
			responseController.fail(res, 409,
				"Please include bundleId in request url /bundle/:bundleId");
			return;
		};
		db.files.findAll({
				where: {
					bundleId: bundleId
				}
			})
			.then(function(files) {
				var ids = [];
				files.forEach(function(file) {
					ids.push(file.id);
				})
				db.files.destroy({
						where: {
							id: ids
						}
					})
					.then(function(status) {
						db.bundle.findOne({
								where: {
									id: bundleId
								}
							})
							.then(function(bundle) {
								var bundleName = bundle.name.replace(' ', '_');
								db.bundle.destroy({
										where: {
											id: bundleId
										}
									})
									.then(function(bundleDeleteStatus) {
										if (bundleDeleteStatus) {
											try {
												const sub_dir = diskDirectory + "/Bundles/" + bundleName;
												fs.removeSync(sub_dir);
											} catch (e) {
												responseController.fail(res, 409, {
													message: "Bundle deleted successfully but failed to removes relevant files from the database",
													error: e
												});
											} finally {
												responseController.success(
													res,
													200,
													"Bundle and relevant files were removed successfully"
												);
											}
										} else {
											responseController.fail(res, 409,
												"Failed to delete the bundle");
										}
									});
							});
					});
			});
	});


};
