/*
 *	Dependencies
 */
var CodeMirrorMerge = require('code-mirror/addon/merge'),
	CodeMirrorLoadMode = require('code-mirror/addon/mode/loadmode'),
	CodeMirror = require('code-mirror'),
	$ = require('jquery-browserify');

/*
 *	3-Way setup
 */
var leftPanel = new CodeMirror.MergeView(document.getElementById('git-diff'), {
	value: $('.both').html(),
	origLeft: $('.yours').html(),
	origRight: $('.theirs').html(),
	highlightDifferences: true,
	smartIndent: true,
	theme: 'solarized-dark',
	lineNumbers: true
});

CodeMirror.modeURL = "mode/%N.js";
CodeMirror.autoLoadMode(leftPanel, "ruby");

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