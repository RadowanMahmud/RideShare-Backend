const io = require('socket.io-client')
const http = require('http')

let socket = io.connect('http://localhost:9001/communication')

const search = {
    id: '',
    positionX: Math.random(),
    positionY: Math.random(),
}

const fetchAllDrivers = {
    hostname: 'localhost',
    port: 9000,
    path: '/info/driver',
    method: 'Get',
}
const fetchAllRiders = {
    hostname: 'localhost',
    port: 9000,
    path: '/info/rider',
    method: 'Get',
}

let drivers = []
let riders = []
let chkdriver = false
let chkrider = false

const reqDriver = http.request(fetchAllDrivers, res => {
    console.log(`statusCode: ${res.statusCode} \n`)
    res.on('data', d => {
        drivers = JSON.parse(d)
    })
})
reqDriver.end()

const reqRider = http.request(fetchAllDrivers, res => {
    console.log(`statusCode: ${res.statusCode} \n`)
    res.on('data', d => {
        riders = JSON.parse(d)
        if(drivers.length > 0){
            call()
        }
    })
})
reqRider.end()

function call(){
    console.log(drivers.length)
    console.log(riders.length)
}

if(chkdriver && chkrider){
    console.log("we are good to go")
}


socket.on('welcome',(data)=>{
    console.log(data)
})
