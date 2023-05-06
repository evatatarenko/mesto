import "./index.css";

import Card from "../components/card.js";
import UserInfo from "../components/user-info.js";
import FormValidator from "../components/validator.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popup-with-image.js";
import PopupWithForm from "../components/popup-with-form.js";

import { initialCards } from "../utils/initialCards.js";
import { validationParams } from "../utils/validationParams.js";

import {
  nameInput,
  jobInput,
  openPopupEditBtn,
  openNewcardPopupBtn,
  addForm,
  editForm,
  cardContainer,
  profileSubtitle,
  profileTitle,
} from "../utils/constants.js";

const addFormValidator = new FormValidator(validationParams, addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationParams, editForm);
editFormValidator.enableValidation();

const createCard = (...args) => new Card(...args).generateCard();

const renderCard = (element) => {
  const card = createCard(element, "#element", ({ name, link }) => {
    popupWithImage.open(name, link);
  });
  itemsCardList.addItem(card);
};

const itemsCardList = new Section(
  { items: initialCards, renderer: renderCard },
  cardContainer
);
itemsCardList.renderItems();

const user = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileSubtitle,
});

const popupWithImage = new PopupWithImage(".image-popup");
popupWithImage.setEventListeners();

const newPopupTypeEditProfile = new PopupWithForm(
  ".edit-popup",
  (data) => {
    user.setUserInfo(data);
  },
  editFormValidator
);
newPopupTypeEditProfile.setEventListeners();

const newPopupTypeAddProfile = new PopupWithForm(
  ".newcard",
  (item) => {
    renderCard(item);
  },
  addFormValidator
);
newPopupTypeAddProfile.setEventListeners();

openPopupEditBtn.addEventListener("click", openpopupTypeEditProfile);
openNewcardPopupBtn.addEventListener("click", openPopupTypeAddProfile);

function openpopupTypeEditProfile() {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;

  newPopupTypeEditProfile.open();
}

function openPopupTypeAddProfile() {
  newPopupTypeAddProfile.open();
}
