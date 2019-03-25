//phase 01 global variables and switch 

// using.env to hide keys
require("dotenv").config();

// global variables  needed to acces keys and npm installed packages

var axios = require("axios");
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
// fs package to read and write files
var fs = require("fs");

//// Grab all of the command line arguments from command, command-return and node-information
var command = process.argv;
var commandReturn = process.argv[2];
var commandInfo = process.argv[3];

// Here we create a for-loop that starts with **4** so we skip the path and node command from the command line
// We will use this for loop to build a string of words from the commandInfo.
for (var i = 4; i < command.length; i++) {
    commandInfo = command + "+" + command[i];
}


// The switch-case will direct which function gets run.
function start() {
    switch (commandReturn) {

        case "movie-this":
            movieThis();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;


        case "concert-this":
            concertThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}


//phase 02 functions for the switch case  functions  

// to do list : check on monday github, the bands in town api , and there is an error with my spotify

// function spotifyThisSong

function spotifyThisSong(){
    // this is no song is provided then the program by default will render "The Sign" by Ace of Base
    if (commandInfo === undefined){
        commandInfo = "The+Sign+Ace+of+Base";
    }

    spotify.search({ type: 'track', query: commandInfo })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
}


// i want to see the data response display in the terminal from the bands api .

// function concertThis(){
//     // run a request with axios to the bands in town  API with the artist specified
//     var queryURL =  "https://rest.bandsintown.com/artists/" + commandInfo + "/events?app_id=codingbootcamp";

//     // This line is just to help us debug against the actual URL.
//     console.log(queryUrl);

//     axios.get(queryUrl).then(
//         function(response) {
//             console.log(response);

//         }
//       );
// }










