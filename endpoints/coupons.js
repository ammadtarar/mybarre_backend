function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

module.exports = function(app, middleware, db, underscore, responseController) {

    app.post('/coupon/create', middleware.requireAdminAuthentication, function(
        req, res) {

        var body = underscore.pick(req.body, 'name', 'type', 'value', 'code',
            'use_count');
        if (body === null || body === undefined || isEmpty(body)) {
            responseController.fail(res, 403,
                "Please send coupon name , code , use_count ,type and value in request body"
            );
            return;
        }

        db.coupons.create(body)
            .then(function(coupon) {
                responseController.success(res, 200, coupon)
            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });
    });

    app.get('/coupon/:id', middleware.requireAdminAuthentication, function(req,
        res) {
        const couponId = parseInt(req.params.id) || -1;
        if (couponId === -1) {
            responseController.fail(res, 406,
                "Please include couponId in request url /coupon/:couponId");
            return;
        }

        db.coupons.findOne({
                where: {
                    id: couponId
                },
                include: [{
                    model: db.user,
                    as: 'users',
                    include: [{
                        model: db.membership,
                        as: 'memberships',
                        include: [{
                            model: db.course,
                            as: 'course'
                        }]
                    }]
                }]
            })
            .then(function(coupon) {
                if (coupon === null || coupon === undefined) {
                    responseController.fail(res, 404, "Coupon not found");
                    return;
                }
                responseController.success(res, 200, coupon)
            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });

    });


    app.get('/coupon/list/all', middleware.requireAdminAuthentication, function(
        req, res) {
        var limit = parseInt(req.query.limit) || 10;
        var page = parseInt(req.query.page) || 0;
        if (page >= 1) {
            page = page - 1;
        }


        var where = {};

        const name = req.query.name || null;
        if (name !== null) {
            where.name = {
                [db.Op.like]: '%' + name + '%'
            }
        }

        const value = req.query.value || null;
        if (value !== null) {
            where.value = value;
        }

        const type = req.query.type || null;
        if (type !== null) {
            where.type = type;
        }

        const code = req.query.code || null;
        if (code !== null) {
            where.code = {
                [db.Op.like]: '%' + code + '%'
            }
        }

        db.coupons.findAndCountAll({
                where: where,
                limit: limit,
                offset: limit * page,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: db.user,
                    as: 'users',
                    include: [{
                        model: db.membership,
                        as: 'memberships',
                        include: [{
                            model: db.course,
                            as: 'course'
                        }]
                    }]
                }]
            })
            .then(function(coupons) {
                responseController.success(res, 200, coupons)
            })
            .catch(function(e) {
                console.log(e);
                responseController.fail(res, 406, e);
            });
    })

    app.delete('/coupon/:id', middleware.requireAdminAuthentication, function(req,
        res) {
        const couponId = parseInt(req.params.id) || -1;
        if (couponId === -1) {
            responseController.fail(res, 406,
                "Please include couponId in request url /coupon/:couponId");
            return;
        }
        db.coupons.destroy({
                where: {
                    id: couponId
                }
            })
            .then(function(coupons) {
                responseController.success(res, 200, 'Coupon deleted successfully')
            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });
    });

    app.get('/coupon/:id/users/list/report', middleware.requireAdminAuthentication,
        function(
            req, res) {

            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(res, 403, "Please provide a valid coupon ID");
                return;
            }

            db.coupons.findOne({
                    where: {
                        id: id
                    },
                    include: [{
                        model: db.user,
                        as: 'users',
                        attributes: {
                            exclude: ['session_key', 'token', 'tokenHash', 'password']
                        }
                    }]
                })
                .then(function(course) {
                    if (course === null || course === undefined || isEmpty(course)) {
                        responseController.fail(res, 404,
                            "Coupon not found"
                        );
                        return
                    }

                    const users = course.users;
                    var jsonArray = [];

                    users.forEach(function(user) {
                        var tempArry = {
                            'First Name': user.first_name,
                            'Family Name ': user.last_name,
                            'Nickname/English Name': user.nickname,
                            'Gender': user.gender,
                            'Email': user.email,
                            'Phone': user.phone,
                            'Wechat ID': user.wechat_id,
                            'City': user.city,
                            'Studio Name': user.studio_name,
                            'Studio Manager Name': user.studio_manager_name
                        }
                        jsonArray.push(tempArry);
                    });

                    jsonArray.sort(function(a, b) {
                        return parseFloat(b.ColoumnName4) - parseFloat(a.ColoumnName4);
                    });

                    res.xls('data.xlsx', jsonArray);
                })

        });


    app.post('/coupon/check', middleware.requireAuthentication, function(req,
        res) {

        var code = req.query.code;
        if (code === undefined || code === null || code === '') {
            responseController.fail(res, 403, "Please provide a valid coupon code");
            return;
        }

        db.coupons.findOne({
                where: {
                    code: code
                }
            })
            .then(function(coupon) {;
                if (!coupon) {
                    responseController.fail(res, 404, "Invalid code. Coupon not found");
                    return;
                }

                db.user_coupons.findOne({
                        where: {
                            userId: req.user.id,
                            couponId: coupon.id
                        }
                    })
                    .then(function(record) {

                        if (record) {
                            responseController.fail(res, 409, "Coupon already used");
                            return
                        }

                        db.user_coupons.count({
                                where: {
                                    couponId: coupon.id
                                }
                            })
                            .then(function(exisingUseCount) {
                                if (exisingUseCount >= coupon.use_count) {
                                    responseController.fail(res, 402, "Coupon already expired");
                                } else {
                                    responseController.fail(res, 200, coupon);
                                }
                            })
                    });
            })
            .catch(function(e) {
                console.log("Erro");
                console.log(e);
                responseController.fail(res, 404, "Invalid code. Coupon not found");
            });

    });


};