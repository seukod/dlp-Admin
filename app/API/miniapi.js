// miniapi.js
export async function fetchAndRenderData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status}`);
        }
        const data = await response.json();
        return data; // Asegúrate de que esto retorne los datos en el formato esperado
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }
}