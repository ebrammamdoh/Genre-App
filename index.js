require('express-async-errors'); 
const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const config = require('config');
require('./startup/routes')(app);


process.on('uncaughtException', (err) => {
    console.error('Uncaught exception');
    winston.error(err.message, err);
});

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.File, {
    db: 'mongodb://localhost:27017/vidly',
    level: 'error'
})

if(!config.get('jwtPrivateKey')){
    console.error('falat error in evirnoment');
    process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/vidly')
.then(() => {console.log('mongo connected')})
.catch((err) => {console.log('Error occured in database', err)});

 app.use(bodyparser.urlencoded({extended:false}));



// app.use(Auth);

const port = process.env.PORT || 3000;
app.listen(port , () => {console.log('server started')});