const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);



require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port , () => {console.log('server started')});