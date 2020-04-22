//IMPORT ALL REQURIED MODULES
const PORT = process.env.PORT || 3001;
const force = process.env.force || false;

const enviorment = process.env.ENV || null;
if (enviorment === null) {
	console.log('\x1b[40m\x1b[31m',
		"Please provde ENV argument. ENV can be LOCAL , STAGING or PRODUCTION. For example : ENV=STAGING npm start"
	)
	return
} else if (enviorment.toLowerCase() === 'local') {
	process.env.base_url = "http://localhost:" + PORT;
	process.env.db_name = "local";
} else if (enviorment.toLowerCase() === 'staging') {
	process.env.base_url = "https://api-staging.mybarrefitness.com";
	process.env.db_name = "staging";
	process.env.admin_url = "https://dashboard-staging.mybarrefitness.com";
	if (force) {
		console.log('\x1b[40m\x1b[31m',
			"CANNOT RESET DATA ON STAGING SERVER. ONLY LOCAL DATA CAN BE ERASED"
		)
		return
	}
} else if (enviorment.toLowerCase() === 'production') {
	process.env.base_url = "https://api.mybarrefitness.com";
	process.env.db_name = "production";
	process.env.admin_url = "https://dashboard.mybarrefitness.com";
	if (force) {
		console.log('\x1b[40m\x1b[31m',
			"CANNOT RESET DATA ON PRODUCTION SERVER. ONLY LOCAL DATA CAN BE ERASED"
		)
		return
	}
} else {
	console.log('\x1b[40m\x1b[31m',
		"Please provde a valid ENV argument. ENV can be LOCAL , STAGING or PRODUCTION. For example : ENV=STAGING npm start"
	)
	return
}



const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const db = require('./controllers/db.js');
const middleware = require('./controllers/middleware.js')(db);
const responseController = require('./controllers/responseController.js');



const app = express();


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
app.use(express.urlencoded());

require('./endpoints/dashboard.js')(app, middleware, db, _, responseController);
require('./endpoints/admin.js')(app, middleware, db, _, responseController);
require('./endpoints/user.js')(app, middleware, db, _, responseController);
require('./endpoints/files.js')(app, db, __dirname, middleware,
	responseController);
require('./endpoints/bundle.js')(app, middleware, db, _, responseController);
require('./endpoints/configs.js')(app, middleware, db, _, responseController);
//COURSE
require('./endpoints/course/course.js')(app, middleware, db, _,
	responseController);
require('./endpoints/course/membership.js')(app, middleware, db, _,
	responseController, __dirname);

//PAY
require('./endpoints/pay/pay.js')(app, middleware, db, _, responseController);

//STORE
require('./endpoints/store/product.js')(app, middleware, db, _,
	responseController);
require('./endpoints/store/cart.js')(app, middleware, db, _, responseController);
require('./endpoints/store/order.js')(app, middleware, db, _,
	responseController);



//INIT DB AND EXPRESS
db.sequelize.sync({
	force: force
}).then(function() {
	app.listen(PORT, function() {
		console.log();
		console.log();
		console.log();
		console.log('Express listening on PORT ' + PORT + ' ! ');
		console.log();
		console.log();
		console.log();
		require('./controllers/emailScheduler.js')(db);

		db.configs.findAll()
			.then(function(configs) {
				console.log("EXISTING CONFIGS LENGTH = ", configs.length);
				if (configs.length < 1) {
					console.log("CREATING CONFIGS");
					db.configs.create()
				}
			})
		if (force) {
			const adminJson = {
				"name": "Root",
				"email": "root@mybarre.com",
				"password": "root@mybarre",
				"type": "root"
			};
			db.admin.create(adminJson)
				.then(function(admin) {
					db.bundle.create({
							name: 'Training',
							description: 'This is the original training bundle',
							price: 'FREE',
							type: 'training'
						})
						.then(function(bundle) {
							console.log("======= ROOT ADMIN =========");
							console.log(adminJson);
							console.log("===========================");
							console.log();
							console.log("======= TRAINING BUNDLE =========");
							console.log(bundle.toJSON());
							console.log("===========================");
						})



				})
				.catch(function(e) {
					console.log({
						"message": e.errors[0].message
					});
				});
		}
	});
});
