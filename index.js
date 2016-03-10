var http = require("http");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

// get routes
var base = require("./app/routes/base/base")(express); 
var apiV1 = require("./app/routes/api/v1/api-v1")(express);

// setup app
var app = express();
var port = process.env.PORT || 5005;

// enable cors
app.use(cors());

// configure express to get json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// setup routes
app.use("/", base);
app.use("/api/v1", apiV1);

// start the server
var server = http.createServer(app).listen(port, function() {
  console.log("Socobo Project Backend is listening on Port: " + port);
});
