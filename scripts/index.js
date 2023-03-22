const editPopup = document.querySelector('.edit-popup');
const newcardPopup = document.querySelector('.newcard');
const popup = document.querySelector('.popup');
const openPopupEditBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelectorAll('.popup__close-btn');

const openNewcardPopupBtn = document.querySelector('.profile__add-button');

const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__text_type_name');
const jobInput = document.querySelector('.form__text_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupImage = document.querySelector('.image-popup')
const form = document.querySelector('#addform');

const cardContainer = document.querySelector('.elements');
const template = document.querySelector('#element');

const cardName = template.querySelector('.element__title');
const cardImg = document.querySelector('.element__img');

const nameForm = document.querySelector('.form__text_type_title');
const linkForm = document.querySelector('.form__text_type_link');

const fullImage = popupImage.querySelector('.image-popup__image')
const fullImageCaption = popupImage.querySelector('.image-popup__caption')

const popupAll = document.querySelectorAll('.popup');

//open popup\\

const openPopup = popup => {
  document.addEventListener('keydown', handleKeyDown);
  popup.classList.add('popup_opened');
}

//close popup\\

function closePopup() {
  const openedPopup = document.querySelector('.popup_opened')
  if (openedPopup) {
    openedPopup.classList.remove('popup_opened')
  }
}


closePopupBtn.forEach(button => {
  button.addEventListener('click', () => closePopup());
})

//edit popup\\

const openEditPopup = () => {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
openPopupEditBtn.addEventListener('click', openEditPopup);


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

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

//лайк\\
const likeCard = event => event.target.classList.toggle('element__like_active');


//удаление карточек\\
const removeCard = event => event.target.closest('.element').remove();


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard({
    name: nameForm.value,
    link: linkForm.value
  })
  cardContainer.prepend(newCard)
  closePopup();
  evt.target.reset()
});

function createCard(place) {
  const newCard = template.content.cloneNode(true);
  const img = newCard.querySelector('.element__img');
  img.alt = place.name;
  img.src = place.link;
  const title = newCard.querySelector('.element__title');
  title.innerText = place.name;
  const like = newCard.querySelector('.element__like');
  like.addEventListener('click', likeCard);
  const remove = newCard.querySelector('.element__remove-btn');
  remove.addEventListener('click', removeCard);
  img.addEventListener('click', function () {
    openPlaceImagePopup(place);
  });

  return newCard;
}

const genElements = (wrap, elem) => wrap.prepend(createCard(elem));

const initialData = () => initialCards.forEach(elem => genElements(cardContainer, elem));

initialData();

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



popupAll.forEach(popup => popup.addEventListener('click', closePopupOverlay));