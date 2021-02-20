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
        } else {
          res.writeHead(200, headers);
          res.write(data);
          res.end(data);
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
};

//TASK:
// Add a background image to the pool! For basic requirements, this feature should only support JPEG images. The file, ./background.jpg, is designated as the file for storing a background image in your server. For your convenience, this file is gitignored and configured for use in your source files. Sample images are provided in the spec folder.

// If the background file isn't present, the server should return a 404. If the file is present, the file should be sent in response to a client request for it. A test for the 404 scenario is mostly complete; enable the test (change xit to it) and fill in the blanks. Then write the test for the success case.
// Modify your GET handler to also respond to requests for a background image. Your background image tests should now be passing.
// Be sure to update prior tests and the app code as needed to complete the feature and not break any prior features. Copy one of the images from the spec folder, then reload your client to confirm your background image is loaded correctly.