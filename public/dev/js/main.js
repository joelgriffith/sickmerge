/*
 *	Dependencies
 */
var CodeMirrorMerge = require('code-mirror/addon/merge'),
	CodeMirrorLoadMode = require('code-mirror/addon/mode/loadmode'),
	CodeMirror = require('code-mirror'),
	xhr = require('./ajax.js'),

	// Getting text from the browser
	syntax = document.getElementById('syntax-mode'),
	yoursText = document.getElementById('yours-value').innerHTML,
	theirsText = document.getElementById('theirs-value').innerHTML,
	bothText = document.getElementById('both-value').innerHTML,
	codeMirrorEl = document.getElementById('git-diff'),

	// Flags/Normalizing
	mode = (syntax) ? syntax.innerHTML : null,
	syntaxLib = (mode) ? require('code-mirror/mode/' + mode + '.js') : '',
	hilight = true;


/*
 *	3-Way setup
 */
var mergeView = new CodeMirror.MergeView(codeMirrorEl, {
	value: bothText,
	origLeft: yoursText,
	origRight: theirsText,
	highlightDifferences: hilight,
	smartIndent: true,
	theme: 'solarized-dark',
	mode: mode,
	lineNumbers: true
});

/*
 *	Button Functionality
 */

// // On Save
// $('[data-id="save-file"]').click(function() {
// 	var finalFile = { content: mergeView.edit.getValue() };

// 	// Send the code over and close on complete
// 	$.ajax({
// 		url: '/save',
// 		type: 'post',
// 		data: finalFile,
// 		dataType: 'json',
// 		complete: function() {
// 			window.close();
// 		}
// 	});
// });

// // Selecting Yours
// $('[data-id="merge-yours"]').click(function() {
// 	mergeView.edit.setValue(mergeView.leftOriginal().doc.getValue());
// });

// // Selecting Theirs
// $('[data-id="merge-theirs"]').click(function() {
// 	mergeView.edit.setValue(mergeView.rightOriginal().doc.getValue());
// });

// // Hiding Diff
// $('[data-id="hide-diff"]').click(function() {
// 	mergeView.setShowDifferences(hilight = !hilight);
// });

// // On Cancel
// $('[data-id="cancel"]').click(function() {

// 	// Send the kill signal and close
// 	$.ajax({
// 		url: '/cancel',
// 		complete: function() {
// 			window.close();
// 		}
// 	});
// });