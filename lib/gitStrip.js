/*
 *	Git Strip
 *
 *	Given a string for the file location, return
 *	3 files (in an array) of the conflicted file.
 *	The first is the local version (HEAD), the second is
 *	the bare file with both edits (might need changing), and the last is the 
 *	file being merged (master, commit...)
 *
 *	@param fileText {string} The text to parse out git conflict messages
 */
module.exports = function(fileText) {

	// Check to see if the parameters were passed
	if (!fileText || fileText.indexOf('<<<<<<<') === -1) throw 'Please pass conflicted file to parse';
	
	// Regex for generating the files to diff
	var stripTheirs = /(?:(?:<<<<<<<)|(?:=======[\S\s]*?>>>>>>>)).+\n/g,
		stripYours = /(?:(?:>>>>>>>)|(?:<<<<<<<[\S\s]*?=======)).*\n/g,
		// Removes all the git comments
		stripAll = /(?:(?:<<<<<<<)|(?:=======)|(?:>>>>>>>)).*\n/g;

	function createYours (fileContents) {
		return fileContents.replace(stripTheirs, '');
	}
	function createMerged (fileContents) {
		return fileContents.replace(stripTheirs, '');
	}
	function createTheirs (fileContents) {
		return fileContents.replace(stripYours, '');
	}
	// Generates the array of files
	function generateThreeWay (fileContents) {
		return [createYours(fileContents), createMerged(fileContents), createTheirs(fileContents)];
	}
	return generateThreeWay(fileText);
};