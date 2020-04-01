function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}


module.exports = function(app, middleware, db, underscore, responseController) {

	app.post('/course/create', middleware.requireAdminAuthentication, function(
		req, res) {
		var body = underscore.pick(req.body, 'name', 'start', 'end', 'price',
			'seats');
		if (isEmpty(body) || body.length < 4) {
			responseController.fail(res, 403,
				"Please provide course name , start , end , seats and price in reqest body"
			);
			return;
		}
		body.available_seats = body.seats;
		db.course.create(body)
			.then(function(course) {
				responseController.success(res, 201, course)
			})
			.catch(function(err) {
				responseController.fail(res, 406, err);
			})
	});

	app.get('/course/list/all', middleware.requireGlobalToken, function(req, res) {
		var limit = parseInt(req.query.limit) || 10;
		var page = parseInt(req.query.page) || 0;
		if (page >= 1) {
			page = page - 1;
		}
		var where = {};
		if (!isEmpty(req.query)) {
			var fullQuery = [];
			const name = req.query.name || null;
			if (name !== null) {
				fullQuery.push({
					[db.Sequelize.Op.or]: [{
						name: {
							[db.Op.like]: '%' + name + '%'
						}
					}]
				});
			}

			const after = req.query.after || null;

			const start = req.query.start || null;
			const end = req.query.end || null;

			if (after !== null) {
				fullQuery.push({
					[db.Op.or]: [{
						start: {
							[db.Op.gte]: new Date(after)
						}
					}]
				});
			}

			if (after === null && start !== null && end !== null) {
				fullQuery.push({
					[db.Op.or]: [{
						start: {
							[db.Op.between]: [new Date(start), new Date(end)]
						}
					}, {
						end: {
							[db.Op.between]: [new Date(start), new Date(end)]
						}
					}]
				});
			}

			where = {
				[db.Sequelize.Op.and]: fullQuery
			}

			const price = req.query.price || null;
			if (price !== null) {
				where.price = price;
			}
		}

		db.course.findAndCountAll({
				where: where,
				limit: limit,
				offset: limit * page,
				order: [
					['createdAt', 'DESC']
				],
				include: [{
					model: db.membership,
					as: 'memberships'
				}],
			})
			.then(function(courses) {
				console.log(courses);
				responseController.success(
					res,
					200,
					courses
				);
			})
			.catch(function(e) {
				responseController.fail(res, 406, e);
			});
	});

	app.get('/course/:id', function(req, res) {
		var id = parseInt(req.params.id);
		if (id === undefined || id === null || id <= 0) {
			responseController.fail(res, 403, "Please provide a valid course ID");
			return;
		}
		db.course.findOne({
				where: {
					id: id
				},
				include: [{
					model: db.membership,
					as: 'memberships',
					include: [{
						model: db.user,
						as: 'user'
					}]
				}],
			})
			.then(function(course) {
				responseController.success(
					res,
					200,
					course
				);
			})
			.catch(function(e) {
				responseController.fail(res, 406, e);
			});
	});

	app.delete('/course/:id', middleware.requireAdminAuthentication, function(req,
		res) {
		var id = parseInt(req.params.id);
		if (id === undefined || id === null || id <= 0) {
			responseController.fail(res, 403, "Please provide a valid course ID");
			return;
		}
		db.course.destroy({
				where: {
					id: id
				}
			})
			.then(function(response) {
				responseController.success(
					res,
					200,
					"Course deleted successfully"
				);
			})
			.catch(function(err) {
				responseController.fail(res, 406, err);
			})
	});


	app.patch('/course/:id', middleware.requireAdminAuthentication, function(req,
		res) {
		var id = parseInt(req.params.id);
		if (id === undefined || id === null || id <= 0) {
			responseController.fail(res, 403, "Please provide a valid course ID");
			return;
		}
		var body = underscore.pick(req.body, 'name', 'start', 'end', 'price',
			'seats');
		if (isEmpty(body)) {
			responseController.fail(res, 403,
				"Please provide course name , start , end , seats and price in reqest body"
			);
			return;
		}
		db.course.update(body, {
				where: {
					id: id
				}
			})
			.then(function(response) {
				responseController.success(
					res,
					200,
					"Course updated successfully"
				);
			})
			.catch(function(err) {
				responseController.fail(res, 406, err);
			});

	});



};


Array.prototype.diff = function(arr2) {
	var ret = [];
	this.sort();
	arr2.sort();
	for (var i = 0; i < this.length; i += 1) {
		if (arr2.indexOf(this[i]) > -1) {
			ret.push(this[i]);
		}
	}
	return ret;
};
