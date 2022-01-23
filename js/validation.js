export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    const inputs = this._formElement.querySelectorAll(this._inputSelector);
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    Array.from(inputs).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isFormValid = this._formElement.checkValidity();
        this._checkInputValidity(inputElement);
        this.toggleButtonState(isFormValid, buttonElement);
      });
    });

    this._formElement.addEventListener('submit', function(evt) {evt.preventDefault()});
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  toggleButtonState(isFormValid, buttonElement) {
    if(isFormValid) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = 'disabled';
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
}

// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// };

// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// };

// const setEventListeners = (formElement, config) => {
//   const inputs = formElement.querySelectorAll(config.inputSelector);
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   Array.from(inputs).forEach(inputElement => {
//     inputElement.addEventListener('input', function() {
//       const isFormValid = formElement.checkValidity();
//       checkInputValidity(formElement, inputElement, config);
//       toggleButtonState(isFormValid, buttonElement, config);
//     });
//   });

//   formElement.addEventListener('submit', function(evt) {evt.preventDefault()});
// };

// const enableValidation = (config) => {
//   const forms = document.querySelectorAll(config.formSelector);
//   Array.from(forms).forEach(formElement => {
//     setEventListeners(formElement, config);
//   });
// };

// function toggleButtonState(isFormValid, buttonElement, config) {
//   if(isFormValid) {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.disabled = false;
//   } else {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.disabled = 'disabled';
//   }
// };

// const validateObject = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_inactive',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_active'
// };

// enableValidation(validateObject);
