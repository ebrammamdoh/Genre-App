const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold:Boolean,
    name: {
        type: String,
        minlength:5, maxlength:50,
        required: true
    },
    phone: {
        type: Number, minlength:11 ,required: true
    }
});
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(body){
    let schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().required()
    }
    return Joi.validate(body, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
module.exports.customerSchema = customerSchema;