//IMPORT ALL REQURIED MODULES
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const db = require('./controllers/db.js');
const middleware = require('./controllers/middleware.js')(db);
const responseController = require('./controllers/responseController.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
	res.header("Access-Control-Allow-Headers",
		"Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since,name,type"
	);
	next();
});

app.use(bodyParser.json());
app.use(middleware.logger);


require('./endpoints/admin.js')(app, middleware, db, _, responseController);
require('./endpoints/user.js')(app, middleware, db, _, responseController);
require('./endpoints/files.js')(app, db, __dirname, middleware,
	responseController);
require('./endpoints/bundle.js')(app, middleware, db, _, responseController);
require('./endpoints/product.js')(app, middleware, db, _, responseController);
require('./endpoints/cart.js')(app, middleware, db, _, responseController);
require('./endpoints/order.js')(app, middleware, db, _, responseController);


var force = process.env.force || false;
const env = process.env.env;

if (force && (env !== null && env !== undefined && env === "production")) {
	force = false;
	throw console.error(
		"CANNOT RESET DATA ON PRODUCTION SERVER. ONLY STAGING DATA CAN BE ERASED");
}

//INIT DB AND EXPRESS
db.sequelize.sync({
	force: force
}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on PORT ' + PORT + ' ! ');

		if (force) {
			const body = {
				"name": "Root",
				"email": "root@mybarre.com",
				"password": "root@mybarre",
				"type": "root"
			};
			db.admin.create(body)
				.then(function(admin) {
					console.log("======= ROOT ADMIN =========");
					console.log(body);
					console.log("===========================");

				})
				.catch(function(e) {
					console.log({
						"message": e.errors[0].message
					});
				});

		}
	});
});
