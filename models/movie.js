const mongoose = require('mongoose');
const Joi = require('joi');
const {a,b, genreSchema } = require('./genre');


const movieSchema = new mongoose.Schema({
    title:{ 
        type:String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0, max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min:0, max: 255
    }
});
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(body){
    let schema = {
        title: Joi.string().min(5).max(200).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(body, schema);
}
module.exports.Movie = Movie;
module.exports.validate = validateMovie;