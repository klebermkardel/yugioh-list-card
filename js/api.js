const BASE_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export async function fetchCards(limit = 50) {
    try {
        const response = await fetch(`${BASE_URL}?num=${limit}&offset=0`);

        if(!response.ok) {
            throw new Error (`Erro na requisição: ${response.status}`);
        }

        const jsonResponse = await response.json();

        return jsonResponse.data;
    } catch (error) {
        console.error("Erro ao buscar as cartas:", error);
        return [];
    }
}