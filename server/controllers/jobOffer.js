'use strict'

let Offer = require('../models/jobOffer');

function newOffer(req, res) {
    
    let newOffer = new Offer();
    let params = req.body;
    console.log(params);

    newOffer.nameEnterprise = params.nameEnterprise;
    newOffer.place = params.place
    newOffer.published = params.published;
    newOffer.salary = params.salary;
    newOffer.exp = params.exp;
    newOffer.kindOfJob = params.kindOfJob;
    newOffer.description = params.description;
    
    newOffer.save((err, offerSaved) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor al registrar la oferta de trabajo", Error: err });
        }
        else {
            if (!offerSaved) {
                res.status(404).send({ message: "La oferta de trabajo no se ha registrado" });
            }
           else {
                res.status(200).send({ message: "La oferta de trabajo se ha registrado satisfactoriamente", offer: offerSaved });
            }
        }
    });

}
    
function deleteOffer(req,res){
    
   newOffer.remove({
       nameEnterprise: req.params.nameEnterprise
       place: req.params.place
       published: req.params.published
       salary: req.params.salary
       exp: req.params.exp
       kindOfJob: req.params.kindOfJob
       description: req.params.description
       
   }, function(error){
      if(error){
         res.send('Error al intentar eliminar el personaje.');
      }else{ 
         
      }
   });
    
        
}
    
module.exports = { newOffer, deleteOffer };
