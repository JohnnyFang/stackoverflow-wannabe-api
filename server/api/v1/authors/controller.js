const Model = require('./model');

exports.find = (req, res, next, id) => {
    Model.findById(id)
        .then( doc => {
            if(doc){
                req.doc = doc;
                next();
            }else{
                res.json({
                    message: "Author not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.all = (req, res, next) => {
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;
    
    const items = Model
        .find()
        .skip(skip)
        .limit(limit)
    
    const count = Model.count();
    
    Promise.all([items.exec(), count.exec()])
        .then( data => {
            res.json({
                data: data[0],
                limit,
                skip,
                count: data[1]
            })
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.create = (req, res, next) => {
    const body = req.body;
    
    let document = new Model(body);
    document.save()
        .then( doc => {
            res.json(doc)
        })
        .catch( err => {
            next(new Error(err));
        });
};

/**
 * @api {get} /authors/:id Request Author information
 * @apiName GetAuthor
 * @apiGroup Author
 *
 * @apiParam {String} id Author unique ID.
 *
 * @apiSuccess {String} _id             unique ID of the author.
 * @apiSuccess {String} firstname       First name of the author.
 * @apiSuccess {String} lastname        Last name of the author.
 * @apiSuccess {String} createdAt       Created date of the author.
 * @apiSuccess {String} updateAt        Last update date of the author.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "_id": "5a63929672e840361145d633",
 *          "firstname": "Ornella",
 *          "lastname": "Ramos",
 *          "createdAt": "2018-01-20T19:03:50.638Z",
 *          "updatedAt": "2018-01-20T19:03:50.638Z",
 *          "__v": 0
 *      },
 *
 * @apiError Document Not Found the id of the Author was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Document Not Found"
 *     }
 */

exports.get = (req, res, next) => {
    res.json(req.doc);
};

exports.update = (req, res, next) => {
    let document = Object.assign(req.doc, req.body);
    
    document.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
           next(new Error(err));
        });
};

exports.delete = (req, res, next) => {
    const doc = req.doc;
    
    doc.remove()
        .then( deleted => {
            res.json(deleted);
        })
        .catch( err => {
            next(new Error(err));
        });
};