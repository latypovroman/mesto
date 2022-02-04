export default class Card {
  constructor(data, cardSelector, {user, handleCardClick, handleDeleteClick}) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    // this._handleLikeClick = handleLikeClick;
    this._user = user;

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

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._setEventListeners();

    return this._template;
  }

  _setEventListeners() {
    this._cardDelete.addEventListener('click', (evt) => {
      evt.preventDefault();
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

  // didILike({likes}) {
  //   likes.map((item) {
  //     item._id === this._user
  //   })
  //   return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  // }

  likeToggle() {
    this._cardLike.classList.toggle('card__like-btn_active');
  }

}
