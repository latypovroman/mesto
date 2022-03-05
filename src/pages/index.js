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

let userId;

const name = document.querySelector('#nickname');
const description = document.querySelector('#description');

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
            card.updateLikes(res);
            data.likes = res.likes;
          })
          .catch((err) => {
            console.log(err)
          })

        } else {

          api.putLike(data)
          .then((res) => {
            card.updateLikes(res);
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

// GET INITIAL INFO, AVATAR AND CARDS
const initialCardList = new Section({
  renderer: (item) => {
    return createCard(userId, item);
  }
}, '.cards__list');

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([cards, userData]) => {
  userInfo.setUserInfo(userData);
  userId = userInfo.getUserId();
  initialCardList.renderItems(cards);
})
.catch(err => console.log(err))


// POST NEW CARD
const popupWithCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  submitAction: (data) => {
    api.postNewCard(data)
    .then((item) => {
      initialCardList.prependItem(item);
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

// LISTENERS
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
