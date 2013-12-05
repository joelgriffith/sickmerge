#! /usr/bin/env node
/*
 * sickmerge
 * https://github.com/jgriffith/sickmerge
 *
 * Copyright (c) 2013 jgriffith
 * Licensed under the MIT license.
 */

 /*
 * Module Dependencies/Setup
 */
var fs = require('fs'),
    program = require('commander'),
    syntaxOptions = require('./lib/syntax'),
    version = require('./package.json').version,
    sickserver = require('./server/sickserver'),
    fileLocation;

// Program Setup and Options
program
    .version(version)
    .usage('[options] <conflicted file location>')
    .option('-h, --hostname [value]', 'The host URL you wish to query in the browser (defaults to localhost).')
    .option('-o, --syntaxes', 'Will show the available syntax options for syntax highlighting.')
    .option('-p, --port <n>', 'The port you wish to deploy on (defaults to 3000).', parseInt)
    .option('-s, --syntax [value]', 'The language of the file for syntax highlighting (optional), defaults to no highlighting. Run with "-o" to see the available options.')
    .option('-m, --merge [value]', 'Specify the initial view in the middle (merged) window on instantiation. Valid options are "yours", "theirs", and "both". Defaults to "yours"')
    .parse(process.argv);

// Store the file location so we can persist later
fileLocation = program.args[0];

// For printing available syntax options
function printSyntaxOptions () {
    console.log('Available options include:\n' + syntaxOptions.showSupportedSyntaxes());
    return;
}

// If the user wants to see the syntax options
if (program.syntaxes) {
    printSyntaxOptions();
    return;
}

// No File given, print help since it's required
if (!fileLocation) {
    program.outputHelp();
    return;
}

// Invalid merge option
if (program.merge && ['yours', 'theirs', 'both'].indexOf(program.merge) === -1) {
    console.log('You\'ve specified an invalid initial merged view: "' + program.merge + '".\nPlease use either "yours", "theirs", or "both"');
    return;
}

// Invalid syntax option
if (program.syntax && syntaxOptions.indexOf(program.syntax) === -1) {
    console.log('You\'ve specified an invalid syntax option: ' + program.syntax);
    printSyntaxOptions();
    return;
}

// Read the passed file, strip the git comments, and build the web service
fs.readFile(fileLocation, function(err, result) {
    if (err) return console.log('There was an error loading your file! ' + err);

    // Start the web-service with the params
    sickserver({
        location: fileLocation,
        hostname: program.hostname,
        port: program.port,
        merge: program.merge || 'yours',
        syntax: program.syntax || syntaxOptions.getSyntax(fileLocation.split('.').pop()),
        threeWayMerge: require('./lib/gitStrip')(result.toString(), this.merge),
    });
});