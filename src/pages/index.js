import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDelete from "../components/PopupCardDelete.js";

import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import {validateObject} from "../utils/constants.js";

import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userPhoto = document.querySelector('.profile__image');

const popupWithImage = new PopupWithImage('.popup_type_open-image');


const name = document.querySelector('#nickname');
const description = document.querySelector('#description');
const cardList = document.querySelector('.cards__list');

const formValidators = {}


const enableValidation = (validateObject) => {
  const formList = Array.from(document.querySelectorAll(validateObject.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validateObject, formElement);

    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validateObject);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '9757460d-c1af-41c8-81fe-1f11b87a74d9',
    'Content-Type': 'application/json'},
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const popupCardDelete = new PopupCardDelete('.popup_type_delete');

function createCard(userId, data) {
  const card = new Card (
    userId,
    data,
    '.card-template',
    {
      handleCardClick,
      handleDeleteClick: () => {
        function popupCardDeleteAction() {
          api.deleteCard(data)
          .then(() => {
            card.deleteCard();
            popupCardDelete.close();
          })
          .catch((err) => {
            console.log(err)
          })
        }
        popupCardDelete.getSubmitAction(popupCardDeleteAction);
        popupCardDelete.open();
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
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
  photoSelector: '.profile__image'
});

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
          console.log(result)
          userInfo.setUserInfo(result);
        })
        .then(() => popupWithProfile.close())
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

  userInfo.setUserInfo(data[1]);
  const userId = userInfo.getUserId();
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
      userInfo.setUserInfo(data);
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithUserPhoto.renderLoading(false);
    });
    popupWithUserPhoto.close();
  }
})

console.log(formValidators);
// LISTENERS
// popupWithProfile.setEventListeners();
// popupWithCard.setEventListeners();
// popupWithImage.setEventListeners();
// popupWithUserPhoto.setEventListeners();
// popupCardDelete.setEventListeners();

userPhoto.addEventListener('click', () => {
  popupWithUserPhoto.open();
  formValidators.photo.resetValidation();
})

addButton.addEventListener('click', () => {
  popupWithCard.open();
  formValidators.card.resetValidation();
  });

editButton.addEventListener('click', () => {
    popupWithProfile.open();
    getProfileInfo();
    formValidators.bio.resetValidation();
  });
