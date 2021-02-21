const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
  console.log('messages queue:', messageQueue);
};
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }
  if (req.method === 'GET') {
    if (req.url === '/background.jpg') {
      console.log('in /background.jpg')
      fs.readFile(module.exports.backgroundImageFile, (error, data) => {
        if (error) {
          res.writeHead(404, headers);
          res.end();
          next();
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
          res.end();
          next();
        }
      });
    }
    if (req.url === '/') {
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
      next();
    }
  }
  if (req.method === 'POST') {
    let fileData = Buffer.alloc(0);
    req.on('data', (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });
    req.on('end', () => {
      fs.writeFile(module.exports.backgroundImageFile, fileData, () => {
        res.writeHead(201, headers);
        res.end();
        next();
      });
    });
  }
};
