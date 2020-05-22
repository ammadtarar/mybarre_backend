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
} else if (process.env.ENV === "staging") {
  sequelize = new Sequelize(
    process.env.db_name,
    "mybarre_backend",
    "mybarre-x-sawatechnologies-2020", {
      host: 'mybarrefitness.mysql.rds.aliyuncs.com',
      dialect: 'mysql',
      port: 33333,
      logging: true
    });
} else if (process.env.ENV === "production") {
  sequelize = new Sequelize(
    process.env.db_name,
    "mybarre_admin",
    "mybarrefitness", {
      host: 'mybarre-fitness.mysql.rds.aliyuncs.com',
      dialect: 'mysql',
      port: 3306,
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
db.color = sequelize.import('../models/store/color.js');
db.size = sequelize.import('../models/store/size.js');

const product_colors = sequelize.define('product_colors', {});
db.product_colors = product_colors;
db.product.belongsToMany(db.color, {
  through: product_colors,
  as: 'colors'
});

const product_sizes = sequelize.define('product_sizes', {});
db.product_sizes = product_sizes;
db.product.belongsToMany(db.size, {
  through: product_sizes,
  as: 'sizes'
})

db.cart_items = sequelize.import('../models/store/cart_items.js');
db.cart_items.belongsTo(db.product, {
  as: 'product'
});
db.cart_items.belongsTo(db.user, {
  as: 'user'
});
db.cart_items.belongsTo(db.color, {
  as: 'color'
});
db.cart_items.belongsTo(db.size, {
  as: 'size'
});


db.order_items = sequelize.import('../models/store/order_items.js');
db.order_items.belongsTo(db.product, {
  as: 'product'
});
db.order_items.belongsTo(db.user, {
  as: 'user'
});
db.order_items.belongsTo(db.color, {
  as: 'color'
});
db.order_items.belongsTo(db.size, {
  as: 'size'
});

db.order = sequelize.import('../models/store/order.js');
db.order.belongsTo(db.user, {
  as: 'user'
});
db.order.hasMany(db.order_items, {
  as: 'items'
});


db.configs = sequelize.import('../models/configs.js')

db.coupons = sequelize.import('../models/coupons.js');
const user_coupons = sequelize.define('user_coupons', {});
db.user_coupons = user_coupons;
db.coupons.belongsToMany(db.user, {
  through: user_coupons,
  as: 'users'
});

db.membership.belongsTo(db.coupons, {
  as: 'coupon'
});

module.exports = db;
