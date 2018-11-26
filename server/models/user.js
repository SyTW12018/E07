'use strict'

let mongoose = require('mongoose');
const uniqueValidation = require('mongoose-beautiful-unique-validation');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        unique: 'El nombre de usuario \'{VALUE}\' ya está registrado!'
    },
    password: String,
    email: {
        type: String,
        unique: 'El email \'{VALUE}\' ya está registrado!'
    },
    name: String,
    surname: String,
    role: String
});

userSchema.plugin(uniqueValidation);

module.exports = mongoose.model('User', userSchema);