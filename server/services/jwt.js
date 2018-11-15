'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = process.env.SECRET || "secret";

exports.createToken = function(user){
    let payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        surname: user.surname,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    }

    return jwt.encode(payload, secret);
}