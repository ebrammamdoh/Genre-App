const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');


router.get('/', async (req,res) => {
    let movies = await Movie.find().sort('name');
    res.status(200).send(movies);
});

router.post('/', async (req,res) => {
    let { error } = validate(req.body);
    if(error) return res.status(400).send('not valid data');
    
    let genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('genre not found');

    createMovie(
        req.body.title,
        genre,
        req.body.numberInStock,
        req.body.dailyRentalRate
    ).then(( result )=>{  res.status(200).send(result) })
    .catch((err)=> {console.log('error in saving')});
   
});

async function createMovie(title, genre, numberInStock, dailyRentalRate) {
    let movie = new Movie({
        title: title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        // genre: new Genre({
        //     _id: genre._id,
        //     name: genre.name
        // }),
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate
    });
    return await movie.save();
}

module.exports = router;