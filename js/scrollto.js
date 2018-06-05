// Reference: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    (callback => {
      //Worst case scenario trigger animation via setTimeout.
      window.setTimeout(callback, 1000 / 60);
    })
  );
})();

//This is an adaptation from https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
(function(window) {
  let self = window;

  //TODO Flexbilize this code.
  let scrollWindow = document.querySelector('.content-holder');

  //TODO Flexibilize this code.
  let menuHeight = document.querySelector('.navbar').getBoundingClientRect().height + 10;

  self.getPosY = function(element) {
    element = element.getBoundingClientRect();
    return element.top + scrollWindow.scrollTop - menuHeight;
  };

  self.scrollToElement = (element, duration, cbFunction) => {
    if (!duration) {
      duration = 1000;
    }

    //If CSS selector is passed.
    if (!element.nodeName) {
      // Query it into DOM element
      element = document.querySelector(element);
    }

    if (!element) {
      throw 'Element inexistent!';
    }

    let startingY = scrollWindow.scrollTop;

    let diff = self.getPosY(element) - startingY;
    let start;

    //Got from https://gist.github.com/gre/1650294
    let easing = function(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimFrame(function step(timestamp) {
      if (!start) start = timestamp;

      // Elapsed miliseconds since start of scrolling.
      let time = timestamp - start;
      // Get percent of completion in range [0, 1].
      let percent = Math.min(time / duration, 1);

      percent = easing(percent);

      scrollWindow.scrollTo(0, startingY + diff * percent);

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimFrame(step);
      } else if (cbFunction) {
        //On animation end execute callback function if provided.
        cbFunction();
      }
    });
  };

  window.scrollToElement = self.scrollToElement;
})(window);
