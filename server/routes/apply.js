'use strict'

let express = require('express');
let ApplyController = require('../controllers/apply');

let mw_auth = require('../middlewares/authentication');

let api = express.Router();

api.post('/newApply', mw_auth.auth, ApplyController.newApply);
api.delete('/discardApply', mw_auth.auth, ApplyController.deleteApply);

module.exports = api;