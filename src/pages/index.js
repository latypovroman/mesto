import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js";
import {validateObject} from "../utils/constants.js";

import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const formProfile = popupProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');

const name = document.querySelector('#nickname');
const description = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// GET INITIALCARDS
fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
  headers: {
    authorization: '6ac52070-ddcb-4a60-a12e-e7350f58493c'
  }
})
  .then(res => res.json())
  .then((result) => {
    const initialCardList = new Section({
      data: result,
      renderer: (item) => {
        initialCardList.setItem(createCard(item));
      }
    }, '.cards__list');
    initialCardList.renderItems();
  })
  .catch((err) => {
    console.log(err)
  });

  fetch('https://nomoreparties.co/v1/cohort-34/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '6ac52070-ddcb-4a60-a12e-e7350f58493c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Marie Skłodowska Curie',
      about: 'Physicist and Chemist'
    })
  })
    .then(res => res.json())
    .then((reso) => {
      const nickname = reso.name;
      const description = reso.about;
      userInfo.setUserInfo({nickname, description});
    })
    .catch((err) => {
      console.log(err)
    });

// настройка валидации
const profileValidation =  new FormValidator(validateObject, formProfile);
const addCardValidation = new FormValidator(validateObject, formAddCard);

const initialValidationForms = [profileValidation, addCardValidation];

initialValidationForms.forEach( function(item) {
  item.enableValidation();
});

function createCard(data) {
  const card = new Card(data, ".card-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// попапы профиля и добавления карточки
const popupWithCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  submitAction: (data) => {
    initialCardList.setItem(createCard(data))
  }
})

const popupWithImage = new PopupWithImage('.popup_type_open-image');

const popupWithProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitAction: (data) => {
    userInfo.setUserInfo(data);
  }
})

const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileDescription});

function getProfileInfo() {
  const information = userInfo.getUserInfo();
  name.value = information.name;
  description.value = information.info;
}

// слушатели
popupWithProfile.setEventListeners();
popupWithCard.setEventListeners();
popupWithImage.setEventListeners();

addButton.addEventListener('click', () => {
  popupWithCard.open();
  addCardValidation.resetValidation();
  });

editButton.addEventListener('click', () => {
    popupWithProfile.open();
    getProfileInfo();
    profileValidation.resetValidation();
  });
