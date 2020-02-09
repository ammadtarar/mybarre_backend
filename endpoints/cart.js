function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}

module.exports = function(app, middleware, db, underscore, responseController) {


	app.post('/user/cart/add/product/:id', middleware.requireAuthentication,
		function(req, res) {
			const id = parseInt(req.params.id) || -1;
			if (id === -1) {
				responseController.fail(res, 409,
					"Please include productId in request url /user/cart/add/product/:productId"
				);
				return;
			}
			db.product.findOne({
					where: {
						id: id
					}
				})
				.then(function(product) {
					if (product === null || product === undefined) {
						responseController.fail(res, 409,
							"No product with productId = " + id + " was found"
						);
						return;
					}
					if (product.count <= 0) {
						responseController.fail(res, 409,
							"The product is out of stock at the moment. Please try again later"
						);
						return;
					}

					db.cart_items.findOne({
							where: {
								productId: id,
								userId: req.user.id
							}
						})
						.then(function(existing) {
							if (existing === null || existing === undefined) {
								db.cart_items.create({
										productId: id,
										userId: req.user.id,
										count: 1
									})
									.then(function(cart) {
										responseController.success(res, 200, "Product added to the cart");
									})
									.catch(function(e) {
										responseController.fail(res, 403, e);
									});
							} else {
								var count = existing.count;
								db.cart_items.update({
										count: count + 1
									}, {
										where: {
											productId: id,
											userId: req.user.id,
										}
									})
									.then(function(cart) {
										responseController.success(res, 200, "Cart updated successfully");
									})
									.catch(function(e) {
										responseController.fail(res, 403, e);
									});
							}
						})
				})
				.catch(function(e) {
					responseController.fail(res, 403, e);
				});
		});

	app.get('/user/cart', middleware.requireAuthentication, function(req, res) {
		db.cart_items.findAll({
				where: {
					userId: req.user.id
				},
				through: {
					attributes: []
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'userId', 'productId']
				},
				include: [{
					model: db.product,
					as: 'product',
				}]
			})
			.then(function(cart) {
				responseController.success(res, 200, cart)
			})
	});

	app.patch('/user/cart/reduct/product/:id', middleware.requireAuthentication,
		function(req, res) {
			const id = parseInt(req.params.id) || -1;
			if (id === -1) {
				responseController.fail(res, 409,
					"Please include productId in request url /user/cart/add/product/:productId"
				);
				return;
			}
			db.cart_items.findOne({
					where: {
						productId: id
					}
				})
				.then(function(cart_item) {
					if (cart_item === null || cart_item === undefined) {
						responseController.fail(res, 409,
							"Product is not in your cart"
						);
						return;
					}
					var count = cart_item.count;
					if (count <= 1) {
						responseController.fail(res, 409,
							"Cannot reduct count. Minimum count is 1"
						);
						return;
					}
					db.cart_items.update({
							count: count - 1
						}, {
							where: {
								userId: req.user.id,
								productId: id
							}
						})
						.then(function(up) {
							responseController.success(res, 200, "Cart updated.")
						})
				})
		});


	app.delete('/user/cart/item/:id', middleware.requireAuthentication, function(
		req, res) {
		const id = parseInt(req.params.id) || -1;
		if (id === -1) {
			responseController.fail(res, 409,
				"Please include cartItemId in request url /user/cart/item/:id"
			);
			return;
		}
		db.cart_items.destroy({
				where: {
					id: id
				}
			})
			.then(function(item) {
				responseController.success(res, 200, "Item removed from the cart")
			})
	});



};
