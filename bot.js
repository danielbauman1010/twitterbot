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
    let response = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css\" integrity=\"sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B\" crossorigin=\"anonymous\"></head><body><div class=\"container-fluid\"><ul class=\"list-group\">";
    let counter = 0;
    for(i in results){
      response += "<li class=\"list-group-item\">"+results[i]+"</li>";
      counter++;
    }
    response += "</ul><p>found "+counter+" hashtags</p><br><a href=\"/\">Back</a></div></body></html>";
    res.end(response);
  },function(err){
    res.end("Sorry, there was a problem with the request: "+err.message);
  })
});

server.get('/followers', function(req,res){
  var username = req.query.username;
  var count = Number(req.query.count);
  api.findMostInfluencialFollowers(username,-1,[],count).then(function(results){
    let response = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css\" integrity=\"sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B\" crossorigin=\"anonymous\"></head><body><div class=\"container-fluid\"><ul class=\"list-group\">";
    let counter = 0;
    for(i in results){
      response += "<li class=\"list-group-item\">"+results[i]+"</li>";
      counter++;
    }
    response += "</ul><p>found "+counter+" hashtags</p><br><a href=\"/\">Back</a></div></body></html>";
    res.end(response);
  },function(err){
    res.end("Sorry, there was a problem with the request: "+err.message);
  })
});

server.listen(3000);
console.log("To use, enter the following address. To stop the process, press Ctrl and C simultaneously.");
console.log("http://localhost:3000/");
