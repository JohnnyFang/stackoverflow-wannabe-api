const express = require('express');
const router = express.Router();
const controller = require('./controller');
const auth = require('./../auth');

/*
 * /api/questions/     GET    - READ ALL
 * /api/questions/     POST   - CREATE
 * /api/questions/:id  GET    - READ ONE
 * /api/questions/:id  PUT    - UPDATE
 * /api/questions/:id  DELETE - DELETE
 */

router.route('/')
    .get(controller.all)
    .post(auth, controller.create)

router.param('id', controller.find)

router.route('/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete)

module.exports = router;