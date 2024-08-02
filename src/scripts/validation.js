function checkInputValidation(formElement, inputElement, settings) {
  if (
    inputElement.validity.patternMismatch &&
    inputElement.dataset.errorMessage
  ) {
    showError(formElement, inputElement, inputElement.dataset.errorMessage, settings);
  } else if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideError(formElement, inputElement, settings);
  }
}

function hideError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`); 
    errorElement.textContent = ""; 
    errorElement.classList.remove(settings.errorClass); 
    inputElement.classList.remove(settings.inputErrorClass); 
}

function showError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`); 
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(settings.errorClass); 
    inputElement.classList.add(settings.inputErrorClass); 
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

const disableSubmitButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass); 
  buttonElement.disabled = true; 
}

function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      disableSubmitButton(buttonElement, settings) 
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass); 
      buttonElement.disabled = false; 
  }
}

export function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    
    formList.forEach((formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
      const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          checkInputValidation(formElement, inputElement, settings); 
          toggleButtonState(inputList, buttonElement, settings); 
        });
      });
  
      formElement.addEventListener("submit", (event) => event.preventDefault()); 
      toggleButtonState(inputList, buttonElement, settings);
    });
  }
  
export function clearValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
    inputList.forEach((inputElement) => hideError(inputElement, settings));
    disableSubmitButton(buttonElement, settings) 
}
