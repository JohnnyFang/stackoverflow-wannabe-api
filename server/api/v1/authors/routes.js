const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*
 * /api/authors/     GET    - READ ALL
 * /api/authors/     POST   - CREATE
 * /api/authors/:id  GET    - READ ONE
 * /api/authors/:id  PUT    - UPDATE
 * /api/authors/:id  DELETE - DELETE
 */

router.route('/')
    .get(controller.all)
    .post(controller.create)

router.param('id', controller.find)

router.route('/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete)

module.exports = router;