const http = require('http');
const routes = require('./routes');
const chalk = require('chalk');
const log = console.log;


const server = http.createServer(routes.handler);

server.listen(3000);
log(chalk.blue('server listen on port 3000'));