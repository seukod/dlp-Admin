// miniapi.js
//creacion de api 

import { PUT } from './api/libro/route';

export const fetchAndRenderData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data; // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Retorna null en caso de error
    }
  };
 // miniapi.js
 export const cambioAPI = async (id, libroActualizado) => {
  try {
    const response = await fetch('/api/libro', { // No incluye el ID en la URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...libroActualizado, id }), // Incluye el ID en el cuerpo
    });

    if (!response.ok) {
      const errorData = await response.json(); // Obtiene el error del JSON
      throw new Error(`Error al actualizar el libro: ${errorData.error || 'Error desconocido'}`); 
    }

    const data = await response.json(); // Obtiene los datos JSON de la respuesta
    console.log('Libro actualizado:', data);
    return data;
  } catch (error) {
      console.error('Error al guardar cambios:', error.message);
      return null;
  }
};