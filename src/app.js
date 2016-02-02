var moviesArray = null;
var showButtons;
var sortingSelect;

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
  sortingSelect = document.getElementById("sorter");
}

function listenerInit() {

  // event functions
  function showButtonEvent(event) {

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
  }

  function sorterEvent(event) {

    function byName() {

    }

    function byPrice() {

    }

    var optionSelected = sortingSelect.value

    /// has to access moviesDict here somehow....

    switch(optionSelected) {
      case 'name':


        break;
      case 'price':


        break;
    }
  }

  // initializing listeners to every button
  for(var i = 0; i < showButtons.length; i++) showButtons[i].addEventListener("click", showButtonEvent)
  sortingSelect.addEventListener("change",sorterEvent )

}

loadMovieJson("../movies.json")
  .then(initializer)
  .then(listenerInit)
  .catch(function(error) {
    console.log(error);
  });
