const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9009);
const io = socketio(expressServer);

io.on('connection', socket => {
    socket.emit('messageFromServer', {data: "Welcome to socket.io Server"});
    socket.on('messageToServer', dataFC => {
        console.log(dataFC);
    });  
    socket.join('level1');
    io.of('/').to('level1').emit('joined',`${socket.id} says I joined level 1 room!`);
})

io.of('/admin').on('connection', socket => {
    console.log("Someone connected to admin namespace")
    io.of('/admin').emit('welcome', "Welcome to the admin namespace!");
})