console.log("Hello World");
$(document).ready(function () {
  console.log("ready");
  

    // $(".background").css("background-image", "url('City.jpg')");
 

  var queryURL = "";
  // "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=be3ea934&app_key=92b7a058356afbbaa6b1cf90c7bae1c1&results_per_page=20&what=" + category + "&content-type=application/json";

  var apiBase = "https://api.teleport.org/api/cities/?search=";
  var querySecondURL = "";
  var urbanSlugAPI = "";
  var teleportURL = "";
  var countryCode = "";
  var selectedCity = "";
  var qolEmbedBody= ""
  var colEmbedBody= ""
  var jobEmbedBody=""
  var safetyEmbedBody = ""
  var educationEmbedBody =""
  var climateEmbedBody =""
  
  
  //On Page load, website hides the cards
  function onLoad(){
    $(".post-search").hide();
  }
  onLoad()

  // GENERATES THE CITIES ON THE DROPDOWN
  function generateCities(){
    var queryURL = "https://developers.teleport.org/assets/urban_areas.json"
    var cityArray = Object.keys(cities);
    console.log(cityArray);
    cityArray.sort(function(a,b){
    if (a < b )return -1
    else if (a === b)return 0
    else return 1
    })
    
    for (var i = 0; i < cityArray.length; i++){
      var option = $(`<option value="${cityArray[i]}" data-reactid="${i+1}">${cityArray[i]}</option>`)
    $("#inputGroupSelect03").append(option);
    }
      }
      generateCities();
     
  function categorySelect() {
    var category = $("#inputGroupSelect04").val();
    queryURL =
      "https://api.adzuna.com/v1/api/jobs/" +
      countryCode +
      "/search/1?app_id=be3ea934&app_key=92b7a058356afbbaa6b1cf90c7bae1c1&where=" + selectedCity + "&results_per_page=20&what=" +
      category; 
    //   "&content-type=application/json";
    console.log(queryURL);
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

      // console.log("category ", category);

      // WILL LOOP THROUGH THE JOB OPTIONS
      for (var i = 0; i < response.results.length; i++){
        var card = `<div class="card-widget">
        <div class="card-header" id="job-search">
        <h2>${response.results[i].title}</h2>
        </div>
        <div class="card-body" id="job-list">
        <h3>${response.results[i].company.display_name}</h3>
        <p>${response.results[i].description}</p>
        <a href = "${response.results[i].redirect_url}">View Details</a>
        </div>
      </div>`
      var cardEL = $(card);
      $('#job-list').append(cardEL);
      };
      // JSON.stringify(response.category);
      // $(".description").text($(".category").text("category: " + category));
      // $(".company").text("company: " + response.results[i].company);
      // $(".location").text("location: " + location);
    });
  }

  function geoIdentify() {
    var searchCity = $("#inputGroupSelect03").val();
    console.log(searchCity);
    selectedCity = searchCity;
    $.ajax({
      url: apiBase + searchCity,
      method: "GET",
    }).done(function (response) {
      console.log(response);
      querySecondURL =
        response._embedded["city:search-results"][0]._links["city:item"].href;
      // var embedBody = '<a class="teleport-widget-link" href="https://teleport.org/cities/aarhus/">Life quality score - Aarhus</a><script async class="teleport-widget-script" data-url="https://teleport.org/cities/aarhus/widget/scores/?currency=USD&citySwitcher=false" data-max-width="420" data-height="968" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>';
      // $("#life-quality").append(embedBody)
      urbanSlug();
      // categorySelect();
    });
  }
  function urbanSlug() {
    $.ajax({
      url: querySecondURL,
      method: "GET",
    }).done(function (response) {
      console.log(response);
      console.log(response._links["city:urban_area"].href);
      //Country Code
      var countryURL = response._links["city:country"].href;
      countryCode = countryURL.substr(-3, 2).toLowerCase();
      console.log(countryCode);
      urbanSlugAPI = response._links["city:urban_area"].href;
      console.log(urbanSlugAPI);
      teleportSite();
      categorySelect();
    });
  }

  function teleportSite() {
    $.ajax({
      url: urbanSlugAPI,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      teleportURL = response.teleport_city_url;
      qolEmbedBody = '<a class="teleport-widget-link" href="' + teleportURL +  '">Life quality score - ' + $("#inputGroupSelect03").val().toUpperCase() + '</a><script async class="teleport-widget-script" data-url="' +teleportURL + 'widget/scores/?currency=USD&citySwitcher=false" data-max-width="420" data-height="968" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>';
      colEmbedBody = '<a class="teleport-widget-link" href="' +teleportURL + '">Cost of living - ' + $("#inputGroupSelect03").val().toUpperCase() + '</a><script async class="teleport-widget-script" data-url="' + teleportURL+ 'widget/costs/?currency=USD&citySwitcher=false" data-max-width="420" data-height="968" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>'
      jobEmbedBody = '<a class="teleport-widget-link" href="' +teleportURL + '">Job salary calculator - ' + $("#inputGroupSelect03").val().toUpperCase() + '</a><script async class="teleport-widget-script" data-url="'+ teleportURL + 'widget/salaries/?currency=USD&citySwitcher=false" data-max-width="420" data-height="968" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>'
      safetyEmbedBody = '<a class="teleport-widget-link display-block" href="' +teleportURL +  '">Safety - ' + $("#inputGroupSelect03").val().toUpperCase() + '</a><script async class="teleport-widget-script" data-url="'+ teleportURL + 'widget/crime/?currency=USD&citySwitcher=false" data-max-width="420" data-height="1214" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>'
      educationEmbedBody = '<a class="teleport-widget-link display-block" href="' +teleportURL +  '">Education - ' + $("#inputGroupSelect03").val().toUpperCase() + '</a><script async class="teleport-widget-script" data-url="'+ teleportURL + 'widget/education/?currency=USD&citySwitcher=false" data-max-width="420" data-height="1214" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>'
      climateEmbedBody = '<a class="teleport-widget-link display-block" href="' +teleportURL +  '">Climate - ' + $("#inputGroupSelect03").val().toUpperCase() + '</a><script async class="teleport-widget-script" data-url="'+ teleportURL + 'widget/weather/?currency=USD&citySwitcher=false" data-max-width="420" data-height="1214" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>'
      console.log(qolEmbedBody)
      // // return qualityOfLife();
      // return embedBody;
      return qualityOfLife();
      // console.log(embedBody);
      // return $("#qol-widget").append(embedBody)
     
    });
    
  }
  function qualityOfLife (){
    $("#qol-widget").empty();
    $("#qol-widget").append(qolEmbedBody);
    $("#col-widget").empty();
    $("#col-widget").append(colEmbedBody);
    $("#job-widget").empty();
    $("#job-widget").append(jobEmbedBody);
    $("#safety-widget").empty();
    $("#safety-widget").append(safetyEmbedBody);
    $("#education-widget").empty();
    $("#education-widget").append(educationEmbedBody);
    $("#climate-widget").empty();
    $("#climate-widget").append(climateEmbedBody);
  }

  $("#submit").on("click", function (event) {
    event.preventDefault();
    $(".post-search").show();
    geoIdentify();
    //   categorySelect();
  });

  // var images = [
  //   "/City.jpg",
  //   "/mountain.jpg",
  //   "/small-city.jpeg",
  //   "/smalltowns.jpg",
  // ];

  // $(function () {
  //   var i = 0;
  //   $(".background").css("background-image", "url(images/" + images[i] + ")");
  //   setInterval(function () {
  //     // for (i = 0; i < images.length; i++)
  //     i++;
  //     if (i == images.length) {
  //       i = 0;
  //     }
  //     $(".background").fadeOut("slow", function () {
  //       $(this).css("background-image", "url(images/" + images[i] + ")");
  //       $(this).fadeIn("slow");
  //     });
  //   }, 5000);
  // });

  //   var queryURL =
  //     "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=be3ea934&app_key=92b7a058356afbbaa6b1cf90c7bae1c1&results_per_page=20&what=javascript%20developer&content-type=application/json";
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   }).then(function (response) {
  //     console.log(response);
  //   });
});
