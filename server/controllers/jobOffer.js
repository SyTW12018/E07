'use strict'

let Offer = require('../models/jobOffer');
let jwt = require('../services/jwt');

function newOffer(req, res) {

    let newOffer = new Offer();
    let params = req.body;

    newOffer.nameEnterprise = params.nameEnterprise;
    newOffer.place = params.place;
    newOffer.published = params.published;
    newOffer.salary = params.salary;
    newOffer.exp = params.exp;
    newOffer.kindOfJob = params.kindOfJob;
    newOffer.description = params.description;


    newOffer.save((err, offerSaved) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor al registrar la oferta de trabajo",
                Error: err
            });
        } else {
            if (!offerSaved) {
                res.status(404).send({
                    message: "La oferta de trabajo no se ha registrado"
                });
            } else {
                res.status(200).send({
                    message: "La oferta de trabajo se ha registrado satisfactoriamente",
                    offers: offerSaved
                });
            }
        }
    });

}


function deleteOffer(req, res) {

    Offer.findOneAndDelete({
        _Id: req.params.ObjectId,
    }, (err, offerDeleted) => {
        if (err) {
            res.status(500).send({
                message: "Error Servidor",
                Error: err
            });
        } else {
            if (!offerDeleted) {
                res.status(404).send({
                    message: "La oferta de trabajo no existe"
                });
            } else {
                res.status(200).send({
                    message: "La oferta de trabajo se ha eliminado",
                    Offer: offerDeleted
                });
            }
        }

    }

    )

}

module.exports = {
    newOffer,
    deleteOffer
};