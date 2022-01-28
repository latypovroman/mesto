import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js"
import UserInfo from "./UserInfo.js";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_open-image');
// const popups = document.querySelectorAll('.popup');

const formProfile = popupProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');

// const page = document.querySelector('.page');
const name = document.querySelector('#nickname');
const description = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
// const title = document.querySelector('#title');
// const link = document.querySelector('#link');

// const cardList = document.querySelector('.cards__list');

const validateObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const profileValidation =  new FormValidator(validateObject, formProfile);
const addCardValidation = new FormValidator(validateObject, formAddCard);



const initialValidationForms = [profileValidation, addCardValidation];

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const initialCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    initialCardList.setItem(createCard(item));
  }
}, '.cards__list');

initialCardList.renderItems();

initialValidationForms.forEach( function(item) {
  item.enableValidation();
});


function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(popupImage);
  popupWithImage.open(name, link);
}

function createCard(data) {
  const card = new Card(data, ".card-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

const popupWithCard = new PopupWithForm({
  popupSelector: popupAddCard,
  submitAction: (data) => {
    initialCardList.setItem(createCard(data))
    // popupWithCard.setEventListeners();
  }
})

const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileDescription});

const popupWithProfile = new PopupWithForm({
  popupSelector: popupProfile,
  submitAction: (data) => {
    userInfo.setUserInfo(data);
  }
})

function fillInputs() {
  const fill = userInfo.getUserInfo();
  name.value = fill.name;
  description.value = fill.info;
}

addButton.addEventListener('click', () => {
  popupWithCard.open();
  addCardValidation.resetValidation();
  });

editButton.addEventListener('click', () => {
    popupWithProfile.open();
    fillInputs();
    profileValidation.resetValidation();
  });




