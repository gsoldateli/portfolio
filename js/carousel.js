//$carousel
(function(window) {
	'use strict';
	function Carousel(element) {
		let root = element;
		this.items = root.querySelectorAll('.carousel__items > .carousel__item');
		this.navItems = null;
		this.arrows = null;

		this.init = () => {
			this._generateNavigation();
			this._generateArrows();
		};

		this.goTo = index => {
			let selectedNav = root.querySelector('.carousel__nav > .carousel__nav-item--active');
			let selectedContent = root.querySelector('.carousel__item--active');

			selectedNav.classList.remove('carousel__nav-item--active');
			selectedContent.classList.remove('carousel__item--active');

			this.navItems[index].classList.add('carousel__nav-item--active');
			this.items[index].classList.add('carousel__item--active');
		};

		this.arrowNav = direction => {
			let selectedNav = root.querySelector('.carousel__nav > .carousel__nav-item--active');
			let gotoIndex = Number.parseInt(selectedNav.dataset.index) + direction;
			let goTo = this.navItems[gotoIndex];

			if (goTo === undefined) {
				direction > 0 ? (gotoIndex = 0) : (gotoIndex = this.navItems.length - 1);
			}

			this.goTo(gotoIndex);
		};

		this._generateNavigation = function() {
			let self = this;
			let items = this.items;
			let html = '';
			let navElement = document.createElement('div');

			function buildCarouselItems(strings, tokens) {
				let markup = strings[0];
				let firstClass = 'carousel__nav-item--active';

				tokens.forEach((item, index) => {
					markup += `<li class="carousel__nav-item ${firstClass}" data-index=${index}> </li>`;
					firstClass = '';
				});

				markup += strings[1];

				return markup;
			}

			html = buildCarouselItems`<ul class="carousel__nav">
				${items}
			</ul>`;

			navElement.innerHTML = html;
			root.appendChild(navElement);

			this.navItems = root.querySelectorAll('.carousel__nav > li');
			this.navItems.forEach(navItem => {
				navItem.addEventListener('click', function() {
					self.arrowNav(1);
					self.goTo(this.dataset.index);
				});
			});
		};

		this._generateArrows = function() {
			let self = this;
			let arrowContainer = document.createElement('div');
			arrowContainer.innerHTML = `<span class="carousel__arrow carousel__arrow--left fa fa-chevron-left"></span>
				<span class="carousel__arrow carousel__arrow--right fa fa-chevron-right"></span>`;

			root.appendChild(arrowContainer);

			root.querySelector('.carousel__arrow--left').addEventListener('click', function() {
				self.arrowNav(-1);
			});

			root.querySelector('.carousel__arrow--right').addEventListener('click', function() {
				self.arrowNav(1);
			});
		};
	}

	window.carousel = (function(elements) {
		document.querySelectorAll('.carousel').forEach(carousel => {
			let car = new Carousel(carousel);
			car.init();
		});
	})();
})(window);
