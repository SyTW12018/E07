'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    surname: String
});

module.exports = mongoose.model('User', userSchema);