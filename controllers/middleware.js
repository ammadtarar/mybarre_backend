var cryptojs = require('crypto-js');

module.exports = function(db) {
  return {
    logger: function(req, res, next) {
      console.log(
        "Request : " +
        new Date().toString() +
        " " +
        req.method +
        " " +
        req.originalUrl
      );
      next();
    },
    requireUserOrAdminAuthentication(req, res, next) {
      const token = req.get("Authorization") || "";
      if (token === undefined || token === "") {
        res.status(401).send({
          message: "Please include token in header as Authorization"
        });
        return;
      }
      db.user
        .findOne({
          where: {
            tokenHash: cryptojs.MD5(token).toString()
          }
        })
        .then(function(user) {
          if (!user) {
            db.admin
              .findOne({
                where: {
                  tokenHash: cryptojs.MD5(token).toString()
                }
              })
              .then(function(admin) {
                if (!admin) {
                  res.status(401).send({
                    message: "Invalid token. Please make sure the token is valid"
                  });
                  return;
                }
                req.admin = admin;
                next();
              })
          } else {
            req.user = user;
            next();
          }
        })
        .catch(function(e) {
          res.status(401).send(e);
          return;
        });
    },
    requireGlobalToken(req, res, next) {
      const token = req.get("Authorization") || "";
      if (token === undefined || token === "") {
        res.status(401).send({
          message: "Please include token in header as Authorization"
        });
        return;
      }
      db.user
        .findOne({
          where: {
            tokenHash: cryptojs.MD5(token).toString()
          }
        })
        .then(function(user) {
          if (!user) {

            db.admin
              .findOne({
                where: {
                  tokenHash: cryptojs.MD5(token).toString()
                }
              })
              .then(function(admin) {
                req.admin = admin;
                next();
              });

          } else {
            req.user = user;
            next();
          }
        })
        .catch(function(e) {
          res.status(401).send(e);
          return;
        });
    },
    requireAdminAuthentication: function(req, res, next) {
      var token = req.get("Authorization") || "";
      if (token === undefined || token === "") {
        res.status(401).send({
          message: "Please include admin token in header as Authentication"
        });
        return;
      }
      db.admin
        .findOne({
          where: {
            tokenHash: cryptojs.MD5(token).toString()
          }
        })
        .then(function(admin) {
          if (!admin) {
            res.status(401).send({
              message: "admin not found , please make sure the token is valid . Re-login and try with the new login auth token."
            });
            return;
          }
          req.admin = admin;
          next();
        })
        .catch(function() {
          res.status(401).send();
          return;
        });
    },
    rootAndSuperAdminAccessible: function(req, res, next) {
      if (req.admin.type !== "root" && req.admin.type !== "super") {
        res.status(401).json({
          message: "Only root & super admins are authorized to access this service"
        });
        return;
      }
      next();
    },
    requireAuthentication: function(req, res, next) {
      var token = req.get("Authorization") || "";
      if (token === undefined || token === "") {
        res.status(401).send({
          message: "Please include user token in header as Authentication"
        });
        return;
      }
      db.user
        .findOne({
          where: {
            tokenHash: cryptojs.MD5(token).toString()
          }
        })
        .then(function(user) {
          if (!user) {
            res.status(401).send({
              message: "User not found , please make sure the token is valid . Re-login and try with the new login auth token."
            });
            return;
          }
          req.user = user;
          next();
        })
        .catch(function() {
          res.status(401).send();
          return;
        });
    },
    requireAuthenticationWithoutVerification: function(req, res, next) {
      var token = req.get("Authorization") || "";
      if (token === undefined || token === "") {
        res.status(401).send({
          message: "Please include user token in header as Authentication"
        });
        return;
      }
      db.user
        .findOne({
          where: {
            tokenHash: cryptojs.MD5(token).toString()
          }
        })
        .then(function(user) {
          if (!user) {
            res.status(401).send({
              message: "User not found , please make sure the token is valid . Re-login and try with the new login auth token."
            });
            return;
          }
          req.user = user;
          next();
        })
        .catch(function() {
          res.status(401).send();
          return;
        });
    },
  };

};
