const http = require('http');
const url = require('url');
const fs = require('fs');
const chalk = require('chalk')
const express = require('express');

const DocumentHandler = require('./lib/document_handler.js');
const FileStorage = require('./lib/file_storage.js');


// load configuration
const config = require('./config.js')

// logger-setup
console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.green("Server has been running on port " + config.port))

// init file-storage
const fileStorage = new FileStorage(config.dataPath);

// configure the document handler
const documentHandler = new DocumentHandler({
	store: fileStorage,
	maxLength: config.maxLength,
	keyLength: config.keyLength,
	createKey: config.createKey
});

// setup routes and request-handling
const app = express();

app.get('/raw/:id', function(req, res) {
	return documentHandler.handleRawGet(req.params.id, res);
});
app.post('/documents', function(req, res) {
	return documentHandler.handlePost(req, res);
});
app.get('/documents/:id', function(req, res) {
	return documentHandler.handleGet(req.params.id, res);
});
app.use(express.static('static'));
app.get('/:id', function(req, res, next) {
	res.sendFile(__dirname + '/static/index.html');
});

app.listen(config.port, config.host);
