const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost:27017/vidly')
    .then(() => {winston.info('mongodb connected')})
    .catch((err) => {console.log('Error occured in database', err)});
}