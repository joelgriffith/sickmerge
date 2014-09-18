import sanitizer from 'sanitizer';
import dom from 'dom';

function mirrorScroll(master, slaves) {
	let slavEls = [];
	let masterEl = dom.getEl(master + ' .ace_content');

	slaves.forEach(function(slave) {
		slavEls.push(dom.getEl(slave + ' .ace_content'));
	});

	masterEl.addEventListener('mousewheel', function() {
		slavEls.forEach(function(slaveEl) {
			slaveEl.marginTop = masterEl.marginTop;
		});
	});
}

function Editor(params) {
	var editor;

	sanitizer.parseParams(params, {
		id: 'string',
		content: 'string',
		mode: 'string',
		theme: 'string',
		isEditable: 'boolean',
		scrollMirror: 'object'
	});

	editor = ace.edit(params.id);

	if (params.mode) {
		editor.getSession().setMode(params.mode);
	}

	if (params.theme) {
		editor.setTheme('ace/theme/' + params.theme);
	}

	if (params.content) {
		editor.setValue(params.content);
	}

	if (!params.isEditable) {
		editor.setReadOnly(true);
	}

	if (params.scrollMirrorEls && params.scrollMirrorEls.length) {
		mirrorScroll('#' + params.id, params.scrollMirrorEls);
	}
}

export default Editor;