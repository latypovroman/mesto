let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let page = document.querySelector('.page');
let name = document.querySelector('#name');
let description = document.querySelector('#description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const cardList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card-template');
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

// Рендер начальных карт start
function initialCardsRender(initialCards) {
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__image').src = initialCards.link;
  newCard.querySelector('.card__title').textContent = initialCards.name;

  cardList.prepend(newCard);
}

initialCards.map(initialCardsRender);
// Рендер начальных карт end

function switchPopup() {
  popup.classList.toggle('popup_opened');
  page.classList.toggle('page_scroll_disable');
}

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileDescription.textContent = description.value;
  switchPopup();
}

function closePopupForce(event) {
  if (event.target === event.currentTarget) {
    switchPopup()
  }
}

formElement.addEventListener('submit', changeProfile);
editButton.addEventListener('click', switchPopup);
popupClose.addEventListener('click', switchPopup);
popup.addEventListener('click', closePopupForce);
