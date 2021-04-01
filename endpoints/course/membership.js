const fs = require("fs-extra");
const diskDirectory = "./disk";
const path = require("path");

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}

module.exports = function(
    app,
    middleware,
    db,
    underscore,
    responseController,
    rootDir
) {
    app.post(
        "/user/:userId/membership/change/to/course/:id",
        middleware.requireAdminAuthentication,
        function(req, res) {
            var userId = parseInt(req.params.userId);
            if (userId === undefined || userId === null || userId <= 0) {
                responseController.fail(res, 403, "Please provide a valid user ID");
                return;
            }

            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(res, 403, "Please provide a valid course ID");
                return;
            }

            db.user
                .findOne({
                    where: {
                        id: userId,
                    },
                    include: [{
                        model: db.membership,
                        as: "memberships",
                        include: [{
                            model: db.files,
                            as: "training_videos",
                            attributes: {
                                exclude: ["bundleId", "membershipId", "updatedAt"],
                            },
                        }, ],
                    }, ],
                })
                .then(function(user) {
                    if (!user.memberships[0]) {
                        responseController.fail(
                            res,
                            406,
                            "No membership for this user wass found"
                        );
                        return;
                    }
                    var oneYearFromNow = new Date();
                    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                    db.membership
                        .create({
                            courseId: id,
                            out_trade_no: user.memberships[0].out_trade_no,
                            start: new Date(),
                            end: oneYearFromNow,
                            price: user.memberships[0].price,
                            status: "pre-instructor",
                            userId: userId,
                        })
                        .then(function(newMembership) {
                            responseController.success(res, 200, newMembership);

                            db.membership
                                .destroy({
                                    where: {
                                        id: user.memberships[0].id,
                                    },
                                })
                                .then(function(delStat) {
                                    try {
                                        var path =
                                            rootDir +
                                            "/disk/TrainingVideos/" +
                                            String(user.memberships[0].id);
                                        console.log("");
                                        console.log("");
                                        console.log("");
                                        console.log("PATH = ", path);
                                        console.log("");
                                        console.log("");
                                        fs.removeSync(path);
                                        console.log("File deleted");
                                    } catch (e) {
                                        console.log("FIle delete error");
                                        console.log(e);
                                    }

                                    console.log(delStat);
                                });
                        });
                });
        }
    );

    app.post("/membership/create", middleware.requireAuthentication, function(
        req,
        res
    ) {
        var body = underscore.pick(
            req.body,
            "courseId",
            "out_trade_no",
            "price",
            "couponId"
        );
        if (isEmpty(body)) {
            responseController.fail(
                res,
                403,
                "Please provide courseId , out_trade_no(optional) , price , couponId(optional) in request body"
            );
            return;
        }

        if (!body.courseId) {
            db.membership
                .create({
                    start: '',
                    end: '',
                    price: body.price,
                    out_trade_no: body.out_trade_no,
                    status: "licensed-instructor",
                    userId: req.user.id,
                    couponId: body.couponId,
                })
                .then(function(membership) {
                    responseController.success(res, 200, membership);

                    if (body.couponId) {
                        db.user_coupons
                            .create({
                                couponId: body.couponId,
                                userId: req.user.id,
                            })
                            .then(function(couponresponse) {
                                console.log("USER COUPON RECORD RESULT");
                                console.log(couponresponse);
                            })
                            .catch(function(couponErr) {
                                console.log("USER COUPON RECORD ERROR");
                                console.log(couponErr);
                            });
                    }
                })
                .catch(function(membershipError) {
                    responseController.fail(res, 406, membershipError);
                });
        } else {
            db.course
                .findOne({
                    where: {
                        id: body.courseId,
                    },
                })
                .then(function(course) {
                    if (course === undefined || course === null || !course) {
                        responseController.fail(res, 404, "Course not found");
                        return;
                    }

                    var oneYearFromNow = new Date();
                    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

                    db.membership
                        .create({
                            start: new Date(),
                            end: oneYearFromNow,
                            price: body.price,
                            out_trade_no: body.out_trade_no,
                            status: "pre-instructor",
                            userId: req.user.id,
                            courseId: course.id,
                            couponId: body.couponId,
                        })
                        .then(function(membership) {
                            responseController.success(res, 200, membership);

                            if (body.couponId) {
                                db.user_coupons
                                    .create({
                                        couponId: body.couponId,
                                        userId: req.user.id,
                                    })
                                    .then(function(couponresponse) {
                                        console.log("USER COUPON RECORD RESULT");
                                        console.log(couponresponse);
                                    })
                                    .catch(function(couponErr) {
                                        console.log("USER COUPON RECORD ERROR");
                                        console.log(couponErr);
                                    });
                            }
                        })
                        .catch(function(membershipError) {
                            responseController.fail(res, 406, membershipError);
                        });
                })
                .catch(function(courseErr) {
                    responseController.fail(res, 406, courseErr);
                });
        }


    });

    app.get("/user/my/membership", middleware.requireAuthentication, function(
        req,
        res
    ) {
        db.membership
            .findOne({
                limit: 1,
                order: [
                    ["createdAt", "DESC"]
                ],
                where: {
                    userId: req.user.id,
                },
                attributes: {
                    exclude: ["courseId", "userId"],
                },
                include: [{
                        model: db.course,
                        as: "course",
                    },
                    {
                        model: db.files,
                        as: "training_videos",
                        attributes: {
                            exclude: ["bundleId", "membershipId", "updatedAt"],
                        },
                    },
                ],
            })
            .then(function(memberships) {
                responseController.success(res, 200, memberships);
            });
    });

    app.get(
        "/user/:id/memberships",
        middleware.requireAdminAuthentication,
        function(req, res) {
            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(res, 403, "Please provide a valid user ID");
                return;
            }

            db.membership
                .findAll({
                    where: {
                        userId: id,
                    },
                    order: [
                        ["createdAt", "DESC"]
                    ],
                    attributes: {
                        exclude: ["courseId", "userId"],
                    },
                    include: [{
                            model: db.course,
                            as: "course",
                        },
                        {
                            model: db.files,
                            as: "training_videos",
                            attributes: {
                                exclude: ["bundleId", "membershipId", "updatedAt"],
                            },
                        },
                    ],
                })
                .then(function(memberships) {
                    responseController.success(res, 200, memberships);
                });
        }
    );

    app.get("/memberships/:id", middleware.requireAdminAuthentication, function(
        req,
        res
    ) {
        var id = parseInt(req.params.id);
        if (id === undefined || id === null || id <= 0) {
            responseController.fail(res, 403, "Please provide a valid membership ID");
            return;
        }

        db.membership
            .findOne({
                where: {
                    id: id,
                },
                attributes: {
                    exclude: ["courseId", "userId"],
                },
                include: [{
                        model: db.user,
                        as: "user",
                    },
                    {
                        model: db.course,
                        as: "course",
                    },
                    {
                        model: db.files,
                        as: "training_videos",
                        attributes: {
                            exclude: ["bundleId", "membershipId", "updatedAt"],
                        },
                    },
                    {
                        model: db.coupons,
                        as: "coupon",
                    },
                ],
            })
            .then(function(membership) {
                responseController.success(res, 200, membership);
            });
    });

    app.post(
        "/user/course/:id/checkin",
        middleware.requireAuthentication,
        function(req, res) {
            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(res, 403, "Please provide a valid course ID");
                return;
            }
            db.membership
                .findOne({
                    where: {
                        userId: req.user.id,
                        courseId: id,
                    },
                })
                .then(function(membership) {
                    if (membership === undefined || membership === null || !membership) {
                        responseController.fail(
                            res,
                            404,
                            "No course membership found for the user"
                        );
                        return;
                    }
                    const status = membership.status;

                    // const statuses = [
                    // 	'pre-instructor', // MEANS USER PAIDED AND SIGNED UP
                    // 	'pre-instructor-tbc', //USER DID NOT ATTEND TRAINING CLASSES
                    // 	'instructor-in-training', // USER ATTENDED THE TRAINING CLASSES
                    // 	'training-videos-submitted', // USER SUBMITTED TRAINING VIDEOS AFTER TRAINING CLASSES
                    // 	'exam-passed', // SUBMITTED TRAINING VIDEOS PASSED
                    // 	'exam-failed', // SUBMITTED TRAINING VIDEOS FAILED
                    // 	'licensed-fee-paid', // USER PASSED THE EXAM AND PAID THE LICENSE FEE
                    // 	'licensed-instructor' // USER PASSED THE EXAM AND PAID THE LICENSE FEE
                    // ];

                    if (status !== "pre-instructor") {
                        responseController.fail(
                            res,
                            403,
                            "User has already checked in for the courses training"
                        );
                        return;
                    }
                    db.membership
                        .update({
                            status: "instructor-in-training",
                        }, {
                            where: {
                                id: membership.id,
                            },
                        })
                        .then(function(updateStatus) {
                            responseController.success(res, 200, "Check in successful");
                        })
                        .catch(function(updateErr) {
                            responseController.fail(res, 403, updateErr);
                        });
                })
                .catch(function(err) {});
        }
    );

    app.post(
        "/user/membership/:id/exam/:result",
        middleware.requireAdminAuthentication,
        function(req, res) {
            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a valid membership ID"
                );
                return;
            }

            var result = req.params.result || "";
            if (
                result === undefined ||
                result === null ||
                result === "" ||
                (result !== "pass" && result !== "fail")
            ) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a valid exam result type. Valid types are pass and fail"
                );
                return;
            }

            db.membership
                .update({
                    status: result === "pass" ? "exam-passed" : "exam-failed",
                }, {
                    where: {
                        id: id,
                    },
                })
                .then(function(updateResult) {
                    responseController.success(res, 200, "Membership status updated");
                })
                .catch(function(updateErr) {
                    responseController.fail(res, 403, String(updateErr));
                });
        }
    );

    app.post(
        "/user/membership/:id/add/license/out_trade_no",
        middleware.requireAuthentication,
        function(req, res) {
            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a valid membership ID"
                );
                return;
            }
            var out_trade_no = req.body.out_trade_no || null;
            if (out_trade_no === null) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a license out_trade_no in request body"
                );
                return;
            }

            db.membership
                .findOne({
                    where: {
                        id: id,
                    },
                    include: [{
                        model: db.course,
                        as: "course",
                    }, ],
                })
                .then(function(mbrshp) {
                    const price = mbrshp.course.license_fee || 0;

                    db.membership
                        .update({
                            license_out_trade_no: out_trade_no,
                            status: "license-fee-paid",
                            license_fee: price,
                        }, {
                            where: {
                                id: id,
                            },
                        })
                        .then(function(response) {
                            responseController.success(res, 200, "Membership updated");
                        })
                        .catch(function(updateErr) {
                            responseController.fail(res, 403, String(updateErr));
                        });
                })
                .catch(function(updateErr) {
                    responseController.fail(res, 403, String(updateErr));
                });
        }
    );

    app.patch(
        "/user/membership/:id/extend/submission",
        middleware.requireAdminAuthentication,
        function(req, res) {
            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a valid membership ID"
                );
                return;
            }
            var date = req.query.date || null;
            console.log("new date = ", date);
            if (date === undefined || date === null) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a valid date in format YYYY-MM-DD"
                );
                return;
            }
            db.membership
                .update({
                    video_submission_date: new Date(date),
                }, {
                    where: {
                        id: id,
                    },
                })
                .then(function(updateResult) {
                    console.log("updateResult");
                    console.log(updateResult);
                    responseController.success(res, 200, "Video submission date updated");
                })
                .catch(function(updateErr) {
                    responseController.fail(res, 403, String(updateErr));
                });
        }
    );

    app.post(
        "/user/membership/:id/update",
        middleware.requireAdminAuthentication,
        function(req, res) {
            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a valid membership ID"
                );
                return;
            }
            var status = req.query.status || null;
            if (status === undefined || status === null) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a membership status in the url"
                );
                return;
            }

            var validStatuses = [
                "temporary-freeze",
                "pre-instructor", // MEANS USER PAIDED AND SIGNED UP
                "pre-instructor-tbc", //USER DID NOT ATTEND TRAINING CLASSES
                "instructor-in-training", // USER ATTENDED THE TRAINING CLASSES
                "training-videos-submitted", // USER SUBMITTED TRAINING VIDEOS AFTER TRAINING CLASSES
                "exam-passed", // SUBMITTED TRAINING VIDEOS PASSED
                "exam-failed", // SUBMITTED TRAINING VIDEOS FAILED
                "license-fee-paid",
                "licensed-instructor", // USER PASSED THE EXAM AND PAID THE LICENSE FEE
            ];
            if (!validStatuses.includes(status)) {
                responseController.fail(res, 403, {
                    message: "Please provide a valid status",
                    valid_statuses: validStatuses,
                });
                return;
            }

            db.membership
                .update({
                    status: status,
                }, {
                    where: {
                        id: id,
                    },
                })
                .then(function(updateStatus) {
                    responseController.success(res, 200, "Membership status updated");
                    if (status === "licensed-instructor") {
                        db.membership
                            .update({
                                license_creation_date: new Date(),
                            }, {
                                where: {
                                    id: id,
                                },
                            })
                            .then(function(upstat) {
                                console.log("updated license creation date");
                                console.log(upstat);
                            })
                            .catch(function(e) {
                                console.log("update license creation date error");
                                console.log(e);
                            });
                    }
                })
                .catch(function(updateErr) {
                    responseController.fail(res, 403, updateErr);
                });
        }
    );

    app.post(
        "/user/membership/:id/update/certificate_url",
        middleware.requireAdminAuthentication,
        function(req, res) {
            var id = parseInt(req.params.id);
            if (id === undefined || id === null || id <= 0) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a valid membership ID"
                );
                return;
            }
            var url = req.body.certificate_url || null;
            if (url === null) {
                responseController.fail(
                    res,
                    403,
                    "Please provide a certificate_url in request body"
                );
                return;
            }
            db.membership
                .update({
                    certificate_url: url,
                }, {
                    where: {
                        id: id,
                    },
                })
                .then(function(updateStatus) {
                    responseController.success(
                        res,
                        200,
                        "Certificate url updated successfully"
                    );
                })
                .catch(function(updateErr) {
                    responseController.fail(res, 403, updateErr);
                });
        }
    );

    app.post("/user/license/renew", middleware.requireAuthentication, function(
        req,
        res
    ) {
        var body = underscore.pick(req.body, "amount", "out_trade_no");
        if (isEmpty(body)) {
            responseController.fail(
                res,
                403,
                "Please provide out_trade_no and amount in request body"
            );
            return;
        }

        db.membership.findOne({
                where: {
                    userId: req.user.id
                }
            })
            .then(function(membership) {

                let courseId = membership.courseId;
                let userId = membership.userId;
                let membershipId = membership.id;

                // CURRENT LICNESE TIME LINE
                let d = membership.license_creation_date;
                let end_string = d.substring(d.indexOf('-') + 2, d.length);

                let new_start = new Date(end_string);
                let new_end = new Date(new_start.getFullYear() + 1, new_start.getMonth(), new_start.getDate());

                db.license_renewals.create({
                        out_trade_no: body.out_trade_no,
                        amount: body.amount,
                        courseId: courseId,
                        userId: userId,
                        membershipId: membershipId,
                        start: new_start,
                        end: new_end
                    })
                    .then(function(newLicense) {
                        db.membership.update({
                                license_creation_date: new_start
                            }, {
                                where: {
                                    id: membership.id
                                }
                            })
                            .then(function(membershipUpdate) {
                                res.json({
                                    newLicense: newLicense,
                                    membershipUpdate: membershipUpdate
                                })
                            })
                            .catch(function(updateErr) {
                                responseController.fail(res, 403, updateErr);
                            });
                    });
            })
            .catch(function(updateErr) {
                responseController.fail(res, 403, updateErr);
            });


    });
};