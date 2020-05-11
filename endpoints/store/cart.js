function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}

module.exports = function(app, middleware, db, underscore, responseController) {


	app.post('/user/cart/add/product/:id/:colorId/:sizeId', middleware.requireAuthentication,
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


					var where = {
						productId: id,
						userId: req.user.id
					}

					const sizeId = parseInt(req.params.sizeId) || -1;
					if (sizeId != -1) {
						where.sizeId = sizeId;
					}

					const colorId = parseInt(req.params.colorId) || -1;
					if (colorId != -1) {
						where.colorId = colorId
					}

					db.cart_items.findOne({
							where: where
						})
						.then(function(existing) {
							if (existing === null || existing === undefined) {

								var cartItem = {
									productId: id,
									userId: req.user.id,
									count: 1
								};

								const sizeId = parseInt(req.params.sizeId) || -1;
								if (sizeId != -1) {
									cartItem.sizeId = sizeId;
								}

								const colorId = parseInt(req.params.colorId) || -1;
								if (colorId != -1) {
									cartItem.colorId = colorId
								}


								db.cart_items.create(cartItem)
									.then(function(cart) {
										responseController.success(res, 200, "Product added to the cart");
									})
									.catch(function(e) {
										responseController.fail(res, 403, e);
									});
							} else {
								var count = existing.count;

								if (product.count <= count) {
									responseController.fail(res, 411,
										"No more of this item is available"
									);
									return
								}


								var updateWhere = {
									productId: id,
									userId: req.user.id,
								};

								const sizeId = parseInt(req.params.sizeId) || -1;
								if (sizeId != -1) {
									updateWhere.sizeId = sizeId;
								}

								const colorId = parseInt(req.params.colorId) || -1;
								if (colorId != -1) {
									updateWhere.colorId = colorId
								}

								db.cart_items.update({
										count: count + 1
									}, {
										where: updateWhere
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

	app.post('/user/cart/reduct/product/:id/:colorId/:sizeId', middleware.requireAuthentication,
		function(req, res) {
			const id = parseInt(req.params.id) || -1;
			if (id === -1) {
				responseController.fail(res, 409,
					"Please include productId in request url /user/cart/add/product/:productId"
				);
				return;
			}


			var where = {
				productId: id
			};

			const sizeId = parseInt(req.params.sizeId) || -1;
			if (sizeId != -1) {
				where.sizeId = sizeId;
			}

			const colorId = parseInt(req.params.colorId) || -1;
			if (colorId != -1) {
				where.colorId = colorId
			}

			db.cart_items.findOne({
					where: where
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

						var deleteWhere = {
							userId: req.user.id,
							productId: id
						};

						const sizeId = parseInt(req.params.sizeId) || -1;
						if (sizeId != -1) {
							deleteWhere.sizeId = sizeId;
						}

						const colorId = parseInt(req.params.colorId) || -1;
						if (colorId != -1) {
							deleteWhere.colorId = colorId
						}

						db.cart_items.destroy({
								where: deleteWhere
							})
							.then(function(up) {
								responseController.success(res, 200,
									"Product removed from the cart.")
							})
					} else {



						var uppdateWhere = {
							userId: req.user.id,
							productId: id
						};

						const sizeId = parseInt(req.params.sizeId) || -1;
						if (sizeId != -1) {
							uppdateWhere.sizeId = sizeId;
						}

						const colorId = parseInt(req.params.colorId) || -1;
						if (colorId != -1) {
							uppdateWhere.colorId = colorId
						}

						db.cart_items.update({
								count: count - 1
							}, {
								where: updateWhere
							})
							.then(function(up) {
								responseController.success(res, 200, "Cart updated.")
							})
					}
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
