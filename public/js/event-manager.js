export default function EventManager() {
	var $expander = $('.expander');
	var $sideBar = $('.side-bar');

	function listen() {
		$expander.on('click', handleExpanderClick);
	}

	function handleExpanderClick(/* event */) {
		$sideBar.toggleClass('active');
	}

	return {
		listen: listen
	};
}