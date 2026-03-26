class Forcast {
  constructor() {}

  async fetchCityWeather(cityName) {
    try {
      const url =
        "https://api.weatherbit.io/v2.0/current?city=" +
        cityName +
        "&key=b4fe4bbb5bc04e7b91b706e5975d1030";

      const response = await fetch(url);
      const data = await response.json();

      if (data.error !== undefined) {
        console.log(
          "No weather data is found for the city :" +
            cityName +
            ". Error is : " +
            data.error,
        );
        return null;
      } else {
        return data.data[0];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = Forcast;
