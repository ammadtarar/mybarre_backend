module.exports = function(sequelize, DataTypes) {

	var product = sequelize.define('product', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			unique: false
		},
		price: {
			type: DataTypes.NUMBER,
			defaultValue: 0.00
		},
		count: {
			type: DataTypes.NUMBER,
			defaultValue: 0
		},
		thumbnail_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM,
			values: ['active', 'retired'],
			defaultValue: 'active'
		},
	});


	return product;
};
