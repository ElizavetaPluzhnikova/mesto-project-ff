import './pages/index.css';
import { initialCards } from "./scripts/cards.js";
import { createCard, likeCard, deleteCard } from './scripts/card.js';
import { closeModal, openModal } from './scripts/modal.js'; 

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

const addCardForm = popupNewForm.querySelector('.popup__form');
const cardName = popupNewForm.querySelector('.popup__input_type_card-name');
const cardLink = popupNewForm.querySelector('.popup__input_type_url');

function handleImageClick(data) {
  const popupImage = popupImageForm.querySelector('.popup__image');
  const popupCaption = popupImageForm.querySelector('.popup__caption');

  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;

  openModal(popupImageForm);
}

function createCardElement(cardData) {
  return createCard(
    cardData,
    handleImageClick,
    likeCard,
    deleteCard
  );
}

function renderCards(cards) {
  cards.forEach((cardData) =>
    cardsList.appendChild(createCardElement(cardData))
  );
}

renderCards(initialCards);

function handleProfileEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditForm);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditForm);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardName.value,
    link: cardLink.value,
  };
  cardsList.prepend(createCardElement(cardData));
  closeModal(popupNewForm);
  addCardForm.reset();
}

profileEditButton.addEventListener('click', handleProfileEdit);

popupCloseButton.addEventListener('click', () => closeModal(popupEditForm));

profileForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => openModal(popupNewForm));

addCardCloseButton.addEventListener('click', () => closeModal(popupNewForm));

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

popupImageCloseButton.addEventListener('click', () => closeModal(popupImageForm));
