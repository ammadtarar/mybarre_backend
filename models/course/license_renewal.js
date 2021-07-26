const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('license_renewals', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        membershipId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        out_trade_no: {
            type: DataTypes.STRING,
            allowNull: true
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
        }
    });
};