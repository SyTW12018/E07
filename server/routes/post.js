'use strict'

let express = require('express');
let PostController = require('../controllers/post');                                                                                                                                                                                                                                                                                                                                                                                                                  

let mdw_auth = require('../middlewares/authentication');

let api = express.Router();

api.post('/addPost', PostController.addPost);
api.post('/deletePost',PostController.deletePost);

module.exports = api;
