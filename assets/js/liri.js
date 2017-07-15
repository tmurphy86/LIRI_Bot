
var key = require("./keys.js");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = process.argv[2];
var file = '../random.txt';
console.log(key);

var spotify = key.spotify;
console.log(spotify);

// Take in the command line arguments
var nodeArgs = process.argv.slice(2);

// inquirer
//   .prompt([
//     // Here we create a basic text prompt.
//     {
//       type: "input",
//       message: "What is your username?",
//       name: "username"
//     } .then(function(inquirerResponse) {

//     // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//     if (inquirerResponse.confirm && inquirerResponse.password==='password1') {
//       console.log("\nWelcome " + inquirerResponse.username);
//       console.log("Your " + inquirerResponse.stock + " is ready for trade!\n");
//     }
//     else {
//       console.log("\nThat's okay " + inquirerResponse.username + ", come again when you know your password.\n");
//     }
//   });

if (request === 'my-tweets'){

	var authTwitter = key.twitterKeys;
	// console.log(authTwitter);

	var client = new Twitter({
	  consumer_key: authTwitter.consumer_key,
	  consumer_secret: authTwitter.consumer_secret,
      access_token_key: authTwitter.access_token_key,
      access_token_secret: authTwitter.access_token_secret,

	});
	// console.log(client);
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

if (request === 'spotify-this-song'){
	if (process.argv[3]!= null) {
		spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  			if (err) {
    			return console.log('Error occurred: ' + err);
  			}
 
			console.log(data); 
		});

	} else {
		console.log('Required to enter song name');
	}

}
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