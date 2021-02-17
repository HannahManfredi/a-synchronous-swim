const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

if (req.method === 'OPTIONS'){
  res.writeHead(200, headers);
  res.end(next);
} else {
  // handles the GET request
  const validMessages = ['left', 'right', 'up', 'down'];
  const index = Math.floor(Math.random() * 3);
  let command = validMessages[index];

  res.writeHead(200, headers);
  res.write(command);
  res.end(next);
}

};
