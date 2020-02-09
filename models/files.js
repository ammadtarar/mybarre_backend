module.exports = function(sequelize, DataTypes) {
  return sequelize.define('files', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mime: {
      type: DataTypes.STRING,
      unique: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumb_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
