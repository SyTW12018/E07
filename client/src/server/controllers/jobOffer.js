'use strict'

let Offer = require('../models/jobOffer');
let moment = require('moment');

function newOffer(req, res) {

    let newOffer = new Offer();
    let params = req.body;

    newOffer.enterprise = params.enterprise;
    newOffer.place = params.place;
    newOffer.published = moment().unix();
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

function getOffer(req, res) {
    let params = req.params;
    Offer.findById(params.id).populate('enterprise').exec((err, offer) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });

        }
        else {
            if (!offer) {
                res.status(404).send({ message: "Oferta no existe" });
            }
            else {
                res.status(200).send({ offer });
            }
        }
    })

}

function getAllOffers(req, res) {
    let params = req.params;
    let options = {
        page: Number(params.page),
        limit: 3,
        populate: 'enterprise',
        sort: { published: -1 }

    }
    Offer.paginate({}, options, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        }
        else {
            if (!result.total) {
                res.status(404).send({ message: "No hay ofertas de trabajo disponibles" });
            }
            else {
                res.status(200).send({ message: "Ofertas encontradas", offers: result.docs, total: result.total })
            }
        }
    })


}

function getOffersOfEnterprise(req, res) {
    let params = req.params;
    let options = {
        page: Number(params.page),
        limit: 3,
        sort: { published: -1 }
    }
    Offer.paginate({ enterprise: params.id }, options, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        }
        else {
            if (!result.total) {
                res.status(404).send({ message: "No existen ofertas de esta empresa" });
            }
            else {
                res.status(200).send({ message: "Ofertas encontradas", offers: result.docs, total: result.total });
            }
        }
    })
}


module.exports = {
    newOffer,
    deleteOffer,
    getOffer,
    getAllOffers,
    getOffersOfEnterprise

};