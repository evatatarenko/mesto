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

//лайк\\
const likeCard = event => event.target.classList.toggle('element__like_active');


//удаление карточек\\
const removeCard = event => event.target.closest('.element').remove();


formNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard({
    name: inputTitleNewCard.value,
    link: inputLinkNewCard.value
  })
  cardContainer.prepend(newCard)
  const openedPopup = evt.target.closest('.popup_opened');
  closePopup(openedPopup);
  evt.target.reset()
  const button = evt.target.querySelector(".form__submit-btn")
  button.disabled = true
  button.classList.add("form__submit-btn_inactive");
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



popupArray.forEach(popup => popup.addEventListener('mousedown', closePopupOverlay));