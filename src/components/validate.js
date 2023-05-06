import FormValidator from "./validator.js";

const validationParameters = {
    formSelector: '.form',
    inputSelector: '.form__text',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_inactive',
    inputErrorClass: 'form__text_type_error',
    errorClass: 'form__input-error_active'
}


const enableValidation = options => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
        new FormValidator(validationParameters, formElement)._setEventListeners();
    });
};


enableValidation(validationParameters);

