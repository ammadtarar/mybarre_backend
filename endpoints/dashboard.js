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
						[db.sequelize.literal(`DATE("createdAt")`), 'date'],
						[db.sequelize.literal(`COUNT(*)`), 'count']
					],
					group: ['date'],
				})
				.then(function(response) {
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
						attributes: [
							[db.sequelize.fn('sum', db.sequelize.col('amount')), 'total'],
						]
					})
					.then(function(users) {
						const storeRevenue = (Math.round((users[0].dataValues.total || 0) *
							100) / 100).toFixed(
							2);
						db.membership.findAll({
								attributes: [
									[db.sequelize.fn('sum', db.sequelize.col('price')), 'total'],
								]
							})
							.then(function(users) {
								const membershipsRevenue = (Math.round((users[0].dataValues.total ||
									0) * 100) / 100).toFixed(
									2);

								responseController.success(res, 200, {
									membership: membershipsRevenue,
									store: storeRevenue,
									bundles: bundlesRevenue
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



};
