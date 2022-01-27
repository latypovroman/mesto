import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    const popupImagePicture = document.querySelector('.popup__popup-image');
    const popupImageTitle = document.querySelector('.popup__image-title');
    popupImagePicture.src = link;
    popupImageTitle.textContent = name;
    popupImagePicture.alt = name;
  }
}
