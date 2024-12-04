// miniapi.js api
import { NextResponse } from 'next/server';
export async function fetchAndRenderData(endpoint) {
  try {
    // Obtener el timestamp actual para evitar caché
    const timestamp = Date.now();
    
    // Agregar el parámetro de tiempo a la URL
    const response = await fetch(`${endpoint}?t=${timestamp}`, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
    });
    console.log('Headers en la respuesta:', Array.from(response.headers.entries()));
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}





// Función principal para manejar la solicitud PUT a la API de libros (local)
// Función principal para manejar la solicitud PUT a la API de libros (local)
// Función principal para manejar la solicitud PUT a la API de libros (local)
export async function cambioAPI(req, url) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      const errorText = await response.text(); // Obtener el texto de error
      console.error('Error de API externa:', errorText);
      throw new Error(`Error al actualizar el libro: ${errorText}`);
    }

    // Verificar si hay un cuerpo en la respuesta
    const responseBody = await response.text(); // Obtener el cuerpo como texto
    if (responseBody) {
      return JSON.parse(responseBody); // Intentar parsear el cuerpo como JSON
    } else {
      return {}; // Retornar un objeto vacío si no hay cuerpo
    }
  } catch (error) {
    console.error('Error al manejar la solicitud PUT:', error.message);
    return { error: error.message }; // Devolver el error
  }
}