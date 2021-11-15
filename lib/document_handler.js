const config = require('../config.js')
const KeyGenerator = require('./key_generator.js');
const chalk = require('chalk');

// handles creating new and requesting existing documents
const DocumentHandler = function(options) {
	if (!options) {
		options = {};
	}
	this.store = options.store;
	this.maxLength = config.maxLength
	this.keyLength = config.keyLength
	this.createKey = options.createKey || '';
	this.keyGenerator = new KeyGenerator();

	if (this.createKey !== '') {
		console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.green("Creation-Key:", this.createKey));
	}
};

// handles existing documents
DocumentHandler.prototype.handleGet = function(key, res) {
	this.store.get(key, function(ret) {
		if (ret) {
			console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.green("Opening paste " + key)) 
			res.writeHead(200, {'content-type': 'application/json'});
			res.end(JSON.stringify({key: key, data: ret.replace(/\t/g, '    ')}));
		} else {
			console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.red('Paste not found:', key));
			res.writeHead(404, {'content-type': 'application/json'});
			res.end(JSON.stringify({message: 'Paste not found.'}));
		}
	});
};

// handles exisiting documents (raw)
DocumentHandler.prototype.handleRawGet = function(key, res) {
	this.store.get(key, function(ret) {
		if (ret) {
			console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.green('Open paste:', key));
			res.writeHead(200, {'content-type': 'text/plain'});
			res.end(ret);
		} else {
			console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.red('Paste not found:', key));
			res.writeHead(404, {'content-type': 'application/json'});
			res.end(JSON.stringify({message: 'Paste not found.'}));
		}
	});
};

// handles creating new documents
DocumentHandler.prototype.handlePost = function(req, res) {
	var _this = this;
	 buffer = '';
	const cancelled = false;
	req.on('data', function(data) {
		if (cancelled) return;
		buffer += data.toString();
		if (_this.maxLength && buffer.length > _this.maxLength) {
			cancelled = true;
			console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.red('Paste exeeds maximum length.'));
			res.writeHead(400, {'content-type': 'application/json'});
			res.end(JSON.stringify({message: 'Paste exceeds maximum length.'}));
		}
	});
	req.on('end', function() {
		if (cancelled) return;

		if (_this.createKey !== '') {
			if (!buffer.startsWith(_this.createKey)) {
				console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.red('Error adding new paste: wrong key'));
				res.writeHead(400, {'content-type': 'application/json'});
				res.end(JSON.stringify({message: 'Error adding new paste: wrong key'}));
				return;
			}
			buffer = buffer.substring(_this.createKey.length);
		}

		_this.chooseKey(function(key) {
			_this.store.set(key, buffer, function(success) {
				if (success) {
					console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.green('New paste:', key));
					res.writeHead(200, {'content-type': 'application/json'});
					res.end(JSON.stringify({key: key}));
				} else {
					console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.red('Error adding new paste.'));
					res.writeHead(500, {'content-type': 'application/json'});
					res.end(JSON.stringify({message: 'Error adding new paste.'}));
				}
			});
		});
	});
	req.on('error', function(error) {
		console.log(chalk.bold.cyan("[Expressbin] ") + chalk.bold.red('Connection error: ' + error.message));
		res.writeHead(500, {'content-type': 'application/json'});
		res.end(JSON.stringify({message: 'Connection error.'}));
	});
};

// creates new keys until one is not taken
DocumentHandler.prototype.chooseKey = function(callback) {
	var key = this.acceptableKey();
	var _this = this;
	this.store.get(key, function(success) {
		if (success) {
			_this.chooseKey(callback);
		} else {
			callback(key);
		}
	});
};

// creates a new key using the key-generator
DocumentHandler.prototype.acceptableKey = function() {
	return this.keyGenerator.createKey(this.keyLength);
};

module.exports = DocumentHandler;