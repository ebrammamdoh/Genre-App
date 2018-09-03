const express = require('express');
const genresRouter = require('../routes/genres');
const customerRouter = require('../routes/customers');
const moviesRouters = require('../routes/movies');
const rentalRouters = require('../routes/rentals');
const userRouters = require('../routes/users');
const authRouters = require('../routes/auth');
const error = require('../middlewares/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genresRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/movies', moviesRouters);
    app.use('/api/rentals', rentalRouters);
    app.use('/api/users', userRouters);
    app.use('/api/auth', authRouters);
    app.use(error);
}
