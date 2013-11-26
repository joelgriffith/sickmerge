/*
 *	Dependencies
 */
var CodeMirrorMerge = require('code-mirror/addon/merge'),
	CodeMirrorLoadMode = require('code-mirror/addon/mode/loadmode'),
	CodeMirror = require('code-mirror'),
	$ = require('jquery-browserify'),
	mode = ($('.mode').html()) ? $('.mode').html() : null,
	syntaxLib = (mode) ? require('code-mirror/mode/' + mode + '.js') : '',
	hilight = true;


/*
 *	3-Way setup
 */
var mergeView = new CodeMirror.MergeView(document.getElementById('git-diff'), {
	value: $('.both').html(),
	origLeft: $('.yours').html(),
	origRight: $('.theirs').html(),
	highlightDifferences: hilight,
	smartIndent: true,
	title: 'Merging',
	theme: 'solarized-dark',
	mode: mode,
	lineNumbers: true
});

/*
 *	Button Functionality
 */

// On Save
$('[data-id="save-file"]').click(function() {
	var finalFile = { content: mergeView.edit.getValue() };

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
	mergeView.edit.setValue(mergeView.leftOriginal().doc.getValue());
});

// Selecting Theirs
$('[data-id="merge-theirs"]').click(function() {
	mergeView.edit.setValue(mergeView.rightOriginal().doc.getValue());
});

// Hiding Diff
$('[data-id="hide-diff"]').click(function() {
	mergeView.setShowDifferences(hilight = !hilight);
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