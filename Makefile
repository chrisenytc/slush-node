# slush-node
# https://github.com/chrisenytc/slush-node
#
# Copyright (c) 2014 Christopher EnyTC
# Licensed under the MIT license.


test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha -R spec

.PHONY: test