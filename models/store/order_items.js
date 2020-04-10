module.exports = function(sequelize, DataTypes) {
	return sequelize.define('order_items', {
		count: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		}
	});
};
