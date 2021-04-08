const express = require('express')
const mongoose = require('mongoose')
const app = express()
const http = require('http').createServer(app)
const sch = require('node-schedule')
const url = 'mongodb://localhost/MyExpressDatas'
const Driver = require('./models/Driver')
const Rider = require('./models/Rider')

const io = require('socket.io')(http)


io.of('communication').on('connection', (socket)=>{
    console.log("new user connected")
    const job = sch.scheduleJob('*/5 * * * * *', async function(){
         await getDist()
         for (const d of drivers) {
             let mindist = 10000000000;
             let selectedrider;
             for (const r of riders){
                 let dist = Math.sqrt((r.positionX-d.positionX)*(r.positionX-d.positionX)+(r.positionY-d.positionY)*(r.positionY-d.positionY))
                 // console.log(dist)
                 if(dist<mindist){
                     mindist = dist
                     selectedrider = r
                 }
             }
            // console.log(mindist)
             d.status = true
             const result = await d.save()
             selectedrider.status = true
             const r1 = await selectedrider.save()

             socket.emit("welcome", d.name +' has been matched with '+ selectedrider.name + ' and the fiar is ' + mindist*2 +' #'+ d._id)
             await getDist()
             console.log('\n'+drivers.length)
             console.log(riders.length)
         }
    });
})

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection

con.on('open',function (){
    console.log('connected-----')
})

let drivers = [];
let riders = [];

async function getDist(){
    try{
        drivers = await Driver.find({status : false})
        riders = await Rider.find({status : false})
    }catch (err){
        console.log(err)
    }

}

app.use(express.json())

const driverrouter = require('./routers/driver')
app.use('/driver',driverrouter)
const riderrouter = require('./routers/rider')
app.use('/rider',riderrouter)

app.post('/rating',async (req,res)=>{
    try{
        const driver = await Driver.findById(req.body.id)
        console.log(driver)
        driver.rating = (driver.rating+req.body.points)/2
        const result = await driver.save()
        res.send('ok')
    }catch (err){
        res.send(err)
    }
})

http.listen(9000,()=>{
    console.log('socket and server  opened at port 9000');
})
// app.listen(9000, () => {
//     console.log('server opened at port number 9000')
// })
