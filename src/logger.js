// Console colors
var colors = require("colors");

// [INFO] console out
var info = function (message) {
  console.log(colors.blue.bold("[Expressbin Info]"), message);
};

// [ERROR] console out 
var error = function (message) {
  console.log(colors.red.bold("[Expressbin Error]"), message);
};

// [SUCCESS] console out
var success = function (message) {
  console.log(colors.green.bold("[Expressbin Success]"), message);
};

// [AUTH] console out
var auth = function (message) {
  console.log(colors.yellow.bold("[Expressbin Auth]"), message);
};

// Module exports
module.exports.info = info;
module.exports.error = error;
module.exports.success = success;
module.exports.auth = auth;
