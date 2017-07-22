
var key = require("./keys.js");
var inquirer = require("inquirer");
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");
var apiCall = process.argv[2];
var file = '../random.txt';
var logFile = '../log.txt';
var nodeArgs = process.argv.slice(3);



if (apiCall === 'my-tweets'){
	tweety();
}
else if (apiCall === 'spotify-this-song'){
	singy();
}
else if (apiCall === 'movie-this'){
	moviey();
}
else if (apiCall === 'do-what-it-says'){
	readFile();
}
else{
	return log('Invalid API Call Input!');
}

function tweety(){

	var client = new Twitter(key.twitterKeys);

	var params = {screen_name: 'followtimm'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error){
	  	return log(error);
	  }
	  if (!error) {
	  	for (var i = 0; i < 20; i++) {
	  		log(tweets[i].text);
	  		log(tweets[i].created_at);
	  	}
	  }
	});

}

function singy(){

	var song = 'The Sign';
	if (process.argv[3]!= null) {
		// song = process.argv[3];
		var song = "";

		// Loop through all the words in the node argument
		// And do a little for-loop magic to handle the inclusion of "+"s
		for (var i = 0; i < nodeArgs.length; i++) {

		  if (i > 0 && i < nodeArgs.length) {

		    song = song + "+" + nodeArgs[i];

		  }else {

		  	song += nodeArgs[i];

		  }
		}
	}

	key.spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
		
		if (err) {
			return log('Error occurred: ' + err);
		}

		var object = data.tracks.items[0];
		log('Artist: ' + object.album.artists[0].name);
		log('Song: ' + object.name);
		log('Preview: ' + object.preview_url);
		log('Album: ' + object.album.name);

	});
}

function moviey(){
	var movieName = 'Mr. Nobody';
	if (process.argv[3]!= null) {

		// Create an empty variable for holding the movie name
		var movieName = "";

		// Loop through all the words in the node argument
		// And do a little for-loop magic to handle the inclusion of "+"s
		for (var i = 0; i < nodeArgs.length; i++) {

		  if (i > 0 && i < nodeArgs.length) {

		    movieName = movieName + "+" + nodeArgs[i];

		  }else {

		  	movieName += nodeArgs[i];

		  }
		}

	}

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	// This line is just to help us debug against the actual URL.
	log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {
	  	var data = JSON.parse(body);
	  	log("Title: " + data.Title);
	  	log("Release Year: " + data.Year);
	  	log("IMDB Rating: " + data.imdbRating);
	  	log("Rotten Tomatoes: " + data.Ratings[1].Value);
	  	log("Produced In: " + data.Country);
	  	log("Language: " + data.Language);
	  	log("Plot Summary: " + data.Plot);
	  	log("Actors: " + data.Actors);

	  }
	});
}


function readFile(){

	fs.readFile(file,'utf8', function(error, data){

		if (error){
			return log(error);
		}else{
		
			var dataArr = data.split(',');
			apiCall = dataArr[0];
			log('New api call based on' + apiCall);

			if (apiCall === 'my-tweets'){
				tweety();
			}
			else if (apiCall === 'spotify-this-song'){
				singy();
			}
			else if (apiCall === 'movie-this'){
				moviey();
			}
			else{
			 log('Invalid API Call Input From Random File!');
			}
		}

	});
}

function log(message) {

   console.log(message);
   writeFile(message);

}

function writeFile(message){

	fs.appendFile(logFile, message+'\n', function(err) {

	  // If an error was experienced we say it.
	  if (err) {
	    log(err);
	  }

	});
}