const http=require('http')
const express=require('express')

const path=require("path")

const app=express()
const server=http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve("./public")))

app.get('/',(req,res)=> {
    res.sendFile('/public/index.html')
})

io.on('connection', (socket) => {
    // console.log('a user connected');
    socket.on('user-message',(message)=> {
        // console.log("New User Message",message)
        io.emit('message',message)
    })
  });


server.listen(9000,()=> console.log("Server is started"))
