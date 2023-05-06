import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._fullImagePopup = this._popup.querySelector(".image-popup__image");
    this._titlePopupPhoto = this._popup.querySelector(".image-popup__caption");
  }

  open(name, link) {
    this._fullImagePopup.alt = name;
    this._fullImagePopup.src = link;
    this._titlePopupPhoto.textContent = name;

    super.open();
  }
}
