const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');
const openPopupBtn = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

openPopupBtn.addEventListener('click', function (e) {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
})

function popupClose() {
  popup.classList.remove('popup_opened'); 
}

closePopupBtn.addEventListener('click', popupClose);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupClose();
}

formElement.addEventListener('submit', handleFormSubmit); 