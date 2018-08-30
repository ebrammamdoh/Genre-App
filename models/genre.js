const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});
const Genre = mongoose.model('Genre', genreSchema);


function validateGenre(body){
    let schema = {
        name: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(body, schema);
}


module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;