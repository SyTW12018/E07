'use strict'

let express = require('express');
let UserController = require('../controllers/user');

let mdw_auth = require('../middlewares/authentication');

let api = express.Router();

api.post('/register', UserController.registerUser);
api.post('/login', UserController.loginUser);