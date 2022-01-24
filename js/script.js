import Card from "./Card.js"
import FormValidator from "./FormValidator.js"

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_open-image');
const popups = document.querySelectorAll('.popup');

const formProfile = popupProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');

const page = document.querySelector('.page');
const name = document.querySelector('#nickname');
const description = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const title = document.querySelector('#title');
const link = document.querySelector('#link');

const cardList = document.querySelector('.cards__list');

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


initialCards.forEach(function (item) {
  cardList.append(createCard(item));
});

initialValidationForms.forEach( function(item) {
  item.enableValidation();
});

function createCard(data) {
  const card = new Card(data, ".card-template", (popupImage) => openPopup(popupImage));
  const cardElement = card.generateCard();
  return cardElement
}

function addCard(evt) {
  evt.preventDefault();
  const data = {};
  data.name = title.value;
  data.link = link.value;
  cardList.prepend(createCard(data));
  closePopup(popupAddCard);
  link.value = '';
  title.value = '';
}

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileDescription.textContent = description.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', changeProfile);

function openPopup(type) {
  type.classList.add('popup_opened');
  page.classList.add('page_scroll_disable');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopup(type) {
  type.classList.remove('popup_opened');
  page.classList.remove('page_scroll_disable');
  document.removeEventListener('keydown', closePopupEscape);
}

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

function closePopupEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

addButton.addEventListener('click',
()=>{
    openPopup(popupAddCard);
    addCardValidation.resetValidation();
  });

editButton.addEventListener('click',
()=>{
    openPopup(popupProfile);
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
    profileValidation.resetValidation();
  });

formAddCard.addEventListener('submit', addCard);
