const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-modal");
const closeEditModalButton = editModal.querySelector(".modal__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const modalTitleInput = document.querySelector("#modal-title-input");
const modalSubtitleInput = document.querySelector("#modal-subtitle-input");
const modalEditForm = document.querySelector("#edit-modal-form");
const cardList = document.querySelector(".cards__list");

const addButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#add-modal");
const closeAddButton = addModal.querySelector(".modal__close-button");
const modalAddForm = document.querySelector("#add-modal-form");

const previewImageModal = document.querySelector("#previewImageModal");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector(".modal__preview-caption");
const closePreviewImageButton = previewImageModal.querySelector(
  ".modal__close-button"
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardElement, container) {
  cardList.prepend(cardElement);
}

function getCardView(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__caption");
  const cardImage = cardElement.querySelector(".card__image");
  console.log(cardData);
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove("card");
  });

  cardImage.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
  });

  return cardElement;
}

function handleModalEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileSubtitle.textContent = modalSubtitleInput.value;
  closeModal(editModal);
}

modalAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({
    name,
    link,
  });
  renderCard(cardView, cardList);
  e.target.reset();
  closeModal(addModal);
});

editButton.addEventListener("click", () => {
  modalTitleInput.value = profileTitle.textContent;
  modalSubtitleInput.value = profileSubtitle.textContent;
  openModal(editModal);
});

addButton.addEventListener("click", () => {
  openModal(addModal);
});

closeAddButton.addEventListener("click", () => closeModal(addModal));

closeEditModalButton.addEventListener("click", () => closeModal(editModal));

closePreviewImageButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);
modalEditForm.addEventListener("submit", handleModalEditSubmit);

initialCards.forEach(function (cardData) {
  const cardView = getCardView(cardData);
  console.log(cardView);
  renderCard(cardView, cardList);
});
