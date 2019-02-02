function joinRoom(roomName){
    //send room name to srv
    nsSocket.emit('joinRoom', roomName, (newNumberOfMember)=>{
    document.querySelector(".curr-room-num-users").innerHTML = `${newNumberOfMember} <span class="glyphicon glyphicon-user"></span>`;
    })
    nsSocket.on('historyCatchUp', (history)=>{
        //console.log(history);
        const messagesUl = document.querySelector('#messages');
        messagesUl.innerHTML = "";
        history.forEach(msg => {
            const newMsg = buildHTML(msg);
            const currentMessage = messagesUl.innerHTML;
            messagesUl.innerHTML += currentMessage + newMsg;
        });
        messagesUl.scrollTo(0,messagesUl.scrollHeight);
    })
    nsSocket.on('updateMembers',(numMembers)=>{
        document.querySelector(".curr-room-num-users").innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span>`;
        document.querySelector(".curr-room-text").innerText = `${roomName}`;
    })
    let searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('input',(e)=>{
        let messages = Array.from(document.getElementsByClassName('message-text'));
        messages.forEach((msg)=>{
            if(msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1){
                msg.getElementsByClassName.display = "none";
            } else {
                msg.getElementsByClassName.display = "block";
            }
        })
    })
}