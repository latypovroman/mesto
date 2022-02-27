import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js";
import UserPhoto from "../components/UserPhoto.js";
import Api from "../components/Api";
import {validateObject} from "../utils/constants.js";

import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editUserPhoto = document.querySelector('.profile__image');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAskDelete = document.querySelector('.popup_type_delete');

const popupWithImage = new PopupWithImage('.popup_type_open-image');
const popupCardDelete = new Popup('.popup_type_delete');

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

function createCard(userId, data) {
  const card = new Card (
    userId,
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
        if (card.isLiked(data.likes)) {

          api.deleteLike(data)
          .then((res) => {
            card.updateLikeCount(res.likes.length);
            card.likeToggle(data.likes);
            data.likes = res.likes;
          })
          .catch((err) => {
            console.log(err)
          })

        } else {

          api.putLike(data)
          .then((res) => {
            card.updateLikeCount(res.likes.length);
            card.likeToggle(data.likes);
            data.likes = res.likes;
          })
          .catch((err) => {
            console.log(err)
          })

        }
      }
  });

  return card.generateCard()
}

// GET INITIAL PROFILE INFO
const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileDescription
});

const userPhoto = new UserPhoto(editUserPhoto);

// PATCH PROFILE INFO
function getProfileInfo() {
  const information = userInfo.getUserInfo();
  name.value = information.name;
  description.value = information.info;
}

const popupWithProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitAction: (data) => {
    changeProfileInfo(data);

  }
})

function changeProfileInfo(data) {
  return api.patchUserInfo(data)
        .then((result) => {
          const nickname = result.name;
          const description = result.about;
          userInfo.setUserInfo({nickname, description});
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(popupWithProfile.renderLoading(false))
}

// POST NEW CARD
const popupWithCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  submitAction: (data) => {
    Promise.all([api.postNewCard(data), api.getUserInfo()])
    .then((data) => {
      const userId = data[1]._id;
      cardList.prepend(createCard(userId, data[0]));
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(popupWithCard.renderLoading(false));
  }
})

// GET INITIAL INFO, AVATAR AND CARDS
Promise.all([api.getInitialCards(), api.getUserInfo()])
.then((data) => {
  const userId = data[1]._id;
  const nickname = data[1].name;
  const description = data[1].about;
  userInfo.setUserInfo({nickname, description});
  userPhoto.setUserPhoto(data[1]);

  const initialCardList = new Section({
    data: data[0],
    renderer: (item) => {
      initialCardList.setItem(createCard(userId, item));
    }
  }, '.cards__list');
  initialCardList.renderItems();
})
.catch(err => console.log(err))

// PATCH AVATAR
const popupWithUserPhoto = new PopupWithForm({
  popupSelector: '.popup_type_user-photo',
  submitAction: (data) => {
    api.patchUserAvatar(data)
    .then((data) => {
      userPhoto.setUserPhoto(data);
    })
    .catch(err => console.log(err))
    .finally(popupWithUserPhoto.renderLoading(false))
  }
})












// слушатели
popupWithProfile.setEventListeners();
popupWithCard.setEventListeners();
popupWithImage.setEventListeners();
popupWithUserPhoto.setEventListeners();

editUserPhoto.addEventListener('click', () => {
  popupWithUserPhoto.open();
  addCardValidation.resetValidation();
})

addButton.addEventListener('click', () => {
  popupWithCard.open();
  addCardValidation.resetValidation();
  });

editButton.addEventListener('click', () => {
    popupWithProfile.open();
    getProfileInfo();
    profileValidation.resetValidation();
  });
