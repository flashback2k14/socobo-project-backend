var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");

var app = express();
var port = process.env.PORT || 5005;

// configure express to get json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// test function
app.get("/api/v1/", function(req, res) {
  console.log("Socobo Project Backend is ready to Rock!");
  res.send("Socobo Project Backend is ready to Rock!");
});

// function to send an email with the grocery items to the user
app.post("/api/v1/send-grocery-list", function(req, res) {
  // check if email address is available
  if (req.body.email.length === 0) {
    res.status(500).send({"msg" : "No Email Address available to Mail!"});
    return false;
  }
  // check if grocery list is available
  if (req.body.list.length === 0) {
    res.status(500).send({"msg" : "No Grocery List Items available to Mail!"});
    return false;
  }
  // build subject text
  var emailText = "Grocery List Items:\n\n";
  req.body.list.forEach(function(item) {
    emailText += "- " + item + "\n"
  });
  // configure smtp server
  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'socobo.project@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
  };
  // build email
  var mailOptions = {
    from: "socobo.project@gmail.com",
    to: req.body.email,
    subject: "Socobo Project - Grocery List",
    text: emailText
  };
  // send email
  var transporter = nodeMailer.createTransport(smtpConfig);
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      // response the error
      res.status(500).send({"msg" : "An Error appears with sending the Mail!"});
    }
    // response the successful sending
    res.status(200).send({"msg": "Grocery List Items send to User! " + info.response});
  });
});
// start the server
var server = http.createServer(app).listen(port, function() {
  console.log("Socobo Project Backend is listening on Port: " + port);
});
