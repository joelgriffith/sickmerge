var CodeMirrorMerge = require('code-mirror/addon/merge'),
	CodeMirror = require('code-mirror/mode/javascript'),
	$ = require('jquery-browserify');

var leftPanel = new CodeMirrorMerge.MergeView(document.getElementById('split-left'), {
	value: $('.both').html(),
	origLeft: $('.yours').html(),
	origRight: $('.theirs').html(),
	highlightDifferences: true,
	smartIndent: true,
	mode: 'javascript',
	lineNumbers: true
});