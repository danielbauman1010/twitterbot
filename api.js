var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

function searchTweets(querry, limit) {
  return new Promise(function(resolve,reject){
    var qry = querry +  "-filter:retweets -filter:replies";
    Twitter.get('search/tweets', {q: qry, tweet_mode: 'extended', result_type: 'popular',count: limit}, function(err, res){
      if(err){
        reject(err);
      } else {
        var statusList = res.statuses;
        resolve(statusList);
      }
    });
  });
}

function findHashtags(text){
  hashtags = [];
  words = text.split(' ');
  for(i in words) {
    if(words[i].startsWith("#")) {
      hashtags.push(words[i]);
    }
  }
  return hashtags;
}

function expandHashtags(hashtagList, count){
  return new Promise(function(resolve,reject){
    expansionStep(hashtagList, {}).then(function(results){
      resultList = Object.entries(results);
      resultList = resultList.sort( (hash1, hash2) => {
        return hash2[1] - hash1[1];
      });
      var limit = count;
      if(limit > resultList.length) {
        limit = resultList;
      }
      let returnedList = [];
      for (var i = 0; i < limit; i++) {
       returnedList.push(resultList[i][0]);
      }
      resolve(returnedList);
    }, function(err){
      reject(err);
    });
  });
}

// Recursive solution:
function expansionStep(hashtagList, expandedTags){

  return new Promise(function(resolve,reject){

      searchTweets(hashtagList.pop(), 100).then(function(tweets){

        tweets.forEach(tweet => {
          var tweetText = tweet.full_text;
          tweetText = tweetText.split('\t').join(' ');
          tweetText = tweetText.split('\n').join(' ');
          tweetText = tweetText.split(',').join(' ');
          tweetText = tweetText.split('.').join(' ');
          tweetText = tweetText.split('?').join(' ');
          tweetText = tweetText.split('!').join(' ');
          tweetText = tweetText.toLowerCase();
          findHashtags(tweetText).forEach(tag => {
            if(tag in expandedTags) {
              expandedTags[tag] += 1;
            } else {
              expandedTags[tag] = 1;
            }
          });
        });

        if(hashtagList.length == 0){
          resolve(expandedTags);
        } else {
          resolve(expansionStep(hashtagList, expandedTags));
        }

      }, function(err){
        reject(err);
      });

  });

}

module.exports.searchTweets = searchTweets;
module.exports.findHashtags = findHashtags;
module.exports.expandHashtags = expandHashtags;
module.exports.expansionStep = expansionStep;
