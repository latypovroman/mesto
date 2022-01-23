export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._data = data;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  }


  generateCard() {
    this._template = this._getTemplate();
    const cardImage = this._template.querySelector('.card__image');

    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._template.querySelector('.card__title').textContent = this._data.name;

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
    // this._template.querySelector('.card__image').addEventListener('click', () => {
    //   popupImageOpen();
    // });
  }

  _handlerCardDelete() {
    this._template.querySelector('.card__like').closest('.card').remove();
  }

  _popupImageOpen() {
    openPopup(popupImage);
    const popupImagePicture = popupImage.querySelector('.popup__popup-image');
    const popupImageTitle = popupImage.querySelector('.popup__image-title');

    popupImagePicture.src = this._data.link;
    popupImageTitle.textContent = this._data.name;
    popupImagePicture.alt = this._data.name;
  }

  _likeToggle() {
    this._template.querySelector('.card__like').classList.toggle('card__like_active');
  }

}
