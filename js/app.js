import { fetchCards } from "./api.js";

const cardsContainer = document.querySelector(".cards-container");

const loadMoreBtn = document.querySelector("#load-more");

const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filters");

const modal = document.querySelector('#modal');
const modalClose = document.querySelector('.modal-close');
const modalImg = document.querySelector('#modal-img');
const modalName = document.querySelector('#modal-name');
const modalType = document.querySelector('#modal-type');
const modalDesc = document.querySelector('#modal-desc');

let allCards = [];
let visibleCards = [];
const cardsPerPage = 50;
let currentOffset = 0;

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
    console.log("Buscando primeiro lote da API...");
    
    const firstBatch = await fetchCards(cardsPerPage, currentOffset); 
    
    if (firstBatch.length === 0) {
        cardsContainer.innerHTML = `<p>Não foi possível carregar as cartas.</p>`;
        loadMoreBtn.classList.add('hidden');
        return;
    }

    allCards = firstBatch;
    visibleCards = allCards;

    populateFilters(allCards);
    
    renderCards(visibleCards);
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
    console.log("Filtrando...");

    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = filterSelect.value;

    visibleCards = allCards.filter(card => {
        const matchesName = card.name.toLowerCase().includes(searchTerm);
        const matchesType = selectedType === "" || card.type === selectedType;
        return matchesName && matchesType;
    });

    renderCards(visibleCards);

    if (searchTerm !== "" || selectedType !== "") {
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
    }
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

function debounce(func, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

document.addEventListener('DOMContentLoaded', init);
filterSelect.addEventListener('change', filterCards);
searchInput.addEventListener('input', debounce(filterCards, 300));

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    loadMoreBtn.textContent = "Invocando mais cartas...";
    loadMoreBtn.disabled = true;

    currentOffset += cardsPerPage;

    console.log(`Buscando cartas a partir da posição ${currentOffset}...`);
    const nextBatch = await fetchCards(cardsPerPage, currentOffset);

    if (nextBatch.length > 0) {
        allCards = [...allCards, ...nextBatch];
        
        populateFilters(allCards);

        filterCards(); 
    } else {
        loadMoreBtn.classList.add('hidden');
    }

    loadMoreBtn.textContent = "Carregar Mais Cartas";
    loadMoreBtn.disabled = false;
});