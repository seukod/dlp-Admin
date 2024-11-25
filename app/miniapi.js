// miniapi.js
import { PUT } from './API/libro/route';

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
  export const cambioAPI = async (apiUrl, id, libroActualizado) => {
    try {
        const response = await PUT(id, libroActualizado);
        if (response) {
      
          
          console.log('Libro actualizado:', response);
            const nuevosLibros = [...libros];
            const index = nuevosLibros.findIndex(libro => libro.id === id); // Encuentra el índice del libro actualizado
            if (index !== -1) {
                nuevosLibros[index] = response; // Actualiza el libro en el índice encontrado
                setLibros(nuevosLibros);
                setLibroEditado(null);
            } else {
                console.error('Libro no encontrado para actualizar');
            }
        } else {
            console.error('Error al actualizar el libro');
        }
    } catch (error) {
        console.error('Error al guardar cambios:', error);
    }
};