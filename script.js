console.log("Hello World");
$(document).ready(function () {
  console.log("ready");
  var queryURL =
    "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=be3ea934&app_key=92b7a058356afbbaa6b1cf90c7bae1c1&results_per_page=20&what=javascript%20developer&content-type=application/json";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });
});
