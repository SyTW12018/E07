'use strict'

let Apply = require('../models/apply');

function newApply(req, res) {
    let newApply = new Apply();
    let params = req.body;

    if (params.offerid && params.userid && params.description) {
        newApply.offerid = params.offerid;
        newApply.userid = params.userid;
        newApply.description = params.description;

        newApply.save((err, applySaved) => {
            if (err) {
                if (err.name == "ValidationError") {
                    res.status(500).send({ message: "Solicitud ya registrada", errors: err.errors });
                }
                else {
                    res.status(500).send({ message: "Error en el servidor", errors: err.errors });
                }

            }
            else {
                if (!applySaved) {
                    res.status(404).send({ message: "La solicitud no ha sido registrada" });
                }
                else {
                    res.status(201).send({ message: "Solicitud registrada", apply: applySaved });
                }
            }
        });
    }
    else {
        res.status(400).send({ message: "No se aportan los correctamente los datos." })
    }
}

function deleteApply(req, res) {
    let params = req.body;

    Apply.findOneAndDelete({userid: params.userid, offerid: params.offerid}, (err, applyDeleted)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor", err});
        }
        else {
            if(!applyDeleted){
                res.status(404).send({message: "No existe la solicitud a borrar"});
            }
            else {
                res.status(200).send({message: "La solicitud se ha borrado correctamente", apply: applyDeleted});
            }
        }
    })
}

module.exports = { newApply, deleteApply };