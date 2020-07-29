module.exports = function(sequelize, DataTypes) {
    return sequelize.define('configs', {
        video_emails_notifications_days_in_advance: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 30
        },
        video_emails_notifications_frequency_days: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 5
        },
        manual_fee: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 199
        },
        shanghai_parcel_tariff: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 15
        },
        outside_shanghai_parcel_tariff: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 30
        },
        production_ready: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    });
};