/*
 *	Index JS
 *	Require all your scripts here and init them!
 *	You should be using the ES6 Import/Export syntax!
 */
import Editor from 'editor';

var leftPane = new Editor({
	id: 'javascript-editor',
	content: 'var wat = 9;',
	mode: 'ace/mode/javascript'
});

leftPane.setTheme('monokai');
leftPane.setContent();