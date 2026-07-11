import { fetchCards } from "./api.js";

const cardsContainer = document.querySelector(".cards-container");

const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filters");

const modal = document.querySelector('#modal');
const modalClose = document.querySelector('.modal-close');
const modalImg = document.querySelector('#modal-img');
const modalName = document.querySelector('#modal-name');
const modalType = document.querySelector('#modal-type');
const modalDesc = document.querySelector('#modal-desc');

let allCards = [];

function renderCards(cardsList) {
    cardsContainer.innerHTML = '';

    if(cardsList.length === 0) {
    cardsContainer.innerHTML = `<p class="no-results">Nenhuma carta encontrada com os filtros aplicados.</p>`;
    return;
}

    cardsList.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const imageUrl = card.card_images[0].image_url;

        cardElement.innerHTML = `
            <img src="${imageUrl}" alt="${card.name}">
            <div class="card-info">
                <p><strong>${card.name}</strong></p>
                <p>${card.type}</p>
            </div>
        `;

        cardElement.addEventListener('click', () => openModal(card));

        cardsContainer.appendChild(cardElement);
    });
}

async function init() {
    console.log("Buscando dados da API...");
    allCards = await fetchCards(50);
    console.log("Cartas recebidas:", allCards)

    if (allCards.length === 0) {
        cardsContainer.innerHTML = `<p>Não foi possível carregar as cartas</p>`;
        return;
    }

    populateFilters(allCards);

    renderCards(allCards);
}

function populateFilters(cardsList) {
    const types = new Set(cardsList.map(card => card.type));

    filterSelect.innerHTML = `<option value="">Todos os Tipos</option>`;

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        filterSelect.appendChild(option);
    })
}

function filterCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = filterSelect.value;

    const filtered = allCards.filter(card => {
        const matchesName = card.name.toLowerCase().includes(searchTerm);
        
        const matchesType = selectedType === "" || card.type === selectedType;
        
        return matchesName && matchesType;
    });

    renderCards(filtered);
}

function openModal(card) {
    const imageUrl = card.card_images[0].image_url;

    modalImg.src = imageUrl;
    modalImg.alt = card.name;
    modalName.textContent = card.name;
    modalType.textContent = `Tipo: ${card.type}`;
    modalDesc.textContent = card.desc;

    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', init);
filterSelect.addEventListener('change', filterCards);
searchInput.addEventListener('input', filterCards);

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});