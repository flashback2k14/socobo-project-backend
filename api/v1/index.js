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

// test function
app.get("/api/v1/", function(req, res) {
  console.log("Socobo Project Backend is ready to Rock!");
  res.send("Socobo Project Backend is ready to Rock!");
});

// function to send an email with the grocery items to the user
app.post("/api/v1/send-grocery-list", function(req, res) {
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
  //var emailText = util.generateBodyText(req.body.list);
  var emailHtml = util.generateHtmlBodyText(req.body.list);
  // get email auth password
  var authPw = process.env.EMAIL_PASSWORD || "!ScB4bMoCraI4a*";
  // configure smtp server
  var smtpConfig = {
    host: 'mail.gmx.net',
    port: 465,
    secure: true,
    auth: {
        user: 'info.socobo-project@gmx.de',
        pass: authPw
    }
  };
  // build plain email
  // var mailOptions = {
  //   from: "socobo.project@gmail.com",
  //   to: req.body.email,
  //   subject: "Socobo Project - Grocery List",
  //   text: emailText
  // };
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
      res.status(500).send({type: "error", msg: "An Error appears with sending the Mail!", extra: error.message});
    }
    // response the successful sending
    res.status(200).send({type: "success", msg: "Grocery List Items send to User!", extra: info.response});
  });
});

// start the server
var server = http.createServer(app).listen(port, function() {
  console.log("Socobo Project Backend is listening on Port: " + port);
});
