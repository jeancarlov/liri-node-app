// using.env to hide keys
require("dotenv").config();

// global variables  needed to acces keys and npm installed packages

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
// fs package to read and write files
var fs = require("fs");

//// Grab all of the command line arguments from Node, node-request and node- information 
var command = process.argv;
var commandReturn = process.argv[2];
var commandInfo = process.argv[3];

// Here we create a for-loop that starts with **4** so we skip the path and node command from the command line
// We will use this for loop to build a string of words from the commandInfo.
for (var i = 4; i < command.length; i++) {
    commandInfo = command + "+" + command[i];
}


// The switch-case will direct which function gets run.
switch (commandReturn) {
    case "spotify-this-song":
      spotifyThisSong();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "concert-this":
      concertThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }

    function concertThis(){
        // run a request with axios to the bands in town  API with the artist specified
        var queryURL =  "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);

        axios.get(queryUrl).then(
            function(response) {
                console.log(response);
              
            }
          );
          

    }
    


