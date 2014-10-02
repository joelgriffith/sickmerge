import sanitizer from 'sanitizer';

export default function Editor(params) {
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
		editor.setValue(params.content, 1);
	}

	if (!params.isEditable) {
		editor.setReadOnly(true);
	}

	function getEditor() {
		return getEditor();
	}

	function getSession() {
		return editor.getSession();
	}

	return {
		getEditor: getEditor,
		getSession: getSession
	};
}