module.exports = function(sequelize, DataTypes) {
	return sequelize.define('color', {
		name_en: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name_zh: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
};
