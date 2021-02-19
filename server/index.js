const keypressHandler = require('./js/keypressHandler.js');
const messages = require('./js/messageQueue.js');
const httpHandler = require('./js/httpHandler.js');

keypressHandler.initialize((message) => {
  console.log(`Message received: ${message}`);
  messages.enqueue(message);
});

const http = require('http');
const server = http.createServer(httpHandler.router);
//Theory: the request = terminal command (our input)

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);

