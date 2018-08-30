const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate} = require('../models/user');
const {Auth} = require('../middlewares/auth');


//get user data
router.get('/me', Auth, async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});
//register
router.post('/', async (req,res) => {
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('this user already exsist');

    let bodyObj = _.pick(req.body, ['name','email','password']);
    user = new User(bodyObj);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    let token = user.generateAuthToken();

    res.header('x-auth-token', token).send(
        _.pick(user, ['name','email'])
    );
});

module.exports = router;