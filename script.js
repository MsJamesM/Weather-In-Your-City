// day js clock
var today = dayjs();
$(".headerDate").text(today.format("MMMM D"));

// displaying current weather

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
    const { speed } = data.wind;
    const { humidity } = data.main;
    const { all } = data.clouds;
    const { icon } = data.weather[0];
    const { description } = data.weather[0];
    const fixDesc = description.charAt(0).toUpperCase() + description.slice(1);
    const { temp } = data.main;
    $("#placeholderDetails").remove();
    document.querySelector(".headerCity").innerText = name;
    document.querySelector(".bodyCity").innerText = name;
    document.querySelector(".bodyTemp").innerText = Math.round(temp) + "°";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".weatherDescription").innerText = fixDesc;
    document.querySelector(".bodyWind").innerText = +Math.round(speed) + "%";
    document.getElementById("windIcon").style.display = "block";
    document.querySelector(".bodyHumidity").innerText = humidity + "%";
    document.getElementById("humidityIcon").style.display = "block";
    document.querySelector(".bodyClouds").innerText = all + "%";
    document.getElementById("cloudIcon").style.display = "block";
  },
};

// displaying five day forecast
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

        const forecasts = forecastList.map((forecast) => ({
          icon: forecast.weather[0].icon,
          date: new Date(forecast.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          temp: Math.round(forecast.main.temp),
          humidity: forecast.main.humidity,
          wind: Math.round(forecast.wind.speed),
        }));

        const forecastContainer = document.getElementById("forecastContainer");
        forecastContainer.innerHTML = "";

        forecasts.forEach((forecast) => {
          const forecastItem = document.createElement("article");
          forecastItem.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="Forecast Icon"><br>
    <span id="widgetDate">${forecast.date}</span>
    <br> Temperature: ${forecast.temp}°F
    <br> Humidity: ${forecast.humidity}%
    <br> Wind: ${forecast.wind}%
    <br>`;
          forecastContainer.appendChild(forecastItem);
        });
      });
  },
};

// local storage on click

inputSubmit.addEventListener("click", function () {
  const cityInput = document.getElementById("cityInput").value;
  weather.findWeather(cityInput);
  forecast.findForecast(cityInput);
  document.querySelector(".icon").style.display = "block";

  let citiesList = JSON.parse(localStorage.getItem("cities"));
  citiesList.push(cityInput);
  localStorage.setItem("cities", JSON.stringify(citiesList));
  displayCities(citiesList);
});

// local storage on keypress

cityInput.addEventListener("keypress", function (event) {
  $("cityInput").value;
  if (event.key === "Enter") {
    event.preventDefault();
    const cityInput = document.getElementById("cityInput").value;
    weather.findWeather(cityInput);
    forecast.findForecast(cityInput);
    document.querySelector(".icon").style.display = "block";

    let citiesList = JSON.parse(localStorage.getItem("cities") || "[]");
    citiesList.unshift(cityInput);
    localStorage.setItem("cities", JSON.stringify(citiesList));
    displayCities(citiesList);
  }
});

// displaying local storage results as links

function displayCities(citiesList) {
  const citiesNav = document.getElementById("citiesNav");
  citiesNav.innerHTML = "";

  citiesList.forEach((city) => {
    const link = document.createElement("a");
    link.href = "#";
    link.innerText = city;
    link.addEventListener("click", function () {
      weather.findWeather(city);
      forecast.findForecast(city);
    });

    citiesNav.appendChild(link);
  });
}

const citiesList = JSON.parse(localStorage.getItem("cities") || "[]");
const citiesNav = document.getElementById("citiesNav");
if (citiesList.length > 0) {
  displayCities(citiesList);
} else {
  citiesNav.innerText = "No searches yet";
}
