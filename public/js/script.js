const searchBtn = document.getElementById("search-btn");
const cityNameSearch = document.getElementById("search-city");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const cityName = cityNameSearch.value;

  fetch("http://localhost:3000/weather?cityName=" + cityName).then(
    (response) => {
      response.json().then((data) => {
        const weatherDetail = document.getElementById("weather-p");
        if (data.error === undefined) {
          weatherDetail.textContent =
            "Weather Report in City : " +
            data.city_name +
            ". Temperate : " +
            data.app_temp +
            ". Clouds Percentage : " +
            data.clouds +
            ". AQI : " +
            data.aqi;
        } else {
          weatherDetail.textContent =
            "No weather data is found for the city : " + cityName;
        }
      });
    },
  );
});
