'use strict'

let mongoose = require('mongoose');
const uniqueValidation = require('mongoose-beautiful-unique-validation');
let Schema = mongoose.Schema;

let applySchema = new Schema({
    offerid: { type: mongoose.Schema.Types.ObjectId, ref: 'jobOffer'},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    description: String
});

applySchema.index({ offerid: 1, userid: 1 }, { unique: true });

applySchema.plugin(uniqueValidation);

module.exports = mongoose.model('Apply', applySchema);