// miniapi.js

export async function fetchAndRenderData(endpoint) {
  try {
    // Cambié la URL a /api/libro
    const response = await fetch(endpoint,{method: 'GET'});
    if (!response.ok) throw new Error('Error al obtener datos desde la API interna');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function cambioAPI(libroActualizado) {
  try {
    const response = await fetch('/API/libro', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(libroActualizado), // Enviar solo el libro actualizado
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al actualizar el libro:', errorData);
      throw new Error(errorData.message || 'Error desconocido');
    }

    const result = await response.json();
    console.log('Libro actualizado correctamente:', result);
    return result;
  } catch (error) {
    console.error('Error en cambioAPI:', error);
    throw error;
  }
}
