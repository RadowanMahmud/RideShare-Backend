const express = require('express')
const router = express.Router()
const Driver = require('../models/Driver')

router.get('/', async (req,res) => {
    try{
        const drivers = await Driver.find()
        res.json(drivers)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/', async (req,res) => {
    const driver = new Driver({
        name: req.body.name,
        car: req.body.car,
        positionX: req.body.positionX,
        positionY: req.body.positionY,
        rating: req.body.rating,
    })
    try{
        console.log(req)
        const  result = await driver.save()
        res.json(result)
    }catch (err){
        res.send('Error' + err)
    }
})

module.exports = router
