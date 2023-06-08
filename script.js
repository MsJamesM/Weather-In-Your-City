// ------------------- fetching basic weather info ---------------------

let weather = {
  key: "e2c74133da560a3e8633772b5632f3bf",
  findWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.key
    )
      .then((response) => response.json())
      .then((data) => this.weatherDisplay(data));
  },

  // -------------- displaying weather info via console ---------------

  weatherDisplay: function (data) {
    const { name } = data;
    const { icon } = data.weather[0];
    const { description } = data.weather[0];
    const { temp } = data.main;
    document.querySelector(".headerCity").innerText = name;
    document.querySelector(".bodyCity").innerText = name;
    document.querySelector(".headerTemp").innerText = temp + "°";
    document.querySelector(".bodyTemp").innerText = temp + "°";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".weatherDescription").innerText = description;
  },
};
/*
function handleUserInput() {}

weather.findWeather("");

fetch(
  "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=b8fc387331c767a99a233c98e09002f5&units=imperial"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// on "submit", js searches for user's inputted city

/* create functions for: 

  - fetch current date
  - search for a city (via event listener)
  - weather results for that city are saved to local storage
  - searched city name added to top panel button/link
  - display results for next five days after "search" event listener
	- results include: date, temp, wind, humidity, icon, desc., etc.
  
  - click on city from top panel
  - previous results display	 

  * attach event listeners to the bottom of the page for clarity

*/
