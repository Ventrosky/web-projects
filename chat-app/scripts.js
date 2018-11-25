const socket = io('http://localhost:9009');

socket.on('connect',()=> {
    console.log(socket.id);
})

socket.on('messageFromServer', dataFS => {
    console.log(dataFS);
    socket.emit('messageToServer', {data: 'Data From Client!'});
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
   const newMsg = document.querySelector('#user-message').value;
   socket.emit('newMsgToServer', {text: newMsg});
})

socket.on('messageToClients',(msg) => {
    console.log(msg);
    document.querySelector('#messages').innerHTML += `<li id="message">${msg.text}</li>`;
})
// socket.on('ping', () => {
//     console.log("Ping received from Server");
// })
// socket.on('pong', (latency) => {
//     console.log(latency);
//     console.log("Pong sent to the Server");
// })