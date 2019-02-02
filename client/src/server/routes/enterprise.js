'use strict'

let express = require('express');
let enterpriseController = require('../controllers/enterprise');
let md_auth = require('../middlewares/authentication');

let api = express.Router();

api.post('/newEnterprise', md_auth.auth, enterpriseController.newEnterprise);
api.delete('/deleteEnterprise', md_auth.auth, enterpriseController.deleteEnterprise);
api.get('/business/:name', md_auth.auth, enterpriseController.getEnterprise);

module.exports = api;