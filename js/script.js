import Card from "./card.js"
import FormValidator from "./validation.js"

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_open-image');

const closeProfileButton = popupProfile.querySelector('.popup__close');
const closeAddButton = popupAddCard.querySelector('.popup__close');
const closeImageButton = popupImage.querySelector('.popup__close');

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
  const card = new Card(item, ".card-template", (popupImage) => openPopup(popupImage));
  cardList.append(card.generateCard());
});

initialValidationForms.forEach( function(item) {
  item.enableValidation();
});

function addCard(evt) {
  evt.preventDefault();
  const data = {};
  data.name = title.value;
  data.link = link.value;
  const card = new Card(data, ".card-template");
  cardList.prepend(card.generateCard());
  closePopup(popupAddCard);
  link.value = '';
  title.value = '';
}

function changeProfile(evt) { // Получение данных из формы для изменения профиля
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

function closePopupForce(event) { // Закрытие любого попапа по клику вне контейнера
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function closePopupEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(type) {
  type.classList.remove('popup_opened');
  page.classList.remove('page_scroll_disable');
  document.removeEventListener('keydown', closePopupEscape);
}

addButton.addEventListener('click',
()=>{
    openPopup(popupAddCard);
    FormValidator.toggleButtonState(false, popupAddCard.querySelector('.popup__button'), validateObject);
  });

editButton.addEventListener('click',
()=>{
    openPopup(popupProfile);
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
  });

closeProfileButton.addEventListener('click',
()=>{
    closePopup(popupProfile)
  });

closeAddButton.addEventListener('click',
()=>{
    closePopup(popupAddCard)
  });

closeImageButton.addEventListener('click', function() {
    closePopup(popupImage);
  })

formAddCard.addEventListener('submit', addCard);

popupProfile.addEventListener('click', closePopupForce);
popupAddCard.addEventListener('click', closePopupForce);
popupImage.addEventListener('click', closePopupForce);







