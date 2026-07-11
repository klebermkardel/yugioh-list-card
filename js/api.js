const BASE_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export async function fetchCards(limit = 50, offset = 0, searchTerm = "") {
    try {
        let url = `${BASE_URL}?num=${limit}&offset=${offset}`;
        
        if (searchTerm) {
            url += `&fname=${encodeURIComponent(searchTerm)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 400) return [];
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Erro ao buscar cartas:", error);
        return [];
    }
}