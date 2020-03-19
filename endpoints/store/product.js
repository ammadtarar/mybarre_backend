function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}

module.exports = function(app, middleware, db, underscore, responseController) {

	app.get('/store/products/list/all', middleware.requireGlobalToken, function(
		req, res) {
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
		db.product.findAndCountAll({
				where: where,
				limit: limit,
				offset: limit * page,
				order: [
					['createdAt', 'DESC']
				]
			})
			.then(function(products) {
				responseController.success(
					res,
					200,
					products
				);
			})
			.catch(function(e) {
				responseController.fail(res, 406, e);
			});
	});

	app.get('/store/product/:id', middleware.requireGlobalToken, function(req,
		res) {
		const id = parseInt(req.params.id) || -1;
		if (id === -1) {
			responseController.fail(res, 409,
				"Please include productId in request url /store/product/:productId");
			return;
		}
		db.product.findOne({
				where: {
					id: id
				}
			})
			.then(function(product) {
				responseController.success(
					res,
					200,
					product
				);
			})
			.catch(function(e) {
				responseController.fail(res, 406, e);
			});
	});

	app.post('/store/product/create', middleware.requireAdminAuthentication,
		function(req, res) {
			var body = underscore.pick(req.body, 'name', 'description', 'price',
				'count', 'thumbnail_url');
			if (body === null || body === undefined || isEmpty(body)) {
				responseController.fail(res, 403,
					"Please send product's name , description , price , thumbnail_url and count in request body"
				);
				return;
			}
			db.product.create(body)
				.then(function(product) {
					responseController.success(res, 201, product);
				})
				.catch(function(e) {
					responseController.fail(res, 403, e);
				})
		});


	app.patch('/store/product/:id', middleware.requireAdminAuthentication,
		function(
			req, res) {
			const id = parseInt(req.params.id) || -1;
			if (id === -1) {
				responseController.fail(res, 409,
					"Please include productId in request url /store/product/:productId");
				return;
			}
			var body = underscore.pick(req.body, 'name', 'description', 'price',
				'count', 'thumbnail_url');
			if (body === null || body === undefined || isEmpty(body)) {
				responseController.fail(res, 403,
					"Please send product's name , description , price , thumbnail_url and count in request body"
				);
				return;
			}
			db.product.update(body, {
					where: {
						id: id
					}
				})
				.then(function(product) {
					if (product) {
						responseController.success(res, 201, "Product update successfully");
					} else {
						responseController.fail(res, 403, "Failed to update product");
					}

				})
				.catch(function(e) {
					responseController.fail(res, 403, e);
				})
		});

	app.post('/store/product/:id/retire', middleware.requireAdminAuthentication,
		function(req, res) {
			const id = parseInt(req.params.id) || -1;
			if (id === -1) {
				responseController.fail(res, 409,
					"Please include productId in request url /store/product/:productId/retire"
				);
				return;
			}
			db.product.update({
					status: 'retired'
				}, {
					where: {
						id: id
					}
				})
				.then(function(status) {
					if (status) {
						responseController.success(res, 201, "Product retired successfully");
					} else {
						responseController.fail(res, 403, "Failed to retire the product");
					}
				})
				.catch(function(e) {
					responseController.fail(res, 403, e);
				})
		});


	app.post('/store/product/:id/activate', middleware.requireAdminAuthentication,
		function(req, res) {
			const id = parseInt(req.params.id) || -1;
			if (id === -1) {
				responseController.fail(res, 409,
					"Please include productId in request url /store/product/:productId/retire"
				);
				return;
			}
			db.product.update({
					status: 'active'
				}, {
					where: {
						id: id
					}
				})
				.then(function(status) {
					if (status) {
						responseController.success(res, 201, "Product activated successfully");
					} else {
						responseController.fail(res, 403, "Failed to activate the product");
					}
				})
				.catch(function(e) {
					responseController.fail(res, 403, e);
				})
		});


	app.delete('/store/product/:id', middleware.requireAdminAuthentication,
		function(req, res) {
			const id = parseInt(req.params.id) || -1;
			if (id === -1) {
				responseController.fail(res, 409,
					"Please include productId in request url /store/product/:productId");
				return;
			}
			db.product.destroy({
					where: {
						id: id
					}
				})
				.then(function(product) {
					if (product) {
						responseController.success(res, 201, "Product deleted successfully");
					} else {
						responseController.fail(res, 403, "Failed to delete product");
					}

				})
				.catch(function(e) {
					responseController.fail(res, 403, e);
				})
		});

};
