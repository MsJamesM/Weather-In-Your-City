// ------------------- displaying current weather ---------------------

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

  weatherDisplay: function (data) {
    const { name } = data;
    const { icon } = data.weather[0];
    const { description } = data.weather[0];
    const fixDesc = description.charAt(0).toUpperCase() + description.slice(1);

    const { temp } = data.main;
    document.querySelector(".headerCity").innerText = name;
    document.querySelector(".bodyCity").innerText = name;
    document.querySelector(".headerTemp").innerText = Math.round(temp) + "°";
    document.querySelector(".bodyTemp").innerText = Math.round(temp) + "°";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".weatherDescription").innerText = fixDesc;
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

// ------------------ displaying five day forecast -------------------
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
      .then((data) => {
        const forecastList = [];
        for (let i = 0; i < data.list.length; i += 8) {
          forecastList.push(data.list[i]);
        }

        console.log(data);

        const forecasts = forecastList.map((forecast) => ({
          icon: forecast.weather[0].icon,
          date: new Date(forecast.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          temp: Math.round(forecast.main.temp),
          humidity: forecast.main.humidity,
          wind: Math.round(forecast.wind.speed),
        }));

        const widgetContainer = document.getElementById("forecast-container");
        widgetContainer.innerHTML = "";

        forecasts.forEach((forecast) => {
          const forecastItem = document.createElement("article");
          forecastItem.innerHTML = `
          <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="Forecast Icon"></p>
            <span id="widgetDate">${forecast.date}</span>
            <br> Temperature: ${forecast.temp}°F
            <br> Humidity: ${forecast.humidity}%
            <br> Wind: ${forecast.wind}%
    <br>`;
          widgetContainer.appendChild(forecastItem);
        });
      });
  },
};
