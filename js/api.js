const BASE_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export async function fetchCards(limit = 50, offset = 0) {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${limit}&offset=${offset}`);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Erro ao buscar cartas:", error);
        return [];
    }
}