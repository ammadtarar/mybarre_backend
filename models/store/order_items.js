module.exports = function(sequelize, DataTypes) {
	return sequelize.define('order_items', {
		count: {
			type: DataTypes.NUMBER,
			defaultValue: 1
		}
	});
};
