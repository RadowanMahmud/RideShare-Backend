const express = require('express')
const mongoose = require('mongoose')
const http = require('http').createServer()
const sch = require('node-schedule')
const url = 'mongodb://localhost/MyExpressDatas'

const io = require('socket.io')(http)

io.of('communication').on('connection', (socket)=>{
    console.log("new user connected")
    const job = sch.scheduleJob('*/5 * * * * *', function(){
        socket.emit("welcome","User is connected")
    });
})

const app = express()

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection

con.on('open',function (){
    console.log('connected-----')
})

app.use(express.json())

const driverrouter = require('./routers/driver')
app.use('/driver',driverrouter)
const riderrouter = require('./routers/rider')
app.use('/rider',riderrouter)

http.listen(9001,()=>{
    console.log('socket  opened at port 9001');
})
app.listen(9000, () => {
    console.log('server opened at port number 9000')
})
