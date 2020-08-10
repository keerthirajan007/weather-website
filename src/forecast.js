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
      const hour_min = (seconds) => {
        var temp = seconds / 60;
        var hour = `${temp / 60}`.split(".")[0];
        var min = temp % 60;
        return { hour: hour, min: min };
      };
      const timezone = hour_min(response.body.timezone);
      const date = new Date();
      date.setMonth(8);
      var day = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
      var time = {
        hour: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds(),
      };
      callback(undefined, {
        Weather: response.body.weather[0].description,
        Temperature: response.body.main.temp,
        Pressure: response.body.main.pressure,
        Humidity: response.body.main.humidity,
        Place: response.body.name,
        Date: `${day.day}-${day.month}-${day.year}`,
        Time: `${time.hour}:${time.min}:${time.sec}`,
        Timezone: `${timezone.hour}h:${timezone.min}m`,
        PlaceTime: `${date.getUTCHours() + Number(timezone.hour)}:${
          date.getUTCMinutes() + timezone.min
        }`,
        Units: "Temperature=Kelvin , Pressure=Pa , Humidity=grams/cubic meter",
      });
    }
  });
};
module.exports = { forecast: forecast };
