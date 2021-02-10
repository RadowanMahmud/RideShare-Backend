const mongoose = require('mongoose')

const riderSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    positionX:{
        type: Number,
        required:true,
    },
    positionY:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        required: false
    }

})

module.exports = mongoose.model('Rider', riderSchema)
