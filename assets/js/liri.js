
var key = require("./keys.js");
var Twitter = require('twitter');
var request = process.argv[2];
var file = '../random.txt';
console.log(key);


if (request === 'my-tweets'){

	var authTwitter = key.twitterKeys;
	// console.log(authTwitter);

	var client = new Twitter({
	  consumer_key: authTwitter.consumer_key,
	  consumer_secret: authTwitter.consumer_secret,
      access_token_key: authTwitter.access_token_key,
      access_token_secret: authTwitter.access_token_secret,

	});
	console.log(client);
	var params = {screen_name: 'followtimm'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error){
	  	return console.log(error);
	  }
	  if (!error) {
	  	for (var i = 0; i < 20; i++) {
	  		console.log(tweets[i].text);
	  		console.log(tweets[i].created_at);
	  	}
	   //  console.log(tweets);
	  }
	});

}

// if (request === 'spotify-this-song'){
// writeFile();
// readFile();

// }
// if (request === 'movie-this'){
// writeFile();
// readFile();

// }
// if (request === 'do-what-it-says'){
// writeFile();
// readFile();

// }
else{
	return console.log('Invalid Input');
}



// function readFile(){


// 	fs.readFile(file,'utf8', function(error, data){

// 		if (error){
// 			return console.log(error);
// 		}
		
// 		var dataArr = data.split(',');
// 		var wallet =0;

// 		for (var i = 0; i < dataArr.length; i++) {
// 		// console.log(dataArr[i].trim());
// 		// console.log(wallet);
// 		 wallet = (wallet + (parseFloat(dataArr[i].trim())));
// 		}

// 		return console.log('Total: '+(wallet.toFixed(2)));


// 	});
// }


// function writeFile(){

// 	fs.appendFile(file, ','+money, function(err) {

// 	  // If an error was experienced we say it.
// 	  if (err) {
// 	    console.log(err);
// 	  }

// 	  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
// 	  else {
// 	    console.log("Account Adjusted: "+money);
// 	  }

// 	});
// }