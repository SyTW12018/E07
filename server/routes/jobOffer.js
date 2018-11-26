'use strict'

let express = require('express');
let jobOfferController = require('../controllers/jobOffer');

let api = express.Router();

api.post('/newOffer', jobOfferController.newOffer);
api.post('/deleteOffer', jobOfferController.deleteOffer);

module.exports = api;