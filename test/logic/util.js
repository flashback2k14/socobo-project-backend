var expect = require("chai").expect;
var util = require("../../app/logic/util");


describe("Util Methods", () => {
  describe("Create Email Body Text", () => {
    it("Convert an Array of Items to a Plain String.", () => {
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
    
    it("Convert an Array of Items to a HTML String", () => {
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
