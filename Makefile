BIN = ./node_modules/.bin
PATH := $(BIN):$(PATH)

build-utils:
	@$(call compile,tiny-utils)

publish-utils:
	@$(call publish,tiny-utils)

build-all: build-utils

define publish
	npm publish ./build/$(1)
endef

define compile
	@jshint ./$(1)/*.js
	rm -rf ./build/$(1) && mkdir ./build/$(1)
	cp ./$(1)/*.json ./build/$(1)
	cat ./header ./$(1)/index.js ./footer > ./build/$(1)/index.js
	@uglifyjs ./build/$(1)/index.js -o ./build/$(1)/index.min.js
endef
