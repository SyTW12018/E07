'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let JobOfferSchema = new Schema({

    nameEnterprise: String,
    place: String,
    published: Date,
    salary: Number,
    exp: String,
    kindOfJob: String,
    description: String
    

});

module.exports = mongoose.model('JobOffer', userSchema);