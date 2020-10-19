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
  
  
  
  //On Page load, website hides the cards
  // function onLoad(){
  //   $(".post-search").hide();
  // }

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

//     $.ajax({
//       url: queryURL,
//       method: "GET",
//     }).then(function (response) {
// // var cityArray = Object.keys(response);
// // console.log(cityArray);
//     });
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
       
// shows raw JSON data
      // var response_str = JSON.stringify(response);




      // var mean_obj = response.mean;
      // var location_obj = location.data;
      // var company_obj = location_obj.company;
      // var title_obj = location_obj.title;
      // var description_obj = location.obj.description;
      // var formatted_html = "Company: " + company_obj.company + "<br/>" +
      //                       "Job Name: " + data.obj.name + "<br/>" +
      //                       "Title: " + location_obj.title + "msec";
      // $("#job-list").append(formatted_html);                      
      // console.log(response);
      console.log("This is API response: ", response.results);
      // console.log(response.results[0].category);
      // console.log(response.results[0].company);
      // console.log(response.results[0].location);

      // console.log("category ", category);
      for (var i = 0; i < response.results.length; i++){
      // JSON.stringify(response.category);

      // 1. Create div to hold all details
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

      // 2. For each detail create an element to hold info
      // 3. Append the info into the div
      // 4. Append that div onto the page
      };
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
    }).done(function (response) {
      console.log(response);
      teleportURL = response.teleport_city_url;
      // qualityofLife();
    });
  }

  $("#submit").on("click", function (event) {
    event.preventDefault();
    geoIdentify();
    // $(".card-widget").toggle(display);
    // if ( display === true ) {
    //   $( ".card-widget" ).show();
    // } else if ( display === false ) {
    //   $( ".card-widget" ).hide();
    // }
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
