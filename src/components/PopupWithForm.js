import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitAction}) {
    super(popupSelector);
    this._submitAction = submitAction;
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__button');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._originalButtonText = this._button.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      debugger;
      this._button.textContent = "Сохранение...";
     } else {
      this._button.textContent = this._originalButtonText;
    }
  }

  _getInputValues() {
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
      this.renderLoading(true);
      this._submitAction(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset()
  }
}
