const request = require("request");
const forecast = ({ Latitude, Longitude }, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&mode=json&appid=a17923af4c4f08aef228175b8dfed260`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable to connect the location services,no access to service",
        undefined
      );
    } else if (response.body.error || response.body.weather === undefined) {
      callback("Unable to find the location,address is invalid");
    } else {
      callback(undefined, {
        Weather: response.body.weather[0].description,
        Temperature: response.body.main.temp,
        Pressure: response.body.main.pressure,
        Humidity: response.body.main.humidity,
        Place: response.body.name,
        Units: "Temperature=Kelvin , Pressure=Pa , Humidity=grams/cubic meter",
      });
    }
  });
};
module.exports = { forecast: forecast };
