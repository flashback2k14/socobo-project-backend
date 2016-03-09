var http = require("http");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");
var util = require("./util");

var app = express();
var port = process.env.PORT || 5005;

// enable cors
app.use(cors());
// configure express to get json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// backend root
app.get("/", function(req, res) {
  console.log("Socobo Project Backend is ready to Rock!");
  res.send("Socobo Project Backend is ready to Rock!");
});

// api root
app.get("/api/v1/", function(req, res) {
  console.log("Socobo Project Backend API is ready to Rock!");
  res.send("Socobo Project Backend API is ready to Rock!");
});

// function to send an email with the grocery items to the user
app.post("/api/v1/send-grocery-list", function(req, res) {
  // check if the request has data inside the body
  if (req.body.length === 0) {
    res.status(500).send({type: "error", msg: "No Request Data available to Mail!"});
    return false;
  }
  // check if email address is available
  if (req.body.email.length === 0) {
    res.status(500).send({type: "error", msg: "No Email Address available to Mail!"});
    return false;
  }
  // check if grocery list is available
  if (req.body.list.length === 0) {
    res.status(500).send({type: "error", msg: "No Grocery List Items available to Mail!"});
    return false;
  }
  // build subject text
  var emailHtml = util.generateHtmlBodyText(req.body.list);
  // get email auth password
  var authPw = process.env.EMAIL_PASSWORD;
  // configure smtp server
  var smtpConfig = {
    host: "mail.gmx.net",
    port: 465,
    secure: true,
    auth: {
        user: "info.socobo-project@gmx.de",
        pass: authPw
    }
  };
  // build html email
  var mailOptionsHtml = {
    from: "info.socobo-project@gmx.de",
    to: req.body.email,
    subject: "Socobo Project - Grocery List",
    html: emailHtml
  };
  // send email
  var transporter = nodeMailer.createTransport(smtpConfig);
  transporter.sendMail(mailOptionsHtml, function(error, info) {
    if (error) {
      // response the error
      var extraError = typeof error !== "undefined" || error !== null ? error.message : "No extra error information available!";
      res.status(500).send({type: "error", msg: "An Error appears with sending the Mail!", extra: extraError});
    }
    // response the successful sending
    var extraInfo = typeof info !== "undefined" || info !== null ? info.response : "No extra information available!";
    res.status(200).send({type: "success", msg: "Grocery List Items send to User!", extra:  extraInfo});
  });
});

// start the server
var server = http.createServer(app).listen(port, function() {
  console.log("Socobo Project Backend is listening on Port: " + port);
});
