const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/MyExpressDatas'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open',function (){
    console.log('connected-----')
})

app.use(express.json())

const driverrouter = require('./routers/driver')
app.use('/driver',driverrouter)


app.listen(9000, () => {
    console.log('server opened at port number 9000')
})
