const mongoose = require('mongoose');
const Joi = require('joi');
const {a, b, customerSchema} = require('./customer');
const { Movie } = require('./movie');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{ 
                type:String,
                trim: true,
                required: true,
                minlength: 5,
                maxlength: 200
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min:0, max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateRetured: Date,
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(body){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    return Joi.validate(body, schema);
};

module.exports.Rental = Rental;
module.exports.validate = validateRental;
module.exports.rentalSchema = rentalSchema;