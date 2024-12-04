// miniapi.js api
import { NextResponse } from 'next/server';
export async function fetchAndRenderData(endpoint) {
  try {
    // Cambié la URL a /api/libro
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
    });
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store',  // Evita que la respuesta se almacene en caché
        'Pragma': 'no-cache',         // Para navegadores más antiguos
        'Expires': '0',               // Define que los datos ya han expirado
      },
    }); 
  } catch (error) {
    console.error(error);
    return null;
  }
}




// Función principal para manejar la solicitud PUT a la API de libros (local)
export async function cambioAPI(req, url) {
  try {
    // Crear la URL para la API externa
    

    // Realizar el PUT en la API externa
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req), // Enviar el cuerpo del libro actualizado
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      const errorText = await response.text(); // Obtener el texto de error
      console.error('Error de API externa:', errorText);
      throw new Error(`Error al actualizar el libro: ${errorText}`);
    }

    // Devolver la respuesta al frontend
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error al manejar la solicitud PUT:', error.message);
    // Devolver el error al cliente con estado 500
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
