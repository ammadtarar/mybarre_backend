module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cart_items', {
		count: {
			type: DataTypes.NUMBER,
			defaultValue: 1
		}
	});
};
