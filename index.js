#! /usr/bin/env node
/*
 * sickmerge
 * https://github.com/jgriffith/sickmerge
 *
 * Copyright (c) 2014 jgriffith
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    program = require('commander'),
    version = require('./package.json').version,
    git = require('./src/lib/git');

program
    .version(version)
    .usage('[options]')
    .option('-a, --auto', 'Automatically find all conflicted files to resolve')
    .option('-f, --file [value]', 'The location of the conflicted file you wish to resolve.')
    .option('-u, --hostname [value]', 'The host URL you want the browser to load (defaults to localhost).')
    .option('-p, --port <n>', 'The port you wish to deploy on (defaults to 3000).', parseInt)
    .option('-s, --syntax [value]', 'The language of the file for syntax highlighting (optional), defaults to no highlighting. Run with "-o" to see the available options.')
    .option('-m, --merge [value]', 'Specify the initial view in the middle (merged) window on instantiation. Valid options are "yours", "theirs", and "both". Defaults to "yours"')
    .parse(process.argv);

if (program.merge && ['yours', 'theirs', 'both'].indexOf(program.merge) === -1) {
    console.log('You\'ve specified an invalid initial merged view: "' + program.merge + '".\nPlease use either "yours", "theirs", or "both"');
    return;
}

if (program.help) {
    program.outputHelp();
    return;
}

git.getConflicted(function(data) {
	console.log(data);
});