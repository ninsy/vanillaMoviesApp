var MOVIES = [{
	"name": "Super Film",
	"price": "12PLN",
	"duration": "72min",
	"time": ["12:00", "13:45", "20:00", "21:15"] 
},{
	"name": "Mniej Super Film",
	"price": "16PLN",
	"duration": "186min",
	"time": ["01:35", "14:35", "18:00"] 
},{
	"name": "Mniej Fajny Film",
	"price": "5PLN",
	"duration": "63min",
	"time": ["06:35", "17:10", "22:30"] 
},{
	"name": "Bardzo Slaby Film",
	"price": "60PLN",
	"duration": "123min",
	"time": ["12:20", "16:45", "21:00"] 
},{
	"name": "Zupelnie Beznadziejny Film",
	"price": "35PLN",
	"duration": "95min",
	"time": ["03:35", "16:00", "18:00"] 
}];

var moviesList = document.getElementById("moviesList")

var ListItemMovie = function(name, price, duration, time) {
  console.log("Passed: " + name + " " + price + " " + duration + " " + time);
  this.name = name;
  this.price = parseInt(price);
  this.duration = parseInt(duration);
  this.time = [];
  for(var i = 0; i < time.length; i++) {
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
    
    var currentListElement = document.createElement("li")
    
    var movieLabel = document.createElement("label")
    var moviePrice = document.createElement("p")
    var movieDuration = document.createElement("p")
    var movieTimes = document.createElement("ul")
    
    movieTimes.setAttribute("class", "timeTable")
    
    movieLabel.innerText = this.name
    
    if(this.price < 10) {
      moviePrice.innerText = this.price + "PLN"
      var bargainLabel = document.createElement("span")
      bargainLabel.innerText = " promocja!"
      moviePrice.appendChild(bargainLabel);
    }
    else if(this.price > 10 && this.price <= 50) {
      moviePrice.innerText = this.price + "PLN"
    }
    else {
      moviePrice.innerText = "pow. 50PLN"
    }
    
    movieDuration.innerText = this.duration + " minut."
    
    var currentTime = getCurrentHourNMinutes();
    console.log("Now: " + currentTime);
    for(var i = 0; i < this.time.length; i++) {
      
      var thisTimeHours = this.time[i].getHours();
      var thisTimeMinutes = this.time[i].getMinutes();
      
      if(thisTimeHours > currentTime[0] || (thisTimeHours == currentTime[0] && thisTimeMinutes > currentTime[1])) {
        
        var notYetDisplayed = document.createElement("li")
        var notYetDisplayedTime = document.createElement("p")
        
        if(thisTimeHours < 10) thisTimeHours = "0" + thisTimeHours;
        if(thisTimeMinutes < 10) thisTimeMinutes = "0" + thisTimeMinutes;
        
        notYetDisplayedTime.innerText = thisTimeHours + ":" + thisTimeMinutes
        notYetDisplayed.appendChild(notYetDisplayedTime)
        
        movieTimes.appendChild(notYetDisplayed)
      }
    }
    
   currentListElement.appendChild(movieLabel);
   currentListElement.appendChild(moviePrice);
   currentListElement.appendChild(movieDuration);
   currentListElement.appendChild(movieTimes);
    
   moviesList.appendChild(currentListElement) 
  }
}

var validateTime = function(singleTimeArray) {
  if(singleTimeArray[0] >= 0 && singleTimeArray[0] < 24) {
    if(singleTimeArray[1] >= 0 && singleTimeArray[0] < 60) {
      return true;
    }
    else return false;
  }
  else return false;
}

var getCurrentHourNMinutes = function() {
  var now = new Date()
  var nowHour = now.getHours()
  var nowMinutes = now.getMinutes()
  return [nowHour, nowMinutes]
}

var instantiateMovies = function(moviesJSON) {
  for(var i = 0; i < moviesJSON.length; i++) {
    moviesJSON[i] = new ListItemMovie(moviesJSON[i].name, moviesJSON[i].price, moviesJSON[i].duration, moviesJSON[i].time )
  }
}

instantiateMovies(MOVIES);