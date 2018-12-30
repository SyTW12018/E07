'use strict'

let express = require('express');
let jobOfferController = require('../controllers/jobOffer');
let middleware = require('../middlewares/authentication');
let api = express.Router();

api.post('/newOffer', middleware.auth,jobOfferController.newOffer);
api.delete('/deleteOffer', middleware.auth,jobOfferController.deleteOffer);

module.exports = api;