export default {

	getEl (selector) {
		let els = document.querySelectorAll(selector);
		if (els.length) {
			if (els.length === 1) {
				return els[0];
			} else {
				return [].slice.call(els);
			}
		}
	}
};