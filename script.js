// ------------------- fetching basic weather info ---------------------

const weather = {
  key: "e2c74133da560a3e8633772b5632f3bf",
  findWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.key
    )
      .then((response) => response.json())
      .then((data) => {
        // add weather items
        // place inside div
      });
  },
};

// ------------------- implementing weather display ---------------------
