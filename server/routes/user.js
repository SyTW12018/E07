'use strict'

let express = require('express');
let UserController = require('../controllers/user');

let api = express.Router();

api.post('/register', UserController.registerUser);
api.post('/login', UserController.loginUser);

module.exports = api;