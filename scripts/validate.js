import FormValidator from "./validator.js";

const validationParameters = {
    formSelector: '.form',
    inputSelector: '.form__text',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_inactive',
    inputErrorClass: 'form__text_type_error',
    errorClass: 'form__input-error_active'
}

// const showInputError = (formElement, inputElement, errorMessage, options) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(options.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(options.errorClass);
// };

// const hideInputError = (formElement, inputElement, options) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(options.inputErrorClass);
//     errorElement.classList.remove(options.errorClass);
//     errorElement.textContent = '';
// };



// const checkInputValidity = (formElement, inputElement, options) => {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage, options);
//     } else {
//         hideInputError(formElement, inputElement, options);
//     }
// };

// const hasInvalidInput = (inputList) => {

//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     });
// };

// const toggleButtonState = (inputList, buttonElement, options) => {
//     if (hasInvalidInput(inputList)) {
//         buttonElement.classList.add(options.inactiveButtonClass);
//         buttonElement.disabled = true
//     } else {
//         buttonElement.classList.remove(options.inactiveButtonClass);
//         buttonElement.disabled = false
//     };
// };

// const setEventListeners = (formElement, options) => {
//     const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
//     const buttonElement = formElement.querySelector(options.submitButtonSelector);
//     toggleButtonState(inputList, buttonElement,options);
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement, options);
//             toggleButtonState(inputList, buttonElement, options);
//         });
//     });
// };

const enableValidation = options => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
        new FormValidator(validationParameters, formElement)._setEventListeners();
    });
};


enableValidation(validationParameters);

