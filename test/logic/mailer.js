var chai = require("chai");
var expect = chai.expect;
var should = chai.should;
var mailer = require("../../app/logic/mailer")


describe("Mailer Class", () => {
  
  describe("Mailer Properties", () => {
    it("Mailer has a name property.", () => {
      expect(mailer).to.have.property("name", "Socobo-Project-Backend-Mailer");
    });
    
    it("Mailer has a version property.", () => {
      expect(mailer).to.have.property("version");
    });
  });
  
  describe("Mailer Functions", () => {
    it("Mailer has a setup function.", () => {
      expect(mailer.setup).to.exist;
    });
    
    it("Mailer has a smtp config function.", () => {
      expect(mailer.getSmtpConfig).to.exist;
    });
    
    it("Mailer has a email builder function.", () => {
      expect(mailer.buildEmail).to.exist;
    });
    
    it("Mailer has a send email function.", () => {
      expect(mailer.send).to.exist;
    });
  });
  
  describe("Mailer Usage", () => {
    
    var host, port, useSsl, user, pw;
    var smtpConfig;
    var to, subject, htmlBody, email;
    var info, error;
    
    beforeEach((done) => {
      host = "host.host.host";
      port = 241;
      useSsl = true;
      user = "test.test";
      pw = "dfdghjk";
      
      smtpConfig = {
        host: "host.host.host",
        port: 241,
        secure: true,
        auth: {
          user: "test.test",
          pass: "dfdghjk"
        }
      };
      
      to = "test2.test";
      subject = "test subject";
      htmlBody = "<h1>Hello, World!</h1>";
      
      email = {
        from: "test.test",
        to: to,
        subject: subject,
        html: htmlBody
      };
      
      info = {
        type: "success", 
        msg: "Grocery List Items send to User!"
      };
      
      error = {
        type: "error", 
        msg: "An Error appears with sending the Mail! " + new Error("TEST ERROR").message
      };
      
      done();
    });
    
    it("Mailer is not null after requiring.", () => {
      expect(mailer).to.not.equal(null);
    });
    
    it("Mailer is not undefined after requiring.", () => {
      expect(mailer).to.not.equal(undefined);
    });
    
    it("Mailer has host, port, useSsl, user & pw property after setup function call.", () => {
      
      mailer.setup(host, port, useSsl, user, pw);
      
      expect(mailer).to.have.property("host");
      expect(mailer).to.have.property("port");
      expect(mailer).to.have.property("useSsl");
      expect(mailer).to.have.property("user");
      expect(mailer).to.have.property("pw");
    });
    
    it("Mailer return smtp config object with getSmtpConfig function.", () => {
      var result = mailer.getSmtpConfig();
      expect(result).to.deep.equal(smtpConfig);
    });
    
    it("Mailer build email with buildEmail function call.", () => {
      var result = mailer.buildEmail(to, subject, htmlBody);
      expect(result).to.deep.equal(email);
    });
    
    it("Mailer reject Error on failed send email to the user with send function call.", () => {
      return mailer.send(smtpConfig, email)
        .catch((errorResult) => {
          expect(errorResult).to.have.property("type");
          expect(errorResult).to.have.property("msg");
        });
    });
  });
});