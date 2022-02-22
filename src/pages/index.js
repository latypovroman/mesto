import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import {validateObject} from "../utils/constants.js";

import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAskDelete = document.querySelector('.popup_type_delete');

const popupWithImage = new PopupWithImage('.popup_type_open-image');
const popupCardDelete = new Popup('.popup_type_delete')

const formProfile = popupProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
const formCardDelete = popupAskDelete.querySelector('.popup__form');

const name = document.querySelector('#nickname');
const description = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardList = document.querySelector('.cards__list');

// настройка валидации
const profileValidation =  new FormValidator(validateObject, formProfile);
const addCardValidation = new FormValidator(validateObject, formAddCard);

const initialValidationForms = [profileValidation, addCardValidation];

initialValidationForms.forEach( function(item) {
  item.enableValidation();
});

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '9757460d-c1af-41c8-81fe-1f11b87a74d9',
    'Content-Type': 'application/json'},
});

// GET INITIAL CARDS
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(data) {
  const card = new Card (
    data,
    '.card-template',
    {
      handleCardClick,
      handleDeleteClick: () => {

        popupCardDelete.open();
        popupCardDelete.setEventListeners();
        formCardDelete.addEventListener('submit', (evt) => {
          evt.preventDefault();
          card.deleteCard();
          api.deleteCard(data)
          .catch((err) => {
            console.log(err)
          })
          popupCardDelete.close();
        })

      },
      handleLikeClick: () => {
        function updateCount(data) {
          card._likeCounter.textContent = data.likes.length
        }

        if (card.isLiked()) {

          api.putLike(data)
          .then((data) => updateCount(data))
          .catch((err) => {
            console.log(err)
          })

        } else {

          api.deleteLike(data)
          .then((data) => updateCount(data))
          .catch((err) => {
            console.log(err)
          })

        }
        console.log(card.isLiked())
      }
  });
  return card.generateCard()
}

api.getInitialCards()
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

// GET INITIAL PROFILE INFO
const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileDescription
});

api.getUserInfo()
.then((data) => {
  const nickname = data.name;
  const description = data.about;
  userInfo.setUserInfo({nickname, description});
})
.catch((err) => {
  console.log(err)
});

const userId = api.getUserInfo()
  .then((data) => {
    console.log(data)
    return data._id
  })
  .catch((err) => {
    console.log(err)
  });

console.log(userId)


// PATCH PROFILE INFO
function getProfileInfo() {
  const information = userInfo.getUserInfo();
  name.value = information.name;
  description.value = information.info;
}

function changeProfileInfo(data) {
  return api.patchUserInfo(data)
        .then((result) => {
          const nickname = result.name;
          const description = result.about;
          userInfo.setUserInfo({nickname, description});
        });
}

const popupWithProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitAction: (data) => {
    changeProfileInfo(data)
  }
})

// POST NEW CARD
const popupWithCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  submitAction: (data) => {
    api.postNewCard(data)
    .then((result) => {
      cardList.prepend(createCard(result));
    })
    .catch((err) => {
      console.log(err)
    });
  }
})















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
