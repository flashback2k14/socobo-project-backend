var expect = require("chai").expect;
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
    it("Mailer is not null after requiring.", () => {
      expect(mailer).to.not.equal(null);
    });
    
    it("Mailer is not undefined after requiring.", () => {
      expect(mailer).to.not.equal(undefined);
    });
    
    it("Mailer has host, port, useSsl, user & pw property after setup function call.", () => {
      var host = "host.host.host";
      var port = 241;
      var useSsl = true;
      var user = "test.test";
      var pw = "dfdghjk";
      
      mailer.setup(host, port, useSsl, user, pw);
      
      expect(mailer).to.have.property("host");
      expect(mailer).to.have.property("port");
      expect(mailer).to.have.property("useSsl");
      expect(mailer).to.have.property("user");
      expect(mailer).to.have.property("pw");
    });
    
    it("Mailer return smtp config object with getSmtpConfig function.", () => {
      var input = {
        host: "host.host.host",
        port: 241,
        secure: true,
        auth: {
          user: "test.test",
          pass: "dfdghjk"
        }
      };
      
      var output = mailer.getSmtpConfig();
      
      expect(output).to.deep.equal(input);
    });
    
    it("Mailer build email with buildEmail function call.", () => {
      var to = "test2.test";
      var subject = "test subject";
      var htmlBody = "<h1>Hello, World!</h1>";
      
      var output = {
        from: "test.test",
        to: to,
        subject: subject,
        html: htmlBody
      };
      
      var email = mailer.buildEmail(to, subject, htmlBody);
      
      expect(email).to.deep.equal(output);
    });
    
    // it("Mailer send email to the user with send function call.", () => {
    //   //throw new Error("ToDo");
    // });
  });
});