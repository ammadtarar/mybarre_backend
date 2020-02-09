const Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined, undefined, undefined, {
  dialect: 'sqlite',
  storage: './data/db.sqlite',
  operatorsAliases: false
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

db.admin = sequelize.import('../models/admin.js');
db.user = sequelize.import('../models/user.js');
db.files = sequelize.import('../models/files.js');
db.bundle = sequelize.import('../models/bundle.js');
db.product = sequelize.import('../models/product.js');
db.order = sequelize.import('../models/order.js');
db.cart_items = sequelize.import('../models/cart_items.js');
db.order_items = sequelize.import('../models/order_items.js');

db.bundle.hasMany(db.files, {
  as: 'files'
});
db.cart_items.belongsTo(db.product, {
  as: 'product'
});
db.cart_items.belongsTo(db.user, {
  as: 'user'
});
db.order_items.belongsTo(db.product, {
  as: 'product'
});
db.order_items.belongsTo(db.user, {
  as: 'user'
});
db.order.hasMany(db.order_items, {
  as: 'items'
});
db.order.belongsTo(db.user, {
  as: 'user'
})

module.exports = db;
