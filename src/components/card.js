export default class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeCard,
    handleDislikeCard,
    userName,
  }) {
    this._userName = userName;
    this._id = data._id;
    this._link = data.link;
    this._name = data.name;
    this._likesAmount = data.likes?.length || 0;
    this._cardOwner = data?.owner?.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleDislikeCard = handleDislikeCard;
    this._handleLikeCard = handleLikeCard;
  }

  get cardId() {
    return this._id;
  }

  _isOwnersCard() {
    return this._userName === this._cardOwner;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    this._like = cardElement.querySelector(".element__like");
    if (this._isOwnersCard()) {
      this._cardDelete = cardElement.querySelector(".element__remove-btn");
    } else {
      cardElement.querySelector(".element__remove-btn").style.display = "none";
    }
    this._cardImage = cardElement.querySelector(".element__img");
    this._card = cardElement;
    this._cardCountLike = cardElement.querySelector(".element__count-like");
    this._cardCountLike.textContent = this._likesAmount;
    return cardElement;
  }

  generateCard() {
    const newCard = this._getTemplate();
    const img = newCard.querySelector(".element__img");
    img.alt = this._name;
    img.src = this._link;
    const title = newCard.querySelector(".element__title");
    title.innerText = this._name;

    this._setEventListeners();

    return newCard;
  }

  updateLikesCount(data) {
    this._cardCountLike.textContent = data.likes.length;
  }

  toggleLikeCard() {
    this._like.classList.toggle("element__like_active");
  }

  _likeCard() {
    if (this._like.classList.contains("element__like_active")) {
      this._handleDislikeCard(this);
    } else {
      this._handleLikeCard(this);
    }
  }

  _deleteCard() {
    this._handleDeleteClick(this._id, this.cardRemove.bind(this));
  }

  cardRemove() {
    this._card.remove();
  }

  _setEventListeners() {
    this._like.addEventListener("click", () => {
      this._likeCard();
    });

    if (this._isOwnersCard()) {
      this._cardDelete.addEventListener("click", () => {
        this._deleteCard();
      });
    }

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
}
