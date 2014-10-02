import Editor from 'editor';
import EventManager from 'event-manager';

let diff = require('diff'),
	mockContent = require('raw-loader!../../test/mocks/javascript-content.js'),
	leftPane,
	rightPane,
	middlePane;

function start() {
	leftPane = new Editor({
		id: 'yours',
		content: mockContent,
		mode: 'ace/mode/javascript',
		theme: 'tomorrow_night_eighties'
	});

	rightPane = new Editor({
		id: 'theirs',
		content: mockContent,
		mode: 'ace/mode/javascript',
		theme: 'tomorrow_night_eighties'
	});

	middlePane = new Editor({
		id: 'both',
		content: mockContent,
		mode: 'ace/mode/javascript',
		theme: 'tomorrow_night_eighties',
		isEditable: true
	});

	setupEvents();
}

function setupEvents() {
	let eventManager = new EventManager();
	eventManager.listen();
	middlePane.getSession().on('change', updateDiff);
	middlePane.getSession().on('changeScrollTop', mirrorScrollTop);
	middlePane.getSession().on('changeScrollLeft', mirrorScrollLeft);
}

function updateDiff() {

}

function mirrorScrollTop(offset) {
	let editorHeight = document.getElementById('both').offsetHeight,
		middlePaneHeight = middlePane.getSession().getLength() * 16,
		rightPaneHeight = rightPane.getSession().getLength() * 16,
		leftPaneHeight = leftPane.getSession().getLength() * 16,
		leftOffset,
		rightOffset;

	leftOffset = (leftPaneHeight - editorHeight) * (offset / (middlePaneHeight - editorHeight));
	rightOffset = (rightPaneHeight - editorHeight) * (offset / (middlePaneHeight - editorHeight));

	leftPane.getSession().setScrollTop(leftOffset);
	rightPane.getSession().setScrollTop(rightOffset);
}

function mirrorScrollLeft(offset) {
	let editorWidth = document.getElementById('both').offsetWidth - document.querySelectorAll('.ace_gutter')[0].offsetWidth,
		middlePaneWidth = document.querySelectorAll('#both .ace_content')[0].offsetWidth,
		rightPaneWidth = document.querySelectorAll('#theirs .ace_content')[0].offsetWidth,
		leftPaneWidth = document.querySelectorAll('#yours .ace_content')[0].offsetWidth,
		leftOffset,
		rightOffset;

	leftOffset = (leftPaneWidth - editorWidth) * (offset / (middlePaneWidth - editorWidth));
	rightOffset = (rightPaneWidth - editorWidth) * (offset / (middlePaneWidth - editorWidth));

	leftPane.getSession().setScrollLeft(leftOffset);
	rightPane.getSession().setScrollLeft(rightOffset);
}

export default { start: start };