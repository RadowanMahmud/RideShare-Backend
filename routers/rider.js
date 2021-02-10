const express = require('express')
const router = express.Router()
const Rider = require('../models/Rider')

router.get('/', async (req,res) => {
    try{
        const riders = await Rider.find()
        res.json(riders)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/', async (req,res) => {
    const rider = new Rider({
        name: req.body.name,
        positionX: req.body.positionX,
        positionY: req.body.positionY,
    })
    try{
        //console.log(req)
        const  result = await rider.save()
        res.json(result)
    }catch (err){
        res.send('Error' + err)
    }
})

module.exports = router
