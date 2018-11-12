'use strict'

let offer = require('../models/jobOffer.js')


function newOffer(){
    
    let mongoose = require('mongoose');
     
    mongoose.connect('mongodb://localhost/admin', function (err) {
     
       if (err) throw err;
     
       console.log('Successfully connected');
     
    });
    
    
}
    
function deleteOffer(){
        
}
    
function updateOffer(){
        
}
    

