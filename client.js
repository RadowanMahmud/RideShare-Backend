const io = require('socket.io-client')
const http = require('http')

let socket = io.connect('http://localhost:9000/communication')

const search = {
    id: '',
    positionX: Math.random(),
    positionY: Math.random(),
}

const fetchAllDrivers = {
    hostname: 'localhost',
    port: 9000,
    path: '/driver/fetch',
    method: 'Get',
}
const fetchAllRiders = {
    hostname: 'localhost',
    port: 9000,
    path: '/rider/fetch',
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

const reqRider = http.request(fetchAllRiders, res => {
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
