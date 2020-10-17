var countryCode = [
  "gb",
  "at",
  "au",
  "br",
  "ca",
  "de",
  "fr",
  "in",
  "it",
  "nl",
  "nz",
  "pl",
  "ru",
  "sg",
  "us",
  "za",
];
// var categorySelect = $("#inputGroupSelect04").val();

console.log("Hello World");
$(document).ready(function () {
  console.log("ready");

  var queryURL = "";
  // "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=be3ea934&app_key=92b7a058356afbbaa6b1cf90c7bae1c1&results_per_page=20&what=" + category + "&content-type=application/json";
  
var apiBase = "https://api.teleport.org/api/cities/?search="
var querySecondURL = ""
var urbanSlugAPI = ""
var teleportURL = "" 
  
  
  function categorySelect() {
    var category = $("#inputGroupSelect04").val();
    queryURL =
      "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=be3ea934&app_key=92b7a058356afbbaa6b1cf90c7bae1c1&results_per_page=20&what=" +
      category +
      "&content-type=application/json";
    console.log(queryURL);
  }

  function geoIdentify(){
    var searchCity = $("#inputGroupSelect03").val()
    console.log(searchCity);
  
    
    $.ajax({
      url:apiBase + searchCity,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      querySecondURL = response._embedded["city:search-results"][0]._links["city:item"].href;
      // var embedBody = '<a class="teleport-widget-link" href="https://teleport.org/cities/aarhus/">Life quality score - Aarhus</a><script async class="teleport-widget-script" data-url="https://teleport.org/cities/aarhus/widget/scores/?currency=USD&citySwitcher=false" data-max-width="420" data-height="968" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>';
      // $("#life-quality").append(embedBody)
      urbanSlug();
      
  });
  };
  function urbanSlug(){
    $.ajax({
      url: querySecondURL,
      method: "GET"
    }).done(function(response){
      console.log(response);
      console.log(response._links["city:urban_area"].href);
      urbanSlugAPI = response._links["city:urban_area"].href;
      console.log(urbanSlugAPI);
      teleportSite();
      
  });
  };
  
  function teleportSite(){
    $.ajax({
      url: urbanSlugAPI,
      method: "GET"
    }).done(function(response){
      console.log(response);
      teleportURL = response.teleport_city_url
      // qualityofLife();
    });
  }
  
  $("#submit").on("click", function (event) {
    event.preventDefault();
    categorySelect();
    geoIdentify();
    var category = $("#inputGroupSelect04").val();
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // console.log(response);
      console.log("This is API response: ", response.results);
      // console.log(response.results[0].category);
      // console.log(response.results[0].company);
      // console.log(response.results[0].location);

      console.log("category ", category);
      for (var i = 0; i < response.results; i++);
      JSON.stringify(response.category);
      $(".description").text($(".category").text("category: " + category));
      $(".company").text("company: " + response.results[i].company);
      $(".location").text("location: " + location);
    });
  });


  var images = [
    "/City.jpg",
    "/mountain.jpg",
    "/small-city.jpeg",
    "/smalltowns.jpg",
  ];

  $(function () {
    var i = 0;
    $(".background").css("background-image", "url(images/" + images[i] + ")");
    setInterval(function () {
      // for (i = 0; i < images.length; i++)
      i++;
      if (i == images.length) {
        i = 0;
      }
      $(".background").fadeOut("slow", function () {
        $(this).css("background-image", "url(images/" + images[i] + ")");
        $(this).fadeIn("slow");
      });
    }, 5000);
  });

  //   var queryURL =
  //     "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=be3ea934&app_key=92b7a058356afbbaa6b1cf90c7bae1c1&results_per_page=20&what=javascript%20developer&content-type=application/json";
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   }).then(function (response) {
  //     console.log(response);
  //   });
});

