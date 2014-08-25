#! /usr/bin/env node

/*
 * sickmerge
 * https://github.com/jgriffith/sickmerge
 *
 * Copyright (c) 2014 jgriffith
 * Licensed under the MIT license.
 */

var _ = require('lodash');
var program = require('commander');
var version = require('./package.json').version;
var git = require('./src/git');
var server = require('./src/server');

program
    .version(version)
    .usage('[options]')
    .option('-f, --file [value]', 'The location of the conflicted file you wish to resolve.')
    .option('-u, --hostname [value]', 'The host URL you want the browser to load (defaults to localhost).', 'localhost')
    .option('-p, --port <n>', 'The port you wish to deploy on (defaults to 3000).', 3000)
    .option('-s, --syntax [value]', 'The language of the file for syntax highlighting (optional), defaults to no highlighting.')
    .option('-m, --merge [value]', 'Specify the initial view in the middle (merged) window on instantiation. Valid options are "yours", "theirs", and "both". Defaults to "yours"')
    .parse(process.argv);

if (program.merge && ['yours', 'theirs', 'both'].indexOf(program.merge) === -1) {
    console.log('You\'ve specified an invalid initial merged view: "' + program.merge + '".\nPlease use either "yours", "theirs", or "both"');
    return;
}

function setupServer(conflictedFiles) {
    if(!conflictedFiles) program.help();

    var filesArray = [];
    _.each(conflictedFiles.split('\n'), function(file, i) {
        filesArray.push({
            id: i,
            theirs: git.getTheirs(file),
            mine: git.getMine(file),
            planin: git.getPlain(file)
        });
    });
    server.setFiles(filesArray);
    server.start();
    console.log('Visit http://' + program.hostname + ':' + program.port + ' in your browser');
    console.log('You can resolve files by saving, and cancel by hitting "Cancel" or ctrl+c');
}

if (program.file) {
    setupServer(program.file);
}
else {
    git.getConflicted(setupServer);
}