
const http = require('http');

const socketio = require('socket.io');

// http server with node
const server = http.createServer((req, res) => {
    res.end('Connected!');
});

const io = socketio(server);

io.on('connection', (socket, req) => {
    socket.emit('welcome', 'Welcome to the server!')
    socket.on('message', (msg) => {
        console.log(msg);
    });
});

server.listen(8008);

