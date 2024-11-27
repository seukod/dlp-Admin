// miniapi.js

export async function fetchAndRenderData(endpoint) {
  try {
    // Cambié la URL a /api/libro
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Error al obtener datos desde la API interna');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function cambioAPI(id, data) {
  try {
    // Asegurarse de que los datos están siendo enviados como JSON
    const response = await fetch('/API/libro', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Asegúrate de que el tipo de contenido sea JSON
      },
      body: JSON.stringify(data), // Convertir el objeto 'data' a una cadena JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error en la API interna:', errorData);
      throw new Error(`Error en la API interna: ${errorData.message || 'Desconocido'}`);
    }

    // No estamos esperando respuesta, así que no retornamos nada
    console.log('Datos enviados correctamente a la API interna');
  } catch (error) {
    console.error('Error en PUT:', error);
  }
}
