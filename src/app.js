var moviesArray = null;
var showButtons;

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

function initializer(json) {
  moviesArray = JSON.parse(json);
  movieTab.init(moviesArray)
  showButtons = document.getElementsByClassName("timeButton");
}

function listenerInit() {

  // initializing listeners to every button
  for(var i = 0; i < showButtons.length; i++) {

    showButtons[i].addEventListener("click", function(event) {

      var currentDropDown = event.target.nextSibling
      var availableHours = currentDropDown.children
      var targetIndex = event.target.getAttribute("data-index")

      currentDropDown.classList.toggle("show")

      for(var j = 0; j < showButtons.length; j++) {
        if(showButtons[j].getAttribute("data-index") != targetIndex) {
          if(showButtons[j].nextSibling.classList.contains("show")) {
            showButtons[j].nextSibling.classList.remove("show")
          }
        }
      }

    });
  }
}

loadMovieJson("../movies.json")
  .then(initializer)
  .then(listenerInit)
  .catch(function(error) {
    console.log(error);
  });
