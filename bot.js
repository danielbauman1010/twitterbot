var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);





/*

Retweet test: Works.

Twitter.get('search/tweets', {q: "#bitcoin", count: 10}, function(err, reply){
  if(err){
    console.log(err);
  } else {
    var tweet = reply.statuses[0];
  	Twitter.post('statuses/retweet/:id', { id: tweet.id_str }, function(){
      console.log("Success.");
    });
  }
});

*/





/*

Favorite test: Works.

Twitter.get('search/tweets', {q: 'hello world! //twitted by a bot', count: 1}, function(err,reply){
  if(err){
    console.log(err);
  } else {
    var tweet = reply.statuses[0];
    Twitter.post('favorites/create', {id: tweet.id_str}, function(){
      console.log("Success.");
    });
  }
});

*/





/*

Posting test: Works.

Twitter.post('statuses/update', { status: 'hello world! //twitted by a bot' }, function(err, data, response) {
  console.log(data)
});

*/
