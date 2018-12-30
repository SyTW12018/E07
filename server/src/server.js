'use strict'

require('dotenv').config();

let mongoose = require('mongoose');
let app = require('./app');

let port = process.env.PORT || 8080;
let host = process.env.HOST || 'localhost';

let mongoURI;
if (process.env.ENV == 'test') {
    console.log("ENV Mode = Test");
    mongoURI = `mongodb://localhost:27017/test`
} else {
    let dbport = process.env.DB_PORT;
    let dbhost = process.env.DB_HOST;
    let dbname = process.env.DB_NAME;
    let dbuser = process.env.DB_USER;
    let dbpass = process.env.DB_PASS;

    mongoURI = `mongodb://${dbuser}:${dbpass}@${dbhost}:${dbport}/${dbname}`;
}

mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, res) => {
    if (!err) {
        console.log("Mongoose Connected");
        app.listen(port, host, () => {
            console.log(`Server API REST listening in http://${host}:${port}`);
        });
    }
    else {
        throw err;
    }
})

module.exports = app;