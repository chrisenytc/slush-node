# slush-node
# https://github.com/chrisenytc/slush-node
#
# Copyright (c) 2015, Christopher EnyTC
# Licensed under the MIT license.


test:

	@NODE_ENV=test ./node_modules/mocha/bin/mocha -R spec --ui bdd --colors --recursive -t 20000 ./test/*.spec.js

.PHONY: test