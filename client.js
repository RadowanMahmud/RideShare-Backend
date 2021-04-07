const io = require('socket.io-client')
const http = require('http')

let socket = io.connect('http://localhost:9001/communication')

const driver = JSON.stringify({
    name: 'a',
    car: 'toyota',
    positionX: 0,
    positionY: 0,
    status: false,
    rating: 5,
})

const options = {
    hostname: 'localhost',
    port: 9000,
    path: '/info/driver',
    method: 'Get',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Content-Length': driver.length
    // }
}

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

//req.write(data)
req.end()

socket.on('welcome',(data)=>{
    console.log(data)
})
