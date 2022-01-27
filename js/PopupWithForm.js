import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitAction}) {
    super(popupSelector);
    this._submitAction = submitAction;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.form__input');

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset()
  }
}
