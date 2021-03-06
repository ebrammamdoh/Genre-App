require('express-async-errors'); 
const winston = require('winston');
require('winston-mongodb');

module.exports = function(){
    // winston.exceptions.handle(new winston.transports.File({
    //     filename: 'handleExceptions.log'
    // }));
    
    process.on('uncaughtException', (err) => {
        console.error('Uncaught exception', err);
        winston.error(err.message, err);
    });
    
   // winston.add(winston.transports.File, {filename: 'logfile.log'});
    // winston.add(winston.transports.File, {
    //     db: 'mongodb://localhost:27017/vidly',
    //     level: 'error'
    // });   
}