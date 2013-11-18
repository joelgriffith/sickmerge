var CodeMirror = require('code-mirror/addon/merge'),
	$ = require('jquery-browserify');

	var leftPanel = new CodeMirror.MergeView(document.getElementById('split-left'), {
		value: $('.both').html(),
		origLeft: $('.yours').html(),
		origRight: $('.theirs').html(),
		highlightDifferences: true,
		smartIndent: true,
		lineNumbers: true
	});