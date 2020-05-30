const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const User = require('./src/models/user')
const userRoute = require('./src/routes/user-routes')
const roomRoute = require('./src/routes/room-routes')
require('./src/database/mongoose')
const request = require('request')



const app = express()
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(userRoute)
app.use(roomRoute)

const server = http.createServer(app)


const io = socketio(server)
const port = process.env.PORT


io.on('connection', (socket) => {
    //connect to the new room
    socket.on('roomConnection',(roomID)=>{
        socket.join(roomID)
    })
    //leave all rooms
    socket.on('leaveAllRooms',()=>{
        socket.leaveAll();
    })
    //Get Message from user
    socket.on('new-message',(email,message,roomID)=>{
        //socket.join(roomID) //join the room
        request.post({// add data To Server
            url: "http://localhost:3000/rooms/saveMessage",
        json: true,
        body: {
            "roomID":roomID,
	        "email":email,
	        "message":message
        }},(error,res,body)=>{
            if (error){
                console.log(`Error ${error}`)
            }
            //console.log(body)
        })
        socket.broadcast.to(roomID).emit('new-message',email,message)
        
    })
})
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})