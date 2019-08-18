'use strict';

let axios = require('axios');
let config = require('./config');

let MongoClient = require('mongodb').MongoClient;
let mongoUrl = "mongodb+srv://"+config.mongoUser+":"+config.mongoPass+"@"+config.mongoCluster;

const headers = {
  "Authorization": "Bearer " + config.accessToken
};

for(var hashtag of config.hashtags) {

	var url = config.url;

	axios.get(url, {
		params: {
			q: hashtag,
			result_type: config.resultType,
			count: config.count
		}, 
		headers})
	  .then(function(response) {
	    var lastTweets = []
	    console.log("Gravando os ultimos tweets com a hashtag " + response.config.params.q)
	    for(var status of response.data.statuses) {
	    	var tweet = {id: status.id,
	    		created_at: new Date(status.created_at),
	    		user_id: status.user.id,
	    		user_name: status.user.name,
	    		user_screen_name: status.user.screen_name,
	    		user_followers_count: status.user.followers_count,
	    		lang: status.lang,
	    		user_location: status.user.location,
	    		hashtag: response.config.params.q
	    	}
	    	lastTweets.push(tweet)
	    }
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
	  .catch(function(error) {
	    console.log(error)
	  });

}




