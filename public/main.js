console.log("main.js is called");
const value = document.getElementsByClassName("val");
console.log("All files are work well");

const form = document.querySelector("form");
const input = document.querySelector("input");
const message = document.getElementsByClassName("message");
const space = document.getElementsByClassName("space");

message[0].innerHTML =
  "To see Weather information,please provide a place name in the search box";
input.addEventListener("onclick", () => {
  input.style.background = "white";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  value[0].innerHTML = "";
  address = input.value;
  message[0].innerHTML = "Loading... please wait";
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message[0].innerHTML = data.error;
      } else {
        message[0].innerHTML = "Done...";
        space[0].innerHTML = "";
        value[0].innerHTML = `<table>
        <tr>
            <td><b>Place</b></td>
            <td>: ${data[1].Place}</td>
        </tr>
        <tr>
            <td><b>Latitude</b></td>
            <td>: ${data[0].Latitude}</td>
        </tr>
        <tr>
            <td><b>Longitude</b></td>
            <td>: ${data[0].Longitude}</td>
        </tr>
        <tr>
            <td><b>Weather</b></td>
            <td>: ${data[1].Weather}</td>
        </tr>
        <tr>
            <td><b>Humidity(g/cm<sup>3</sup>)</b></td>
            <td>: ${data[1].Humidity}</td>
        </tr>
        <tr>
            <td><b>Pressure(Pa)</b></td>
            <td>: ${data[1].Pressure}</td>
        </tr>
        <tr>
            <td><b>Temperature(K)</b></td>
            <td>: ${data[1].Temperature}</td>
        </tr>
    </table>`;
      }
    });
  });
});
