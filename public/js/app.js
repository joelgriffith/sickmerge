import Editor from 'editor';

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
	leftPane.getSession().on('changeScrollTop', mirrorScrollTop);
	leftPane.getSession().on('changeScrollLeft', mirrorScrollLeft);

	middlePane.getSession().on('changeScrollTop', mirrorScrollTop);
	middlePane.getSession().on('changeScrollLeft', mirrorScrollLeft);
	middlePane.getSession().on('change', updateDiff);

	rightPane.getSession().on('changeScrollTop', mirrorScrollTop);
	rightPane.getSession().on('changeScrollLeft', mirrorScrollLeft);
}
	console.log(diff);

function updateDiff() {
	console.log(leftPane.getSession().getValue());
	let yoursDelta = diff.diffLines(leftPane.getSession().getValue(), middlePane.getSession().getValue()),
		theirsDelta = diff.diffLines();

	console.log(yoursDelta);
}

function mirrorScrollTop(offset) {
	middlePane.getSession().setScrollTop(offset);
	leftPane.getSession().setScrollTop(offset);
	rightPane.getSession().setScrollTop(offset);
}

function mirrorScrollLeft(offset) {
	middlePane.getSession().setScrollLeft(offset);
	leftPane.getSession().setScrollLeft(offset);
	rightPane.getSession().setScrollLeft(offset);
}

export default { start: start };