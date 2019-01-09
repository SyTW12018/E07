'use strict'

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let jobOfferSchema = new Schema({

    enterprise: { type: mongoose.Schema.Types.ObjectId, ref: 'enterprise' },
    place: String,
    published: Number,
    salary: Number,
    exp: String,
    kindOfJob: String,
    description: String


});

module.exports = mongoose.model('jobOffer', jobOfferSchema);