//---------------------Firebase--------------------------------------//
  var config = {
    apiKey: "AIzaSyAuR6SOo3-eO7apiuHGGI8Ga_D9l_gWDa8",
    authDomain: "group-project-1-50c82.firebaseapp.com",
    databaseURL: "https://group-project-1-50c82.firebaseio.com",
    projectId: "group-project-1-50c82",
    storageBucket: "",
    messagingSenderId: "345184424946"
  };

  firebase.initializeApp(config);

var database = firebase.database();


// ---- The below code was simplified and added to the map.js file---//

// $("#map").on('click', function(){
// event.preventDefault();

//   //grab user location selection
//   var newLocation = $('#location').val().trim();

//   database.ref("locations").push(newLocation);

// });

//-----------------------------NYTimes GEO API call-------------------------------------//
function getLocation(lat, lon) {
//console.log("Article call is firing");
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json";
  queryURL += '?' + $.param({
    'api-key': "01779c7ce4234a8ab3ac8c8c29f9eeba",
    'latitude': lat,
    'longitude': lon
      })
    //Ajax call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(r) {
    //Console.log data received
    //    console.log(r);
    //Once data is returned store the results in a variable
    var nyResults = r.response.docs;
    //      console.log(r.response)

    //Empty the div when results are generated
    $("#left").empty();
  database.ref("searches").push("#user-input");


    for (var i = 0; i < nyResults.length; i++) {
      var articles = $("<div>");
        articles.addClass("journalismResultDiv");
        articles.addClass("serif");
        articles.attr("id", "journalismResultDiv" + [i]);
        $("#left").append(articles);

      //Add headline as link to article
      if (nyResults[i].headline.main !== "null") {
        $("#journalismResultDiv" + [i]).append("<p class='journalismTitle'><a href='" + nyResults[i].web_url + "' target='_blank'>" + nyResults[i].headline.main + '</p>');
        // Log the first article's headline to console
        //console.log(nyResults[i].headline.main);
        };

      var date = (moment(nyResults[i].pub_date, 'YYYY-DD-MMTHH:mm:ss.000').format('MM-DD-YYYY'));
      //console.log(date);

      //Add author and date
      if (nyResults[i].byline.original !== "null") {
      $("#journalismResultDiv" + [i]).append("<p class='journalismAuthor'>" + nyResults[i].byline.original + ' ' + date + "</p>");
        };
      //Add snippet
      if (nyResults[i].snippet && nyResults[i].snippet) {
        $("#journalismResultDiv" + [i]).append("<p class='journalismContent'>" + nyResults[i].snippet + "</p>");
      };

    };
  });
};

//-----------------------------NYTimes Search API call-------------------------------------//

 $('#add-search').on("click", function userSearch(userLocation) {
   event.preventDefault();
    var userLocation = $('#user-input').val();
    console.log(userLocation);
   //Create queryURL
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json";
  queryURL += '?' + $.param({
    'api-key': "01779c7ce4234a8ab3ac8c8c29f9eeba",
    'q': userLocation,
      })
    //Ajax call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(s) {
    //Once data is returned store the results in a variable
    var nyUserSearch = s.response.docs;
          console.log(s.response)
    //Empty the div when results are generated
    $("#right").empty();     
      var searchArticles = $("<div>");
        searchArticles.addClass("mediaResultDiv");
        searchArticles.addClass("serif");
        searchArticles.attr("id", "mediaResultDiv");
        $("#right").append(searchArticles);
    for (var i = 0; i < nyUserSearch.length; i++) {


      //Add headline as link to article
      if (nyUserSearch[i].headline.main !== "null") {
        $("#mediaResultDiv").append("<p class='mediaTitle'><a href='" + nyUserSearch[i].web_url + "' target='_blank'>" + nyUserSearch[i].headline.main + '</p>');
        // Log the first article's headline to console
        console.log(nyUserSearch[i].headline.main);
        };

      var date = (moment(nyUserSearch[i].pub_date, 'YYYY-DD-MMTHH:mm:ss.000').format('MM-DD-YYYY'));
      //console.log(date);

      //Add author and date
      if (nyUserSearch[i].byline.original !== "null") {
      $("#mediaResultDiv").append("<p class='mediaAuthor'>" + nyUserSearch[i].byline.original + '<br>' + date + '<br>' + "</p>");
        };
      //Add snippet
      if (nyUserSearch[i].snippet && nyUserSearch[i].snippet) {
        $("#mediaResultDiv").append("<p class='mediaContent'>" + nyUserSearch[i].snippet + "</p>");
      };

    };
  });
});