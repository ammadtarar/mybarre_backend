const cryptojs = require('crypto-js');
const fs = require('fs');
const wechatController = require('../controllers/wechatController.js');
var WXBizDataCrypt = require('../controllers/WXBizDataCrypt');

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return true;
}

module.exports = function(app, middleware, db, underscore, responseController) {

  // GET WECHAT USER'S OPEN_ID AND SESSION_KEY USING JSCODE FROM MINIPROGRAM
  app.post("/user/openid/by/jscode", function(req, res) {
    var body = underscore.pick(req.body, 'jscode');
    wechatController.jscode2session(body.jscode)
      .then(function(wx) {
        responseController.success(
          res,
          200,
          wx
        );
      })
      .catch(function(e) {
        responseController.fail(res, 406, e);
      });
  })

  app.post('/user/mp/login/by/openid', function(req, res) {

    var openId = req.body.open_id || '';
    if (openId === '') {
      responseController.fail(res, 403,
        "Please send open_id in request body");
      return;
    }
    var userInstance, token;
    db.user
      .authenticateByOpenId(openId)
      .then(function(user) {
        token = user.generateToken("authentication");
        userInstance = user;
        return db.user.update({
          token: token
        }, {
          where: {
            id: userInstance.toPublicJSON().id
          }
        });
      })
      .then(function(u) {
        var obj = userInstance.toPublicJSON();
        obj.token = token;
        res.header("Token", token);
        responseController.success(
          res,
          200,
          obj
        );

      })
      .catch(function(e) {
        console.log(e)
        responseController.fail(res, 404, String(e));
      });

  });

  // REGISTER USING WECHAT MINIPROGRAM JSCODE
  app.post('/user/mp/register', function(req, res) {
    var body = underscore.pick(req.body, 'jscode');
    wechatController.jscode2session(body.jscode)
      .then(function(data) {
        const openid = data.openid || "";
        if (openid === "") {
          responseController.fail(res, 404,
            "Failed to get open id and session key from wechat service"
          );
          return;
        }
        db.user.create({
            open_id: openid,
            session_key: data.session_key
          })
          .then(function(regUser) {
            console.log(regUser);

            var userInstance, token;
            db.user
              .authenticateByOpenId(regUser.open_id)
              .then(function(user) {
                token = user.generateToken("authentication");
                userInstance = user;
                return db.user.update({
                  token: token,
                  session_key: data.session_key
                }, {
                  where: {
                    id: userInstance.toPublicJSON().id
                  }
                });
              })
              .then(function(u) {
                var obj = userInstance.toPublicJSON();
                obj.token = token;
                res.header("Token", token);
                responseController.success(
                  res,
                  200,
                  obj
                );

              })
              .catch(function(e) {
                responseController.fail(res, 402, e);
              });

          })
          .catch(function(e) {
            const msg = e.message;
            if (msg === 'Validation error') {
              var userInstance, token;
              db.user
                .authenticateByOpenId(openid)
                .then(function(user) {
                  token = user.generateToken("authentication");
                  userInstance = user;
                  return db.user.update({
                    token: token,
                    session_key: data.session_key
                  }, {
                    where: {
                      id: userInstance.toPublicJSON().id
                    }
                  });
                })
                .then(function(u) {
                  var obj = userInstance.toPublicJSON();
                  obj.token = token;
                  res.header("Token", token);
                  responseController.success(
                    res,
                    202,
                    obj
                  );

                })
                .catch(function(e) {
                  responseController.fail(res, 402, e);
                });
            } else {
              responseController.fail(res, 403, String(e));
            }
            console.log("");
            console.log(msg);

          });
      })
      .catch(function(err) {
        responseController.fail(res, 404, {
          message: "Error while getting open id from wx",
          error: err
        });
      });

  });


  //LOGIN BY WX JSCODE
  app.post('/user/mp/login', function(req, res) {
    var body = underscore.pick(req.body, 'jscode');
    wechatController.jscode2session(body.jscode)
      .then(function(data) {
        const openid = data.openid || "";
        if (openid === "") {
          responseController.fail(res, 404,
            "Failed to get open id and session key from wechat service"
          );
          return;
        }
        var userInstance, token;
        db.user
          .authenticateByOpenId(openid)
          .then(function(user) {
            token = user.generateToken("authentication");
            userInstance = user;
            return db.user.update({
              token: token,
              session_key: data.session_key
            }, {
              where: {
                id: userInstance.toPublicJSON().id
              }
            });
          })
          .then(function(u) {
            var obj = userInstance.toPublicJSON();
            obj.token = token;
            res.header("Token", token);
            responseController.success(
              res,
              202,
              obj
            );

          })
          .catch(function(e) {
            responseController.fail(res, 404, e);
          });

      })
      .catch(function(err) {
        responseController.fail(res, 404, {
          message: "Error while getting open id from wx",
          error: err
        });
      });


  });

  //CREATE WECHAT PROFILE
  app.post('/user/wechat/profile/create', middleware.requireAuthentication,
    function(req, res) {

      const body = underscore.pick(req.body, 'jscode', 'userEncryptedData',
        'phoneEncryptedData');
      if (body === null || body === undefined || body.length <= 0) {
        responseController.fail(res, 403,
          "Please send jscode ,userEncryptedData & phoneEncryptedData in request body"
        );
        return;
      }

      const jscode = body.jscode || null;
      if (jscode === null) {
        responseController.fail(res, 403,
          "Please send jscode from wx.login in request body");
        return;
      }

      const userEncryptedData = body.userEncryptedData || null;
      if (userEncryptedData === null) {
        responseController.fail(res, 403,
          "Please send userEncryptedData in request body");
      }

      if (!('iv' in userEncryptedData) || !('encryptedData' in
          userEncryptedData)) {
        responseController.fail(res, 403,
          "Please send iv and encryptedData from wx.getUserInfo in  userEncryptedData object .in request body. From example { userEncryptedData : { 'iv' : 'iv_from_wx.getUserInfo' , 'encryptedData' : 'encryptedData_from_wx.getUserInfo'}}"
        );
        return;
      }



      const phoneEncryptedData = body.phoneEncryptedData || null;
      if (phoneEncryptedData === null) {
        responseController.fail(res, 403,
          "Please send phoneEncryptedData in request body");
        return;
      }


      if (!('iv' in phoneEncryptedData) || !('encryptedData' in
          phoneEncryptedData)) {
        responseController.fail(res, 403,
          "Please send iv and encryptedData from bindgetphonenumber in  phoneEncryptedData object in request body. From example { userEncryptedData : { 'iv' : 'iv_from_bindgetphonenumber' , 'encryptedData' : 'encryptedData_from_bindgetphonenumber'}}"
        );
        return;
      }

      wechatController.jscode2session(body.jscode)
        .then(function(jsRes) {
          const session_key = jsRes.session_key;
          const openid = jsRes.openid;

          const pc = new WXBizDataCrypt(jsRes.session_key)

          const phoneData = pc.decryptData(phoneEncryptedData.encryptedData,
            phoneEncryptedData.iv)
          const phone = phoneData.phoneNumber || phoneData.purePhoneNumber;
          const countryCode = phoneData.countryCode;
          const fullPhoneNumber = countryCode + phone;

          if (fullPhoneNumber === null || fullPhoneNumber === undefined ||
            fullPhoneNumber === "") {
            responseController.fail(res, 403,
              "Unable to get user's wechat phone number. Please make sure that jscode , encryptedData and iv from wechat are valid"
            );
            return
          }

          const profileData = pc.decryptData(userEncryptedData.encryptedData,
            userEncryptedData.iv);
          if (profileData === null || phoneData === undefined) {
            responseController.fail(res, 403,
              "Unable to get user's wechat profile. Please make sure to the iv and encrypred data from wx.login are valid"
            );
            return;
          }
          const name = profileData.nickName;
          const gender = profileData.gender;
          const avatarUrl = profileData.avatarUrl;

          db.user.update({
            open_id: openid,
            session_key: session_key,
            first_name: name,
            gender: gender,
            avatar_url: avatarUrl,
            phone: fullPhoneNumber
          }, {
            where: {
              id: req.user.id
            }
          }).then(function(updateRes) {
            if (updateRes[0] === 1) {
              db.user.findOne({
                  where: {
                    id: req.user.id
                  }
                })
                .then(function(user) {
                  responseController.success(res, 200, user.toPublicJSON())
                })
                .catch(function(err) {
                  console.log("==== error three");
                  console.log(err);
                  responseController.fail(res, 404, err);
                });

            } else {
              responseController.fail(res, 403,
                'Unable to update wechat profile. Pleasae make sure all the data sent is valid and correct'
              );
            }
          }).catch(function(e) {
            console.log("==== error one");
            console.log(e);


            responseController.fail(res, 404, e);
          });
        })
        .catch(function(err) {
          console.log("==== error two");
          console.log(err);
          responseController.fail(res, 404, err);
        });


    });



  //USER LOGOUT
  app.delete('/user/logout', function(req, res) {
    var token = req.get('Authorization') || '';


    if (!token) {
      return res.status(401).send();
    }

    db.user.update({
      token: '',
      tokenHash: ''
    }, {
      where: {
        tokenHash: cryptojs.MD5(token).toString()
      }
    }).then(function(user) {
      responseController.success(res, 204, {
        message: 'Logged out successfully'
      })
    }).catch(function(e) {
      responseController.fail(res, 404, e);
    });
  });



  // //UPDATE EXISTING
  app.post('/user/update', middleware.requireAuthentication, function(req,
    res) {
    const body = req.body;
    const id = parseInt(req.user.id);
    if (body === null || body === undefined || Object.getOwnPropertyNames(
        body)
      .length <= 0) {
      responseController.fail(res, 403,
        "Body is empty . Please send the body with key and value");
      return
    }

    db.user.update(body, {
        where: {
          id: id
        }
      })
      .then(function(result) {
        console.log(result);

        if (result != 1) {
          responseController.fail(res, 403, 'Failed to update profile');
        } else {
          responseController.success(res, 200,
            "Profile updated successful")
        }
      }, function(e) {
        responseController.fail(res, 403, e);
      })
      .catch(function(e) {
        responseController.fail(res, 404, e);
      });

  });

  //GET PROFILE
  app.get('/user/my/profile', middleware.requireAuthentication, function(req,
    res) {
    responseController.success(res, 200, req.user)
  });

  //GET PROFILE BY ID
  app.get('/user/profile/:id', middleware.requireGlobalToken, function(
    req,
    res) {
    const id = parseInt(req.params.id) || -1;
    if (id === -1) {
      responseController.fail(res, 403,
        "Please provide user id in the url");
      return
    }
    db.user.findOne({
        where: {
          id: id
        }
      })
      .then(function(u) {
        var responseObj = {
          user: u
        }
        db.order.findAll({
            where: {
              userId: u.id
            },
            include: [{
              model: db.order_items,
              as: 'items',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId',
                  'productId',
                  'orderId'
                ]
              },
              include: [{
                model: db.product,
                as: 'product'
              }, {
                model: db.color,
                as: 'color'
              }, {
                model: db.size,
                as: 'size'
              }]
            }]
          })
          .then(function(orders) {
            responseObj.orders = orders;
            responseController.success(res, 200, responseObj);
          })

      })
  });


  app.post('/user/wechat/decrypt/phone', function(req, res) {
    const jscode = req.body.jscode || "";
    if (jscode === "") {
      responseController.fail(res, 403,
        "Please pass jscode in url query as jscode . For example : /user/wechat/jscode2session?jscode={your_js_code}"
      );
      return;
    }

    const iv = req.body.iv || "";
    if (iv === "") {
      responseController.fail(res, 403,
        "Please pass iv in url query as iv . For example : /user/wechat/jscode2session?iv={iv}"
      );
      return;
    }

    const encryptedData = req.body.encryptedData || "";
    if (encryptedData === "") {
      responseController.fail(res, 403,
        "Please pass encryptedData in url query as encryptedData . For example : /user/wechat/jscode2session?encryptedData={encryptedData}"
      );
      return;
    }

    wechatController.jscode2session(jscode)
      .then(function(jsRes) {
        var pc = new WXBizDataCrypt(jsRes.session_key)
        var data = pc.decryptData(encryptedData, iv)
        responseController.success(res, 200, data);
      })
      .catch(function(err) {
        responseController.fail(res, 404, err);
      });

  });

  app.get('/user/list/all', middleware.requireAdminAuthentication, function(
    req,
    res) {
    var limit = parseInt(req.query.limit) || 10;
    var page = parseInt(req.query.page) || 0;
    if (page >= 1) {
      page = page - 1;
    }

    var where = {};

    if (!isEmpty(req.query)) {
      var fullQuery = [];
      const keyword = req.query.keyword || null;
      if (keyword !== null) {
        fullQuery.push({
          [db.Sequelize.Op.or]: [{
            first_name: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            last_name: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            nickname: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            certificate_name: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            phone: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            gender: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            nationality: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            city: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            address: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            studio_name: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, {
            studio_address: {
              [db.Op.like]: '%' + keyword + '%'
            }
          }, ]
        })
      }



      where = {
        [db.Sequelize.Op.and]: fullQuery
      }
      console.log("where");
      console.log(where);
    }

    var membershipInclude = {}
    const status = req.query.status || null;
    if (status !== null) {
      membershipInclude = {
        model: db.membership,
        as: 'memberships',
        where: {
          status: status
        },
        include: [{
          model: db.course,
          as: 'course'
        }]
      };
    } else {
      membershipInclude = {
        model: db.membership,
        as: 'memberships',
        include: [{
          model: db.course,
          as: 'course'
        }]
      };
    }

    db.user.findAndCountAll({
        where: where,
        limit: limit,
        offset: limit * page,
        order: [
          ['createdAt', 'DESC']
        ],
        include: [membershipInclude]
      })
      .then(function(users) {
        console.log(users);

        var publicUsers = [];
        var discardCount = 0;
        users.rows.forEach(function(user) {
          if (user.first_name !== null && user.last_name !== null && user.nickname !== null && user.wechat_id !== null && user.phone !== null) {
            var u = user.toPublicJSON();
            u['memberships'] = user.memberships
            publicUsers.push(u)
          }else{
            discardCount++;
          }
        })
        responseController.success(res, 200, {
          count: users.count - discardCount,
          rows: publicUsers
        });
      })
      .catch(function(e) {
        console.log(e);

        responseController.fail(res, 401, e);
      })
  });

  app.post('/user/:id/block', middleware.requireAdminAuthentication, function(
    req, res) {
    const id = parseInt(req.params.id) || -1;
    if (id === -1) {
      responseController.fail(res, 403,
        "Please provide user id in the url");
      return
    }
    const reason = req.body.reason || '';
    if (reason === '') {
      responseController.fail(res, 403,
        "Please provide reason for blocking the user as 'reason' in request body"
      );
      return
    }

    db.user.update({
        blocked: true,
        block_reason: reason
      }, {
        where: {
          id: id
        }
      })
      .then(function(updated) {
        responseController.success(res, 200,
          'User blocked successfully');
      })
      .catch(function(e) {
        responseController.fail(res, 403, {
          message: "Failed to block the user",
          error: e
        });
      });

  });

  app.post('/user/:id/unblock', middleware.requireAdminAuthentication,
    function(
      req, res) {
      const id = parseInt(req.params.id) || -1;
      if (id === -1) {
        responseController.fail(res, 403,
          "Please provide user id in the url");
        return
      }
      db.user.update({
          blocked: false,
          block_reason: ''
        }, {
          where: {
            id: id
          }
        })
        .then(function(updated) {
          responseController.success(res, 200,
            'User unblocked successfully');
        })
        .catch(function(e) {
          responseController.fail(res, 403, {
            message: "Failed to unblock the user",
            error: e
          });
        });
    });



};
