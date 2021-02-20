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
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end(next);
  }
  if (req.method === 'GET') {
    if (req.url === '/background.jpg') {
      fs.readFile(this.backgroundImageFile, (error, data) => {
        if (error) {
          res.writeHead(404, headers);
          res.end();
          next();
        } else if (data) {
          // console.log('img data from router: ', data.toString());
          res.writeHead(200, headers);
          fs.createReadStream('/background.jpg').pipe(res);
          // res.write(data);
          res.end();
          next();
        }
      });
    }
    if (messages.messages) {
      res.writeHead(200, headers);
      res.write(messages.dequeue.toString());
      res.end();
      next();
    }
  }
  // if (req.method === 'POST') {

  //   .on('data')

  //   .on('end')
  // }
};
