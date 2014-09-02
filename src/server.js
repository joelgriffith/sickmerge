var express = require('express');
var app = express();
var _= require('lodash');
var fs = require('fs');
var files = [];

function start(port) {
	if (files.length === 0) throw new Error('Router started before #setFiles was called');

	startRoutes();
	app.use(express.static(__dirname + '../public'));
	app.listen(port);
}

function startRoutes() {
	app.route('/files')
		.get(function(req, res) {
			res.send(files);
		})
		.post(function(req, res) {
			var fileLocation = _.find(files, { name: req.params.fileName }).name;
			fs.writeFileSync(fileLocation, req.params.contents, function(err) {
				if (err) res.send(err);
				else res.send('ok');
			});
		});
}

function setFiles(filesArray) {
	files = filesArray;
}

module.exports = {
	start: start,
	setFiles: setFiles
};