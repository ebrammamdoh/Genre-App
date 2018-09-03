const {Auth} = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');
const {Admin} = require('../middlewares/admin');

//custom function to apply try catch, next inevery route handler
const asyncMiddleware = require('../middlewares/async');


router.get('/', asyncMiddleware(async (req, res) => {
    let result = await Genre.find().sort('name');
    res.send(result);
}));

router.post('/', [Auth, Admin], asyncMiddleware(async (req,res) => {
    const { error } = validateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    let genre = new Genre({
        name: req.body.name
    });
    let result = await genre.save();
    res.send(result);
}));

router.put('/:id', async (req,res) => {
    let { error } = validateGenre(req.body);
    if(error){
        res.status(400).send(`the data you sent is incorrect`);
        return; 
    }

    let genre = await Genre.findByIdAndUpdate(req.params.id,
        {name: req.body.name},{new:true});
    if(!genre){
        res.status(400).send(`the id ${req.params.id} is not exist`);
        return;
    }
    res.send(genre);
});

router.delete('/:id', async (req,res) => {
    let genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre){
        res.status(400).send(`the id "${req.params.id}" is not correct`);
        return;
    };
    res.status(200).send('element deleted successfully');
});

router.get('/:id', async (req,res) => {
    let genre = await Genre.findById(req.params.id);
    if(!genre){
        res.status(400).send(`the id "${req.params.id}" is not exist`);
        return;
    };
    res.status(200).send(genre);
});

module.exports = router;