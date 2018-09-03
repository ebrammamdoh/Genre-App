const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const winston = require('winston');

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port , () => {winston.info(`server started at port: ${port}`)});