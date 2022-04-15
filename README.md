# Expressbin
> 
> Expressbin demo: https://paste.deploy.fdmz17.eu.org/

# Setup
First, clone this repo with the following command: `git clone https://github.com/FDMZ17/Expressbin`

Then run `npm install` to install the dependencies

Then run `npm start` to start the server

> Or
Use docker

Run the following command: `docker pull ghcr.io/fdmz17/expressbin:latest`

Then run `docker run --publish 8080:8080 ghcr.io/fdmz17/expressbin` 


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
	}
}
```
Make sure to replace the `<ssl path>` and `<cert path>` with your ssl and cert path
	

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# Changelog
> v 1.2
- Docker images

> v 1.1
- Adding ssl 
- Adding ssl config
- Adding readme.md

> v 1.0
- First version

# License
[GNU](https://choosealicense.com/licenses/agpl-3.0/)

# Discord
> FDMZ17#4616
