var util = require("../../../logic/util");
var mailer = require("../../../logic/mailer");
var user = require("../../../logic/user");
var devEnv = require("../../../../dev-env.json");


module.exports = function(express) {
  var api = express.Router();
  
  api.get("/", function(req, res) {
    console.log("Socobo Project Backend API is ready to Rock!");
    res.send("Socobo Project Backend API is ready to Rock!");
  });
  
  api.post("/send-grocery-list", util.checkRequest, function(req, res) {
    // get user email from firebase
    user.getUserMail(req.get(util.getAuthHeaderTag()))
      .then((email) => {
        // get mailer config data
        var host = process.env.PROVIDER_HOST || devEnv.PROVIDER_HOST;
        var port = process.env.PROVIDER_PORT || devEnv.PROVIDER_PORT;
        var useSsl = process.env.PROVIDER_USE_SSL || devEnv.PROVIDER_USE_SSL;
        var authUser = process.env.EMAIL_ADDRESS || devEnv.EMAIL_ADDRESS;
        var authPw = process.env.EMAIL_PASSWORD || devEnv.EMAIL_PASSWORD;
        // setup mailer
        mailer.setup(host, port, useSsl, authUser, authPw);
        // build html body
        var emailHtml = util.generateHtmlBodyText(req.body.list);
        // build email
        var mail = mailer.buildEmail(email, "Socobo Project - Grocery List", emailHtml);
        // send email
        mailer.send(mailer.getSmtpConfig(), mail, function(error, info) {
          if (error) {
            return res.status(500).json({type: "error", msg: error.message});
          }
          res.status(200).json(info); 
        });
        
    }).catch((error) => res.status(500).json({type: error.code, msg: error.message}));
  });
  
  return api;
}
