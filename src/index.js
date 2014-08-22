var git = require('./lib/git');

git.getConflicted(function(data) {
	console.log(data);
});