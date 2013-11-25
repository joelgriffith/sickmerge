/*
 *	Dependencies
 */
var CodeMirrorMerge = require('code-mirror/addon/merge'),
	CodeMirror = require('code-mirror/mode/javascript'),
	$ = require('jquery-browserify');

/*
 *	3-Way setup
 */
var leftPanel = new CodeMirrorMerge.MergeView(document.getElementById('git-diff'), {
	value: $('.both').html(),
	origLeft: $('.yours').html(),
	origRight: $('.theirs').html(),
	highlightDifferences: true,
	smartIndent: true,
	mode: 'javascript', // TODO: Dynamically load other modes
	theme: 'solarized-dark',
	lineNumbers: true
});

/*
 *	Button Functionality
 */

// On Save
$('[data-id="save-file"]').click(function() {
	var finalFile = { content: leftPanel.edit.getValue() };

	// Send the code over and close
	$.ajax({
		url: '/save',
		type: 'post',
		data: finalFile,
		dataType: 'json',
		complete: function() {
			window.close();
		}
	});
});

// On Cancel
$('[data-id="cancel"]').click(function() {
	window.close();
});