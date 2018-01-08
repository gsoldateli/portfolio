function Gallery() {
	this.items = document.querySelectorAll('article.gallery-item');
	this.bg = document.querySelector('.backimage');

	this.init = function() {
		var self = this;		
		for(var x = 0; x < self.items.length; x++) {
			self.items[x].addEventListener('click',function(){
				self.changeImage(this);
			});			
		}

		//Init swipe detection
		self.swipeDetection(function(swipeDir){

			if(swipeDir === 'none') return false;

			var activeItem = document.querySelector('.gallery-item.active');

			var selectedItem;
			if(swipeDir === "left" || swipeDir === "top") {
				//Previous
				selectedItem = activeItem.previousElementSibling;

				if(selectedItem === null) {
					//If there is no previous item, uses the last one
					selectedItem = self.items[self.items.length -1];
				}				
			}

			if(swipeDir === "right" || swipeDir === "bottom") {
				//Next
				selectedItem = activeItem.nextElementSibling;	

				if(selectedItem === null) {
					//If there is no next item, uses the first one
					selectedItem = self.items[0];
				}					
			}

			//FF/Chrome click name function difference
			if (selectedItem.onclick) {
			   selectedItem.onclick();
			} else if (selectedItem.click) {
			   selectedItem.click();
			}
		});

		this.changeImage(this.items[0]);
	};

	this.changeImage = function(item) {
		var self = this;
		var src = item.querySelector('img').src;

		for(var x = 0; x < self.items.length; x++) {
			self.items[x].classList.remove('active');
		}

		//set the selected item as active
		item.classList.add('active');


		self.bg.classList.remove('fadeout','fadein');
		self.bg.classList.add('fadeout');

		setTimeout(function(){
			self.bg.classList.remove('fadeout');
			self.bg.classList.add('fadein');
			self.bg.style.backgroundImage = "url('"+src+"')";
		},500);
		

	};
	
	// Thanks to http://www.javascriptkit.com/javatutors/touchevents2.shtml
	// PS:. I've done this just for study purposes, i'd rather to separate this code outside the gallery itself
	this.swipeDetection = function(callback) {
		var touchsurface = this.bg,
		swipedir,
	    startX,
	    startY,
	    distX,
	    distY,
	    threshold = 80, //required min distance traveled to be considered swipe
	    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
	    allowedTime = 300, // maximum time allowed to travel that distance
	    elapsedTime,
	    startTime,
	    handleswipe = callback || function(swipedir){}

	    touchsurface.addEventListener('touchstart', function(e){
	        var touchobj = e.changedTouches[0]
	        swipedir = 'none'
	        dist = 0
	        startX = touchobj.pageX
	        startY = touchobj.pageY
	        startTime = new Date().getTime() // record time when finger first makes contact with surface
	        e.preventDefault()
	    }, false);

	    touchsurface.addEventListener('touchmove', function(e){
	        e.preventDefault() // prevent scrolling when inside DIV
	    }, false);	
		    
	    touchsurface.addEventListener('touchend', function(e){
	        var touchobj = e.changedTouches[0]
	        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
	        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
	        elapsedTime = new Date().getTime() - startTime // get time elapsed
	        if (elapsedTime <= allowedTime){ // first condition for awipe met
	            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
	                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
	            }
	            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
	                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
	            }
	        }
	        handleswipe(swipedir)
	        e.preventDefault()
	    }, false);        

	}

	this.init();
}

var $G = new Gallery();