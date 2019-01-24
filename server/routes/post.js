'use strict'

let express = require('express');
let PostController = require('../controllers/post');
let auth = require('../middlewares/authentication');


let api = express.Router();

api.post('/addPost', auth.auth, PostController.addPost);
api.post('/deletePost', auth.auth, PostController.deletePost);
api.get('/posts/:page', auth.auth, PostController.getAllPosts);
api.get('/posts/:id/:page', auth.auth, PostController.getPostsOfUser);

module.exports = api;
