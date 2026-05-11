const path = require("path");
const express = require("express");

const hbs = require("hbs");

const app = express();
const Forcast = require("../Utils/forcast");
const forcast = new Forcast();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "john",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "john",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "john",
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.cityName) {
    res.send({
      error: "Please provide city name",
    });
  } else {
    const cityData = await forcast.fetchCityWeather(req.query.cityName);

    console.log(cityData);
    if (cityData !== null) {
      res.send(cityData);
    } else {
      res.send({
        error: "no data found for the city" + req.query.cityName,
      });
    }
  }
});

app.get("/:anything", (req, res) => {
  res.status(404).render("notfound");
});

app.listen(3000, () => {
  console.log("server is started");
});
