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
    this._cardImage = this._template.querySelector('.card__image');
    this._cardText = this._template.querySelector('.card__title');
    this._cardDelete = this._template.querySelector('.card__delete');
    this._cardLike = this._template.querySelector('.card__like');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._setEventListeners();

    return this._template;
  }

  _setEventListeners() {
    this._cardDelete.addEventListener('click', () => {
      this._handlerCardDelete();
    });
    this._cardLike.addEventListener('click', () => {
      this._likeToggle();
    });
    this._cardImage.addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  _handlerCardDelete() {
    this._cardDelete.closest('.card').remove();
  }

  _openImagePopup() {
    const popupImage = document.querySelector('.popup_type_open-image');
    const popupImagePicture = popupImage.querySelector('.popup__popup-image');
    const popupImageTitle = popupImage.querySelector('.popup__image-title');
    this._openPopup(popupImage);

    popupImagePicture.src = this._link;
    popupImageTitle.textContent = this._name;
    popupImagePicture.alt = this._name;
  }

  _likeToggle() {
    this._cardLike.classList.toggle('card__like_active');
  }

}
