const express = require("express");
const { restart } = require("nodemon");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./Geocode");
const forecast = require("./forecast");
const geoip=require("geoip-lite")

const port = process.env.PORT || 8000;
const app = express();

// configure paths
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../", "templates/views"));
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req, res) => {
  res.render("index", { title: "Weather" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});
app.get("/help", (req, res) => {
  res.render("help", { title: "Help" });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide address" });
  } else {
    var a = [];
    geocode.Geocode(req.query.address, (error, response) => {
      if (error) {
        return res.send({ error: error });
      } else {
        a.push(response);
      }
      forecast.forecast(response, (erro, respons) => {
        if (error) {
          return res.send({ error: erro });
        } else {
          a.push(respons);
          res.send(a);
        }
      });
    });
  }
});
app.get("/help/*", (req, res) => {
  res.render("error", { title: "help article not found" });
});

app.get("/get/ip/address", function (req, res) {
  // need access to IP address here
  var ip =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  ver geo=geoip.lookup(ip)
  res.send(geo);
});

app.get("*", (req, res) => {
  res.render("error", { title: "404 error page not found" });
});
// create a localhost port
app.listen(port, () => {
  console.log("server is on the port " + port);
});
