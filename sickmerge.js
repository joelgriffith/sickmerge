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
    fileLocation,
    env = require('./lib/config')();

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

    // Setup parameters, load additional files
    var hostname = (program.hostname) ? program.hostname : 'localhost',
        port = (program.port) ? program.port : 3000,
        merge = (program.merge) ? program.merge : 'yours',
        extension = fileLocation.split('.').pop(),
        syntax = (program.syntax) ? program.syntax : syntaxOptions.getSyntax(extension),
        threeWayMerge = require('./lib/gitStrip')(result.toString(), merge),
        express = require('express'),
        app = express(),
        path = require('path'),
        open = require('open');   


    // Web server setup
    app.use(express.bodyParser());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, 'public')));

    // Build the base route for the page
    app.get('/', function (req, res) {
        res.render('editor', { 
            title: fileLocation, 
            syntax: syntax,
            body: threeWayMerge 
        });
    });

    // Post route for saving the file (this is final) and closes the process
    app.post('/save', function (req, res) {
        var content = req.body.content;
        fs.writeFile(fileLocation, content, function (err) {
            if (err) throw "There was an issues saving your file: " + err;
            res.send('complete');
            process.exit();
        });
    });

    // Get route for cancelling the file (this is final) and closes the process
    app.get('/cancel', function (req, res) {
        res.send('terminated');
        process.exit();
    });

    console.log(
        'Sickmerge is waiting for changes.\n' +
        'Visit http://' + hostname + ':' + port + '/ in your browser to make changes\n' +
        'Pressing "Save" or "Cancel" will do the action and close the sickmerge program.\n'+
        'Press CTRL+C if you\'ve closed your web browser and didn\'t click either of those buttons.'
    );
    app.listen(port);
    if( env !== 'test') open('http://' + hostname + ':' + port);
});