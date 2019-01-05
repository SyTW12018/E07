'use strict'

let express = require('express');
let enterpriseController = require('../controllers/enterprise');

let api = express.Router();

api.post('/newEnterprise', enterpriseController.newEnterprise);
api.delete('/deleteEnterprise', enterpriseController.deleteEnterprise);
api.get('/business/:name', enterpriseController.getEnterprise);

module.exports = api;