function windowWidthCount() {
	var $widthLabel = document.querySelector('.window-width-label');	
	$widthLabel.innerHTML = window.outerWidth;
}

window.onload = function() {
	windowWidthCount();
}

window.addEventListener('resize', function(){
	windowWidthCount();	
});

function closeLateralMenu() {
	document.querySelector('#menu-open').checked = '';
}