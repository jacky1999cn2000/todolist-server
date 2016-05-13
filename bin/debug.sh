#!/bin/sh
node_modules/.bin/node-inspector --web-port=8989 --debug-port=3344 --preload=false & node_modules/.bin/nodemon --debug -L --ignore node_modules/ --ignore tests/ app.js
