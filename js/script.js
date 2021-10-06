const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_open-image');
const popupImagePicture = popupImage.querySelector('.popup__popup-image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

const closeProfileButton = popupProfile.querySelector('.popup__close');
const closeAddButton = popupAddCard.querySelector('.popup__close');
const closeImageButton = popupImage.querySelector('.popup__close-image');

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

function initialCardsRender(initialCards) { // Рендер начальных карт
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__image').src = initialCards.link;
  newCard.querySelector('.card__title').textContent = initialCards.name;
  newCard.querySelector('.card__delete').addEventListener('click', handlerCardDelete);
  newCard.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
    });
  newCard.querySelector('.card__image').addEventListener('click', function() {
    openPopup(popupImage);
    popupImagePicture.src = initialCards.link;
    popupImageTitle.textContent = initialCards.name;
  })
  closeImageButton.addEventListener('click', function() {
    closePopup(popupImage);
  })
  cardList.prepend(newCard);
}
initialCards.map(initialCardsRender);

function openPopup(type) {
  type.classList.add('popup_opened');
  page.classList.add('page_scroll_disable');
}

function closePopup(type) {
  type.classList.remove('popup_opened');
  page.classList.remove('page_scroll_disable');
}

function handlerCardDelete(evt) { // Функция удаления карточки по клику на корзину
  const elementDelete = evt.target.closest('.card');
  elementDelete.remove();
}

// Изменение профиля при нажатии сохранить start
function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nickname.value;
  profileDescription.textContent = description.value;
  closePopup(popupProfile);
}
formProfile.addEventListener('submit', changeProfile);
// Изменение профиля при нажатии сохранить end

// Закрытие любого попапа по клику вне контейнера start
function closePopupForce(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
}
// Закрытие любого попапа по клику вне контейнера end

function createCard(evt) {
  evt.preventDefault();
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__image').src = link.value;
  newCard.querySelector('.card__title').textContent = title.value;
  newCard.querySelector('.card__delete').addEventListener('click', handlerCardDelete);
  newCard.querySelector('.card__like').addEventListener('click', function(evt) {
  evt.target.classList.toggle('card__like_active');
  });
  newCard.querySelector('.card__image').addEventListener('click', function() {
    openPopup(popupImage);
    popupImagePicture.src = link.value;
    popupImageTitle.textContent = title.value;
  })
  closeImageButton.addEventListener('click', function() {
    closePopup(popupImage);
  })
  cardList.prepend(newCard);
  closePopup(popupAddCard);
}

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

// Закрываем попап по клику на крестик (profile)
closeProfileButton.addEventListener('click',
()=>{
    closePopup(popupProfile)
  });

// Закрываем попап по клику на крестик (addCard)
closeAddButton.addEventListener('click',
()=>{
    closePopup(popupAddCard)
  });


formAddCard.addEventListener('submit', createCard);
popup.addEventListener('click', closePopupForce);


