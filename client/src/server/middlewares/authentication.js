'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = process.env.SECRET || "secret";

function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "No hay token de autenticación" });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        let payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token expirado' });
        }
        req.user = payload;
        next();
    }
    catch (ex) {
        return res.status(404).send({ message: 'Token invalido' });
    }
}

function authUser(req, res, next) {
    let params = req.body;
    let token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        let payload = jwt.decode(token, secret);
        if (payload.email == params.email)
            next();
        else {
            return res.status(401).send({ message: "Token Incorrecto" });
        }
    }
    catch (ex) {
        return res.status(404).send({ message: "Token Invalido" });
    }
}

module.exports = { auth, authUser }