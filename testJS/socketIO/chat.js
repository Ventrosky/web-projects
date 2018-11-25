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
    socket.on('newMsgToServer', msg => {
        //console.log(msg);
        io.emit('messageToClients', {text: msg.text});
    })
})