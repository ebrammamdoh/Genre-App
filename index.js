require('express-async-errors'); 

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const config = require('config');
const genresRouter = require('./routes/genres');
const customerRouter = require('./routes/customers');
const moviesRouters = require('./routes/movies');
const rentalRouters = require('./routes/rentals');
const userRouters = require('./routes/users');
const authRouters = require('./routes/auth');
const {Auth} = require('./middlewares/auth');
const error = require('./middlewares/error');


if(!config.get('jwtPrivateKey')){
    console.error('falat error in evirnoment');
    process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/vidly')
.then(() => {console.log('mongo connected')})
.catch((err) => {console.log('Error occured in database', err)});

// app.use(bodyparser({extended:false}));
app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers', customerRouter);
app.use('/api/movies', moviesRouters);
app.use('/api/rentals', rentalRouters);
app.use('/api/users', userRouters);
app.use('/api/auth', authRouters);

app.use(error);
// app.use(Auth);

const port = process.env.PORT || 3000;
app.listen(port , () => {console.log('server started')});