function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}

module.exports = async function(app, middleware, db, underscore,
	responseController) {

	app.get('/configs', middleware.requireAdminAuthentication, function(req, res) {
		db.configs.findOne({
				where: {
					id: 1
				}
			})
			.then(function(config) {
				responseController.success(res, 200, config)
			})
	});

	app.post('/configs', middleware.requireAdminAuthentication, function(req, res) {
		var body = req.body;
		if (body === null || body === undefined || isEmpty(body)) {
			responseController.fail(res, 403,
				"Request body is empty"
			);
			return;
		}
		db.configs.update(body, {
				where: {
					id: 1
				}
			})
			.then(function(config) {
				responseController.success(res, 200, 'Configs updated')
			})
			.catch(function(e) {
				responseController.fail(res, 403, e);
			})
	});

};
