const moment = require('moment');
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('course', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		start: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				return moment(this.getDataValue('start')).format('YYYY/MM/DD');
			}
		},
		end: {
			type: DataTypes.DATE,
			allowNull: false,
			get() {
				return moment(this.getDataValue('end')).format('YYYY/MM/DD');
			}
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0.00
		},
		seats: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		available_seats: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
	});
};
