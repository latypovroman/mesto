export default class Card {
  constructor(data, cardSelector, {handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    // this._user = user;

  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {
    this._template = this._getTemplate();
    this._cardImage = this._template.querySelector('.card__image');
    this._cardText = this._template.querySelector('.card__title');
    this._cardDelete = this._template.querySelector('.card__delete');
    this._cardLike = this._template.querySelector('.card__like-btn');
    this._likeCounter = this._template.querySelector('.card__like-counter');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();
    return this._template;

  }

  _setEventListeners() {
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick();
      this._deleteCard();
    });

    this._cardLike.addEventListener('click', () => {
      this._likeToggle();
      this._handleLikeClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _deleteCard() {
    this._cardDelete.closest('.card').remove();
  }

  _likeToggle() {
    this.isLiked() ?  this._deleteLike() : this._putLike();
  }

  isLiked() {
    return this._cardLike.classList.contains('card__like-btn_active');
  }

  _putLike() {
    this._cardLike.classList.add('card__like-btn_active');
  }

  _deleteLike() {
    this._cardLike.classList.remove('card__like-btn_active');
  }

}
