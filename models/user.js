var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define(
    "user", {
      first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      certificate_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      wechat_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      open_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      top_size: {
        type: DataTypes.STRING,
        defaultValue: true
      },
      sock_size: {
        type: DataTypes.STRING,
        allowNull: true
      },
      occupation: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      session_key: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
      },
      unionid: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
      },
      dob: {
        type: DataTypes.STRING
      },
      nationality: {
        type: DataTypes.STRING
      },
      manual_lang: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      studio_name: {
        type: DataTypes.STRING
      },
      studio_address: {
        type: DataTypes.STRING
      },
      studio_manager_name: {
        type: DataTypes.STRING
      },
      studio_phone: {
        type: DataTypes.STRING
      },
      studio_website: {
        type: DataTypes.STRING
      },
      find_out: {
        type: DataTypes.STRING
      },
      motivation: {
        type: DataTypes.STRING
      },
      current_status: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      goals: {
        type: DataTypes.STRING
      },
      mybarre_before: {
        type: DataTypes.STRING
      },
      prior_experience: {
        type: DataTypes.STRING
      },
      anything_else: {
        type: DataTypes.STRING
      },
      qualifications: {
        type: DataTypes.STRING,
        get: function() {
          var a = [];
          try {
            a = JSON.parse(this.getDataValue('qualifications'))
          } catch (e) {
            a = []
          } finally {
            return a
          }
        },
        set: function(val) {
          return this.setDataValue('qualifications', JSON.stringify(val));
        }
      },
      heart_condition: {
        type: DataTypes.BOOLEAN
      },
      chest_pain_or_blackouts: {
        type: DataTypes.BOOLEAN
      },
      meds_for_bp: {
        type: DataTypes.BOOLEAN
      },
      token: {
        type: DataTypes.VIRTUAL,
        allowNull: true,
        set: function(value) {
          var hash = cryptojs.MD5(value).toString();
          this.setDataValue("token", value);
          this.setDataValue("tokenHash", hash);
        }
      },
      tokenHash: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      hooks: {
        beforeValidate: function(user, options) {

        }
      }
    }
  );
  user.authenticateByOpenId = function(openId) {
    return new Promise(function(resolve, reject) {
      if (typeof openId !== 'string') {
        return reject("openid should be a string");
      }
      user.findOne({
          where: {
            open_id: openId
          }
        })
        .then(function(user) {
          if (user === undefined || user === null || user === 'null') {
            reject("User not found");
            return
          }
          resolve(user);
        })
        .catch(function(e) {
          reject(e);
        })
    });
  };


  user.findByToken = function(token) {
    return new Promise(function(resolve, reject) {
      try {
        const decodedJWT = jwt.verify(token, 'qwerty098');
        const bytes = cryptojs.AES.decrypt(decodedJWT.token,
          'abc123!@#!');
        const tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
        user.findById(tokenData.id).then(function(user) {
          if (user) {
            resolve(user);
          } else {
            reject("User not found");
          }
        }, function(e) {
          reject(e);
        });
      } catch (e) {
        reject(e);
      }
    });
  };


  user.prototype.generateToken = function(type) {
    if (!_.isString(type)) {
      return undefined;
    }

    try {
      var stringData = JSON.stringify({
        id: this.get('id'),
        type: type
      });
      var encryptedData = cryptojs.AES.encrypt(stringData, 'abc123!@#!').toString();
      var token = jwt.sign({
        token: encryptedData
      }, 'qwerty098');


      return token;
    } catch (e) {
      return undefined;
    }
  };

  user.prototype.toPublicJSON = function() {
    var json = this.toJSON();
    return _.pick(json, 'id',
      'createdAt', 'updatedAt', 'first_name', 'last_name', 'nickname',
      'certificate_name', 'wechat_id', 'phone', 'avatar_url', 'open_id',
      'email', 'gender', 'manual_lang');
  };

  return user;
};
