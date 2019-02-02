'use strict'

let express = require('express');
let jobOfferController = require('../controllers/jobOffer');
let middleware = require('../middlewares/authentication');
let api = express.Router();

api.post('/newOffer', middleware.auth, jobOfferController.newOffer);
api.delete('/deleteOffer', middleware.auth, jobOfferController.deleteOffer);
api.get('/jobOffer/:id', middleware.auth, jobOfferController.getOffer);
api.get('/jobOffers/:page', middleware.auth, jobOfferController.getAllOffers);
api.get('/enterpriseOffers/:id/:page', middleware.auth, jobOfferController.getOffersOfEnterprise)
module.exports = api;