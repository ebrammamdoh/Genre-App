const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');

router.get('/', async (req,res) => {
    let rentals = await Rental.find().sort('-dateOut');
    res.status(200).send(rentals);
});

router.post('/', async (req,res) => {
    let { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('customer not found');

    let movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('movie not found');

    if(movie.numberInStock===0) return res.status(400).send('0 movies in stock');

    createRental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        dateOut: req.body.dateOut,
        returnedDate: req.body.returnedDate,
        rentalFee: req.body.rentalFee
    }).then((result) => {
        movie.numberInStock--;
        movie.save();
        res.status(200).send(result);
    })
    .catch((err) => {console.log('error happen: ',err)});

});

async function createRental(rentalObj) {
    let rental = new Rental(
    //     {
    //     customer: rentalObj.customer,
    //     movie: rentalObj.movie,
    //     dateOut: rentalObj.dateOut,
    //     returnedDate: rentalObj.returnedDate,
    //     rentalFee: rentalObj.rentalFee
    // }
    rentalObj
);
    return await rental.save();
};

module.exports = router;