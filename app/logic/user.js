var https = require("https");
var devEnv = require("../../dev-env.json");

const BASE_URL = process.env.FIREBASE_BASE_URL || devEnv.FIREBASE_BASE_URL;
const TOKEN = process.env.FIREBASE_TOKEN || devEnv.FIREBASE_TOKEN;

var optionsget = (userId) => {
  return {
    host: BASE_URL,
    port: 443,
    path: "/profiles/" + userId + "/email.json?auth=" + TOKEN,
    method: "GET"
  };
};

function _makeRequest(options, resolve, reject) {
  var reqGet = https.request(options, (res) => {
    var data;
    res.on("data", (d) => data = JSON.parse(d) );
    res.on("end", () => {
      if (data && !data.error) {
        resolve(data); // because returning 200 on error makes sense
      } else {
        reject(new Error("Not authorized"));
      }
    })
  });
  reqGet.on("error", (error) => reject(error));
  reqGet.end();
}

function _getUserMail(userId) {
  return new Promise((resolve, reject) => _makeRequest(optionsget(userId), resolve, reject));
};

module.exports = {
  getUserMail: _getUserMail
}
