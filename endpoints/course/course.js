function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

const json2xls = require('json2xls');
const fs = require('fs-extra');
const diskDirectory = './disk';
const path = require('path');

module.exports = function(app, middleware, db, underscore, responseController) {

    app.post('/course/create', middleware.requireAdminAuthentication, function(
        req, res) {
        var body = underscore.pick(req.body, 'name', 'start', 'end', 'price',
            'seats', 'license_fee', 'venue', 'welcome_doc_url', 'last_signup_date');
        if (isEmpty(body) || body.length < 6) {
            responseController.fail(res, 403,
                "Please provide course name , start , end , seats , price , welcome_doc_url, last_signup_date , venue and licnese_fee in reqest body"
            );
            return;
        }
        body.available_seats = body.seats;
        db.course.create(body)
            .then(function(course) {
                responseController.success(res, 201, course)
            })
            .catch(function(err) {
                responseController.fail(res, 406, err);
            })
    });

    app.get('/course/legacy', function(req, res) {
        db.course.findOne({
                where: {
                    name: {
                        [db.Op.like]: '%legacy%'
                    }
                }
            })
            .then(function(course) {
                responseController.success(
                    res,
                    200,
                    course
                );
            })
            .catch(function(e) {
                console.log(e);
                responseController.fail(res, 406, e);
            });
    })

    app.get('/course/list/all', middleware.requireGlobalToken, function(req, res) {
        var limit = parseInt(req.query.limit) || 10;
        var page = parseInt(req.query.page) || 0;
        if (page >= 1) {
            page = page - 1;
        }
        var where = {};
        if (!isEmpty(req.query)) {
            var fullQuery = [];
            const name = req.query.name || null;
            if (name !== null) {
                fullQuery.push({
                    [db.Sequelize.Op.or]: [{
                        name: {
                            [db.Op.like]: '%' + name + '%'
                        }
                    }]
                });
            }

            const after = req.query.after || null;

            const start = req.query.start || null;
            const end = req.query.end || null;

            if (after !== null) {
                fullQuery.push({
                    [db.Op.or]: [{
                        start: {
                            [db.Op.gte]: new Date(after)
                        }
                    }]
                });
            }

            if (after === null && start !== null && end !== null) {
                fullQuery.push({
                    [db.Op.or]: [{
                        start: {
                            [db.Op.between]: [new Date(start), new Date(end)]
                        }
                    }, {
                        end: {
                            [db.Op.between]: [new Date(start), new Date(end)]
                        }
                    }]
                });
            }

            where = {
                [db.Sequelize.Op.and]: fullQuery
            }

            const price = req.query.price || null;
            if (price !== null) {
                where.price = price;
            }
        }


        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log(where);
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        db.course.findAndCountAll({
                limit: limit,
                offset: limit * page,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: db.membership,
                    as: 'memberships'
                }],
            })
            .then(function(courses) {
                console.log(courses);
                var parsedCourses = [];
                courses.rows.forEach(element => {
                    var item = {
                        id : element.id,
                        name : element.name,
                        start : element.start,
                        end : element.end,
                        last_signup_date : element.last_signup_date,
                        price : element.price,
                        seats : element.seats,
                        available_seats : element.seats - element.memberships.length || 0,
                        license_fee : element.license_fee,
                        venue : element.venue,
                        memberships : element.memberships,
                        welcome_doc_url : element.welcome_doc_url
                    };
                    parsedCourses.push(item);
                });
                responseController.success(
                    res,
                    200,
                    {
                        count : courses.count,
                        rows : parsedCourses
                    }
                );
            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });
    });

    app.get('/course/:id', function(req, res) {
        var id = parseInt(req.params.id);
        if (id === undefined || id === null || id <= 0) {
            responseController.fail(res, 403, "Please provide a valid course ID");
            return;
        }
        db.course.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: db.membership,
                    as: 'memberships',
                    include: [{
                        model: db.user,
                        as: 'user',
                        attributes: {
                            exclude: ['session_key', 'token', 'tokenHash', 'password']
                        }
                    }]
                }],
            })
            .then(function(course) {
                responseController.success(
                    res,
                    200,
                    course
                );
            })
            .catch(function(e) {
                console.log(e);
                responseController.fail(res, 406, e);
            });
    });

    app.delete('/course/:id', middleware.requireAdminAuthentication, function(req,
        res) {
        var id = parseInt(req.params.id);
        if (id === undefined || id === null || id <= 0) {
            responseController.fail(res, 403, "Please provide a valid course ID");
            return;
        }
        db.course.destroy({
                where: {
                    id: id
                }
            })
            .then(function(response) {
                responseController.success(
                    res,
                    200,
                    "Course deleted successfully"
                );
            })
            .catch(function(err) {
                responseController.fail(res, 406, err);
            })
    });


    app.patch('/course/:id', middleware.requireAdminAuthentication, function(req,
        res) {
        var id = parseInt(req.params.id);
        if (id === undefined || id === null || id <= 0) {
            responseController.fail(res, 403, "Please provide a valid course ID");
            return;
        }
        var body = underscore.pick(req.body, 'name', 'start', 'end', 'price',
            'seats', 'license_fee', 'venue', 'welcome_doc_url', 'last_signup_date');
        if (isEmpty(body)) {
            responseController.fail(res, 403,
                "Please provide course name , start , end , seats , price ,venue, welcome_doc_url , last_signup_date & license_fee in reqest body"
            );
            return;
        }
        db.course.update(body, {
                where: {
                    id: id
                }
            })
            .then(function(response) {
                responseController.success(
                    res,
                    200,
                    "Course updated successfully"
                );
            })
            .catch(function(err) {
                responseController.fail(res, 406, err);
            });

    });

    app.get('/course/:id/report', middleware.requireAdminAuthentication, function(
        req, res) {

        var id = parseInt(req.params.id);
        if (id === undefined || id === null || id <= 0) {
            responseController.fail(res, 403, "Please provide a valid course ID");
            return;
        }

        db.course.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: db.membership,
                    as: 'memberships',
                    include: [{
                        model: db.user,
                        as: 'user',
                        attributes: {
                            exclude: ['session_key', 'token', 'tokenHash', 'password']
                        }
                    }]
                }]
            })
            .then(function(course) {
                if (course === null || course === undefined || isEmpty(course)) {
                    responseController.fail(res, 404,
                        "Course not found"
                    );
                    return
                }

                const memberships = course.memberships;
                var jsonArray = [];

                memberships.forEach(function(membership) {
                    var tempArry = {
                        'First Name': membership.user.first_name,
                        'Family Name ': membership.user.last_name,
                        'Nickname/English Name': membership.user.nickname,
                        'Name on Certificate': membership.user.certificate_name,
                        'Gender': membership.user.gender,
                        'Email': membership.user.email,
                        'Phone': membership.user.phone,
                        'Wechat ID': membership.user.wechat_id,
                        'Training Status': membership.status.replaceAll("-", ' ').toUpperCase(),
                        'City': membership.user.city,
                        'Studio Name': membership.user.studio_name,
                        'Studio Manager Name': membership.user.studio_manager_name,
                        'Nationality': membership.user.nationality,
                        'Occupation': membership.user.occupation,
                        'Training Top Size': membership.user.top_size,
                        'Training Sock Size': membership.user.sock_size,
                        'Manual Language': membership.user.manual_lang,
                    }
                    jsonArray.push(tempArry);
                });

                jsonArray.sort(function(a, b) {
                    return parseFloat(b.ColoumnName4) - parseFloat(a.ColoumnName4);
                });

                res.xls('data.xlsx', jsonArray);
            })

    });


};


Array.prototype.diff = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for (var i = 0; i < this.length; i += 1) {
        if (arr2.indexOf(this[i]) > -1) {
            ret.push(this[i]);
        }
    }
    return ret;
};