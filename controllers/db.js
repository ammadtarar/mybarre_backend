const Sequelize = require('sequelize');

var sequelize = null;
if (process.env.ENV === 'local') {
  sequelize = new Sequelize(
    process.env.db_name,
    "mybarre_backend",
    "mybarre-x-sawatechnologies-2020", {
      dialect: 'sqlite',
      storage: './data/db.sqlite',
      operatorsAliases: false
    });
} else {
  sequelize = new Sequelize(
    process.env.db_name,
    "mybarre_backend",
    "mybarre-x-sawatechnologies-2020", {
      host: 'mybarrefitness.mysql.rds.aliyuncs.com',
      dialect: 'mysql',
      port: 33333,
      logging: true
    });
}


var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

db.admin = sequelize.import('../models/admin.js');
db.user = sequelize.import('../models/user.js');
db.files = sequelize.import('../models/files.js');
db.bundle = sequelize.import('../models/bundle.js');



db.bundle.hasMany(db.files, {
  as: 'files'
});


const user_bundles = sequelize.define('user_bundles', {
  out_trade_no: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
});
db.user_bundles = user_bundles;
db.user.belongsToMany(db.bundle, {
  through: user_bundles,
  as: 'bundles'
});

//COURSE
db.course = sequelize.import('../models/course/course.js');
db.membership = sequelize.import('../models/course/membership.js');
db.membership.belongsTo(db.user, {
  as: 'user'
});
db.membership.belongsTo(db.course, {
  as: 'course'
});
db.course.hasMany(db.membership, {
  as: 'memberships'
})

db.user.hasMany(db.membership, {
  as: 'memberships'
});
db.membership.hasMany(db.files, {
  as: 'training_videos'
});



//STORE
db.product = sequelize.import('../models/store/product.js');
db.order = sequelize.import('../models/store/order.js');
db.cart_items = sequelize.import('../models/store/cart_items.js');
db.order_items = sequelize.import('../models/store/order_items.js');
db.cart_items.belongsTo(db.product, {
  as: 'product'
});
db.order_items.belongsTo(db.product, {
  as: 'product'
});
db.cart_items.belongsTo(db.user, {
  as: 'user'
});
db.order_items.belongsTo(db.user, {
  as: 'user'
});
db.order.belongsTo(db.user, {
  as: 'user'
});
db.order.hasMany(db.order_items, {
  as: 'items'
});


db.configs = sequelize.import('../models/configs.js')

module.exports = db;
