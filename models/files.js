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
    },
    index: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    stages: {
      type: DataTypes.STRING,
      get: function() {
        return this.getDataValue('stages')
      },
      set: function(val) {
        return this.setDataValue('stages', JSON.stringify(val));
      }
    }

  });
};
