const request = require("request");
geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2VlcnRoaXJhamFuMTIzIiwiYSI6ImNrZDlzZnVvOTBxM2Qycm9kdWFudnBiaWcifQ.RP96VJ6e19JV2WrzM-dzrA`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable to connect location services,no access to service",
        undefined
      );
    } else if (response.body.features.length === 0) {
      callback("Unable to find a location,address is invalid", undefined);
    } else {
      callback(undefined, {
        Name: response.body.features[0].text,
        Latitude: response.body.features[0].geometry.coordinates[1],
        Longitude: response.body.features[0].geometry.coordinates[0],
      });
    }
  });
};
module.exports = { Geocode: geocode };
