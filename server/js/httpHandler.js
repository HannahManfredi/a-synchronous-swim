const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS'){
    res.writeHead(200, headers);
    res.end(next);
  } else if (req.method === 'GET') {
    //handling commands
    console.log('req: ', req)
    if (messages.dequeue) {
      res.writeHead(200, headers);
      res.write(messages.dequeue.toString());
      res.end(next);
    }
    } else if (backgroundImageFile) {
      //use multipartutils getFile func
       //handling background img
      // if data === !image
        // return 404
    }
  }
};
