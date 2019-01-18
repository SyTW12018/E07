'use strict'

let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
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

jobOfferSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('jobOffer', jobOfferSchema);