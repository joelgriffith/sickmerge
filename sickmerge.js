#! /usr/bin/env node

/*
 * sickmerge
 * https://github.com/jgriffith/sickmerge
 *
 * Copyright (c) 2013 jgriffith
 * Licensed under the MIT license.
 *//*
 * Module Dependencies
 */
var express = require('express'),
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
app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/*
 * Serve the static public directory
 */
app.use(express.static(path.join(__dirname, 'public')));

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