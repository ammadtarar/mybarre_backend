module.exports = function(sequelize, DataTypes) {
	return sequelize.define('order', {
		reciepient_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			unique: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true
		},
		zip_code: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM,
			values: ['pending_payment', 'pending_dispatch', 'dispatched', 'completed'],
			defaultValue: 'pending_payment'
		}
	});
};
