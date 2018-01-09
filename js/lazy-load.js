(function(window){
	//Get all images to be lazy loaded
	$images = document.querySelectorAll('img[data-src]');

	//To each image
	for(var x=0; x<$images.length; x++) {
		var loading = createLoading();

		//Insert loading element before the image
		$images[x].parentElement.insertBefore(loading, $images[x]);

		//Define src attribute with the data-src
		$images[x].setAttribute('src', $images[x].getAttribute('data-src'));

		$images[x].onload = onLoadImage($images[x],loading);
	}

	function onLoadImage(image, loading) {
		return function() {
			//Remove loading when image loads.
			loading.remove();
			//Remove data-src to apply the needed css animations. 
			image.removeAttribute('data-src');	
		}
	};

	function createLoading() {
		var loading = document.createElement('div');
		loading.classList.add("img-loader");
		loading.innerHTML = '<div class="img-loader__icon">'
		+ '<span class="fa fa-refresh fa-spin"></span>'
		+ '</div>';

		return loading;
	}


})(window);