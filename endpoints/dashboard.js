function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}

module.exports = async function(app, middleware, db, underscore,
	responseController) {

	async function getTotal(model) {
		return new Promise(function(resolve, reject) {
			model.count()
				.then(function(users) {
					resolve(users);
				})
				.catch(function(error) {
					reject(error)
				})
		});
	};

	async function getTotalsByDate(model) {
		return new Promise(function(resolve, reject) {
			model.findAll({
					attributes: [
						[db.sequelize.fn('DATE_FORMAT', db.sequelize.col('createdAt'),
								'%Y-%m-%d'),
							'date'
						],
						[db.sequelize.literal(`COUNT(*)`), 'count']
					],
					group: ['date'],
				})
				.then(function(response) {
					console.log();
					console.log();
					console.log();
					console.log();
					console.log("response");
					console.log(response);
					console.log();
					console.log();
					console.log();
					console.log();
					console.log();
					console.log();
					resolve(response);
				})

		});
	};


	async function get(model, d) {
		var days = d; // Days you want to subtract
		if (days === undefined || days === null) {
			days = 0;
		}
		var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		return new Promise(function(resolve, reject) {
			model.count({
					where: {
						createdAt: {
							[db.Op.gt]: last.setHours(0, 0, 0, 0), [db.Op.lt]: new Date()
						},
					}
				})
				.then(function(users) {
					resolve(users);

				})
				.catch(function(error) {
					reject(error)
				})
		})
	};


	async function getMembershipRevenue(d) {
		var days = d; // Days you want to subtract
		if (days === undefined || days === null) {
			days = 0;
		}
		var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		return new Promise(function(resolve, reject) {
			db.membership.findAll({
					attributes: [
						[db.sequelize.fn('sum', db.sequelize.col('price')), 'total'],
					],
					where: {
						createdAt: {
							[db.Op.gt]: last.setHours(0, 0, 0, 0), [db.Op.lt]: new Date()
						},
					}
				})
				.then(function(users) {
					resolve((Math.round((users[0].dataValues.total || 0) * 100) / 100).toFixed(
						2));
				})
				.catch(function(error) {
					reject(error)
				})
		})
	};


	async function getStoreRevenue(d) {
		var days = d; // Days you want to subtract
		if (days === undefined || days === null) {
			days = 0;
		}
		var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		return new Promise(function(resolve, reject) {
			db.order.findAll({
					attributes: [
						[db.sequelize.fn('sum', db.sequelize.col('amount')), 'total'],
					],
					where: {
						createdAt: {
							[db.Op.gt]: last.setHours(0, 0, 0, 0), [db.Op.lt]: new Date()
						},
					}
				})
				.then(function(users) {
					resolve((Math.round((users[0].dataValues.total || 0) * 100) / 100).toFixed(
						2));

				})
				.catch(function(error) {
					reject(error)
				})
		})
	};


	async function getBundlesRevnue(d) {
		var days = d; // Days you want to subtract
		if (days === undefined || days === null) {
			days = 0;
		}
		var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		return new Promise(function(resolve, reject) {
			db.user_bundles.findAll({
					attributes: [
						[db.sequelize.fn('sum', db.sequelize.col('price')), 'total'],
					],
					where: {
						createdAt: {
							[db.Op.gt]: last.setHours(0, 0, 0, 0), [db.Op.lt]: new Date()
						},
					}
				})
				.then(function(users) {
					resolve((Math.round((users[0].dataValues.total || 0) * 100) / 100).toFixed(
						2));

				})
				.catch(function(error) {
					reject(error)
				})
		})
	};



	app.get('/dashboard/revnue', middleware.requireAdminAuthentication, function(
		req, res) {


		db.user_bundles.findAll({
				attributes: [
					[db.sequelize.fn('sum', db.sequelize.col('price')), 'total'],
				],
			})
			.then(function(users) {
				const bundlesRevenue = (Math.round((users[0].dataValues.total || 0) *
					100) / 100).toFixed(2)
				db.order.findAll({
						where: {
							status: {
								[db.Op.not]: 'pending_payment'
							}
						},
						attributes: [
							[db.sequelize.fn('sum', db.sequelize.col('amount')), 'total'],
							[db.sequelize.fn('sum', db.sequelize.col('shipping_fee')),
								'shipping_fee_total'
							],
						]
					})
					.then(function(users) {
						var storeRevenue = (Math.round((users[0].dataValues.total || 0) *
							100) / 100).toFixed(
							2);

						var shippingRevenue = (Math.round((users[0].dataValues.shipping_fee_total ||
								0) *
							100) / 100).toFixed(
							2);


						db.membership.findAll({
								attributes: [
									[db.sequelize.fn('sum', db.sequelize.col('price')), 'total'],
									[db.sequelize.fn('sum', db.sequelize.col('license_fee')),
										'total_license'
									],
								]
							})
							.then(function(users) {
								const membershipsRevenue = (Math.round((users[0].dataValues.total ||
									0) * 100) / 100).toFixed(
									2);

								const licenseRevenue = (Math.round((users[0].dataValues.total_license ||
									0) * 100) / 100).toFixed(
									2);



								responseController.success(res, 200, {
									membership: membershipsRevenue,
									license: licenseRevenue,
									store: storeRevenue,
									bundles: bundlesRevenue,
									shippingRevenue: shippingRevenue
								})
							})

					})
			})
	});



	app.get('/dashboard/users', middleware.requireAdminAuthentication, async function(
		req, res) {

		db.user.findAll({
				attributes: [
					[db.sequelize.literal(`DATE("createdAt")`), 'date'],
					[db.sequelize.literal(`COUNT(*)`), 'count']
				],
				group: ['date'],
			})
			.then(function(response) {
				responseController.success(res, 200, response)
			})
	});

	app.get('/dashboard/total', middleware.requireAdminAuthentication, async function(
		req, res) {
		responseController.success(res, 200, {
			users: await getTotal(db.user),
			admins: await getTotal(db.admin),
			bundles: await getTotal(db.bundle),
			products: await getTotal(db.product),
			orders: await getTotal(db.order),
			memberships: await getTotal(db.membership),
			courses: await getTotal(db.course),
			files: await getTotal(db.files),
		});
	});

	app.get('/dashboard/graphs', middleware.requireAdminAuthentication, async function(
		req, res) {
		responseController.success(res, 200, {
			users: await getTotalsByDate(db.user),
			admins: await getTotalsByDate(db.admin),
			storeOrders: await getTotalsByDate(db.order),
			bundleOrders: await getTotalsByDate(db.user_bundles),
			memberships: await getTotalsByDate(db.membership)
		});
	});

	app.get('/dashboard/users/gender/ratio', middleware.requireAdminAuthentication,
		function(
			req, res) {
			db.user.findAll({
					attributes: [
						[db.sequelize.literal(`gender`), 'gender'],
						[db.sequelize.literal(`COUNT(*)`), 'count']
					],
					group: ['gender'],
				})
				.then(function(response) {
					responseController.success(res, 200, response)
				})

		});


};
