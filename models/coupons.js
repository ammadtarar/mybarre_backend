module.exports = function(sequelize, DataTypes) {
	return sequelize.define('coupons', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM,
			unique: false,
			values: [
				'percentage',
				'amount'
			],
			defaultValue: 'percentage'
		},
		value: {
			type: DataTypes.STRING,
			allowNull: false
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false
		},
		use_count: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		}

	});
};
