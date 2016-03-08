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

app.get("/api/v1/", function(req, res) {
  console.log("Socobo Project Backend is ready to Rock!");
  res.send("Socobo Project Backend is ready to Rock!");
});

app.post("/api/v1/send-grocery-list", function(req, res) {
  if (req.body.email.length === 0) {
    res.status(500).send({"msg" : "No Email Address available to Mail!"});
    return false;
  }
  
  if (req.body.list.length === 0) {
    res.status(500).send({"msg" : "No Grocery List Items available to Mail!"});
    return false;
  }
  
  // var emailText = "Grocery List Items:\n\n";
  // req.body.list.forEach(function(item) {
  //   emailText += "- " + item + "\n"
  // });

  // nodeMailer.mail({
  //   from: "socobo.project@gmail.com",
  //   to: req.body.email,
  //   subject: "Socobo Project - Grocery List",
  //   text: emailText
  // });
  
  res.status(200).send({"msg": process.env.TEST});
  //res.status(200).send({"msg": "Grocery List Items send to User"});
});

var server = http.createServer(app).listen(port, function() {
  console.log("Socobo Project Backend is listening on Port: " + port);
});
