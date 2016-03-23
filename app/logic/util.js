module.exports = {
  /**
   * Middleware to check request for the send mail request
   * 
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Function} next - Callback
   * @returns {Boolean | Function}
   * @function
   */
  checkRequest: function(req, res, next) {
    // check if the request has data inside the body
    if (req.get("X-SOCOBO-AUTH") === undefined) {
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
    // go to next function
    next();
  },
  
  /**
   * Return Auth Header Tag
   * 
   * @returns {String}
   * @function
   */
  getAuthHeaderTag: function() {
    return "X-SOCOBO-AUTH";
  },
  
  /**
   * Generate Plain Email Body Text
   *
   * @param {Array} itemList
   * @returns {String}
   * @function
   */
  generatePlainBodyText: function(itemList) {
    var emailText = "Grocery List Items:\n\n";
    itemList.forEach(function(item) {
      emailText += "- " + item.desc + "\n"
    });
    return emailText;
  },

  /**
   * Generate HTML Email Body Text
   *
   * @param {Array} itemList
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
      emailText += "<li>&#x95; " + item.desc + "</li>"
    });
   
    emailText += "</ul>"
    
    return emailText;
  }
};
