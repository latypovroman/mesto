const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_open-image');

const popupClose = document.querySelectorAll('.popup__close');

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
  newCard.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
    });
  cardList.prepend(newCard);
}
initialCards.map(initialCardsRender);
// Рендер начальных карт end

function openPopup(type) {
  type.classList.add('popup_opened');
  page.classList.add('page_scroll_disable');
}



function closePopup() {
  popup.classList.remove('popup_opened');
  page.classList.remove('page_scroll_disable');
}


// Изменение профиля при нажатии сохранить start
function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nickname.value;
  profileDescription.textContent = description.value;
  closePopup();
}
formProfile.addEventListener('submit', changeProfile);
// Изменение профиля при нажатии сохранить end

// Закрытие любого попапа по клику вне контейнера start
function closePopupForce(event) {
  if (event.target === event.currentTarget) {
    closePopup()
  }
}
// Закрытие любого попапа по клику вне контейнера end

function createCard(evt) {
  evt.preventDefault();
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__image').src = link.value;
  newCard.querySelector('.card__title').textContent = title.value;
  newCard.querySelector('.card__like').addEventListener('click', function(evt) {
  evt.target.classList.toggle('card__like_active');
  });
  cardList.prepend(newCard);
}
formAddCard.addEventListener('submit', createCard);

// Вызываем попап карточек по клику на add
addButton.addEventListener('click',
()=>{
    openPopup(popupAddCard)
  });

// Вызываем попап профиля по клику на edit
editButton.addEventListener('click',
()=>{
    openPopup(popupProfile)
  });

popup.addEventListener('click', closePopupForce);

popupClose.addEventListener('click', closePopup); // Закрываем любой попап
