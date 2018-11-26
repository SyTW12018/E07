'use strict'

let express = require('express');
let ApplyController = require('../controllers/apply');

let api = express.Router();

api.post('/newApply', ApplyController.newApply);
api.delete('/discardApply', ApplyController.deleteApply);

module.exports = api;