function joinNs(endpoint){
    const nSocket = io(`http://localhost:9009${endpoint}`);
    nSocket.on('nsRoomLoad',(nsRooms)=>{
        console.log(nsRooms);
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = '';
        nsRooms.forEach((room)=>{
            let glyph;
            if(room.privateRoom){
                glyph = 'lock';
            } else {
                glyph = 'globe';
            }
            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
        })
        let roomNodes = document.getElementsByClassName('room');
        Array.from(roomNodes).forEach((elem)=>{
            elem.addEventListener("click",e => console.log("click",e.target.innerText));
        })
    })
    nSocket.on('messageToClients', msg => {
        document.querySelector('#messages').innerHTML = `<li>${msg.text}</li>`;
    })
    document.querySelector('.message-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newMsg = document.querySelector('#user-message').value;
        socket.emit('newMsgToServer', {text: newMsg});
    })
}
