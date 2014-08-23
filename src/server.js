var express = require('express');
var app = express();
var _ = require('lodash');
var fs = require('fs');
var files = [];

function _start(port) {
	app.use(express.static(__dirname + '../public'));
	_startRoutes();
	app.listen(port);
}

function _startRoutes() {
	if (files.length === 0) throw new Error('Router started before #setFiles was called');

	app.route('/files')
		.get(function(req, res) {
			res.send(files);
		})
		.post(function(req, res) {
			var fileLocation = _.find(files, { name: req.params.fileName });
			fs.writeFileSync(fileLocation, req.params.contents, function(err) {
				if (err) res.send(err);
				else res.send('ok');
			});
		});
}

function _setFiles(filesArray) {
	files = filesArray;
}

module.exports = {
	start: _start,
	setFiles: _setFiles
};