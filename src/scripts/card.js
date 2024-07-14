function createCardElement(
    template,
    data,
    handleImageClick,
    likeCard,
    deleteCard
  ) {
        const cardElement = template
        .querySelector('.card')
        .cloneNode(true);
        const cardImage = cardElement.querySelector('.card__image');
        const cardTitle = cardElement.querySelector('.card__title');
        const likeButton = cardElement.querySelector('.card__like-button');
        const deleteButton = cardElement.querySelector('.card__delete-button');
        
        cardImage.src = data.link;
        cardImage.alt = data.name;
        cardTitle.textContent = data.name;

        cardImage.addEventListener('click', () => 
            handleImageClick(data)
        );
        likeButton.addEventListener('click', likeCard);
        deleteButton.addEventListener('click', deleteCard);

        return cardElement;
        } 

export function createCard(
    data,
    handleImageClick,
    likeCard,
    deleteCard
    ) {
        const template = document.getElementById('card-template').content;
     
        return createCardElement(
            template,
            data,
            handleImageClick,
            likeCard,
            deleteCard
          );
        }

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }

export function deleteCard(evt) {
    evt.target.closest('.card').remove();
  }
