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
<<<<<<< HEAD:mergetest
var express = require('express'),
=======
var express = require('express');
>>>>>>> MASTER

    app = express(),
    port = 2001,
    fs = require('fs'),
    path = require('path'),
    userArgs = process.argv.slice(2),
	searchParam = userArgs[0],
	gitStrip = require('./lib/gitStrip');

/*
 * Application configuration and initiation
 */
<<<<<<< HEAD:mergetest
app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
=======
app.use( express.bodyParser() );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
>>>>>>> 4e2b407f501b68f8588aa645acafffa0224b9b78:mergetest

/*
 * Serve the static public directory
 */
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));
=======
app.use( express.static( path.join(__dirname, 'public')));

>>>>>>> 4e2b407f501b68f8588aa645acafffa0224b9b78:mergetest
// Route to retrive files on the system for editing
app.get('/', function (req, res) {

	// Strip the passed file and build the page
	gitStrip(searchParam, function(err, result) {
		if (err) throw 'There was a problem with loading your file, check to see if it exists: ' + err;
		res.render('editor', { body: result });
	});
});

// Route for persisting to the file system
app.post('/save', function (req) {
	var location = '.' + req.body.location.replace('/file',''),
		content = req.body.text;

	fs.writeFile(location, content, function (err) {
		if (err) throw err;
	});
});

/* 
 * Startup the server
 */
app.listen(port);
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
<<<<<<< HEAD:mergetest
var express = require('express'),
=======
var express = require('express');
>>>>>>> MASTER

    app = express(),
    port = 2001,
    fs = require('fs'),
    path = require('path'),
    userArgs = process.argv.slice(2),
    searchParam = userArgs[0],
    gitStrip = require('./lib/gitStrip');

/*
 * Application configuration and initiation
 */
<<<<<<< HEAD:mergetest
app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
=======
app.use( express.bodyParser() );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
>>>>>>> 4e2b407f501b68f8588aa645acafffa0224b9b78:mergetest

/*
 * Serve the static public directory
 */
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));
=======
app.use( express.static( path.join(__dirname, 'public')));

>>>>>>> 4e2b407f501b68f8588aa645acafffa0224b9b78:mergetest
// Route to retrive files on the system for editing
app.get('/', function (req, res) {

    // Strip the passed file and build the page
    gitStrip(searchParam, function(err, result) {
        if (err) throw 'There was a problem with loading your file, check to see if it exists: ' + err;
        res.render('editor', { body: result });
    });
});

// Route for persisting to the file system
app.post('/save', function (req) {
    var location = '.' + req.body.location.replace('/file',''),
        content = req.body.text;

    fs.writeFile(location, content, function (err) {
        if (err) throw err;
    });
});

/* 
 * Startup the server
 */
app.listen(port);