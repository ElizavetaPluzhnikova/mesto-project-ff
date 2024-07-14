export function openModal(modal) {
    if (modal && modal.classList.contains('popup')) {
        modal.classList.add('popup_is-animated');
        setTimeout(() => {
            modal.classList.add('popup_is-opened');
          }, 10);
          modal.addEventListener('click', closeModalByOverlay);
          document.addEventListener('keydown', closeModalByEscape);  
    }
}

export function closeModal(modal) {
    if (modal && modal.classList.contains("popup_is-opened")) {
        modal.classList.remove('popup_is-opened');
        modal.removeEventListener('click', closeModalByOverlay);
        document.removeEventListener('keydown', closeModalByEscape);
    }
}

function closeModalByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
      }
}

function closeModalByEscape(evt) {
    if (evt.key === 'Escape') {
        const modalForm = document.querySelector('.popup_is-opened');
        closeModal(modalForm);
    }
}