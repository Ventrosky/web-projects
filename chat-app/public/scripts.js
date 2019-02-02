const socket = io('http://localhost:9009');
//const socket2 = io('http://localhost:9009/Wiki');
//const socket3 = io('http://localhost:9009/Mozilla');
//const socket4 = io('http://localhost:9009/Linux');
//console.log(socket.id);
//socket.on('connect', ()=>{
//    console.log(socket.id);
//});

socket.on('nsList', (nsData)=>{
    console.log('List recived');
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach(ns => {
        namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" />`;
    });

    Array.from(document.getElementsByClassName('namespace')).forEach(elem=>{
        elem.addEventListener('click', e =>{
            const nsEndpoint = elem.getAttribute('ns');
            console.log(`${nsEndpoint} click`);
        })
    });
    joinNs("/wiki");
})

//socket.on('messageFromServer', dataFS => {
//    console.log(dataFS);
//    socket.emit('messageToServer', {data: 'Data From Client!'});
//});
//socket.on('welcome', dataFS => {
//    console.log(dataFS);
//});
//socket.on('joined', (msg) => {
//    console.log(msg);
//})

