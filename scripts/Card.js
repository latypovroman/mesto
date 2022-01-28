export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;

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
      this._handleCardClick(this._name, this._link);
    });
  }

  _handlerCardDelete() {
    this._cardDelete.closest('.card').remove();
  }

  _likeToggle() {
    this._cardLike.classList.toggle('card__like_active');
  }

}
