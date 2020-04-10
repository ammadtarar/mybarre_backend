module.exports = function(sequelize, DataTypes) {
	return sequelize.define('store_order', {
		reciepient_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			unique: false
		},
		out_trade_no: {
			type: DataTypes.STRING
		},
		amount: {
			type: DataTypes.FLOAT
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
		},
		courier_company: {
			type: DataTypes.STRING,
			allowNull: true
		},
		tacking_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
		remarks: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});
};
