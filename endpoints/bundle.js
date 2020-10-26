function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

const multer = require('multer');
const fs = require('fs-extra');
const diskDirectory = './disk';
const path = require('path');

module.exports = function(app, middleware, db, underscore, responseController) {


    app.get('/bundle/:id', middleware.requireGlobalToken, function(req,
        res) {
        const bundleId = parseInt(req.params.id) || -1;
        if (bundleId === -1) {
            responseController.fail(res, 406,
                "Please include bundleId in request url /bundle/:bundleId");
            return;
        }




        var filesInclude = {};

        const stage = req.query.stage || null;

        if (stage !== null) {

            filesInclude = {
                model: db.files,
                as: 'files',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'bundleId']
                },
                where: {
                    [db.Sequelize.Op.and]: [{
                        [db.Sequelize.Op.or]: [{
                            stages: {
                                [db.Op.like]: '%' + JSON.parse(stage) + '%'
                            }
                        }]
                    }]
                }
            };
        } else {
            filesInclude = {
                model: db.files,
                as: 'files',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'bundleId']
                }
            };
        }

        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log("HELLO");
        console.log(filesInclude);
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();

        db.bundle.findOne({
                where: {
                    id: bundleId
                },
                include: [filesInclude]
            })
            .then(function(bundle) {
                responseController.success(
                    res,
                    200,
                    bundle
                );
            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });
    });


    app.get('/bundle/list/all', middleware.requireGlobalToken, async function(req, res) {
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
                        name: {
                            [db.Op.like]: '%' + keyword + '%'
                        }
                    }, {
                        description: {
                            [db.Op.like]: '%' + keyword + '%'
                        }
                    }, {
                        type: {
                            [db.Op.like]: '%' + keyword + '%'
                        }
                    }, {
                        price: {
                            [db.Op.like]: '%' + keyword + '%'
                        }
                    }]
                })
            }
            where = {
                [db.Sequelize.Op.and]: fullQuery
            }
        }


        db.bundle.findAndCountAll({
                where: where,
                limit: limit,
                offset: limit * page,
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(function(bundles) {
                responseController.success(
                    res,
                    200,
                    bundles
                );
            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });
    });

    app.post('/bundle/create', middleware.requireAdminAuthentication, function(
        req, res) {
        var body = underscore.pick(req.body, 'name', 'description', 'price',
            'type', 'cover_url');
        if (body === null || body === undefined || isEmpty(body)) {
            responseController.fail(res, 403,
                "Please send bundle name , description , price and type in request body"
            );
            return;
        }
        db.bundle.create(body)
            .then(function(bundle) {
                responseController.success(res, 201, bundle);
            })
            .catch(function(e) {
                responseController.fail(res, 403, e);
            })
    });


    app.patch('/bundle/:id', middleware.requireAdminAuthentication, function(
        req, res) {
        const bundleId = parseInt(req.params.id) || -1;
        if (bundleId === -1) {
            responseController.fail(res, 409,
                "Please include bundleId in request url /bundle/:bundleId");
            return;
        };
        var body = underscore.pick(req.body, 'name', 'description', 'price',
            'type', 'cover_url');
        if (body === null || body === undefined || isEmpty(body)) {
            responseController.fail(res, 403,
                "Please send bundle name , description , price and type in request body"
            );
            return;
        }
        db.bundle.update(body, {
                where: {
                    id: bundleId
                }
            })
            .then(function(bundle) {
                if (bundle) {
                    responseController.success(res, 201, "Bundle update successfully");
                } else {
                    responseController.fail(res, 403, "Failed to update bundle");
                }

            })
            .catch(function(e) {
                responseController.fail(res, 403, e);
            })
    });

    app.delete('/bundle/:id', middleware.requireGlobalToken, function(req, res) {
        const bundleId = parseInt(req.params.id) || -1;
        if (bundleId === -1) {
            responseController.fail(res, 409,
                "Please include bundleId in request url /bundle/:bundleId");
            return;
        };
        db.files.findAll({
                where: {
                    bundleId: bundleId
                }
            })
            .then(function(files) {
                var ids = [];
                files.forEach(function(file) {
                    ids.push(file.id);
                })
                db.files.destroy({
                        where: {
                            id: ids
                        }
                    })
                    .then(function(status) {
                        db.bundle.findOne({
                                where: {
                                    id: bundleId
                                }
                            })
                            .then(function(bundle) {
                                var bundleName = bundle.name.replace(' ', '_');
                                db.bundle.destroy({
                                        where: {
                                            id: bundleId
                                        }
                                    })
                                    .then(function(bundleDeleteStatus) {
                                        if (bundleDeleteStatus) {
                                            try {
                                                const sub_dir = diskDirectory + "/Bundles/" + bundleName;
                                                fs.removeSync(sub_dir);
                                            } catch (e) {
                                                responseController.fail(res, 409, {
                                                    message: "Bundle deleted successfully but failed to removes relevant files from the database",
                                                    error: e
                                                });
                                            } finally {
                                                responseController.success(
                                                    res,
                                                    200,
                                                    "Bundle and relevant files were removed successfully"
                                                );
                                            }
                                        } else {
                                            responseController.fail(res, 409,
                                                "Failed to delete the bundle");
                                        }
                                    });
                            });
                    });
            });
    });


    async function getUserMembershipLicenseStartDate(userId) {
        return new Promise(function(resolve, reject) {
            db.membership.findOne({
                    limit: 1,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    where: {
                        userId: userId
                    },
                    attributes: {
                        exclude: ['courseId', 'userId']
                    }
                })
                .then(function(memberships) {
                    let d = memberships.license_creation_date;
                    if (d === null || d === 'null' || d === undefined || d === '') {
                        resolve(null);
                    }
                    try {
                        let start = new Date(d.substring(0, d.indexOf('-') - 1));
                        start.setHours(0, 0, 0, 0);
                        let end = new Date(d.substring(d.indexOf('-') + 2, d.length));
                        end.setHours(0, 0, 0, 0);
                        resolve({
                            start: start,
                            end: end
                        })
                    } catch (error) {
                        resolve(null)
                    }
                });
        });
    }

    app.get('/user/ce/list/all', middleware.requireAuthentication, function(req,
        res) {

        db.user.findOne({
                where: {
                    id: req.user.id
                },
                include: [{
                    model: db.bundle,
                    as: 'bundles',
                    through: {
                        attributes: []
                    },
                    include: [{
                        model: db.files,
                        as: 'files',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'bundleId']
                        }
                    }]
                }]
            })
            .then(async function(user) {
                let dates = await getUserMembershipLicenseStartDate(user.id);


                var where = {
                    id: {
                        [db.Op.ne]: 1
                    }
                };


                if (req.user && req.user.type == 'legacy') {
                    where.createdAt = {
                        [db.Op.lt]: dates.start
                    };
                } else if (req.user && req.user.type == 'new') {
                    where.createdAt = {
                        [db.Sequelize.Op.between]: [
                            dates.start,
                            dates.end
                        ]
                    };
                }



                db.bundle.findAll({
                        where: where,
                        order: [
                            ['createdAt', 'DESC']
                        ]
                    })
                    .then(function(allBundles) {
                        var returnables = [];
                        if (user.bundles.length <= 0 && allBundles.length <= 0) {
                            returnables = []
                            console.log("BOTH USER AND ALL BUNDLES ARE EMPTY");
                        } else if (user.bundles.length <= 0 && allBundles.length > 0) {
                            returnables = allBundles
                            console.log("USER BUNDLES ARE EMPTY BUT ALL BUNDLES ARE NOT EMPTY");
                        } else if (user.bundles.length > 0 && allBundles.length <= 0) {
                            returnables = user.bundles
                            console.log("USER BUNDLES ARE NOT EMPTY BUT ALL BUNDLES ARE EMPTY");
                        } else {
                            console.log("BOTH USER BUNDLES AND ALL BUNDLES ARE NOT EMPTY");
                            // APPEND ALL BUNDLES
                            returnables = allBundles;
                            // REMOVE USER BUNDELS FOR ALL BUNDLES BY ID
                            user.bundles.forEach(function(userBundle) {
                                let index = returnables.findIndex(function(i) {
                                    return i.id === userBundle.id;
                                });
                                console.log("index = ", index);
                                if (index > -1) {
                                    returnables.splice(returnables.findIndex(function(i) {
                                        return i.id === userBundle.id;
                                    }), 1);
                                }
                            });
                            // APPEND USER BUNDLES TO FILTERED ALL BUNDLE
                            returnables.push.apply(returnables, user.bundles);
                        }

                        returnables.sort(function(a, b) {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        });
                        responseController.success(
                            res,
                            200,
                            returnables
                        );
                    })






            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });

    });


    app.get('/ce/store/list/all', middleware.requireAuthentication, async function(
        req,
        res) {


        let dates = await getUserMembershipLicenseStartDate(req.user.id);

        var where = {
            id: {
                [db.Op.ne]: 1
            }
        }

        if (req.user && req.user.type == 'legacy') {
            where.createdAt = {
                [db.Sequelize.Op.and]: [{
                    [db.Sequelize.Op.notBetween]: [
                        dates.start,
                        dates.end
                    ],
                    [db.Op.gt]: dates.end
                }]

            };
        } else if (req.user && req.user.type == 'new') {
            where.createdAt = {
                [db.Sequelize.Op.notBetween]: [
                    dates.start,
                    dates.end
                ]
            };
        }

        db.bundle.findAll({
                where: where,
                include: [{
                    model: db.files,
                    as: 'files',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'bundleId']
                    }
                }]
            })
            .then(function(bundles) {

                db.user_bundles.findAll({
                        where: {
                            userId: req.user.id
                        }
                    })
                    .then(function(userData) {


                        var existingBundles = [];
                        userData.forEach(function(userObj) {
                            bundles.forEach(function(bundle) {
                                if (bundle.id === userObj.bundleId) {
                                    existingBundles.push(bundle);
                                }
                            })
                        });

                        bundles = bundles.filter(val => !existingBundles.includes(val));


                        bundles.sort(function(a, b) {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        });
                        responseController.success(res, 200, bundles)


                    })


            })
            .catch(function(e) {
                console.log(e);
                responseController.fail(res, 406, e);
            });

    });

    app.post('/user/add/bundle/:id', middleware.requireAuthentication, function(
        req, res) {
        var id = parseInt(req.params.id);
        if (id === undefined || id === null || id <= 0) {
            responseController.fail(res, 403, "Please provide a valid bundle ID");
            return;
        }

        const body = req.body || null;
        if (body === null) {
            responseController.fail(res, 404,
                "Please provide out_trade_no and price in request body");
            return;
        }
        const out_trade_no = body.out_trade_no || null;
        if (out_trade_no === null) {
            responseController.fail(res, 404,
                "Please provide out_trade_no in request body");
            return;
        }
        const price = body.price || null;
        if (price === null) {
            responseController.fail(res, 404, "Please provide price in request body");
            return;
        }


        db.user_bundles.findOne({
                where: {
                    userId: req.user.id,
                    bundleId: id
                }
            })
            .then(function(bundle) {
                if (bundle) {
                    responseController.fail(res, 403, "User already bought this bundle");
                    return;
                }
                db.user_bundles.create({
                        userId: req.user.id,
                        bundleId: id,
                        out_trade_no: out_trade_no,
                        price: price
                    })
                    .then(function(response) {
                        responseController.success(res, 200, response);
                    })
            })

    })


};