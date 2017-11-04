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

$("#map").on('click', function(){
event.preventDefault();

  //grab user location selection
  var newLocation = $('#location').val().trim();

  database.ref("locations").push(newLocation);

});

//-----------------------------NYTimes API call-------------------------------------//
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
          //console.log(queryURL);
          console.log(r);
    //Once data is returned store the results in a variable
    var nyResults = r.response.docs;
          console.log(r.response)
    for (var i = 0; i < nyResults.length; i++) {
      var articles = $("<div>");
        articles.addClass("news");
        articles.attr("id", "newsSpot");
        $(".journalismContent").append(articles);

      //Add headline as link to article
      if (nyResults[i].headline.main !== "null") {
        $("#newsSpot").append("<h6 class='journalismTitle'><a href='"+nyResults[i].web_url+"' target='_blank'>" + nyResults[i].headline.main + '</h6>');
        // Log the first article's headline to console
        console.log(nyResults[i].headline.main);
        };

      var date = (moment(nyResults[i].pub_date, 'YYYY-DD-MMTHH:mm:ss.000').format('MM-DD-YYYY'));
      //console.log(date);

      //Add author and date
      if (nyResults[i].byline.original !== "null") {
      $("#newsSpot").append("<h7 class='journalismAuthor'>" + nyResults[i].byline.original + '<br>' + date + '<br>' + "</h7>");
        };
      //Add snippet
      if (nyResults[i].snippet && nyResults[i].snippet) {
        $("#newsSpot").append("<h7 class='journalismContent'>" + nyResults[i].snippet + "</h7>");
      };

    };
  });
};

//-----------------------------NYTimes Search API-------------------------------------//
//  $("#add-search").on("click", function(){
//     //userSearch.preventDefault();
//   var userSearch = $("#user-input").val().trim();
// console.log(userSearch);
// });

 $("#add-search").on("click", function getLocation(userSearch) {
    location.preventDefault();
//console.log("Article call is firing");
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json";
  queryURL += '?' + $.param({
    'api-key': "01779c7ce4234a8ab3ac8c8c29f9eeba",
    'q': location,
      })
    //Ajax call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(s) {
    //Console.log data received
          //console.log(queryURL);
          console.log(r);
    //Once data is returned store the results in a variable
    var nyUserSearch = s.response.docs;
          console.log(s.response)
    for (var i = 0; i < nyUserSearch.length; i++) {
      var articles = $("<div>");
        articles.addClass("news");
        articles.attr("id", "newsSpot");
        $(".mediaContent").append(articles);

      //Add headline as link to article
      if (nyUserSearch[i].headline.main !== "null") {
        $("#newsSpot").append("<h6 class='mediaTitle'><a href='" + nyUserSearch[i].web_url + "' target='_blank'>" + nyUserSearch[i].headline.main + '</h6>');
        // Log the first article's headline to console
        console.log(nyUserSearch[i].headline.main);
        };

      var date = (moment(nyUserSearch[i].pub_date, 'YYYY-DD-MMTHH:mm:ss.000').format('MM-DD-YYYY'));
      //console.log(date);

      //Add author and date
      if (nyUserSearch[i].byline.original !== "null") {
      $("#newsSpot").append("<h7 class='mediaAuthor'>" + nyUserSearch[i].byline.original + '<br>' + date + '<br>' + "</h7>");
        };
      //Add snippet
      if (nyUserSearch[i].snippet && nyUserSearch[i].snippet) {
        $("#newsSpot").append("<h7 class='mediaContent'>" + nyUserSearch[i].snippet + "</h7>");
      };

    };
  });
});