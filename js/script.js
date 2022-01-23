import Card from "./card.js"
import FormValidator from "./validation.js"



const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_open-image');
const popupImagePicture = popupImage.querySelector('.popup__popup-image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

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

const validateObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

initialCards.forEach(function (item) {
  const card = new Card(item, ".card-template");
  cardList.append(card.generateCard());
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

// function popupImageOpen() {
//   openPopup(popupImage);
//   popupImagePicture.src = card._data.link;
//   popupImageTitle.textContent = card._data.name;
//   popupImagePicture.alt = card._data.name;
// }


// function createCard(url, desc) { //Функция образования карточки из template, возвращает код карточки с необходимыми аргументами
// const newCard = cardTemplate.content.cloneNode(true);
// const cardImage = newCard.querySelector('.card__image');
//   cardImage.src = url;
//   cardImage.alt = desc;
//   newCard.querySelector('.card__title').textContent = desc;
//   newCard.querySelector('.card__delete').addEventListener('click', handlerCardDelete);
//   newCard.querySelector('.card__like').addEventListener('click', function(evt) {
//     evt.target.classList.toggle('card__like_active');
//     });
//   newCard.querySelector('.card__image').addEventListener('click', function() {
//     openPopup(popupImage);
//     popupImagePicture.src = url;
//     popupImageTitle.textContent = desc;
//     popupImagePicture.alt = desc;
//   })
//   return newCard;
// }

function openPopup(type) {
  type.classList.add('popup_opened');
  page.classList.add('page_scroll_disable');
  document.addEventListener('keydown', () => {
    closePopupEscape();
  });
}

function closePopup(type) {
  type.classList.remove('popup_opened');
  page.classList.remove('page_scroll_disable');
  document.removeEventListener('keydown', closePopupEscape);
}

// function handlerCardDelete(evt) { // Функция удаления карточки по клику на корзину
//   const elementDelete = evt.target.closest('.card');
//   elementDelete.remove();
// }


function changeProfile(evt) { // Получение данных из формы для изменения профиля
  evt.preventDefault();
  profileName.textContent = nickname.value;
  profileDescription.textContent = description.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', changeProfile);

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

addButton.addEventListener('click', // Вызываем попап карточек по клику на add
()=>{
    openPopup(popupAddCard);
    toggleButtonState(false, popupAddCard.querySelector('.popup__button'), validateObject);
  });

editButton.addEventListener('click', // Вызываем попап профиля по клику на edit
()=>{
    openPopup(popupProfile);
    nickname.value = profileName.textContent;
    description.value = profileDescription.textContent;
  });

closeProfileButton.addEventListener('click', // Закрываем попап по клику на крестик (profile)
()=>{
    closePopup(popupProfile)
  });

closeAddButton.addEventListener('click', // Закрываем попап по клику на крестик (addCard)
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

FormValidator.enableValidation(validateObject);



