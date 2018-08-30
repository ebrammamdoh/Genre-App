const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('/', async (req,res) => {
    let result = await Customer.find().sort('name');
    res.status(200).send(result);
});

router.post('/', async (req,res) => {
    let { error } = validate(req.body);
    if(error){
        res.status(400),send('data you send is not valid');
        return;
    }
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGolds
    });
    let result = await customer.save();
    res.status(200).send(result);
});

router.put('/:id', async (req,res) => {
    let { error } = validate(req.body);
    if(error){
        res.status(400),send('data you send is not valid');
        return;
    }

    let result = await Customer.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    },{new: true});
    if(!result){
        res.status(400),send('invalid id ');
        return;
    };
    res.status(200).send(result);
});

router.delete('/:id', async (req,res) => {
    let genre = await Customer.findByIdAndRemove(req.params.id);
    if(!genre){
        res.status(400).send('the given id is incorrect');
        return;
    }
    res.status(200).send('element deleted succesfully');
});

router.get('/:id', async (req,res) => {
    let genre = await Customer.findById(req.params.id);
    if(!genre){
        res.status(400).send('can not founded');
        return;
    }
    res.status(200).send(genre);
});

module.exports = router;
