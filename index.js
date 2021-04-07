const express = require('express')
const mongoose = require('mongoose')
const app = express()
const http = require('http').createServer(app)
const sch = require('node-schedule')
const url = 'mongodb://localhost/MyExpressDatas'

const io = require('socket.io')(http)

io.of('communication').on('connection', (socket)=>{
    console.log("new user connected")
    const job = sch.scheduleJob('*/10 * * * * *', function(){
         getDist(socket)
    });
})

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection

con.on('open',function (){
    console.log('connected-----')
})

function getDist(socket){
    socket.emit("welcome","User is connected")
}

app.use(express.json())

const driverrouter = require('./routers/driver')
app.use('/driver',driverrouter)
const riderrouter = require('./routers/rider')
app.use('/rider',riderrouter)

http.listen(9000,()=>{
    console.log('socket and server  opened at port 9000');
})
// app.listen(9000, () => {
//     console.log('server opened at port number 9000')
// })
