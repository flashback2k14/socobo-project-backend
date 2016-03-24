var expect = require("chai").expect;
var httpMocks = require("node-mocks-http");
var util = require("../../app/logic/util");


describe("Util Class", () => {
  
  describe("Util Functions", () => {
    it("Util has a checkSendRequest function.", () => {
      expect(util.checkSendRequest).to.exist;
    });
    
    it("Util has a getAuthHeaderTag function.", () => {
      expect(util.getAuthHeaderTag).to.exist;
    });
    
    it("Util has a generatePlainBodyText function.", () => {
      expect(util.generatePlainBodyText).to.exist;
    });
    
    it("Util has a generateHtmlBodyText function.", () => {
      expect(util.generateHtmlBodyText).to.exist;
    });
  });
  
  describe("Util Usage", () => {
    it("Get Auth Header Tag.", () => {
      expect(util.getAuthHeaderTag()).to.equal("X-SOCOBO-AUTH");
    });
    
    it("Convert an Array of items to a plain string for email body text.", () => {
      // test input
      var input = [
        {desc: "Butter"},
        {desc: "Wasser"},
        {desc: "Brot"},
        {desc: "Kaese"}
      ];
      // test output
      var output = "Grocery List Items:\n\n- Butter\n- Wasser\n- Brot\n- Kaese\n";
      // create body text
      var body = util.generatePlainBodyText(input);
      // test
      expect(body).to.equal(output);
    });
    
    it("Convert an Array of items to a HTML string for email body text.", () => {
      // test input
      var input = [
        {desc: "Butter"},
        {desc: "Wasser"}
      ];
      // test output
      var output = "<h1>Socobo Project</h1>";
      output += "</br>"
      output += "</br>"
      output += "<h3>Grocery List Items:</h3>";
      output += "</br>"
      output += "</br>"
      output += "<ul>"
      output += "<li>&#x95; Butter</li>"
      output += "<li>&#x95; Wasser</li>"
      output += "</ul>"
      // create body text
      var body = util.generateHtmlBodyText(input);
      // test
      expect(body).to.equal(output);
    });
  });
  
  describe("Util Middleware", () => {
    describe("Check failed Request for send Email - Auth Header.", () => {
      var request;
      var response;
      // before each middleware test
      beforeEach((done) => {
        // mack request, response
        request = httpMocks.createRequest({
          headers: {
            "X-SOCOBO": "sdfghjkge2345643erfgbfvdfe56"
          },
          method: "POST"
        });
        // mock response
        response = httpMocks.createResponse();
        // done after mocking
        done();
      });
      // reset request, response
      afterEach((done) => {
        request = null;
        response = null;
        done();
      });
      // check auth header
      it("Throw Error if no Auth Header is set.", (done) => {
        util.checkSendRequest(request, response, (error) => {
          if (request.get("X-SOCOBO-AUTH") === undefined) {
            expect(error).to.equal("Not authorized!");
          }
        });
        // done with test
        done();
      });
    });
    
    describe("Check failed Request for send Email - HTTP Request.", () => {
      var request;
      var response;
      // before each middleware test
      beforeEach((done) => {
        // mack request, response
        request = httpMocks.createRequest({
          headers: {
            "X-SOCOBO-AUTH": "sdfghjkge2345643erfgbfvdfe56"
          },
          method: "GET"
        });
        // mock response
        response = httpMocks.createResponse();
        // done after mocking
        done();
      });
      // reset request, response
      afterEach((done) => {
        request = null;
        response = null;
        done();
      });
      // check HTTP method
      it("Throw Error if the wrong HTTP method send.", (done) => {
        util.checkSendRequest(request, response, (error) => {
          if (request.method !== "POST") {
            expect(error).to.equal("Wrong HTTP Method!");
          }
        });
        // done with test
        done();
      });
    });
    
    describe("Check failed Request for send Email - no body property.", () => {
      var request;
      var response;
      // before each middleware test
      beforeEach((done) => {
        // mack request
        request = httpMocks.createRequest({
          headers: {
            "X-SOCOBO-AUTH": "sdfghjkge2345643erfgbfvdfe56"
          },
          method: "POST"
        });
        // mock response
        response = httpMocks.createResponse();
        // done after mocking
        done();
      });
      // reset request, response
      afterEach((done) => {
        request = null;
        response = null;
        done();
      });
      // check if body param is set
      it("Throw Error if no body params is set.", (done) => {
        util.checkSendRequest(request, response, (error) => {
          if (!request.hasOwnProperty("body")) {
            expect(error).to.equal("No body params set!");
          }
        });
        // done with test
        done();
      });
    });
    
    describe("Check failed Request for send Email - empty body property.", () => {
      var request;
      var response;
      // before each middleware test
      beforeEach((done) => {
        // mack request
        request = httpMocks.createRequest({
          headers: {
            "X-SOCOBO-AUTH": "sdfghjkge2345643erfgbfvdfe56"
          },
          method: "POST",
          body: { }
        });
        // mock response
        response = httpMocks.createResponse();
        // done after mocking
        done();
      });
      // reset request, response
      afterEach((done) => {
        request = null;
        response = null;
        done();
      });
      // check body param list length
      it("Throw Error if the length of body params is zero.", (done) => {
        util.checkSendRequest(request, response, (error) => {
          if (Object.keys(request.body).length === 0) {
            expect(error).to.equal("No Request Data available to Mail!");
          }
        });
        // done with test
        done();
      });
    });
    
    describe("Check failed Request for send Email - no list property inside body.", () => {
      var request;
      var response;
      // before each middleware test
      beforeEach((done) => {
        // mack request
        request = httpMocks.createRequest({
          headers: {
            "X-SOCOBO-AUTH": "sdfghjkge2345643erfgbfvdfe56"
          },
          method: "POST",
          body: {
            "listXZ": [ ]
           }
        });
        // mock response
        response = httpMocks.createResponse();
        // done after mocking
        done();
      });
      // reset request, response
      afterEach((done) => {
        request = null;
        response = null;
        done();
      });
      // check body param list length
      it("Throw Error if no list property is inside body.", (done) => {
        util.checkSendRequest(request, response, (error) => {
          if (!request.body.hasOwnProperty("list")) {
            expect(error).to.equal("No list property is set into body params!");
          }
        });
        // done with test
        done();
      });
    });
    
    describe("Check failed Request for send Email - empty list property inside body.", () => {
      var request;
      var response;
      // before each middleware test
      beforeEach((done) => {
        // mack request
        request = httpMocks.createRequest({
          headers: {
            "X-SOCOBO-AUTH": "sdfghjkge2345643erfgbfvdfe56"
          },
          method: "POST",
          body: {
            list: [ ]
          }
        });
        // mock response
        response = httpMocks.createResponse();
        // done after mocking
        done();
      });
      // reset request, response
      afterEach((done) => {
        request = null;
        response = null;
        done();
      });
      // check body param list length
      it("Throw Error if list property is empty inside body.", (done) => {
        util.checkSendRequest(request, response, (error) => {
          if (request.body.list.length === 0) {
            expect(error).to.equal("No Grocery List Items available to Mail!");
          }
        });
        // done with test
        done();
      });
    });
  });
});
