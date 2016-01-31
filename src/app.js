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
    movieTab.init(moviesArray)
  })
  .then(function() {
    var showButtons = document.getElementsByClassName("timeButton");
    for(var i = 0; i < showButtons.length; i++) {

      showButtons[i].addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        var currentDropDown = event.target.nextSibling
        var availableHours = currentDropDown.children

        console.log("curr children : " + availableHours.length);
      })
    }
  })
  .catch(function(error) {
    console.log(error);
  });
