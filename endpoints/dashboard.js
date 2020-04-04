function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}

module.exports = async function(app, middleware, db, underscore,
	responseController) {



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

	app.get('/dashboard/users', middleware.requireAdminAuthentication, async function(
		req, res) {
		responseController.success(res, 200, {
			today: await get(db.user, 0),
			week: await get(db.user, 7),
			month: await get(db.user, 30),
			quarter: await get(db.user, 120),
			halfyear: await get(db.user, 180),
			year: await get(db.user, 360),
		});
	});

	app.get('/dashboard/bundles', middleware.requireAdminAuthentication, async function(
		req, res) {
		responseController.success(res, 200, {
			today: await get(db.user_bundles, 0),
			week: await get(db.user_bundles, 7),
			month: await get(db.user_bundles, 30),
			quarter: await get(db.user_bundles, 120),
			halfyear: await get(db.user_bundles, 180),
			year: await get(db.user_bundles, 360),
		});
	});

	app.get('/dashboard/orders', middleware.requireAdminAuthentication, async function(
		req, res) {
		responseController.success(res, 200, {
			today: await get(db.order, 0),
			week: await get(db.order, 7),
			month: await get(db.order, 30),
			quarter: await get(db.order, 120),
			halfyear: await get(db.order, 180),
			year: await get(db.order, 360),
		});
	});

	app.get('/dashboard/memberships', middleware.requireAdminAuthentication,
		async function(
			req, res) {
			responseController.success(res, 200, {
				today: await get(db.membership, 0),
				week: await get(db.membership, 7),
				month: await get(db.membership, 30),
				quarter: await get(db.membership, 120),
				halfyear: await get(db.membership, 180),
				year: await get(db.membership, 360),
			});
		});


	app.get('/dashboard/memberships/revenue', middleware.requireAdminAuthentication,
		async function(req, res) {
			responseController.success(res, 200, {
				today: await getMembershipRevenue(0),
				week: await getMembershipRevenue(7),
				month: await getMembershipRevenue(30),
				quarter: await getMembershipRevenue(120),
				halfyear: await getMembershipRevenue(180),
				year: await getMembershipRevenue(360),
			});
		})


	app.get('/dashboard/store/revenue', middleware.requireAdminAuthentication,
		async function(req, res) {
			responseController.success(res, 200, {
				today: await getStoreRevenue(0),
				week: await getStoreRevenue(7),
				month: await getStoreRevenue(30),
				quarter: await getStoreRevenue(120),
				halfyear: await getStoreRevenue(180),
				year: await getStoreRevenue(360),
			});
		})


	app.get('/dashboard/bundles/revenue', middleware.requireAdminAuthentication,
		async function(req, res) {
			responseController.success(res, 200, {
				today: await getBundlesRevnue(0),
				week: await getBundlesRevnue(7),
				month: await getBundlesRevnue(30),
				quarter: await getBundlesRevnue(120),
				halfyear: await getBundlesRevnue(180),
				year: await getBundlesRevnue(360),
			});
		})


};
