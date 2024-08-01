import './pages/index.css';
import { initialCards } from "./scripts/cards.js";
import { createCard, handleLikeClick } from './scripts/card.js';
import { closeModal, openModal } from './scripts/modal.js'; 
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getInitialCards, getUserInfo, updateUserProfile, addCard, deleteCardApi, updateUserAvatar } from './scripts/api.js';


const cardsList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditForm = document.querySelector('.popup_type_edit');
const popupNewForm = document.querySelector('.popup_type_new-card');
const popupCloseButton = popupNewForm.querySelector('.popup__close');
const addCardButton = document.querySelector('.profile__add-button');
const addCardCloseButton = popupNewForm.querySelector('.popup__close');
const popupImageForm = document.querySelector('.popup_type_image');
const popupImageCloseButton = popupImageForm.querySelector('.popup__close');
const profileForm = popupEditForm.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector(".profile__image");
const popupImage = popupImageForm.querySelector('.popup__image');
const popupCaption = popupImageForm.querySelector('.popup__caption');

const addCardForm = popupNewForm.querySelector('.popup__form');
const cardName = popupNewForm.querySelector('.popup__input_type_card-name');
const cardLink = popupNewForm.querySelector('.popup__input_type_url');

const avatarPopup = document.querySelector(".popup_type_edit-avatar"); 
const avatarForm = avatarPopup.querySelector(".popup__form"); 
const avatarInput = avatarPopup.querySelector(".popup__input_type_url"); 
const avatarCloseButton = avatarPopup.querySelector(".popup__close"); 
const editAvatarButton = document.querySelector(".profile__image");

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const renderLoading = ({ buttonElement, loadingText }) => {
  buttonElement.textContent = loadingText; 
};

function handleProfileEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditForm);
  clearValidation(profileForm, validationSettings)
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = profileForm.querySelector(validationSettings.submitButtonSelector);
  renderLoading({ buttonElement: submitButton, loadingText: "Сохранение..." });
  
  const newName = nameInput.value; 
  const newAbout = jobInput.value;

  updateUserProfile(newName, newAbout)
  .then((userProfile) => {
    profileName.textContent = userProfile.name; 
    profileDescription.textContent = userProfile.about; 
    closeModal(popupEditForm); 
  })
  .catch((err) => console.log(err)) 
  .finally(() => {
    renderLoading({ buttonElement: submitButton, loadingText: "Сохранить" }); 
  });
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector(validationSettings.submitButtonSelector);
  renderLoading({ buttonElement: submitButton, loadingText: "Создание..." });
  
  const cardData = {
    name: cardName.value,
    link: cardLink.value,
  };

  addCard(cardData.name, cardData.link)
    .then((newCard) => {
      const userId = newCard.owner._id;
      cardsList.prepend(createCard(newCard, handleImageClick, handleLikeClick, handleDeleteClick, userId));
      closeModal(popupNewForm);
      addCardForm.reset();
      clearValidation(addCardForm, validationSettings);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading({ buttonElement: submitButton, loadingText: "Создать" });
    });
};

function handleImageClick(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openModal(popupImageForm);
}

function handleDeleteClick(cardId, cardElement) {
  deleteCardApi(cardId)
  .then(() => {
    cardElement.remove();  
  })
  .catch((err) => console.log(err));
};

function createCardElement(cardData, userId) {
  return createCard(cardData, handleImageClick, handleLikeClick, handleDeleteClick, userId);
};

function renderCards(cards, userId) {
  cards.forEach((cardData) =>
    cardsList.appendChild(createCardElement(cardData, userId))
  );
};

function renderUserInfo({ name, about, avatar }) {
  profileName.textContent = name; 
  profileDescription.textContent = about; 
  profileImage.style.backgroundImage = `url(${avatar})`; 
};

function handleEditAvatarClick() {
  openModal(avatarPopup); 
  avatarForm.reset(); 
  clearValidation(avatarForm, validationSettings); 
};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = avatarForm.querySelector(validationSettings.submitButtonSelector);
  renderLoading({ buttonElement: submitButton, loadingText: "Сохранение..." });
  const newAvatar = avatarInput.value;

  updateUserAvatar(newAvatar)
  .then((userInfo) => {
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`; 
    closeModal(avatarPopup); 
  })
  .catch((err) => console.log(err)) 
  .finally(() => {
    renderLoading({ buttonElement: submitButton, loadingText: "Сохранить" });
  });
};

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userProfile, initialCards]) => {
    renderUserInfo(userProfile); 
    renderCards(initialCards, userProfile._id); 
  })
  .catch((err) => console.log(err));

profileEditButton.addEventListener('click', handleProfileEdit);

popupCloseButton.addEventListener('click', () => closeModal(popupEditForm));

profileForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  openModal(popupNewForm);
  addCardForm.reset(); 
  clearValidation(addCardForm, validationSettings);
});

addCardCloseButton.addEventListener('click', () => closeModal(popupNewForm));

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

popupImageCloseButton.addEventListener('click', () => closeModal(popupImageForm));

editAvatarButton.addEventListener("click", handleEditAvatarClick); 

avatarCloseButton.addEventListener("click", () => closeModal(avatarPopup)); 

avatarForm.addEventListener("submit", handleAvatarFormSubmit); 


enableValidation(validationSettings);
