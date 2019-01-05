'use strict'

let Enterprise = require('../models/enterprise');

function newEnterprise(req, res) {

    let newEnterprise = new Enterprise();
    let params = req.body;

    newEnterprise.nameEnterprise = params.nameEnterprise;
    newEnterprise.place = params.place;
    newEnterprise.created = params.created;
    newEnterprise.description = params.description;
    newEnterprise.role = 'ROLE_ENTERPRISE'

    newEnterprise.save((err, enterpriseSaved) => {
        if (err) {
            if (err.name == "ValidationError") {
                let errorMsg = "";
                for (let p in err.errors) {
                    errorMsg = err.errors[p].message;
                }
                res.status(500).send({ message: errorMsg, errors: err.errors });
            } else {
                res.status(500).send({ message: "Error en el servidor al guardar la empresa", err });
            }
        }
        else {
            if (!enterpriseSaved) {
                res.status(404).send({ message: "La empresa no se ha registrado" });
            }
            else {
                res.status(201).send({ message: "La empresa registrada satisfactoriamente", enterprise: enterpriseSaved });
            }
        }
    });

}

function deleteEnterprise(req, res) {

    Enterprise.findOneAndDelete({
        _Id: req.params.ObjectId,
    }, (err, enterpriseDeleted) => {
        if (err) {
            res.status(500).send({
                message: "Error Servidor",
                Error: err
            });
        } else {
            if (!enterpriseDeleted) {
                res.status(404).send({
                    message: "La empresa no existe"
                });
            } else {
                res.status(200).send({
                    message: "La empresa se ha eliminado",
                    Enterprise: enterpriseDeleted
                });
            }
        }

    }

    )

}

function getEnterprise(req, res) {
    let params = req.params;
    Enterprise.findOne({ nameEnterprise: params.name }, (err, enterprise) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        }
        else {
            if (!enterprise) {
                res.status(404).send({ message: "Empresa no encontrada" });
            }
            else {
                res.status(200).send({ enterprise });
            }
        }
    })
}

module.exports = {
    newEnterprise,
    deleteEnterprise,
    getEnterprise
};

