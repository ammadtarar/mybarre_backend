module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bundle', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			unique: false
		},
		type: {
			type: DataTypes.ENUM,
			values: ['training', 'ce'],
			allowNull: false,
			defaultValue: 'ce'
		},
		price: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: 'FREE'
		}
	});
};
