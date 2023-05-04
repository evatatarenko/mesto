export default class FormValidator {
    constructor(options, formElement) {
        this._options = options;
        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));

        this._submitBtn = this._formElement.querySelector(this._options.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        });
        this.switchSubmitBtnDisabled(true);
    }

    switchSubmitBtnDisabled(disabled) {
        console.log('disabled')
        this._submitBtn.disabled = disabled;
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _showItemInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._options.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._options.errorClass);
    }

    _hideItemInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = '';
    }

    _isInputValid(inputElement) {
        inputElement.validity.valid ? this._hideItemInputError(inputElement) : this._showItemInputError(inputElement)
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitBtn.classList.add(this._options.inactiveButtonClass);
            this._submitBtn.setAttribute('disabled', true);

        } else {
            this._submitBtn.classList.remove(this._options.inactiveButtonClass);
            this._submitBtn.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isInputValid(inputElement);
                this._toggleButtonState();
            });
        });

        this._toggleButtonState();
    }
}