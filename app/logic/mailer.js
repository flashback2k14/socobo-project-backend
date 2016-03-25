var nodeMailer = require("nodemailer");

var Mailer = function() {
  this.name = "Socobo-Project-Backend-Mailer",
  this.version = "0.0.1"
};

Mailer.prototype = {
  setup: function(host, port, useSsl, user, pw) {
    this.host = host;
    this.port = port;
    this.useSsl = useSsl;
    this.user = user;
    this.pw = pw;
  },
  
  getSmtpConfig: function() {
    return {
      host: this.host,
      port: this.port,
      secure: this.useSsl,
      auth: {
          user: this.user,
          pass: this.pw
      }
    };
  },
  
  buildEmail: function(to, subject, htmlBody) {
    return {
      from: this.user,
      to: to,
      subject: subject,
      html: htmlBody
    }
  },
  
  send: function(config, email) {
    return new Promise((resolve, reject) => {
      var transporter = nodeMailer.createTransport(config);
      transporter.sendMail(email, function(error, info) {
        if (error) {
          return reject({type: "error", msg: "An Error appears with sending the Mail! " + error.message});
        }
        resolve({type: "success", msg: "Grocery List Items send to User!"});
      });
    });
  }
};

module.exports = new Mailer();
