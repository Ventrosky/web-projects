const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./public/data/namespaces');
console.log(namespaces);

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9009);
const io = socketio(expressServer);

io.on('connection',(socket)=>{
    let nsData = namespaces.map(ns =>{
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })

    console.log(nsData);
    socket.emit('nsList',nsData);
    //socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    //socket.on('messageToServer',(dataFromClient)=>{
    //    console.log(dataFromClient)
    //})
    //socket.on('newMessageToServer',(msg)=>{
    //    // io.emit('messageToClients',{text:msg.text})
    //    io.of('/').emit('messageToClients',{text:msg.text})
    //})
    //setTimeout(()=>{
    //    io.of('/admin').emit('welcome',"Welcome to the admin channel, from the main channel!")
    //},2000)
})

namespaces.forEach((namespace) =>{
    io.of(namespace.endpoint).on('connection',(nsSocket)=>{
        console.log(`${nsSocket.it} has join ${namespace.endpoint}`);
        nsSocket.emit('nsRoomLoad', namespaces[0].rooms)
    })
})

//io.of('/admin').on('connection',(socket)=>{
//    console.log("Someone connected to the admin namespace!")
//    io.of('/admin').emit('welcome',"Welcome to the admin channel!");
//})