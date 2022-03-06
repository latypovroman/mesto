import Popup from './Popup.js';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  addSubmitAction(action) {
    this._deleteAction = action;
    this._setSubmitAction();
  }

  _setSubmitAction() {
    this._form.addEventListener('submit', this._deleteAction);
  }

  _removeSubmitAction() {
    this._form.removeEventListener('submit', this._deleteAction);
  }

  close() {
    super.close();
    this._removeSubmitAction();
  }
}
