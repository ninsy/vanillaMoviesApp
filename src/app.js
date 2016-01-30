var moviesArray = null;

function loadMovieJson(url) {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.onload = function() {

      if(xhr.status === 200) {
        resolve(xhr.response);
      }
      else {
        reject("Unable to load movieJSON")
      }
    }
    xhr.onerror = function() {

      reject("Unable to load movieJSON");
    }
    xhr.send();
  });
}

loadMovieJson("../movies.json")
  .then(function(json) {
    moviesArray = JSON.parse(json);
  });
  .catch(function(error) {
    console.log(error);
  });
