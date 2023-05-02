export default class Card {
  constructor(data, handleCardClick, templateSelector) {
    console.log(handleCardClick)
    this._link = data.link
    this._name = data.name
    this._handleCardClick = handleCardClick
    this._templateSelector = templateSelector
  }


  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    this._like = cardElement.querySelector('.element__like');
    this._cardDelete = cardElement.querySelector('.element__remove-btn');
    this._cardImage = cardElement.querySelector('.element__img');
    this._card = cardElement
    return cardElement;
  }

  generateCard() {
    const newCard = this._getTemplate();
    const img = newCard.querySelector('.element__img');
    img.alt = this._name;
    img.src = this._link;
    const title = newCard.querySelector('.element__title');
    title.innerText = this._name;

    this._setEventListeners();

    return newCard;
  }


  _likeCard() {
    this._like.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._card.remove();
  }

  _setEventListeners() {

    this._like.addEventListener('click', () => {
      this._likeCard();
    });

    this._cardDelete.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

}