function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

module.exports = function(app, middleware, db, underscore, responseController) {

    app.get('/store/products/list/all', middleware.requireGlobalToken, async function(
        req, res) {
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

        if (req.query.status) {
            where.status = req.query.status;
        }


        db.product.findAndCountAll({
                where: where,
                limit: limit,
                offset: limit * page,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: db.color,
                    as: 'colors',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    }
                }, {
                    model: db.size,
                    as: 'sizes',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    }
                }]
            })
            .then(function(products) {
                responseController.success(
                    res,
                    200,
                    products
                );
            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });
    });

    app.get('/store/product/:id', middleware.requireGlobalToken, function(req,
        res) {
        const id = parseInt(req.params.id) || -1;
        if (id === -1) {
            responseController.fail(res, 409,
                "Please include productId in request url /store/product/:productId");
            return;
        }
        db.product.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: db.color,
                    as: 'colors',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    }
                }, {
                    model: db.size,
                    as: 'sizes',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: {
                        attributes: []
                    }
                }]
            })
            .then(function(product) {
                responseController.success(
                    res,
                    200,
                    product
                );
            })
            .catch(function(e) {
                responseController.fail(res, 406, e);
            });
    });

    app.post('/store/product/create', middleware.requireAdminAuthentication,
        async function(req, res) {
            var body = underscore.pick(req.body, 'name', 'description', 'price',
                'count', 'thumbnail_url', 'colors', 'sizes');
            if (body === null || body === undefined || isEmpty(body)) {
                responseController.fail(res, 403,
                    "Please send product's name , description , price , colors , sizes , thumbnail_url and count in request body"
                );
                return;
            }
            db.product.create(body)
                .then(async function(product) {

                    await addColorsToProduct(product.id, body.colors);
                    await addSizesToProduct(product.id, body.sizes)

                    responseController.success(res, 201, product);
                })
                .catch(function(e) {
                    console.log(e);
                    responseController.fail(res, 403, e);
                })
        });


    async function removeOldColorsForProduct(colors) {
        return new Promise(function(resolve, reject) {
            if (colors.length <= 0) {
                resolve();
            }
            var colorsIds = [];
            colors.forEach(function(color) {
                colorsIds.push(color.id)
            })
            Promise.all([
                    db.color.destroy({ where: { id: colorsIds } }),
                    db.product_colors.destroy({ where: { colorId: colorsIds } })
                ])
                .then(function(res) {
                    resolve()
                })
                .catch(function(e) {
                    console.log(e);
                    resject(e)
                })
        });
    }


    async function removeOldSizesForProduct(sizes) {
        return new Promise(function(resolve, reject) {
            if (sizes.length <= 0) {
                resolve();
            }
            var sizesIds = [];
            sizes.forEach(function(size) {
                sizesIds.push(size.id)
            })
            Promise.all([
                    db.size.destroy({ where: { id: sizesIds } }),
                    db.product_sizes.destroy({ where: { sizeId: sizesIds } })
                ])
                .then(function(res) {
                    resolve()
                })
                .catch(function(e) {
                    console.log(e);
                    resject(e)
                })
        });
    }


    async function addColorsToProduct(productId, colors) {
        return new Promise(function(resolve, reject) {
            if (productId < -1) {
                reject();
            }

            if (colors === undefined || colors === null || colors.length < 1) {
                reject();
            }

            var updated = [];
            colors.forEach((item, i) => {
                if (item.id === undefined || item.id < 1) {
                    updated.push({
                        name_en: item.name_en,
                        name_zh: item.name_zh
                    })
                }
            });



            db.color.bulkCreate(updated, {
                    fields: ["name_en", "name_zh"],
                    updateOnDuplicate: ["name_en", "name_zh"]
                })
                .then(function(createdColors) {

                    console.log(createdColors);


                    var items = [];
                    createdColors.forEach((item, i) => {
                        items.push({
                            productId: productId,
                            colorId: item.id
                        });
                    });


                    console.log(items);


                    db.product_colors.bulkCreate(items)
                        .then(function(createResponse) {
                            resolve(createResponse);
                        })
                        .catch(function(creationError) {
                            reject(creationError);
                        });

                })
                .catch(function(creationError) {
                    reject(creationError);
                });

        });
    };

    async function addSizesToProduct(productId, sizes) {
        return new Promise(function(resolve, reject) {
            if (productId < -1) {
                reject();
            }

            if (sizes === undefined || sizes === null || sizes.length < 1) {
                reject();
            }

            var updated = [];
            sizes.forEach((item, i) => {
                if (item.id === undefined || item.id < 1) {
                    updated.push({
                        name_en: item.name_en,
                        name_zh: item.name_zh
                    })
                }
            });


            db.size.bulkCreate(updated, {
                    fields: ["name_en", "name_zh"],
                    updateOnDuplicate: ["name_en", "name_zh"]
                })
                .then(function(createdSizes) {

                    var items = [];
                    createdSizes.forEach((item, i) => {
                        items.push({
                            productId: productId,
                            sizeId: item.id
                        });
                    });

                    db.product_sizes.bulkCreate(items)
                        .then(function(creationReponse) {
                            resolve(creationReponse);
                        })
                        .catch(function(creationError) {
                            reject(creationError);
                        });

                })
                .catch(function(creationError) {
                    reject(creationError);
                });

        });
    };

    app.patch('/store/product/:id', middleware.requireAdminAuthentication,
        async function(
            req, res) {
            const id = parseInt(req.params.id) || -1;
            if (id === -1) {
                responseController.fail(res, 409,
                    "Please include productId in request url /store/product/:productId");
                return;
            }
            var body = underscore.pick(req.body, 'name', 'description', 'price',
                'count', 'thumbnail_url', 'sizes', 'colors', 'deletedSizes', 'deletedColors');
            if (body === null || body === undefined || isEmpty(body)) {
                responseController.fail(res, 403,
                    "Please send product's name , description , price , sizes , colors , thumbnail_url and count in request body"
                );
                return;
            }

            db.product.update(body, {
                    where: {
                        id: id
                    }
                })
                .then(async function(product) {

                    await removeOldColorsForProduct(body.deletedColors);
                    await removeOldSizesForProduct(body.deletedSizes);

                    await addColorsToProduct(id, body.colors);
                    await addSizesToProduct(id, body.sizes)

                    if (product) {
                        responseController.success(res, 201, "Product update successfully");
                    } else {
                        responseController.fail(res, 403, "Failed to update product");
                    }

                })
                .catch(function(e) {
                    console.log(e);

                    responseController.fail(res, 403, e);
                })
        });

    app.post('/store/product/:id/retire', middleware.requireAdminAuthentication,
        function(req, res) {
            const id = parseInt(req.params.id) || -1;
            if (id === -1) {
                responseController.fail(res, 409,
                    "Please include productId in request url /store/product/:productId/retire"
                );
                return;
            }
            db.product.update({
                    status: 'retired'
                }, {
                    where: {
                        id: id
                    }
                })
                .then(function(status) {
                    if (status) {
                        responseController.success(res, 201, "Product retired successfully");
                    } else {
                        responseController.fail(res, 403, "Failed to retire the product");
                    }
                })
                .catch(function(e) {
                    responseController.fail(res, 403, e);
                })
        });


    app.post('/store/product/:id/activate', middleware.requireAdminAuthentication,
        function(req, res) {
            const id = parseInt(req.params.id) || -1;
            if (id === -1) {
                responseController.fail(res, 409,
                    "Please include productId in request url /store/product/:productId/retire"
                );
                return;
            }
            db.product.update({
                    status: 'active'
                }, {
                    where: {
                        id: id
                    }
                })
                .then(function(status) {
                    if (status) {
                        responseController.success(res, 201, "Product activated successfully");
                    } else {
                        responseController.fail(res, 403, "Failed to activate the product");
                    }
                })
                .catch(function(e) {
                    responseController.fail(res, 403, e);
                })
        });


    app.delete('/store/product/:id', middleware.requireAdminAuthentication,
        function(req, res) {
            const id = parseInt(req.params.id) || -1;
            if (id === -1) {
                responseController.fail(res, 409,
                    "Please include productId in request url /store/product/:productId");
                return;
            }
            db.product.destroy({
                    where: {
                        id: id
                    }
                })
                .then(function(product) {
                    if (product) {
                        responseController.success(res, 201, "Product deleted successfully");
                    } else {
                        responseController.fail(res, 403, "Failed to delete product");
                    }

                })
                .catch(function(e) {
                    responseController.fail(res, 403, e);
                })
        });

};