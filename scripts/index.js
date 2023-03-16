const editPopup = document.querySelector('.edit-popup');
const closePopupBtn = document.getElementById('edit-cls-btn');
const openPopupBtn = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

//edit popup\\

openPopupBtn.addEventListener('click', function (e) {
  editPopup.classList.add('edit-popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
})

function popupClose() {
  editPopup.classList.remove('edit-popup_opened'); 
}

closePopupBtn.addEventListener('click', popupClose);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupClose();
}

formElement.addEventListener('submit', handleFormSubmit); 

//newcard-popup\\

const openNewcardPopup = document.querySelector('.profile__add-button');
const newcardPopup = document.querySelector('.newcard');
const closeNewcardBtn = document.getElementById('newcard-cls-btn');

openNewcardPopup.addEventListener('click', function () {
  newcardPopup.classList.add('newcard_opened');
})

function closeNewcard() {
  newcardPopup.classList.remove('newcard_opened'); 
}

closeNewcardBtn.addEventListener('click', closeNewcard);

function newCardSubmit(evt) {
  evt.preventDefault();
  closeNewcard()
}
//\\

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


const cardContainer = document.querySelector('.elements');
const template = document.getElementById('element');

const drawInitialCards = () => {
cardContainer.innerHTML = ''
initialCards.forEach((element) => {

  const newCard = template.content.cloneNode(true);
  const cardName = newCard.querySelector('.element__title');
  const cardImg = newCard.querySelector('.element__img');

  cardName.textContent = element.name;
  cardImg.src = element.link;
  cardImg.alt = element.name;
 
  const likeButton  = newCard.querySelector('.element__like');
  likeButton.addEventListener('click',() => {
      likeButton.classList.toggle('element__like_active');
    });

  const removeButton = newCard.querySelector('.element__remove-btn');
  removeButton.addEventListener('click', function(evt)  {
    evt.target.closest('.element').remove();
    });

  cardContainer.append(newCard);
});
};


const form = document.querySelector('.card-form');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = form.querySelector('.card-form__text_type_title');
  const link = form.querySelector('.card-form__text_type_link');
  initialCards.push( {
    name: name.value,
    link: link.value
  })
  name.value = '';
  link.value = '';
  closeNewcard();
  drawInitialCards();
});

drawInitialCards();

//image popup\\

function openImagePopup(image) {
const popupImage = document.querySelector('.image-popup');
popupImage.src=image;
popupImage.classList.add('.image-popup_opened');
};

const elemImg = document.querySelector('.element__img');

elemImg.addEventListener('click', openImagePopup);