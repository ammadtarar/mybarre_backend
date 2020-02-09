let cryptojs = require('crypto-js');
let fs = require('fs');
const emailController = require('../controllers/emailController.js');
module.exports = function(app, middleware, db, underscore, responseController) {


	// REGISTER ADMIN
	app.post('/admin/register', middleware.requireAdminAuthentication, middleware
		.rootAndSuperAdminAccessible,
		function(
			req, res) {
			var body = underscore.pick(req.body, 'email', "type", "name");
			const pwd = Math.random().toString(36).replace('0.', '');
			body.password = pwd;
			const type = body.type
			if (type === null || type === undefined || !type) {
				responseController.fail(res, 403,
					"Please specify admin type in request body");
				return
			}
			if (type !== 'root' && type !== 'super' && type !== 'normal') {
				responseController.fail(res, 403,
					"Please specify a legal admin type i.e., super | normal");
				return
			}
			db.admin.create(body).then(function(user) {
					var admin = user.toJSON();
					admin.password = pwd
					emailController.sendAdminCreationEmail(admin)
						.then(function() {
							responseController.success(res, 201, user.toPublicJSON())
						})
						.catch(function(e) {

							responseController.fail(res, 406, e);
						})

				}, function(e) {
					console.log("==== error two");
					console.log(e);
					console.log("======");
					responseController.fail(res, 406, e);
				})
				.catch(function(e) {
					console.log("==== error three");
					console.log(e);
					console.log("======");
					responseController.fail(res, 404, e);
				});
		});


	app.get('/admin/verify/login', function(req, res) {
		var token = req.get("Authorization") || null;
		if (token === null) {
			responseController.fail(res, 403,
				'Please include admin token in headers as Authentication');
			return;
		}

		db.admin
			.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			})
			.then(function(admin) {
				if (!admin) {
					res.status(401).send({
						message: "admin not found , please make sure the token is valid . Re-login and try with the new login auth token."
					});
				} else {
					res.status(200).json({
						message: "Token is valid"
					})
				}

			})
			.catch(function() {
				res.status(401).send();
				return;
			});
	})

	// ADMIN LOGOUT
	app.delete('/admin/logout', function(req, res) {
		var token = req.get('Authorization') || '';


		if (!token) {
			return res.status(401).send();
		}

		db.admin.update({
			token: '',
			tokenHash: ''
		}, {
			where: {
				tokenHash: cryptojs.MD5(token).toString()
			}
		}).then(function(user) {
			responseController.success(res, 204, {
				message: 'Logged out successfully'
			})
		}).catch(function(e) {
			responseController.fail(res, 404, e);
		});
	});

	// DELETE ADMIN
	app.delete('/admin/:id', middleware.requireAdminAuthentication, middleware.rootAndSuperAdminAccessible,
		function(
			req, res) {

			var id = parseInt(req.params.id);
			if (id === undefined || id === null || id <= 0) {
				responseController.fail(res, 403, "Please provide a valid ADMIN ID");
				return;
			}
			db.admin.findOne({
					where: {
						id: id
					}
				})
				.then(function(admin) {
					if (admin === null || admin === undefined) {
						responseController.fail(res, 404, "No admin with ID = " + id +
							" was found");
						return
					}
					if (admin.type === "root") {
						responseController.fail(res, 401, "You cannot delete a ROOT admin");
						return;
					}

					if (admin.id === req.admin.id) {
						responseController.fail(res, 401, "You cannot delete yourself");
						return;
					}

					db.admin.destroy({
							where: {
								id: id
							}
						})
						.then(function(updateRes) {
							responseController.success(res, 200, "Admin deleted successfully")
						})
						.catch(function(err) {
							responseController.fail(res, 404, e);
						})


				})
		});

	// GET LIST OF ALL ADMINS
	app.get("/admin/list/all", middleware.requireAdminAuthentication, function(
		req,
		res) {
		var limit = parseInt(req.query.limit) || 10;
		var page = parseInt(req.query.page) || 0;
		if (page >= 1) {
			page = page - 1;
		}
		var where = {};

		const type = req.query.type || null;
		if (type !== null) {
			where.type = type.toLowerCase();
		}

		const email = req.query.email || null;
		if (email !== null) {
			where.email = {
				[db.Op.like]: '%' + email + '%'
			}
		}

		const name = req.query.name || null;
		if (name !== null) {
			where.name = {
				[db.Op.like]: '%' + name + '%'
			}
		}

		db.admin.findAndCountAll({
				where: where,
				limit: limit,
				offset: limit * page,
				order: [
					['createdAt', 'DESC']
				],
				attributes: {
					exclude: ['salt', 'password_hash', 'tokenHash']
				},
			})
			.then(function(admins) {
				responseController.success(res, 200, admins)
			})
			.catch(function(e) {
				console.log(e);

				responseController.fail(res, 404, e);
			});
	})

	// ADMIN LOGIN
	app.post('/admin/login', function(req, res) {
		var body = underscore.pick(req.body, 'email', 'password');
		var userInstance;
		var token;

		db.admin.authenticate(body).then(function(admin) {
				token = admin.generateToken('authentication');
				userInstance = admin;
				return db.admin.update({
					token: token
				}, {
					where: {
						id: userInstance.toPublicJSON().id
					}
				})

			}).then(function(u) {
				var obj = {
					id: userInstance.toPublicJSON().id,
					email: userInstance.toPublicJSON().email,
					name: userInstance.toPublicJSON().name,
					token: token,
					type: userInstance.toPublicJSON().type,
					name: userInstance.toPublicJSON().name
				};
				res.header('Auth', token)
				responseController.success(res, 200, obj)
			})
			.catch(function(e) {
				responseController.fail(res, 404, e);
			});
	});



};
