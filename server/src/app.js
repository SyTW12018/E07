'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let expressLogging = require('express-logging');
let logger = require('logops');
let app = express();

//Rutas

let userRoutes = require('../routes/user');
let offerRoutes = require('../routes/jobOffer');
let applyRoutes = require('../routes/apply');
let postRoutes = require('../routes/post');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressLogging(logger));

app.use('/api', userRoutes);
app.use('/api', offerRoutes);
app.use('/api', applyRoutes);
app.use('/api', postRoutes);

//Cabeceras HTTP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});


module.exports = app;