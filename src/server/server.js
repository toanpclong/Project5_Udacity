const dotenv = require("dotenv");
dotenv.config();
const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXA_BAY_API_KEY = process.env.PIXA_BAY_API_KEY;
const arrayAPI = { GEONAMES_API_KEY, WEATHERBIT_API_KEY, PIXA_BAY_API_KEY };

// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("dist"));
//port Express
const port = 8081;
// Spin up the server
app.listen(port, listening);
// Callback to debug
function listening() {
  console.log(`running on localhost: ${port}`);
  console.log(`Your API key is `, arrayAPI);
}
// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/get", function (req, res) {
  res.json(arrayAPI);
});
// Post Route
//export app;
exports.app = app;
