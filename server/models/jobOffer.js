'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let jobOfferSchema = new Schema({

    nameEnterprise: String,
    place: String,
    published: String,
    salary: Number,
    exp: String,
    kindOfJob: String,
    description: String
    

});

module.exports = mongoose.model('jobOffer', jobOfferSchema);