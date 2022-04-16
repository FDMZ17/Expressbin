#!/bin/bash

FILE=/home/container/config/expressbin.lock
if [ -f $FILE ]; then
	echo "Exprsssbin server is starting..."
	npm start
else

	read -p "Expressbin server port: " expressbinPort
	sed -i "4s/.*/    'port': $expressbinPort,/" /home/container/config/config.js
	touch /home/container/config/expressbin.lock

fi
