var api = require('./api.js')

var hashtaglist = ["#dc", "#marvel"];

api.searchTweets(hashtaglist[0], 10).then(function(results){
  for(i in results) {
    console.log("\n"+i);
    console.log(results[i].full_text);
    console.log("\n\n\n");
  }
},function(err){
  console.log(err);
});
