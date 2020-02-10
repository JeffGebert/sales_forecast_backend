var express = require('express');
var router = express.Router();
const http = require('http');
const multer = require('multer');
const fs = require('fs');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });




/* GET home page. */

module.exports = (db) => {
  
  router.get('/', function(req, res, next) {
    res.send("hello jeff you are awesome")
  });
  
  router.post('/', upload.single('file'), function (req, res) {
    console.log("hi")
    console.log("req.file", req.file)
    console.log("req.file.path", req.file.path)
    
    const fileRows = [];
    csv.fromPath(req.file.path)
      .on('data', function (data) {
        console.log("started")
        fileRows.push(data);
        
      })
      .on('end', function () {
        console.log("finished")
        res.send("finished mother fucker")
        fs.unlinkSync(req.file.path);
        //process "fileRows" and respond
      })
  });
  
  
  return router;

}


