const express = require('express')
const router = express.Router()
const AccountController = require('../Controllers/AccountController')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')

router.post('/register',AccountController.userRegister) 
router.post('/login', AccountController.userLogin)

module.exports= router