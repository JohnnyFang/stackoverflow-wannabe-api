const express = require('express');
const router = express.Router();
const answers = require('./answers/routes');
const questions = require('./questions/routes');
const users = require('./users/routes');
const authors = require('./authors/routes');

router.use('/answers', answers);
router.use('/questions', questions);
router.use('/users', users);
router.use('/authors', authors);

module.exports = router;