const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { signUp } = require('../controllers/signUp');
const { login } = require('../controllers/login');
const { me } = require('../controllers/me');
const { refresh } = require('../controllers/refresh');

router.use(bodyParser.json({ extended: true }));

router.post('/sign_up', signUp);

router.post('/login', login);

router.get('/me[1-9]', me);

router.get('/refresh', refresh);

module.exports = router;
