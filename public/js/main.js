var CodeMirrorMerge = require('code-mirror/addon/merge'),
	CodeMirror = require('code-mirror/mode/javascript'),
	$ = require('jquery-browserify');

var leftPanel = new CodeMirrorMerge.MergeView(document.getElementById('git-diff'), {
	value: $('.both').html(),
	origLeft: $('.yours').html(),
	origRight: $('.theirs').html(),
	highlightDifferences: true,
	smartIndent: true,
	mode: 'javascript',
	lineNumbers: true
});

// Set the height to fill the screen
$('.CodeMirror-merge, .CodeMirror-merge .CodeMirror').height($(window).height() - $('.toolbar').height());

// On Save
$('[data-id="save-file"]').click(function() {
	var finalFile = { content: leftPanel.edit.getValue() };

	$.ajax({
		url: '/save',
		type: 'post',
		data: finalFile,
		dataType: 'json',
		success: function() {
			window.close();
		}
	});
});