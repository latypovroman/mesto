import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDelete from "../components/PopupCardDelete.js";

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
const popupEditUserPhoto = document.querySelector('.popup_type_user-photo');

const popupWithImage = new PopupWithImage('.popup_type_open-image');


const formProfile = popupProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
const formCardDelete = popupAskDelete.querySelector('.popup__form');
const formEditUserPhoto = popupEditUserPhoto.querySelector('.popup__form');

const name = document.querySelector('#nickname');
const description = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardList = document.querySelector('.cards__list');

// настройка валидации
const profileValidation =  new FormValidator(validateObject, formProfile);
const addCardValidation = new FormValidator(validateObject, formAddCard);
const editUserPhotoValidation = new FormValidator(validateObject, formEditUserPhoto)

const initialValidationForms = [profileValidation, addCardValidation, editUserPhotoValidation];

initialValidationForms.forEach( function(item) {
  item.enableValidation();
});

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '9757460d-c1af-41c8-81fe-1f11b87a74d9',
    'Content-Type': 'application/json'},
});

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
        const popupCardDelete = new PopupCardDelete('.popup_type_delete', popupCardDeleteSubmitAction);
        popupCardDelete.open();
        popupCardDelete.setEventListeners();

        function popupCardDeleteSubmitAction(evt) {
          evt.preventDefault();
          card.deleteCard();
          api.deleteCard(data)
          .catch((err) => {
            console.log(err)
          })
          popupCardDelete.close(popupCardDeleteSubmitAction);
          formCardDelete.removeEventListener('submit', popupCardDeleteSubmitAction);
        }
      },
      handleLikeClick: () => {
        if (card.isLiked(data.likes)) {

          api.deleteLike(data)
          .then((res) => {
            card.updateLikeCount(res.likes.length);
            card.toggleLike(data.likes);
            data.likes = res.likes;
          })
          .catch((err) => {
            console.log(err)
          })

        } else {

          api.putLike(data)
          .then((res) => {
            card.updateLikeCount(res.likes.length);
            card.toggleLike(data.likes);
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
    popupWithProfile.close();
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
        .finally(() => {
          popupWithProfile.renderLoading(false);
        });
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
    .finally(() => {
      popupWithCard.renderLoading(false);
    });
    popupWithCard.close();
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
    .finally(() => {
      popupWithUserPhoto.renderLoading(false);
    });
    popupWithUserPhoto.close();
  }
})

// LISTENERS
popupWithProfile.setEventListeners();
popupWithCard.setEventListeners();
popupWithImage.setEventListeners();
popupWithUserPhoto.setEventListeners();

editUserPhoto.addEventListener('click', () => {
  popupWithUserPhoto.open();
  editUserPhotoValidation.resetValidation();
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
