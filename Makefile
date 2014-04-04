BIN = ./node_modules/.bin
PATH := $(BIN):$(PATH)

compile:
	jshint index.js
	uglifyjs index.js -o ./dist/tiny-belt.min.js
	gzip -k -f -q ./dist/tiny-belt.min.js
	ls -lah ./dist/tiny-belt.min.js.gz
