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
    // context("Check Request for send Email.", () => {
    //   var request;
    //   var response;
      
    //   beforeEach((done) => {
    //     request = httpMocks.createRequest({
    //       method: "POST",
    //       header: {
    //         "X-SOCOBO-AUTH": "23648fdfhfh348384834sdfdf"
    //       },
    //       body: {
    //         list: [
    //           {desc: "Butter"},
    //           {desc: "Wasser"}
    //         ]
    //       }
    //     });
        
    //     response = httpMocks.createResponse();
        
    //     done();
    //   });
      
    //   it("Check Auth Header.", (done) => {
        
    //     util.checkSendRequest(request, response, () => {
          
    //       if (request.get("X-SOCOBO-AUTH") === undefined) {
    //         throw new Error("Not authorized");
    //       }
          
    //       done();
          
    //     });
        
    //   });
    // });
    
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
});
