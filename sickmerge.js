#! /usr/bin/env node

/*
 * sickmerge
 * https://github.com/jgriffith/sickmerge
 *
 * Copyright (c) 2013 jgriffith
 * Licensed under the MIT license.
 */

 /*
 * Module Dependencies
 */
var fs = require('fs'),
    program = require('commander');

// Program Setup and Options
program
    .version('0.0.1')
    .usage('[options] <file location ...>')
    .option('-h, --hostname [value]', 'The hostname you wish to use (defaults to localhost)')
    .option('-p, --port <n>', 'The port you wish to deploy on (defaults to 3000)', parseInt)
    .option('-m, --merge [value]', 'What you want to display in the middle (merged) window on instantiation. Valid options are "yours", "theirs", and "both". Defaults to "yours"')
    .parse(process.argv);

// No File given, print the help
if (!program.args[0]) {
    program.outputHelp();
    return;
}

// Invalid merge input
if (['yours', 'theirs', 'both'].indexOf(program.merge) === -1) {
    console.log('You specified an invalid merge result, please use either "yours", "theirs", or "both"');
    return;
}

// Read the passed file, strip the git comments, and build the web service
fs.readFile(program.args[0], 'UTF-8', function(err, result) {
    if (err) return console.log('There was an error loading your file! ' + err);

    // Setup parameters, load additional files
    var hostname = (program.hostname) ? program.hostname : 'localhost',
        port = (program.port) ? program.port : 3000,
        merge = (program.merge) ? program.merge : 'yours',
        gitStrip = require('./lib/gitStrip'),
        resultArray = gitStrip(result, merge),
        express = require('express'),
        app = express(),
        exec = require('child_process').exec,
        path = require('path');    

    // Web server setup
    app.use(express.bodyParser());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, 'public')));

    // Build the base route for the page
    app.get('/', function (req, res) {
        res.render('editor', { body: resultArray });
    });

    // Post route for saving the file (this is final) and close the process
    app.post('/save', function (req) {
        var location = '.' + req.body.location.replace('/file',''),
            content = req.body.text;

        fs.writeFile(location, content, function (err) {
            if (err) throw err;
        });
    });
    
    // Open the browser to the page    
    app.listen(port);
    exec('open http://' + hostname + ':' + port);
});