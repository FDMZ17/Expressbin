module.exports = {
	'appname': 'Expressbin',
	'host': '0.0.0.0',
    'port': 9090,
	'dataPath': './data',
	'keyLength': 5,
	'maxLength': 500000,
	'createKey': '',
	'ssl': {
		"useSSL": false,
		"privateKeyPath": "<ssl path>",
		"certificatePath": "<cert path>"
	}
}
