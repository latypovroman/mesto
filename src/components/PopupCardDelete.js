import Popup from './Popup.js';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector, submitAction) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitAction = submitAction;
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._submitAction);
  }
}
