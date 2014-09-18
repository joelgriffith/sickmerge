/*
 *	Index JS
 *	Require all your scripts here and init them!
 *	You should be using the ES6 Import/Export syntax!
 */
import Editor from 'editor';
var mockContent = require('raw-loader!../../test/mocks/javascript-content.js');

var leftPane = new Editor({
	id: 'yours',
	content: mockContent,
	mode: 'ace/mode/javascript',
	theme: 'tomorrow_night_eighties'
});

var rightPane = new Editor({
	id: 'theirs',
	content: mockContent,
	mode: 'ace/mode/javascript',
	theme: 'tomorrow_night_eighties'
});

var middlePane = new Editor({
	id: 'both',
	content: mockContent,
	mode: 'ace/mode/javascript',
	theme: 'tomorrow_night_eighties',
	isEditable: true,
	scrollMirrorEls: ['#yours', '#theirs']
});