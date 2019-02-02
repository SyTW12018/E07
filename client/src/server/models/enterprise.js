'use strict'

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let enterpriseSchema = new Schema({
    nameEnterprise: String,
    place: String,
    created: Number,
    description: String,
    avatar: String

});

module.exports = mongoose.model('enterprise', enterpriseSchema);