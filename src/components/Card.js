export default class Card {
  constructor(userId, data, cardSelector, {handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._template = this._getTemplate();
    this._likeCounter = this._template.querySelector('.card__like-counter');
    this._userId = userId;

  }

  _handleDeleteButton() {
    if (this._userId === this._ownerId) {

      return this._cardDelete.classList.add('card__delete_enabled');
    }
  }

  _getTemplate() {

    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  }

  generateCard() {


    this._cardImage = this._template.querySelector('.card__image');
    this._cardText = this._template.querySelector('.card__title');
    this._cardDelete = this._template.querySelector('.card__delete');
    this._cardLike = this._template.querySelector('.card__like-btn');


    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
    this._likeSetStyle();
    this.updateLikeCount(this._likes.length);
    this._handleDeleteButton();
    this._setEventListeners();

    return this._template;

  }

  _setEventListeners() {
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  deleteCard() {
    this._cardDelete.closest('.card').remove();
  }

  toggleLike(likesArray) {
    this.isLiked(likesArray) ?  this._deleteLike() : this._putLike();
  }

  _likeSetStyle() {
    return this.isLiked(this._likes) ?  this._putLike() : this._deleteLike();
  }

  isLiked(likesArray) {
    const myId = this._userId
    if (likesArray.length === 0) {

      return false

    } else {

      return likesArray.some(function(user) {
        return user._id == myId

      })
    }
  }

  _putLike() {
    this._cardLike.classList.add('card__like-btn_active');
  }

  _deleteLike() {
    this._cardLike.classList.remove('card__like-btn_active');
  }

  updateLikeCount(amount) {
    this._likeCounter.textContent = amount
  }
}
