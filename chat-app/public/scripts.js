const socket = io('http://localhost:9009');
const socket2 = io('http://localhost:9009/admin');

socket.on('messageFromServer', dataFS => {
    console.log(dataFS);
    socket.emit('messageToServer', {data: 'Data From Client!'});
});

socket2.on('welcome', dataFS => {
    console.log(dataFS);
});

socket.on('joined', (msg) => {
    console.log(msg);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
   const newMsg = document.querySelector('#user-message').value;
   socket.emit('newMsgToServer', {text: newMsg});
})
