var spawn = require('child_process').spawn;
var fs = require('fs');
var concat = require('concat-stream');

function _getConflicted(cb) {
	if (typeof cb !== 'function') throw new Error('#getConflicted expects a function callback');
	var conflicted = spawn('ls', ['diff', '--name-only', '--diff-filter=U']);
	var result = concat(function(data) {
		cb(data.toString());
	});
	conflicted.stdout.pipe(result);
}

function _getFile(fileLocation) {
	return fs.readFileSync(fileLocation, 'utf8');
}
function _stripFile(file, reg) {
	return file.replace(reg, '');
}

function _getMine(fileLocation) {
	var stripTheirsReg = /(?:(?:<<<<<<<)|(?:=======[\S\s]*?>>>>>>>)).+\n/g;
	return _stripFile(_getFile(fileLocation), stripTheirsReg);
}

function _getTheirs(fileLocation) {
	var stripYoursReg = /(?:(?:>>>>>>>)|(?:<<<<<<<[\S\s]*?=======)).*\n/g;
	return _stripFile(_getFile(fileLocation), stripYoursReg);
}

function _getPlain(fileLocation) {
	var stripAllReg = /(?:(?:<<<<<<<)|(?:=======)|(?:>>>>>>>)).*\n/g;
	return _stripFile(_getFile(fileLocation), stripAllReg);
}

module.exports = {
	getConflicted: _getConflicted,
	getMine: _getMine,
	getTheirs: _getTheirs,
	getPlain: _getPlain
};