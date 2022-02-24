const url = require("url");
const fs = require("fs");
const express = require("express");
const logs = require("./logger.js");

const DocumentHandler = require("./lib/document_handler.js");
const FileStorage = require("./lib/file_storage.js");

// load configuration
const config = require("./config/config.js");

// logger-setup
logs.success("Server has been running on port " + config.port);

// init file-storage
const fileStorage = new FileStorage(config.dataPath);

// configure the document handler 
const documentHandler = new DocumentHandler({
  store: fileStorage,
  maxLength: config.maxLength,
  keyLength: config.keyLength,
  createKey: config.createKey,
});

// setup routes and request-handling
const app = express();

app.get("/raw/:id", function (req, res) {
  return documentHandler.handleRawGet(req.params.id, res);
});
app.post("/documents", function (req, res) {
  return documentHandler.handlePost(req, res);
});
app.get("/documents/:id", function (req, res) {
  return documentHandler.handleGet(req.params.id, res);
});
app.use(express.static("static"));
app.get("/:id", function (req, res, next) {
  res.sendFile(__dirname + "/static/index.html");
});

var server;
if (!config.ssl.useSSL) {
  var http = require('http');
  server = http.createServer(app);
} else {
  var https = require('https');
  server = https.createServer({
    key: fs.readFileSync(config.ssl.privateKeyPath, 'utf8'),
    cert: fs.readFileSync(config.ssl.certificatePath, 'utf8')
  }, app);
}

const slowDown = require("express-slow-down");
app.enable("trust proxy");
const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, 
  delayAfter: 5, 
  delayMs: 500 
});

app.use(speedLimiter);

server.listen(config.port);
