var express = require('express');
var router = express.Router();
const http = require('http');
const multer = require('multer');
const fs = require('fs');
const csv = require('csvtojson');
const upload = multer({ dest: 'tmp/csv/' });




/* GET home page. */

module.exports = (db) => {
  
  router.get('/', function(req, res, next) {
    res.send("hello jeff you are awesome")
  });
  
  router.post('/', upload.single('file'), async (req, res) => {
    console.log("hi")

    const jsonArray=await csv().fromFile(req.file.path)
    console.log("jsonArray", jsonArray)
    res.send("done")

  });
  
  return router;

}


