# Expressbin
> 
> For a Expressbin demo click here: https://paste.fdmz17.repl.co

# Setup
First, clone this repo with the following command: ` git clone https://github.com/FDMZ17/expressbin/`
Then run `npm install` to install the dependencies,
Then run `npm start` to start the server


# SSL [optional]

```javascript
module.exports = {
	"appname": "Expressbin",
	"host": "0.0.0.0",
	"port": 8080,
	"dataPath": "./data",
	"keyLength": 10,
	"maxLength": 500000,
	"createKey": "",
	"ssl": {
		"useSSL": false,
		"privateKeyPath": "<ssl path>",
		"certificatePath": "<cert path>"
	},
}
```
Make sure to replace the <ssl path> and <cert path> with your ssl and cert path
	

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU](https://choosealicense.com/licenses/agpl-3.0/)

# Discord
> FDMZ17#4616
