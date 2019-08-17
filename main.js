'use strict';

let axios = require('axios');

let config = require('./config');

let MongoClient = require('mongodb').MongoClient;
let mongoUrl = "mongodb+srv://"+config.mongoUser+":"+config.mongoPass+"@"+config.mongoCluster;

const headers = {
  "Authorization": "Bearer " + config.accessToken
};

//const hashtag = encodeURIComponent(config.hashtags[0]);

//const hashtags = []

for(var hashtag of config.hashtags) {

	hashtag = encodeURIComponent(hashtag)

	var url = config.url + "?q=" + hashtag + "&result_type=" + config.resultType + "&count=" + config.count;

	//console.log("Recuperando os ultimos tweets com a hashtag " + hashtag)

	//console.log("url: " + url)

	axios.get(url, {headers})
	  .then(response => {
	    //console.log(response.data)
	    var lastTweets = []
	    //console.log("lastTweets size = " + lastTweets.length)
	    //var count = 1;
	    //console.log("Valores a inserir na base")
	    for(var status of response.data.statuses) {
	    	/*console.log("\n\nitem: " + count)
	    	console.log(status.id)
	    	console.log(status.created_at)
	    	console.log(status.user.id)
	    	console.log(status.user.name)
	    	console.log(status.user.screen_name)
	    	console.log(status.user.followers_count)
	    	console.log(status.lang)
	    	console.log(status.user.user_location)
	    	console.log(config.hashtags[0])
	    	count++*/
	    	var tweet = {id: status.id,
	    		created_at: status.created_at,
	    		user_id: status.user.id,
	    		user_name: status.user.name,
	    		user_screen_name: status.user.screen_name,
	    		user_followers_count: status.user.followers_count,
	    		lang: status.lang,
	    		user_location: status.user.location,
	    		hashtag: config.hashtags[0]
	    	}
	    	lastTweets.push(tweet)
	    	/*console.log(tweet.id)
	    	console.log(tweet.created_at)
	    	console.log(tweet.user_id)
	    	console.log(tweet.user_name)
	    	console.log(tweet.user_screen_name)
	    	console.log(tweet.user_followers_count)
	    	console.log(tweet.lang)
	    	console.log(tweet.user_location)
	    	console.log(tweet.hashtag)*/
	    }
		console.log("lastTweets size = " + lastTweets.length)
		if(lastTweets.length > 0) {
		    MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
		    	if(err) throw err;
		    	var dbo = db.db("tweeterData")
		    	dbo.collection("lastTweets").insertMany(lastTweets, function(err, result) {
		    		if(err) throw err;
		    		console.log("Foram inseridos " + result.insertedCount + " documentos")
		    		db.close()
		    	})
		    })
		}
	  })
	  .catch(error => {
	    console.log(error)
	  });

}




