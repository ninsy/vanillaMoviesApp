"use_strict";
var movieTab = (function() {

		// HELPER FUNCTIONS

		function validateTime(timeArr) {
			if( (timeArr[0] >= 0 && timeArr[0] < 24 ) && ( timeArr[1] >=0 && timeArr[1] < 60 )) return true;
			else return false;
		}

		function getCurrentHourNMinutes() {
			var now = new Date()
		  return [now.getHours(), now.getMinutes()]
		}

		function validateTimeArray(movieObject) {


			var currentTime = getCurrentHourNMinutes();
			var validTimeStamps = [];

			for(var i = 0; i < movieObject.time.length; i++) {

				var thisTimeHours = movieObject.time[i].getHours();
				var thisTimeMinutes = movieObject.time[i].getMinutes();

				if(thisTimeHours > currentTime[0] || (thisTimeHours == currentTime[0] && thisTimeMinutes > currentTime[1])) {

					var notYetDisplayed = document.createElement("a")
					var notYetDisplayedTime = document.createElement("p")

					if(thisTimeHours < 10) thisTimeHours = "0" + thisTimeHours;
					if(thisTimeMinutes < 10) thisTimeMinutes = "0" + thisTimeMinutes;

					notYetDisplayedTime.innerText = thisTimeHours + ":" + thisTimeMinutes
					notYetDisplayed.appendChild(notYetDisplayedTime)

					validTimeStamps.push(notYetDisplayed)
				}
			}
			return validTimeStamps
		}

		// BASE FUNCTIONS

		//
		function createListElement(movieObject) {

			var currentListElement = document.createElement("li")

			currentListElement.setAttribute("class", "singleMovie")

			var movieLabel = document.createElement("label")
			var moviePrice = document.createElement("p")
			var movieDuration = document.createElement("p")
			var showMoviesButton = document.createElement("button")

			var timeContainer = document.createElement("div")
			timeContainer.setAttribute("class", "dropdown-container")

			showMoviesButton.setAttribute("class", "timeButton")
			showMoviesButton.innerText = "Show available hours"

			movieLabel.innerText = movieObject.name
			movieDuration.innerText = movieObject.duration + " minut."
			moviePrice.innerText = movieObject.price + "PLN"


			if(movieObject.price < 10) {

				var bargainLabel = document.createElement("span")
				bargainLabel.innerText = " promocja!"
				moviePrice.appendChild(bargainLabel);
			}
			else if(movieObject.price > 50) moviePrice.innerText = "pow. 50PLN"


			var returnedTimeStamps = validateTimeArray(movieObject)

			if (returnedTimeStamps.length > 0) {

				returnedTimeStamps.forEach(function(timeStamp) {

					timeContainer.appendChild(timeStamp)
				});
			}

		 	currentListElement.appendChild(movieLabel);
		 	currentListElement.appendChild(moviePrice);
		 	currentListElement.appendChild(movieDuration);
		 	currentListElement.appendChild(showMoviesButton);
			currentListElement.appendChild(timeContainer)

			return currentListElement
		}

		// "Constructor" for single movie element, used to push into unordered list at web-page
		 function ListItemMovie(name, price, duration, time) {

		  this.name = name;
		  this.price = parseInt(price);
		  this.duration = parseInt(duration);
		  this.time = [];

		  for(let i = 0; i < time.length; i++) {

		    var timeArrayElement = time[i].split(":");
		    var current = new Date();

		    if(validateTime(timeArrayElement)) {
		      current.setHours(timeArrayElement[0]);
		      current.setMinutes(timeArrayElement[1]);
		      this.time.push(current);
		    }
		    else continue;
		  }

		  if(this.name.length > 0 && this.price > 0 && this.duration > 0 && this.time.length == time.length) {

		    moviesList.appendChild(createListElement(this))
		  }
		}

		// PUBLIC BASE FUNCTIONS

		function init(mJSON) {
			for(let i = 0; i < mJSON.length; i++) {
				moviesDict[mJSON[i].name] = new ListItemMovie(mJSON[i].name, mJSON[i].price, mJSON[i].duration, mJSON[i].time )
			}
		}

		var moviesDict = {}
		var moviesList = document.getElementById("moviesList")

		return {
			init: init
		}
})()
