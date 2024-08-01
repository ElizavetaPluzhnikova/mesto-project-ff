function checkInputValidation(inputElement, settings) {
    let errorMessage = "";

    if (inputElement.validity.valueMissing) {
        errorMessage = "Вы пропустили это поле.";
    }

    else if (inputElement.validity.tooShort) {
        errorMessage = `В поле должно быть от ${inputElement.minLength} до ${inputElement.maxLength} символов.`;
    } 
    
    else if (inputElement.validity.patternMismatch) {
        errorMessage = inputElement.dataset.errorMessage || "Неверный формат.";
    }

    else if (inputElement.validity.typeMismatch) {
        if (inputElement.type === "url") {
          errorMessage = "Введите адрес сайта.";
        } else {
          errorMessage = "Введите корректное значение.";
        }
    }

    inputElement.validity.valid ? hideError(inputElement, settings) : showError(inputElement, errorMessage, settings);
}

function hideError(inputElement, settings) {
    const errorElement = inputElement
      .closest(settings.formSelector) 
      .querySelector(`.${inputElement.name}-input-error`); 
  
    if (errorElement) {
      errorElement.textContent = ""; 
      errorElement.classList.remove(settings.errorClass); 
      inputElement.classList.remove(settings.inputErrorClass); 
    }
}

function showError(inputElement, errorMessage, settings) {
    const errorElement = inputElement
      .closest(settings.formSelector) 
      .querySelector(`.${inputElement.name}-input-error`); 
  
    if (errorElement) {
      errorElement.textContent = errorMessage; 
      errorElement.classList.add(settings.errorClass); 
      inputElement.classList.add(settings.inputErrorClass); 
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass); 
      buttonElement.disabled = true; 
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
          checkInputValidation(inputElement, settings); 
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
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
}
