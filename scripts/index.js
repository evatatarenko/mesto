import Card from './card.js';
import FormValidator from "./validator.js";

const editPopup = document.querySelector('.edit-popup');
const newcardPopup = document.querySelector('.newcard');

const openPopupEditBtn = document.querySelector('.profile__edit-button');
const closePopupBtnArray = document.querySelectorAll('.popup__close-btn');

const openNewcardPopupBtn = document.querySelector('.profile__add-button');

const formProfile = document.querySelector('.edit-popup');
const nameInput = document.querySelector('.form__text_type_name');
const jobInput = document.querySelector('.form__text_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupImage = document.querySelector('.image-popup')
const formNewCard = document.querySelector('#addform');

const cardContainer = document.querySelector('.elements');
const template = document.querySelector('#element');

const cardName = template.querySelector('.element__title');
const cardImg = document.querySelector('.element__img');

const inputTitleNewCard = document.querySelector('.form__text_type_title');
const inputLinkNewCard = document.querySelector('.form__text_type_link');

const fullImage = popupImage.querySelector('.image-popup__image')
const fullImageCaption = popupImage.querySelector('.image-popup__caption')

const popupArray = document.querySelectorAll('.popup');




//open popup\\

const openPopup = popup => {
  document.addEventListener('keydown', handleKeyDown);
  popup.classList.add('popup_opened');
}

//close popup\\

function closePopup(openedPopup) {
  if (openedPopup) {
    openedPopup.classList.remove('popup_opened')
  }
  document.removeEventListener('keydown', handleKeyDown);

}


closePopupBtnArray.forEach(button => {
  button.addEventListener('click', (evt) => {
    const openedPopup = evt.target.closest('.popup_opened');
    closePopup(openedPopup);
  });
})

//edit popup\\

const openEditPopup = () => {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
openPopupEditBtn.addEventListener('click', openEditPopup);


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  const openedPopup = evt.target.closest('.popup_opened');
  closePopup(openedPopup);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);

//newcard-popup\\

const openNewcardPopup = () => {
  openPopup(newcardPopup);
}

openNewcardPopupBtn.addEventListener('click', openNewcardPopup);


//open-image\\

const openPlaceImagePopup = (place) => {
  fullImage.src = place.link;
  fullImageCaption.textContent = place.name;
  fullImage.alt = place.name;
  openPopup(popupImage);
}

const createCard = (data, handleCardClick, templateSelector) => {
  return new Card(data, handleCardClick, templateSelector);
}


formNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const card = createCard({
    name: inputTitleNewCard.value,
    link: inputLinkNewCard.value
  }, openPlaceImagePopup, '#element');

  const cardEl = card.generateCard();
  cardContainer.prepend(cardEl)

  const openedPopup = evt.target.closest('.popup_opened');
  closePopup(openedPopup);

  evt.target.reset()
  const button = evt.target.querySelector(".form__submit-btn")
});

const handleKeyDown = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const closePopupOverlay = evt => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}



popupArray.forEach(popup => popup.addEventListener('mousedown', closePopupOverlay));



const initialData = () => {
  initialCards.forEach(elem => {
    const card = createCard(elem, openPlaceImagePopup, '#element').generateCard();
    console.log(card)
    cardContainer.prepend(card);
  })
};
initialData()



const validationParameters = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__input-error_active'
}

const enableValidation = options => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    new FormValidator(validationParameters, formElement).enableValidation();
  });
};


enableValidation(validationParameters);


