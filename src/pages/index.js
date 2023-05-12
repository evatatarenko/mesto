import "./index.css";

import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/Validator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import Api from "../components/Api.js";

import { initialCards } from "../utils/initialCards.js";
import renderLoading from "../utils/renderLoading.js";
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
  avatarForm,
  profileAvatar,
  profileAvatarBtn,
} from "../utils/constants.js";

let userId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "4590de2a-b582-438b-8c12-6867a9dc2da9",
    "Content-Type": "application/json",
  },
});

const user = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileSubtitle,
  avatarSelector: profileAvatar,
});

const createCard = (...args) => new Card(...args).generateCard();

const renderCard = (data) => {
  const card = createCard({
    data,
    templateSelector: "#element",
    handleCardClick: ({ name, link }) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: (id, removeCard) => {
      popupTypeConfirm.open();
      popupTypeConfirm.handleSubmit(() => {
        renderLoading(true, popupTypeConfirm.button);
        api
          .deleteCard(id)
          .then(() => {
            removeCard();
            newPopupTypeAddProfile.close(() =>
              addFormValidator.toggleButtonState()
            );
            popupTypeConfirm.close();
          })
          .catch((error) => console.log(`Ошибка: ${error}`))
          .finally(() => renderLoading(false, popupTypeConfirm.button, "Да"));
      });
    },
    handleLikeCard: (card) => {
      api
        .likeCard(card.cardId)
        .then((res) => {
          card.toggleLikeCard();
          card.updateLikesCount(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDislikeCard: (card) => {
      api
        .dislikeCard(card.cardId)
        .then((res) => {
          card.toggleLikeCard();
          card.updateLikesCount(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userName: user.getUserInfo().name,
  });
  itemsCardList.addItem(card);
};

const itemsCardList = new Section(renderCard, cardContainer);
itemsCardList.renderItems(initialCards);

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    user.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    itemsCardList.renderItems(cards);
  })
  .catch(console.log);

const addFormValidator = new FormValidator(validationParams, addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationParams, editForm);
editFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationParams, avatarForm);
avatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(".image-popup");
popupWithImage.setEventListeners();

const newPopupTypeEditProfile = new PopupWithForm(".edit-popup", (userData) => {
  renderLoading(true, newPopupTypeEditProfile.button);
  api
    .updateUserInfo({
      name: userData.name,
      about: userData.job,
      avatar: userData.avatar,
    })
    .then(({ name, about: job }) => {
      user.setUserInfo({
        name,
        job,
      });
      newPopupTypeAddProfile.close(() => editFormValidator.toggleButtonState());
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => renderLoading(false, newPopupTypeEditProfile.button));
});
newPopupTypeEditProfile.setEventListeners();

const newPopupTypeAddProfile = new PopupWithForm(".newcard", (item) => {
  renderLoading(true, newPopupTypeAddProfile.button);
  api
    .createCard(item)
    .then((res) => {
      renderCard(res);
      newPopupTypeAddProfile.close(() => addFormValidator.toggleButtonState());
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => renderLoading(false, newPopupTypeAddProfile.button));
});
newPopupTypeAddProfile.setEventListeners();

openPopupEditBtn.addEventListener("click", openpopupTypeEditProfile);
openNewcardPopupBtn.addEventListener("click", openPopupTypeAddProfile);
profileAvatarBtn.addEventListener("click", openPopupAvatar);

const popupTypeConfirm = new PopupConfirm({
  popupSelector: ".popup-confirm",
});
popupTypeConfirm.setEventListeners();

const newPopupTypeAvatar = new PopupWithForm(".popup-avatar", (item) => {
  renderLoading(true, newPopupTypeAvatar.button);
  api
    .updateUserAvatar(item)
    .then((res) => {
      user.setUserInfo({
        job: res.about,
        ...res,
      });
      newPopupTypeAvatar.close(() => avatarFormValidator.toggleButtonState());
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => renderLoading(false, newPopupTypeAvatar.button));
});
newPopupTypeAvatar.setEventListeners();

function openpopupTypeEditProfile() {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;

  newPopupTypeEditProfile.open();
}

function openPopupTypeAddProfile() {
  newPopupTypeAddProfile.open();
}

function openPopupAvatar() {
  newPopupTypeAvatar.open();
}
