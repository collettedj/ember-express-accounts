#!/usr/bin/env node

var repl = require('repl');
var _ = require('lodash');

var commandLine = repl.start("server>");

// Exposing the function "mood" to the local REPL's context.
commandLine.context.__ = _;