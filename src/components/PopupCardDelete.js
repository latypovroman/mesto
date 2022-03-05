import Popup from './Popup.js';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  getSubmitAction(action) {
    this._deleteAction = action;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._deleteAction);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._deleteAction);
  }
}
