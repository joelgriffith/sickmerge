import sanitizer from 'sanitizer';

function Editor(params) {
	sanitizer.parseParams(params, {
		id: 'string',
		content: 'string',
		mode: 'string'
	});

	this.mode = params.mode;
	this.editor = ace.edit(params.id);
	this.content = params.content;

	if (this.mode) {
		this.editor.getSession().setMode(this.mode);
	}

	if (this.content) {

	}
}

Editor.prototype = {
	setTheme: function(theme) {
		this.editor.setTheme('ace/theme/' + theme);
	},
	setContent: function(content) {
		console.log(this.editor);
	}
};

export default Editor;