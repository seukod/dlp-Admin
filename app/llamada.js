
export async function getApiData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }
}

// Función para procesar los datos obtenidos de la API
export function processApiData(data) {
    // Aquí puedes realizar cualquier procesamiento necesario
    // Por ejemplo, filtrar, mapear o transformar los datos
    return data.map(item => ({
        id: item.id,
        name: item.name,
        // Agrega más propiedades según sea necesario
    }));
}

// Función para renderizar la información en la página web
export function renderApiData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Limpiar contenido previo

    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<h2>${item.name}</h2><p>ID: ${item.id}</p>`;
        container.appendChild(div);
    });
}

// Función principal para orquestar las llamadas
export async function fetchAndRenderData(apiUrl) {
    const apiData = await getApiData(apiUrl);
    if (apiData) {
        const processedData = processApiData(apiData);
        renderApiData(processedData);
    }
}

// Llamada a la función principal con la URL de la API
const apiUrl = 'https://api.example.com/data'; // Reemplaza con tu URL de API
fetchAndRenderData(apiUrl);
