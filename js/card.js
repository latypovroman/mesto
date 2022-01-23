export default class Card {
  constructor(data, cardSelector, openPopup) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {
    this._template = this._getTemplate();
    const cardImage = this._template.querySelector('.card__image');
    const cardText = this._template.querySelector('.card__title');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardText.textContent = this._name;

    this._setEventListeners();

    return this._template;
  }

  _setEventListeners() {
    this._template.querySelector('.card__delete').addEventListener('click', () => {
      this._handlerCardDelete();
    });
    this._template.querySelector('.card__like').addEventListener('click', () => {
      this._likeToggle();
    });
    this._template.querySelector('.card__image').addEventListener('click', () => {
      this._popupImageOpen();
    });
  }

  _handlerCardDelete() {
    this._template.querySelector('.card__like').closest('.card').remove();
  }

  _popupImageOpen() {
    const popupImage = document.querySelector('.popup_type_open-image');
    const popupImagePicture = popupImage.querySelector('.popup__popup-image');
    const popupImageTitle = popupImage.querySelector('.popup__image-title');
    this._openPopup(popupImage);

    popupImagePicture.src = this._link;
    popupImageTitle.textContent = this._name;
    popupImagePicture.alt = this._name;
  }

  _likeToggle() {
    this._template.querySelector('.card__like').classList.toggle('card__like_active');
  }

}
