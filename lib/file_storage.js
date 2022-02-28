const fs = require("fs");
const crypto = require("crypto");
const chalk = require("chalk");
const logs = require("../logger.js");

// handles saving and retrieving all documents
const FileDocumentStore = function (options) {
  this.basePath = options.path || "./data";
  logs.info("Data path: " + this.basePath);
};

// saves a new file to the filesystem
FileDocumentStore.prototype.set = function (key, data, callback) {
  _this = this;
  fs.mkdir(this.basePath, "700", function (err) {
    fs.writeFile(_this.basePath + "/" + key, data, "utf8", function (err) {
      if (err) {
        callback(false);
      } else {
        callback(true);
      }
    });
  });
};

// gets an exisiting file from the filesystem
FileDocumentStore.prototype.get = function (key, callback) {
  _this = this;
  fs.readFile("/" + key, "utf8", function (err, data) {
    if (err) {
      callback(false);
    } else {
      callback(data);
    }
  });
};

module.exports = FileDocumentStore;
