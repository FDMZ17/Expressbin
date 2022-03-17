// Console colors
var chalk = require("chalk");

// [INFO] console out
var info = function (message) {
  console.log(chalk.blue.bold("[=]"), message);
};

// [ERROR] console out 
var error = function (message) {
  console.log(chalk.red.bold("[!]"), message);
};

// [SUCCESS] console out
var success = function (message) {
  console.log(chalk.green.bold("[+]"), message);
};

// [AUTH] console out
var auth = function (message) {
  console.log(chalk.yellow.bold("[^]"), message);
};

// Module exports
module.exports.info = info;
module.exports.error = error;
module.exports.success = success;
module.exports.auth = auth;
