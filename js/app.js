import { fetchCards } from "./api.js";

const cardsContainer = document.querySelector(".cards-container");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filters");

let allCards = [];

function renderCards(cardsList) {
    cardsContainer.innerHTML = '';

    if(cardsList.length === 0) {
        cardsContainer.innerHTML = `<p>Nenhuma carta encontrada com os filtros aplicados.</p>`;
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

    renderCards(allCards);
}

document.addEventListener('DOMContentLoaded', init);