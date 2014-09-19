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
		content: mockContent + '\n' + mockContent,
		mode: 'ace/mode/javascript',
		theme: 'tomorrow_night_eighties',
		isEditable: true
	});

	setupEvents();
}

function setupEvents() {
	middlePane.getSession().on('change', updateDiff);
	setupScroll();
}

function setupScroll() {
	middlePane.getSession().on('changeScrollTop', offset => mirrorScrollTop(offset, 'middle'));
	middlePane.getSession().on('changeScrollLeft', offset => mirrorScrollLeft(offset, 'middle'));
}

function updateDiff() {
	console.log(leftPane.getSession().getValue());
	let yoursDelta = diff.diffLines(leftPane.getSession().getValue(), middlePane.getSession().getValue()),
		theirsDelta = diff.diffLines();

	console.log(yoursDelta);
}

function mirrorScrollTop(offset) {
	let middlePaneLength = middlePane.getSession().getLength(),
		rightPaneLength = rightPane.getSession().getLength(),
		leftPaneLength = leftPane.getSession().getLength(),
		leftOffset,
		rightOffset;

	leftOffset = offset * (leftPaneLength / middlePaneLength);
	rightOffset = offset * (rightPaneLength / middlePaneLength);

	leftPane.getSession().setScrollTop(leftOffset * 0.8);
	rightPane.getSession().setScrollTop(rightOffset * 0.8);
}

function mirrorScrollLeft(offset) {
	middlePane.getSession().setScrollLeft(offset);
	leftPane.getSession().setScrollLeft(offset);
	rightPane.getSession().setScrollLeft(offset);
}

export default { start: start };