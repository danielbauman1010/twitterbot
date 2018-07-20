var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

function searchTweets(querry, limit) {
  return new Promise(function(resolve,reject){
    var qry = querry +  "-filter:retweets -filter:replies";
    Twitter.get('search/tweets', {q: qry, tweet_mode: 'extended',count: limit}, function(err, res){
      if(err){
        reject(err);
      } else {
        var statusList = res.statuses;
        resolve(statusList);
      }
    });
  });
}

module.exports.searchTweets = searchTweets;
