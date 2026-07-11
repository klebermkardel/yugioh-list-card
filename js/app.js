import { fetchCards } from "./api.js";

const cardsContainer = document.querySelector(".cards-container");

async function init() {
    console.log("Buscando dados da API...");
    const cards = await fetchCards(50);
    console.log("Cartas recebidas:", cards)
}

document.addEventListener('DOMContentLoaded', init);