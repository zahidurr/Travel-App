const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const AYLIENTextAPI = require("aylien_textapi");
const app = express();

app.use(cors());

// body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

// aylien APi
const textapi = new AYLIENTextAPI({
  application_id: process.env.APP_ID,
  application_key: process.env.APP_KEY,
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/url", (req, res) => {
  try {
    const { text } = req.body;
    textapi.sentiment({ url: text }, (error, result, remaining) => {
      console.log("Aylien Callback", result, remaining);
      console.log("Aylien error", error);
      res.send(result);
    });
  } catch (error) {
    console.log("Aylien URL error", error);
  }
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

module.exports = app;
