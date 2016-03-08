var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");

var app = express();
var port = process.env.PORT || 5005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  console.log("Socobo Project Backend is ready to Rock!");
  res.send("Socobo Project Backend is ready to Rock!");
});
app.get("/api/v1/", function(req, res) {
  console.log("Socobo Project Backend is ready to Rock!");
  res.send("Socobo Project Backend is ready to Rock!");
});

var server = http.createServer(app).listen(port, function() {
  console.log("Socobo Project Backend is listening on Port: " + port);
});
