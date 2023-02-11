const Popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');
const openPopupBtn = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


openPopupBtn.addEventListener('click',function(e){
  e.preventDefault();
  Popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
})

closePopupBtn.addEventListener('click',() =>{
  Popup.classList.remove('popup_opened');
})




function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    Popup.classList.remove('popup_opened');

}


formElement.addEventListener('submit', handleFormSubmit); 