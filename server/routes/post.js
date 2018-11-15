'use strict'

let express = require('express');
let PostController = require('../controllers/post');                                                                                                                                                                                                                                                                                                                                                                                                                  

let mdw_auth = require('../middlewares/authentication');

let api = express.Router();

api.post('/addpost', PostController.addpost);
api.post('/getpost/:id', PostController.getpost);

module.exports = api;
