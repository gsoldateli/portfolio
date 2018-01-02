(function(window){
//Class applied when modal opacity is 1
var cbClass = 'modal__overlay--active';

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      //el.remove();
      el.style.display = "none";
      el.classList.remove(cbClass);
    } else {
      requestAnimationFrame(fade);
    }
  })();
}


function fadeIn(el){
  el.style.opacity = 0;
  el.style.display = "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    //Increase opacity while it is not totally opaque.
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      el.classList.add(cbClass);
      requestAnimationFrame(fade);
    }
  })();
}

window.modal = function(idModal) {
  var modalOverlay = null;
  var modal = document.querySelector('[data-modal-id="'+ idModal +'"]');

  function _createOverlay() {
    var body = document.querySelector('body');

    //Create modal overlay element
    modalOverlay = document.createElement('section');
    modalOverlay.style.display = "none";
    
    modalOverlay.classList.add('modal__overlay');
    modalOverlay.classList.add('modal__overlay--active');
    
    //Make modal container visible
    modal.style.display = "block";

    //Append modal container into the fresh new overlay
    modalOverlay.appendChild(modal);
    
    //Append modal overlay into the document.
    body.appendChild(modalOverlay);
  }

  function _registerCloseEvents() {
    var closeElements = modalOverlay.querySelectorAll('[data-close]');

    for(var x = 0; x < closeElements.length; x++) {
      closeElements[x].addEventListener('click', function(){
        fadeOut(modalOverlay);
      });
    }
  }
  //Check if modal is already created.
  if(document.querySelector('.modal__overlay > [data-modal-id="'+ idModal +'"]')) {
    //Set modal overlay as the already created modal overlay.    
    modalOverlay = document.querySelector('.modal__overlay > [data-modal-id="'+ idModal +'"]').parentElement;
  }

  if(modalOverlay === null) {
    _createOverlay();
    _registerCloseEvents();
  }

  return {
    fadeIn: function() {
      console.log(modalOverlay);
      fadeIn(modalOverlay);
    },
    fadeOut: function(){
      console.log(modalOverlay);
      fadeOut(modalOverlay);
    }
  };
}

//Init modal openers
var modalOpeners = document.querySelectorAll('[data-modal-open]');

//Add fadeIn action on click event of all modal opener elements.
for(var x=0; x< modalOpeners.length; x++) {
  modalOpeners[x].addEventListener('click',function(){
    var idModal = this.dataset.modalOpen;
    window.modal(idModal).fadeIn();
  });
}


})(window);

