const jwt = require('jsonwebtoken');
const config = require('./../../../config');
const Model = require('./model');

exports.create = (req, res, next) => {
    const body = req.body;
    
    let document = new Model({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
    });
    
    document.save()
        .then( doc => {
            const token = jwt.sign({
                    _id: doc._id
                },
                config.jwt.secret,
                {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                });
            res.json({
                user: doc,
                token
            });
        })
        .catch( err => {
            next(new Error(err));
        });
};

/**
 * @api {get} /users/profile/:id Request user information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} id User unique ID.
 *
 * @apiSuccess {String} firstname       First name of the user.
 * @apiSuccess {String} lastname        Last name of the user.
 * @apiSuccess {String} email           Email of the user.
 * @apiSuccess {String} password        Encripted password of the user.
 * @apiSuccess {String} createdAt       Created date of the user.
 * @apiSuccess {String} updateAt        Last update date of the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "fisrtname": "Ornella",
 *          "lastname": "Ramos",
 *          "email": "ornellar@uninorte.edu.co",
 *          "password": "jdshj355GGHFGHzzzRTFYTftjkj",
 *          "createdAt": "2018-01-20T19:03:50.638Z",
 *          "updatedAt": "2018-01-20T19:03:50.638Z",
 *          "__v": 0
 *      },
 *
 * @apiError Document Not Found the id of the user was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Document Not Found"
 *     }
 */

exports.profile = (req, res, next) => {
    Model.findById(req.decoded._id)
        .then( doc => {
            if(doc){
               res.json(doc);
            }else{
                res.status(404).json({
                    message: "User not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    Model.findOne({ email: email })
        .then(doc => {
            if(doc){
                // Compare Password
                doc.comparePassword(password, (err, match) => {
                    if (err) {
                        next(new Error(err));
                    } else {
                        if (match) {
                            const token = jwt.sign({
                                    _id: doc._id
                                },
                                config.jwt.secret,
                                {
                                    algorithm: 'HS256',
                                    expiresIn: '1h'
                                });
                            res.json({
                                user: doc,
                                token
                            });
                        } else {
                            res.status(401).json({
                                message: "Unauthorized"
                            });
                        }
                    }
                });
            }else{
                res.status(404).json({
                    message: "User not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};