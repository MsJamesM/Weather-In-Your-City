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

  // ------------------- displaying current weather -------------------

  weatherDisplay: function (data) {
    const { name } = data;
    const { icon } = data.weather[0];
    const { description } = data.weather[0];
    const { temp } = data.main;
    document.querySelector(".headerCity").innerText = name;
    document.querySelector(".bodyCity").innerText = name;
    document.querySelector(".headerTemp").innerText = Math.round(temp) + "°";
    document.querySelector(".bodyTemp").innerText = Math.round(temp) + "°";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".weatherDescription").innerText = description;
  },
};

// ----------- adding event listener to "submit" button ---------------

inputSubmit.addEventListener("click", function () {
  const cityInput = document.getElementById("cityInput").value;
  weather.findWeather(cityInput);
  forecast.findForecast(cityInput);
  document.querySelector(".icon").style.display = "block";
});

cityInput.addEventListener("keypress", function (event) {
  $("cityInput").value;
  if (event.key === "Enter") {
    event.preventDefault();
    weather.findWeather(cityInput.value);
    forecast.findForecast(cityInput.value);
    document.querySelector(".icon").style.display = "block";
  }
});

// don't forget: add errors if input empty or invalid

// ------------------ fetching five day forecast -------------------

let forecast = {
  key: "e2c74133da560a3e8633772b5632f3bf",
  findForecast: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        this.key
    )
      .then((response) => response.json())
      .then((data) => forecastDisplay(data));

    function forecastDisplay(data) {
      const cityName = data.city.name;
      const forecastList = data.list;
      for (let i = 0; i < forecastList.length; i++) {
        const forecastData = forecastList[i];
        const { icon } = forecastData.weather[0];
        const { temp } = forecastData.main;

        // --------------  displaying five day forecast -------------------

        document.querySelector("#dayOne").innerText =
          cityName + Math.round(temp) + "°" + icon;
        document.querySelector("#dayTwo").innerText =
          cityName + Math.round(temp) + "°" + icon;

        document.querySelector("#dayOne").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
      }
    }
  },
};
