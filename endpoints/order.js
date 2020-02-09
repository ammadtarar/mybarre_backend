function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}


module.exports = function(app, middleware, db, underscore, responseController) {

	app.get('/temp', function(req, res) {
		// db.product.findOne({
		// 		where: {
		// 			id: 1
		// 		}
		// 	})
		// 	.then(function(product) {
		// 		// product.decreaseCount(1);
		// 		product.set('count', 99);
		// 	});



	});

	app.post('/order/create', middleware.requireAuthentication, function(req,
		res) {
		var body = underscore.pick(req.body, 'reciepient_name', 'phone',
			'address',
			'city', 'zip_code');
		if (body === null || body === undefined || isEmpty(body)) {
			responseController.fail(res, 403,
				"Please include order params in request body"
			);
			return;
		}
		body.status = "pending_payment";
		db.cart_items.findAll({
				where: {
					userId: req.user.id
				}
			})
			.then(function(cart_items) {
				if (cart_items === null || cart_items === undefined || isEmpty(
						cart_items)) {
					responseController.fail(res, 403,
						"Cannot create order , the cart is empty"
					);
					return;
				}
				var items = [];
				var deletableCartItemIds = [];
				var productCountPromises = [];
				body.userId = req.user.id;
				db.order.create(body)
					.then(function(order) {
						cart_items.forEach(function(cartItem) {
							items.push({
								productId: cartItem.productId,
								userId: cartItem.userId,
								orderId: order.id
							});
							deletableCartItemIds.push(cartItem.id);
							productCountPromises.push(
								db.product.decrement('count', {
									by: cartItem.count,
									where: {
										id: cartItem.productId
									}
								})
							);
						});
						db.order_items.bulkCreate(items)
							.then(function(orderItems) {
								responseController.success(res, 200, {
									message: "Order created successfully",
									order: order
								});
								productCountPromises.push(
									db.cart_items.destroy({
										where: {
											id: deletableCartItemIds
										}
									})
								);
								Promise
									.all(productCountPromises)
									.then(responses => {
										console.log('**********COMPLETE RESULTS****************');
										console.log(responses);
									})
									.catch(err => {
										console.log('**********ERROR RESULT****************');
										console.log(err);
									});
							});
					});
			})
			.catch(function(e) {
				responseController.fail(res, 403, e);
			});
	});


	app.get('/order/:id', middleware.requireGlobalToken, function(req, res) {
		const id = parseInt(req.params.id) || -1;
		if (id === -1) {
			responseController.fail(res, 409,
				"Please include orderId in request url /order/:id"
			);
			return;
		}
		db.order.findOne({
				where: {
					id: id
				},
				include: [{
					model: db.order_items,
					as: 'items',
					attributes: {
						exclude: ['createdAt', 'updatedAt', 'userId', 'productId',
							'orderId'
						]
					},
					include: [{
						model: db.product,
						as: 'product'
					}]
				}]
			})
			.then(function(order) {
				responseController.success(res, 200, order)
			})
	});

	app.get('/order/list/all', middleware.requireGlobalToken, function(req, res) {
		var limit = parseInt(req.query.limit) || 10;
		var page = parseInt(req.query.page) || 0;
		if (page >= 1) {
			page = page - 1;
		}
		var where = {};

		if (req.admin) {
			const userId = parseInt(req.query.userId) || -1;
			if (userId !== -1) {
				where = {
					userId: userId
				};
			}
		} else {
			where = {
				userId: req.user.id
			}
		}

		db.order.findAndCountAll({
				where: where,
				limit: limit,
				offset: limit * page,
				order: [
					['createdAt', 'DESC']
				],
				attributes: {
					exclude: ['userId']
				},
				include: [{
					model: db.user,
					as: 'user',
					attributes: ['id', 'name', 'phone', 'gender', 'avatar_url']
				}]
			})
			.then(function(orders) {
				responseController.success(
					res,
					200,
					orders
				);
			})
			.catch(function(e) {
				responseController.fail(res, 406, e);
			});

	});

};
