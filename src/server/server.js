const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();

const express = require("express");
const app = express();

// body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//darksky API key and url.
const darkSkyKEY = process.env.darkSkyKEY;
const darkSkyURL = "https://api.darksky.net/forecast/";

//pixabay API key and url.
const pixabayKEY = process.env.pixabayKEY;
const pixabayURL = "https://pixabay.com/api/?";

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

app.use(express.static("./dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("./dist/index.html");
});

const travelData = [];
app.get("/list", function (req, res) {
  res.send(travelData);
});

//Add data.
app.post("/add", function (req, res) {
  const requestBody = req.body;
  let data = {};

  data.location = requestBody.location;
  data.countryName = requestBody.countryName;
  data.latitude = requestBody.latitude;
  data.longitude = requestBody.longitude;
  data.goDate = requestBody.goDate;
  data.duration = requestBody.duration;

  const weatherPromise = new Promise((resolve, reject) => {
    darksky(data.latitude, data.longitude).then(function (response) {
      resolve(response);
    });
  });
  const imagePromise = new Promise((resolve, reject) => {
    pixabay(data.location).then(function (response) {
      resolve(response);
    });
  });

  Promise.all([weatherPromise, imagePromise]).then(function (results) {
    const weatherData = results[0];
    const imageData = results[1];
    data.dailySummary = weatherData.daily.data[0].summary;
    data.temperatureMin = weatherData.daily.data[0].temperatureMin;

    data.temperatureMax = weatherData.daily.data[0].temperatureMax;

    if (imageData.totalHits > 0) {
      data.imageUrl = imageData.hits[0].webformatURL;
    } else {
      data.imageUrl = "";
    }

    travelData.push(data);

    res.send({
      messsage: "Trip added successfully.",
      success: true,
    });
  });
});

app.post("/delete", function (req, res) {
  let currentIndex = req.body.currentIndex;

  travelData.splice(currentIndex, 1);
  res.send({
    messsage: "Trip removed successfully.",
    success: true,
  });
});

// DarkSky api
const darksky = async (latitude, longitude) => {
  const requestURL = darkSkyURL + darkSkyKEY + "/" + latitude + "," + longitude;
  const response = await fetch(requestURL);
  let result = {};
  try {
    result = await response.json();
  } catch (error) {
    console.log("error:", error);
  }
  return result;
};

const pixabay = async (location) => {
  const requestURL =
    pixabayURL +
    "key=" +
    pixabayKEY +
    "&q=" +
    encodeURIComponent(location) +
    "&image_type=photo";
  const response = await fetch(requestURL);
  let result = {};
  try {
    result = await response.json();
  } catch (error) {
    console.log("error:", error);
  }
  return result;
};

module.exports = app;
