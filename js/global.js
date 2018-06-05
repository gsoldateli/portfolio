function windowWidthCount() {
	let $widthLabel = document.querySelector('.window-width-label');
	$widthLabel.innerHTML = window.outerWidth;
}

window.onload = () => windowWidthCount();

window.addEventListener('resize', () => windowWidthCount());

function closeLateralMenu() {
	document.querySelector('#menu-open').checked = '';
}

function loadLiveExample(src) {
	let $iframe = document.querySelector('.iframe-live');
	$iframe.src = src;
}
