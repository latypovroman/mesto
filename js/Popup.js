export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._page = document.querySelector('.page');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this._page.classList.add('page_scroll_disable');
    this.setEventListeners();
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._page.classList.remove('page_scroll_disable');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
  })
  }
}
