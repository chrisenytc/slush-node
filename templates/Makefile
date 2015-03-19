# <%= appNameSlug %>
# https://github.com/<%= userName %>/<%= appNameSlug %>
#
# Copyright (c) <%= year %>, <%= authorName %>
# Licensed under the <%= license %> license.

test:

	@NODE_ENV=test ./node_modules/mocha/bin/mocha -R spec --ui bdd --colors --recursive -t 8000 ./test/*.spec.js

.PHONY: test