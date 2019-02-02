const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./public/data/namespaces');
console.log(namespaces);

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9009);
const io = socketio(expressServer);

io.on('connection',(socket)=>{
    //console.log(socket.handshake);
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
        //console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
        const username = nsSocket.handshake.query.username;
        nsSocket.emit('nsRoomLoad', namespace.rooms);

        nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback)=>{
            const roomToLeave = Object.keys(nsSocket.rooms)[1];
            nsSocket.leave(roomToLeave);
            updateUsersInRoom(namespace, roomToLeave);
            nsSocket.join(roomToJoin);
            //io.of('/wiki').in(roomToJoin).clients((errors, clients)=>{
            //    numberOfUsersCallback(clients.length);
            //});
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomToJoin;
            });
            nsSocket.emit('historyCatchUp', nsRoom.history);
            updateUsersInRoom(namespace, roomToJoin);
        });

        nsSocket.on('newMsgToServer',(msg)=>{
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: username,
                avatar: 'https://via.placeholder.com/30'
            }
            //console.log(fullMsg); 
            const roomTitle = Object.keys(nsSocket.rooms)[1];
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomTitle;
            })
            nsRoom.addMessage(fullMsg);
            io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg);
        });
    })
})

function updateUsersInRoom(namespace, roomToJoin){
    io.of(namespace.endpoint).in(roomToJoin).clients((errors, clients)=>{
        io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers',clients.length);
    });
}

//io.of('/admin').on('connection',(socket)=>{
//    console.log("Someone connected to the admin namespace!")
//    io.of('/admin').emit('welcome',"Welcome to the admin channel!");
//})