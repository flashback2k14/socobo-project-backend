var util = require("../../../logic/util");
var mailer = require("../../../logic/mailer");
var user = require("../../../logic/user");

module.exports = function(express) {
  var api = express.Router();
  const AUTH_HEADER = "X-SOCOBO-AUTH";

  api.get("/", function(req, res) {
    console.log("Socobo Project Backend API is ready to Rock!");
    res.send("Socobo Project Backend API is ready to Rock!");
  });

  api.post("/send-grocery-list", function(req, res) {
    // check if the request has data inside the body
    if (req.get(AUTH_HEADER) === undefined) {
        res.status(401).send({type: "error", msg: "Not authorized"})
        return false;
    }
    if (req.body.length === 0) {
      res.status(400).send({type: "error", msg: "No Request Data available to Mail!"});
      return false;
    }
    // check if grocery list is available
    if (req.body.list.length === 0) {
      res.status(400).send({type: "error", msg: "No Grocery List Items available to Mail!"});
      return false;
    }

    user.getUserMail(req.get(AUTH_HEADER)).then((email) => {
        // get mailer config data
        var host = process.env.PROVIDER_HOST;
        var port = process.env.PROVIDER_PORT;
        var useSsl = process.env.PROVIDER_USE_SSL;
        var authUser = process.env.EMAIL_ADDRESS;
        var authPw = process.env.EMAIL_PASSWORD;

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
        res.status(200).json(info); });

    }).catch((error) => res.status(500).json(error));
  });

  return api;
}
