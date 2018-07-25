const express = require('express');
const router = express.Router();
const Beer = require('../models/beer');

//routes at /beer only
router.get('/', (req, res) => {
    Beer.find((err, beers) => {
        if(err){
            res.send(err)
        } else {
            res.send(beers)
        }
    })
});

router.post('/', (req, res) => {
    let beer = new Beer();
    beer.name = req.body.name
    beer.rating = req.body.rating
    beer.save((err, beer) => {
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).send('Beer posted ' + beer)
        }
    })
});

//routes at /beers:beer_id
router.get('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if(err){
            res.send(err)
        }else{
            res.json(beer)
        }
    })
})

router.put('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if(err){
            res.send(err)
        }else{
            beer.name = req.body.name
            beer.rating = req.body.rating

            beer.save((err, beer) => {
                if(err){
                    res.send(err)
                }else{
                    res.send(`Beer posted\n ${beer}`)
                }
            })
        }
    })
})

router.delete('/:beer_id', (req, res) => {
    Beer.deleteOne({
        _id: req.params.beer_id
    }, (err) => {
        if(err){
            res.send(err)
        }else{
            res.send('deleted beer id ' + req.params.beer_id)
        }
    })
})

module.exports = router;