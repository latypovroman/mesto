import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePicture = document.querySelector('.popup__popup-image');
    this._popupImageTitle = document.querySelector('.popup__image-title');
  }

  open(name, link) {
    super.open();

    this._popupImagePicture.src = link;
    this._popupImageTitle.textContent = name;
    this._popupImagePicture.alt = name;
  }
}
