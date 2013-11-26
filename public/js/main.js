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

	// Send the code over and close on complete
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

// Selecting Yours
$('[data-id="merge-yours"]').click(function() {
	console.log(leftPanel.left.getValue());
});

// On Cancel
$('[data-id="cancel"]').click(function() {

	// Send the kill signal and close
	$.ajax({
		url: '/cancel',
		complete: function() {
			window.close();
		}
	});
});