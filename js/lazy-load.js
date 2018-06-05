(function(window) {
	'use strict';
	//Get all images to be lazy loaded
	Array.from(document.querySelectorAll('img[data-src]'), $image => {
		let loading = createLoading();

		//Insert loading element before the image
		$image.parentElement.insertBefore(loading, $image);

		//Define src attribute with the data-src
		$image.setAttribute('src', $image.getAttribute('data-src'));

		$image.onload = onLoadImage($image, loading);
	});

	function onLoadImage(image, loading) {
		return () => {
			//Remove loading when image loads.
			loading.remove();
			//Remove data-src to apply the needed css animations.
			image.removeAttribute('data-src');
		};
	}

	function createLoading() {
		let loading = document.createElement('div');
		loading.classList.add('img-loader');
		loading.innerHTML = `<div class="img-loader__icon">
		<span class="fa fa-refresh fa-spin">
		</span></div>`;

		return loading;
	}
})(window);
