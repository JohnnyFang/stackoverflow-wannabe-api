const express = require('express');
const router = express.Router();
const answers = require('./answers/routes');
const questions = require('./questions/routes');
const users = require('./users/routes');

router.use('/answers', answers);
router.use('/questions', questions);
router.use('/users', users);

module.exports = router;