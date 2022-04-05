const express = require('express');
const {register,login,userData} = require('../Controllers/UserController')
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/register',
    body('email').isEmail(),
    body('firstName').not().isEmpty(),
    body('lastName').not().isEmpty(),
    register)

router.post('/login',login)

module.exports = router;