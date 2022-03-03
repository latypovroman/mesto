export default class Popup {
  constructor(popupSelector) {
    this._page = document.querySelector('.page');
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._page.classList.add('page_scroll_disable');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._page.classList.remove('page_scroll_disable');
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })

    document.addEventListener('keydown', this._handleEscClose)
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
