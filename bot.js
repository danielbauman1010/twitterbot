var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var hashtag = "#resist";
Twitter.get('search/tweets', {q: "#resist -filter:retweets -filter:replies", tweet_mode: 'extended',count: 10}, function(err, res){
  if(err){
    console.log(err);
  } else {
    var statusList = res.statuses;
    for(tweetIndex in statusList) {
      let tweet = statusList[tweetIndex];
      console.log(tweet.full_text);
      console.log(tweet.full_text.length);
      console.log(tweet.created_at);
      console.log('\n\n\n');
    }
  }
});


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
