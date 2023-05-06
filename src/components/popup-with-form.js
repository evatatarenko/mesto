import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validator) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._validator = validator;
    this._inputList = Array.from(this._form.querySelectorAll(".form__text"));
  }

  _getInputValues() {
    this._formInputValues = {};

    this._inputList.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });

    return this._formInputValues;
  }

  close() {
    super.close();
    this._form.reset();
    this._validator.toggleButtonState();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
