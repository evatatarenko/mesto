import "./index.css";

import Card from "../components/card.js";
import UserInfo from "../components/user-info.js";
import FormValidator from "../components/validator.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popup-with-image.js";
import PopupWithForm from "../components/popup-with-form.js";
import PopupConfirm from "../components/popup-confirm.js";
import api from "../components/api.js";

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
  avatarForm,
  profileAvatar,
} from "../utils/constants.js";

let userId;

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
    handleDeleteClick: (id) => {
      popupTypeConfirm.open();
      popupTypeConfirm.handleSubmit(() => {
        api
          .deleteCard(id)
          .then(() => {
            card.remove();
            newPopupTypeAddProfile.close();
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
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

const newPopupTypeEditProfile = new PopupWithForm(
  ".edit-popup",
  (userData) => {
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
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  },
  editFormValidator
);
newPopupTypeEditProfile.setEventListeners();

const newPopupTypeAddProfile = new PopupWithForm(
  ".newcard",
  (item) => {
    api
      .createCard(item)
      .then((res) => {
        renderCard(res);
        newPopupTypeAddProfile.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  },
  addFormValidator
);
newPopupTypeAddProfile.setEventListeners();

openPopupEditBtn.addEventListener("click", openpopupTypeEditProfile);
openNewcardPopupBtn.addEventListener("click", openPopupTypeAddProfile);
profileAvatar.addEventListener("click", openPopupAvatar);

const popupTypeConfirm = new PopupConfirm({
  popupSelector: ".popup-confirm",
});
popupTypeConfirm.setEventListeners();

const newPopupTypeAvatar = new PopupWithForm(
  ".popup-avatar",
  (item) => {
    api
      .updateUserAvatar(item)
      .then((res) => {
        user.setUserInfo({
          job: res.about,
          ...res,
        });
        newPopupTypeAvatar.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  },
  avatarFormValidator
);
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
