//phase 01 global variables and switch 
// global variables  needed to acces keys and npm installed packages
// using.env to hide keys

require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
// fs package to read and write files
var fs = require("fs");

//// Grab all of the command line arguments from command, command-return and node-information
var command = process.argv;
var commandReturn = process.argv[2];
var commandInfo = process.argv[3];
console.log("The command is " + commandReturn + "and the command info is " + commandInfo);

// Here we create a for-loop that starts with **4** so we skip the path and node command from the command line
// We will use this for loop to build a string of words from the commandInfo.
for (var i = 4; i < command.length; i++) {
    commandInfo = commandInfo + "+" + command[i];
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

function spotifyThisSong() {
    console.log("Spotify this " + commandInfo);

    // this is no song is provided then the program by default will render "The Sign" by Ace of Base
    if (commandInfo === undefined) {
        commandInfo = "The+Sign+Ace+of+Base";
    }
    // response data retunrs one song    
    spotify.search({ type: 'track', query: commandInfo, limit: 1 })
        .then(function (response) {
            //   console.log(response);
            //   console.log(response.tracks.items[0]);
            var artists = ("Artists: " + response.tracks.items[0].album.artists[0].name);
            // console.log(artists);
            var songName = ("Song: " + response.tracks.items[0].name);
            // console.log(songName);
            var previewLink = ("Preview link: " + response.tracks.items[0].preview_url);
            // console.log(previewLink);
            var albumName = ("Album: " + response.tracks.items[0].album.name);
            // console.log(albumName);

            // append to log.txt
            fs.appendFile("log.txt", artists + "\n" + songName + "\n" + previewLink + "\n" + albumName + "\n" + "" + "\n", function (error) {
                // Checks to see if theres an error appending to the file
                if (error) {
                    console.log(error);
                } else {
                    console.log("Text is added to the log.txt");
                }
            })





        })



}


// i want to see the data response display in the terminal from the bands api .

function concertThis() {
    // run a request with axios to the bands in town  API with the artist specified
    var queryURL = "https://rest.bandsintown.com/artists/" + commandInfo + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryURL);

    axios.get(queryURL).then(
        function (response) {
            // console.log((response));
            // console.log(response.data[i].venue);
            // for loop for the venues
            for (let i = 0; i < response.data.length; i++) {
                var venueName = "Venue name: " + response.data[i].venue.name;
                // console.log(venueName);

                var venueLocation = "Venue location: " + response.data[i].venue.city + " , " + response.data[i].venue.region
                // console.log(venueLocation);

                var venueDate = "Venue Date: " + (response.data[i].datetime); // check the format for moment .format("L")
                // console.log(venueDate);

                // append to log.txt
                fs.appendFile("log.txt", venueName + "\n" + venueLocation + "\n" + venueDate + "\n" + "" + "\n", function (error) {
                    // Checks to see if theres an error appending to the file
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Text is added to the log.txt");
                    }
                })



            }

        }
    );
}

//  function movieThis

function movieThis() {
    // this is no movie is provided then the program by default will render "Mr. Nobody"
    if (commandInfo === undefined) {
        commandInfo = "Mr. +Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + commandInfo + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            //   console.log(response)

            var title = "Title" + response.data.Title;
            // console.log(title);
            var year = "year" + response.data.Year;
            // console.log(year);
            var imdbRatingResult = "IMDB Rating" + response.data.imdbRating;
            // console.log(imdbRatingResult);
            var rottenTomatoesRating = " Rotten Tomatoes Rating" + response.data.Ratings[1].value;
            //console.log(rottenTomatoesRating);
            var country = "Country" + response.data.Country;
            // console.log(country);
            var language = "language" + response.data.Language;
            // console.log(language);
            var plot = "Plot" + response.data.Plot;
            // console.log(plot);
            var actors = "Actors" + response.data.Actors;
            // console.log(actors);


            // append to log.txt
            fs.appendFile("log.txt", title + "\n" + year + "\n" + imdbRatingResult + "\n" + rottenTomatoesRating + "\n" + language + "\n" + country + "\n" + plot + "\n" + actors + "\n" + "" + "\n", function (error) {
                // Checkes to see if theres an error appending to the file
                if (error) {
                    console.log(error);
                } else {
                    console.log("Text is added to the log.txt");
                }
            })
        })
}

    // function doWhatItSays 
    // Running the readFile module that's inside of fs.
    // Stores the read information into the variable "data"
    // if error if found it will console log err
    function doWhatItSays(){  
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (error) {
        return console.log(error);
        }
        // reassign values and variables to text in random.txt file
         // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

    }
    // start();










