var spawn = require('child_process').spawn;
var fs = require('fs');

function _getConflicted() {
	var conflicted = spawn('git', ['diff', '--name-only', '--diff-filter=U']);
	conflicted.stdout.on('data', function(data) {
		console.log(data.toString());
	});
}

function _getFile(fileLocation) {
	return fs.readFileSync(fileLocation, 'utf8');
}

function _getMine(fileLocation) {
	return _getFile(fileLocation).replace();
}

function _getTheirs(fileLocation) {

}

module.exports = {
	getConflicted: _getConflicted
};