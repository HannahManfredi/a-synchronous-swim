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

//What do we care about:

// invoke next() at the end of a request to help with testing!
  //send get request to server
  //receive res containing random swim command (str)
    //left, right, up, down

  //how do we send a get request via terminal
  //how do we make sure res contains random data
    //link router to keypress handler to access the commands
      //we need to be able to generate random command from
        //const validMessages = ['left', 'right', 'up', 'down']; locally
    //how do we make sure res command (data) is random

  // we know that our server is created in index.js via the createServer func
    // our router is passed into createServer

    //right now we care about index.js and httpHandler
      //everything else is either for the spec or just a utility function that we don't need right now