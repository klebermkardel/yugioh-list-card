import { fetchCards } from "./api.js";

const cardsContainer = document.querySelector(".cards-container");

async function init() {
    console.log("Buscando dados da API...");
    const cards = await fetchCards(50);
    console.log("Cartas recebidas:", cards)

    if (cards.length === 0) {
        cardsContainer.innerHTML = `<p>Não foi possível carregar as cartas</p>`;
        return;
    }

    cardsContainer.innerHTML = '';

    cards.forEach(card => {
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

document.addEventListener('DOMContentLoaded', init);