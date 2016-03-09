module.exports = {
  /**
   * Generate Plain Email Body Text
   * 
   * @param itemList
   * @returns {String}
   * @function
   */
  generatePlainBodyText: function(itemList) {
    var emailText = "Grocery List Items:\n\n";
    itemList.forEach(function(item) {
      emailText += "- " + item + "\n"
    });
    return emailText;
  },
  
  /**
   * Generate HTML Email Body Text
   * 
   * @param itemList
   * @returns {String}
   * @function
   */
  generateHtmlBodyText: function(itemList) {
    var emailText = "";
    
    emailText += "<h1>Socobo Project</h1>";
    emailText += "</br>"
    emailText += "</br>"
    emailText += "<h3>Grocery List Items:</h3>";
    emailText += "</br>"
    emailText += "</br>"
    emailText += "<ul>"
    
    itemList.forEach(function(item) {
      emailText += "<li>&#x95; " + item + "</li>"
    });
    
    emailText += "</ul>"
    
    return emailText;
  }
};
