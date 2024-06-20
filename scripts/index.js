// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, onDelete) {
    const cardElement = cardTemplate.cloneNode(true); 
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    cardElement.querySelector('.card__image').src = card.link; 
    cardElement.querySelector('.card__image').alt = card.name; 
    cardElement.querySelector('.card__title').textContent = card.name; 
    deleteButton.addEventListener('click', () => { 
        onDelete(cardElement);                         
    });
    return cardElement; 
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
  }

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
    const cardElement = createCard(card, deleteCard); 
    cardsList.append(cardElement);
  });
