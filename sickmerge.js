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
    program = require('commander'),
    fileLocation;

// Program Setup and Options
program
    .version('0.0.1')
    .usage('[options] <conflicted file location>')
    .option('-h, --hostname [value]', 'The host URL you wish to query in the browser (defaults to localhost).')
    .option('-p, --port <n>', 'The port you wish to deploy on (defaults to 3000).', parseInt)
    .option('-m, --merge [value]', 'Specify the initial view in the middle (merged) window on instantiation. Valid options are "yours", "theirs", and "both". Defaults to "yours"')
    .parse(process.argv);

// Store the file location so we can persist later
fileLocation = program.args[0];

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

// Read the passed file, strip the git comments, and build the web service
fs.readFile(fileLocation, 'UTF-8', function(err, result) {
    if (err) return console.log('There was an error loading your file! ' + err);

    // Setup parameters, load additional files
    var hostname = (program.hostname) ? program.hostname : 'localhost',
        port = (program.port) ? program.port : 3000,
        merge = (program.merge) ? program.merge : 'yours',
        resultArray = require('./lib/gitStrip')(result, merge),
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
        var content = req.body.content;
        console.log(content);
        fs.writeFile(fileLocation, content, function (err) {
            if (err) throw "There was an issues saving your file: " + err;
            process.exit();
        });
    });
    
    // Open the browser to the page    
    app.listen(port);
    exec('open http://' + hostname + ':' + port);
});