//$carousel
(function(window){

function Carousel(element) {
	var root = element;
	this.items = root.querySelectorAll('.carousel__items > .carousel__item');
	this.navItems = null;
	this.arrows = null;

	this.init = function() {
		this._generateNavigation();
		this._generateArrows();
	};

	this.goTo = function(index) {
		var selectedNav = root.querySelector('.carousel__nav > .carousel__nav-item--active');
		var selectedContent = root.querySelector('.carousel__item--active');

		selectedNav.classList.remove('carousel__nav-item--active');
		selectedContent.classList.remove('carousel__item--active');

		this.navItems[index].classList.add('carousel__nav-item--active');
		this.items[index].classList.add('carousel__item--active');
	}

	this.arrowNav = function(direction) {
		var selectedNav = root.querySelector('.carousel__nav > .carousel__nav-item--active');
		var gotoIndex = Number.parseInt(selectedNav.dataset.index) + direction;		
		var goTo = this.navItems[gotoIndex];

		if(goTo === undefined) {
			(direction > 0) ? gotoIndex = 0 : gotoIndex = this.navItems.length - 1;
		}

		this.goTo(gotoIndex);
	}

	this._generateNavigation = function() {
		var self = this;
		var items = this.items;
		var html = '';
		var firstClass = 'carousel__nav-item--active';

		var navElement = document.createElement('div');

		html += '<ul class="carousel__nav">';

		for(var x = 0; x < items.length; x++) {
			html += '<li class="carousel__nav-item '+ firstClass +'" data-index='+x+'> </li>';
			firstClass = '';
		}

		html += '</ul>';

		navElement.innerHTML = html;

		root.appendChild(navElement);
		this.navItems = root.querySelectorAll('.carousel__nav > li');

		for (var x = 0; x < this.navItems.length; x++) {
			this.navItems[x].addEventListener('click', function(){
				self.arrowNav(1);
				self.goTo(this.dataset.index);
			});
		}
	}

	this._generateArrows = function() {
		var self = this;
		var arrowContainer = document.createElement('div');
		arrowContainer.innerHTML = 
		'<span class="carousel__arrow carousel__arrow--left fa fa-chevron-left"></span>'
	  	+'<span class="carousel__arrow carousel__arrow--right fa fa-chevron-right"></span>';

	  	root.appendChild(arrowContainer);

	  	root.querySelector('.carousel__arrow--left')
	  	.addEventListener('click', function(){
  			self.arrowNav(-1);
	  	});

		root.querySelector('.carousel__arrow--right')
	  	.addEventListener('click', function(){
  			self.arrowNav(1);
	  	});	  	
	}
}

window.carousel = function(elements) {
	var carousels = document.querySelectorAll('.carousel');


	for (var x = 0; x < carousels.length; x++) {
		var car = new Carousel(carousels[x]);
		car.init();
	}

	return car;
}();
})(window);