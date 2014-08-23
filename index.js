#! /usr/bin/env node

/*
 * sickmerge
 * https://github.com/jgriffith/sickmerge
 *
 * Copyright (c) 2014 jgriffith
 * Licensed under the MIT license.
 */

var fs = require('fs');
var _ = require('lodash');
var program = require('commander');
var version = require('./package.json').version;
var git = require('./src/git');

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

function setupServer(conflictedFiles) {
    var filesArray = [];
    _.each(conflictedFiles.split('\n'), function(file, i) {
        fs.readFileSync(file, 'utf8', function(err, results) {
            if (err) throw new Error('There was a problem reading: ' + file);
            filesArray.push({
                id: i,
                theirs: git.getTheirs(results),
                mine: git.getMine(results),
                planin: git.getPlain(results)
            });
        });
    });
}

git.getConflicted(setupServer);