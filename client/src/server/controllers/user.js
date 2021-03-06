'use strict'

let bcrypt = require('bcrypt-nodejs');
let User = require('../models/user');
let jwt = require('../services/jwt');

function registerUser(req, res) {
    let newUser = new User();
    let params = req.body;

    if (params.username && params.email) {
        newUser.username = params.username;
        newUser.email = params.email.toLowerCase();
        newUser.role = 'ROLE_USER';
        newUser.name = "";
        newUser.surname = "";
        newUser.avatar = params.avatar ? params.avatar : "default.jpg";
        newUser.description = "";
        if (params.password) {
            bcrypt.hash(params.password, null, null, (err, hash) => {
                newUser.password = hash;
                newUser.save((err, userSaved) => {
                    if (err) {
                        if (err.name == "ValidationError") {
                            let errorMsg = "";
                            for (let p in err.errors) {
                                errorMsg = err.errors[p].message;
                            }
                            res.status(500).send({ message: errorMsg, errors: err.errors });
                        } else {
                            res.status(500).send({ message: "Error en el servidor al guardar el usuario", err });
                        }
                    }
                    else {
                        if (!userSaved) {
                            res.status(404).send({ message: "El usuario no se ha registrado" });
                        }
                        else {
                            res.status(201).send({ message: "Usuario registrado satisfactoriamente", user: userSaved });
                        }
                    }
                });
            });
        }
        else {
            res.status(400).send({ message: "Introduce una contraseña" });
        }
    }
    else {
        res.status(400).send({ message: "Introduce los todos los campos" });
    }
}

function loginUser(req, res) {
    let params = req.body;

    User.findOne({ email: params.email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor!" });
        }
        else {
            if (!user) {
                res.status(404).send({ message: "Usuario no registrado!" });
            }
            else {
                bcrypt.compare(params.password, user.password, (err, check) => {
                    if (check) {
                        res.status(200).send({
                            token: jwt.createToken(user),
                            user: user,
                            message: "Usuario identificado correctamente!"
                        });
                    }
                    else {
                        res.status(400).send({ message: 'Datos de login incorrectos!' });
                    }
                });
            }
        }
    });
}

function getUser(req, res) {
    let username = req.params.username;
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor obteniendo la informacion del usuario" });
        }
        else {
            if (!user) {
                res.status(404).send({ message: "No existe el usuario solicitado" });
            }
            else {
                res.status(200).send({ user: user });
            }
        }
    });
}

function updateUser(req, res) {
    let params = req.body;
    if (params.password) {
        User.findOne({ email: params.email }, (err, user) => {
            bcrypt.compare(params.password, user.password, (errbcrypt, check) => {
                if (check) {
                    let update = {}
                    if (params.newPassword) {
                        bcrypt.hash(params.newPassword, null, null, (hasherr, hash) => {
                            update.password = hash;
                        })
                    }
                    if (params.name) update.name = params.name;
                    if (params.surname) update.surname = params.surname;
                    if (params.newEmail) update.email = params.newEmail;
                    if (params.newDescription) update.description = params.newDescription;
                    User.findOneAndUpdate({ email: params.email }, update, { new: true }, (err, updatedUser) => {
                        if (err) {
                            res.status(500).send({ message: "Error al actualizar el usuario" });
                        }
                        else {
                            res.status(200).send({ token: jwt.createToken(updatedUser), user: updatedUser, message: "Usuario Actualizado Correctamente" });
                        }
                    });
                }
                else {
                    res.status(400).send({ message: "Contraseña erronea" });
                }
            })
        })
    }
    else {
        res.status(400).send({ message: "Contraseña no especificada" });
    }
}
module.exports = { registerUser, loginUser, getUser, updateUser };