'use strict'

let express = require('express');
let UserController = require('../controllers/user');
let mw_auth = require('../middlewares/authentication');


let api = express.Router();

api.post('/register', UserController.registerUser);
api.post('/login', UserController.loginUser);
api.get('/user/:username', mw_auth.auth, UserController.getUser);
api.put('/updateUser/', mw_auth.authUser, UserController.updateUser);

module.exports = api;