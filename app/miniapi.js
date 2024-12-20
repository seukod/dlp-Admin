// miniapi.js api

export async function fetchAndRenderData(endpoint) {
  try {
    // Cambié la URL a /api/libro
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
    });
    return response.json();
    if (!response.ok) throw new Error('Error al obtener datos desde la API interna');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function cambioAPIp(prestamos, url) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prestamos), // Enviar solo el libro actualizado
    });

    if (!response.ok) {
      const errorData = await response.text(); // Cambiar a text() para leer posibles respuestas vacías
      console.error('Error al actualizar el libro:', errorData);
      throw new Error(errorData || 'Error desconocido');
    }

    const result = await response.json().catch(() => null); // Manejo para respuestas vacías
    if (result) {
      console.log('Libro actualizado correctamente:', result);
      return result;
    } else {
      console.warn('Respuesta vacía o no válida del servidor.');
      return null;
    }
  } catch (error) {
    console.error('Error en cambioAPI:', error);
    throw error;
  }
}



export async function cambioAPI(libroActualizado, url) {
  try {
    const response = await fetch(url, {
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
