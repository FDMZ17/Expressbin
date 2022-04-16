#!/bin/bash


read -p "Expressbin server port: " expressbinPort
sed -i "4s/.*/    'port': $expressbinPort,/" /home/container/config/config.js
touch /home/container/config/expressbin.lock
