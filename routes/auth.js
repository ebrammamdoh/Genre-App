const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req,res) => {
    const {error} = validateUserAndPass(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('invalid email or password');
    
    let result = await bcrypt.compare(req.body.password,user.password);
    if(!result) return res.status(400).send('invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

function validateUserAndPass(body){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(4).max(255).required()
    };
    return Joi.validate(body, schema);
};

module.exports = router;