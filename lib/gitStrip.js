/*
 *	Git Strip
 *
 *	Given a string for the file location, return
 *	3 files (in an array) of the conflicted file.
 *	The first is the local version (HEAD), the second is
 *	the bare file with both edits (might need changing), and the last is the 
 *	file being merged (master, commit...)
 *
 *	@param fileLocation {string} The location of the file to be merged
 *	@param next {function} The function to be called we've completed
 */
var fs = require('fs');

module.exports = function(fileLocation, next) {

	// Check to see if the parameters were passed
	if(!fileLocation || !next) return 'Please pass a file to parse and a callback function';
	
	// Regex for generating the files to diff
	var stripTheirs = /(<<<<<<<).*\n*|(=======[^(>>>>>>>)].*\n)|(>>>>>>>).*\n*/gm,
		stripYours = /(<<<<<<<[^(=======)]*\n).*\n*|(=======)|(>>>>>>>).*\n*/gm;
		
	// Read the file, throwing any errors if something is wrong
	fs.readFile(fileLocation, function(err, file) {
		if (err) next(err);
		var fileContents = file.toString();
		if (fileContents.indexOf('<<<<<<<') === -1) next('File isn\'t conflicted, please select a conflicted file');
		next(null, generateThreeWay(fileContents));
	});

	// Generates the array of files
	function generateThreeWay (fileContents) {
		return [createYours(fileContents), createMerged(fileContents), createTheirs(fileContents)];
	}
	function createYours (fileContents) {
		return fileContents.replace(stripTheirs, '');
	}
	function createMerged (fileContents) {
		return fileContents.replace(stripTheirs, '');
	}
	function createTheirs (fileContents) {
		return fileContents.replace(stripYours, '');
	}
};