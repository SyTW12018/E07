'use strict'

require('dotenv').config();

let mongoose = require('mongoose');
let app = require('./app');
let port = process.env.PORT;
let host = process.env.HOST;
let dbport = process.env.DB_PORT;
let dbhost = process.env.DB_HOST;
let dbname = process.env.DB_NAME;
let dbuser = process.env.DB_USER;
let dbpass = process.env.DB_PASS;

mongoose.connect(`mongodb://${dbuser}:${dbpass}@${dbhost}:${dbport}/${dbname}`, (err, res)=>{
    if(!err){
        console.log("Mongoose Connected");
        app.listen(port, host, ()=>{
            console.log(`Server API REST listening in http://${host}:${port}`);
        })
    }
    else {
        throw err;
    }
})