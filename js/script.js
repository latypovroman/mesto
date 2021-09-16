let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let page = document.querySelector('.page');
let name = document.querySelector('#name');
let description = document.querySelector('#description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

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
