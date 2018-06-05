(function(window) {
  'use strict';
  //Class applied when modal opacity is 1
  let cbClass = 'modal__overlay--active';

  function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
        //el.remove();
        el.style.display = 'none';
        el.classList.remove(cbClass);
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = 'block';

    (function fade() {
      let val = parseFloat(el.style.opacity);
      //Increase opacity while it is not totally opaque.
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val;
        el.classList.add(cbClass);
        requestAnimationFrame(fade);
      }
    })();
  }

  window.modal = idModal => {
    let modalOverlay = null;
    let modal = document.querySelector('[data-modal-id="' + idModal + '"]');

    function _createOverlay() {
      let body = document.querySelector('body');

      //Create modal overlay element
      modalOverlay = document.createElement('section');
      modalOverlay.style.display = 'none';

      modalOverlay.classList.add('modal__overlay');
      modalOverlay.classList.add('modal__overlay--active');

      //Make modal container visible
      modal.style.display = 'block';

      //Append modal container into the fresh new overlay
      modalOverlay.appendChild(modal);

      //Append modal overlay into the document.
      body.appendChild(modalOverlay);
    }

    function _registerCloseEvents() {
      Array.from(modalOverlay.querySelectorAll('[data-close]'), closeElement => {
        closeElement.addEventListener('click', function() {
          fadeOut(modalOverlay);
        });
      });
    }
    //Check if modal is already created.
    if (document.querySelector('.modal__overlay > [data-modal-id="' + idModal + '"]')) {
      //Set modal overlay as the already created modal overlay.
      modalOverlay = document.querySelector('.modal__overlay > [data-modal-id="' + idModal + '"]').parentElement;
    }

    if (modalOverlay === null) {
      _createOverlay();
      _registerCloseEvents();
    }

    return {
      fadeIn: () => {
        fadeIn(modalOverlay);
      },
      fadeOut: () => {
        fadeOut(modalOverlay);
      }
    };
  };

  //Init modal openers
  Array.from(document.querySelectorAll('[data-modal-open]'), modalOpener => {
    modalOpener.addEventListener('click', function() {
      let idModal = this.dataset.modalOpen;
      window.modal(idModal).fadeIn();
    });
  });
})(window);
