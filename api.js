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

function getFollowers(username,cursor_str) {
  return new Promise(function(resolve,reject){
    Twitter.get("followers/list", {screen_name: username,count: 200, cursor: cursor_str}, function(err,res){
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function findMostInfluencialFollowers(username, cursor_str, list, count) {
  return new Promise(function(resolve, reject) {
    getFollowers(username,cursor_str).then(function(res){
      res.users.forEach(u => {
        let uobj = [];
        uobj.push(u.screen_name);
        uobj.push(u.followers_count);
        list.push(uobj);
      });
      if(res.next_cursor_str == 0) {
        list.sort((u1, u2) => {
          return u2[1]-u1[1];
        });
        results = [];
        let limit = count;
        if(limit>list.length){
          limit = list.length;
        }
        for (var i = 0; i < limit; i++) {
          results.push(list[i]);
        }
        resolve(results);
      } else {
        resolve(findMostInfluencialFollowers(username, res.next_cursor_str, list, count));
      }
    },function(err){
      reject(err);
    });
  });
}

module.exports.searchTweets = searchTweets;
module.exports.findHashtags = findHashtags;
module.exports.expandHashtags = expandHashtags;
module.exports.expansionStep = expansionStep;
module.exports.getFollowers = getFollowers;
module.exports.findMostInfluencialFollowers = findMostInfluencialFollowers;
