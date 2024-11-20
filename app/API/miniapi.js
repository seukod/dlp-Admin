// miniapi.js

export const fetchAndRenderData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Retorna null en caso de error
    }
  };