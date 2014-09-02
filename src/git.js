var spawn = require('child_process').spawn;
var fs = require('fs');
var concat = require('concat-stream');

function getConflicted(cb) {
	if (typeof cb !== 'function') throw new Error('#getConflicted expects a function callback');
	var conflicted = spawn('git', ['diff', '--name-only', '--diff-filter=U']);
	var result = concat(function(data) {
		cb(data.toString());
	});
	conflicted.stdout.pipe(result);
}

function getFile(fileLocation) {
	return fs.readFileSync(fileLocation, 'utf8');
}

function stripFile(file, reg) {
	return file.replace(reg, '');
}

function getMine(fileLocation) {
	var stripTheirsReg = /(?:(?:<<<<<<<)|(?:=======[\S\s]*?>>>>>>>)).+\n/g;
	return stripFile(getFile(fileLocation), stripTheirsReg);
}

function getTheirs(fileLocation) {
	var stripYoursReg = /(?:(?:>>>>>>>)|(?:<<<<<<<[\S\s]*?=======)).*\n/g;
	return stripFile(getFile(fileLocation), stripYoursReg);
}

function getPlain(fileLocation) {
	var stripAllReg = /(?:(?:<<<<<<<)|(?:=======)|(?:>>>>>>>)).*\n/g;
	return stripFile(getFile(fileLocation), stripAllReg);
}

module.exports = {
	getConflicted: getConflicted,
	getMine: getMine,
	getTheirs: getTheirs,
	getPlain: getPlain
};