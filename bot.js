var api = require('./api.js')
var express = require('express');
var path = require('path');

var server = express();

server.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'index.html'));
});

server.get('/expand',function(req,res){
  var hashtagList = req.query.list;
  var count = Number(req.query.count);
  api.expandHashtags(hashtagList.split(' '),count).then(function(results){
    res.end(""+results);
  },function(err){
    res.end(err);
  })
});

server.listen(3000);
console.log("To use, enter the following address. To stop the process, press Ctrl and C simultaneously.");
console.log("http://localhost:3000/");
