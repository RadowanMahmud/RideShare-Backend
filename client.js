const io = require('socket.io-client')

let socket = io.connect('http://localhost:9001')

socket.on('welcome',(data)=>{
    console.log(data)
})
