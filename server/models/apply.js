'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let applySchema = new Schema({
    offerid: mongoose.Schema.Types.ObjectId,
    userid: mongoose.Schema.Types.ObjectId,
    description: String
});

module.exports = mongoose.model('Apply', applySchema);