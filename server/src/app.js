'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

if (process.env.ENV != 'test') {
    const addRequestId = require('express-request-id')();
    app.use(addRequestId);
    const morgan = require('morgan');
    morgan.token('id', function getId(req) { return req.id });
    let loggerFormat = ':id [:date[web]] " :method :url" :status  - :response-time ms';
    app.use(morgan(loggerFormat, {
        skip: (req, res) => {
            return res.statusCode >= 400;
        },
        stream: process.stdout
    }))
    app.use(morgan(loggerFormat, {
        skip: (req, res) => {
            return res.statusCode < 400;
        },
        stream: process.stderr
    }))
}

//Rutas

let userRoutes = require('../routes/user');
let offerRoutes = require('../routes/jobOffer');
let applyRoutes = require('../routes/apply');
let enterpriseRoutes = require('../routes/enterprise');
let postRoutes = require('../routes/post');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', offerRoutes);
app.use('/api', applyRoutes);
app.use('/api', enterpriseRoutes);
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