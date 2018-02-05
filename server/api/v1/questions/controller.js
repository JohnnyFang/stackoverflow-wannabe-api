const Model = require('./model');

exports.find = (req, res, next, id) => {
    Model.findById(id)
        .then( doc => {
            if(doc){
                req.doc = doc;
                next();
            }else{
                res.status(404).json({
                    message: "Document not found"
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
<<<<<<< HEAD
        .populate('author');
=======
        .populate('user');
>>>>>>> e18e9024219bbb149249323400a8fed4d4f0b364
    
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
    
    let document = new Model({
        text: body.text,
        user: body.user
    });
    document.save()
        .then( doc => {
            res.json(doc)
        })
        .catch( err => {
            next(new Error(err));
        });
};

/**
 * @api {get} /questions/:id Request Question information
 * @apiName GetQuestion
 * @apiGroup Question
 *
 * @apiParam {String} id Question unique ID.
 *
 * @apiSuccess {String} _id         unique ID of the question.
 * @apiSuccess {String} text        Text of the question.
 * @apiSuccess {String} author      Author of the question.
 * @apiSuccess {String} createdAt   Created date of the question.
 * @apiSuccess {String} updateAt    Last update date of the question.
 *
 * @apiSuccessExample Success-Response:
<<<<<<< HEAD
 *  HTTP/1.1 200 OK
 *  {
 * 	"_id": "5a7875f6d0e2a02aaf196a1f",
 * 	"text": "Test",
 * 	"author": {
 * 	  	"firstname": "Ornella",
 * 	  	"lastname": "Ramos",
 * 	  	"email": "ornellar2@uninorte.edu.co",
 * 	  	"createdAt": "2018-02-05T01:54:38.275Z",
 * 	  	"updatedAt": "2018-02-05T01:54:38.275Z",
 * 	  	"__v": 0
 * 	},
 * 	"createdAt": "2018-02-05T15:19:18.702Z",
 * 	"updatedAt": "2018-02-05T15:19:18.702Z",
 * 	"__v": 0
 * }
=======
 *     HTTP/1.1 200 OK
 *     {
 *           "_id": "5a77bf88e983d01408d8cc3f",
 *           "text": "What is the meaning of life?",
 *            "author": "5a77b95ea33dfd10c6426e4c",
 *            "createdAt": "2018-02-05T02:20:56.656Z",
 *            "updatedAt": "2018-02-05T02:20:56.656Z",
 *            "__v": 0
 *      }
>>>>>>> e18e9024219bbb149249323400a8fed4d4f0b364
 *
 * @apiError Document Not Found the id of the Question was not found.
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