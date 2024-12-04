// miniapi.js api
import { NextResponse } from 'next/server';
export async function fetchAndRenderData(endpoint) {
  try {
    // Cambié la URL a /api/libro
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
    });
    return response.json();
    
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
      console.error('Error al actualizar el prestamo:', errorData);
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



// Función principal para manejar la solicitud PUT a la API de libros (local)
export async function cambioAPI(req) {
  console.log('Solicitud PUT recibida en API local');
  try {
    // Leer el cuerpo de la solicitud
    const body = await req.json(); // Asegura que el cuerpo se lea correctamente
    console.log(body, "request body"); // Imprimir los datos para asegurarse de que estén correctos

    // Crear la URL para la API externa
    const url = `https://dlp-api.vercel.app/libros`;

    // Realizar el PUT en la API externa
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Enviar el cuerpo del libro actualizado
    });

    // Si la respuesta no es exitosa, mostrar el error
    if (!response.ok) {
      const errorText = await response.text(); // Obtener el texto de error
      console.error('Error de API externa:', errorText);
      throw new Error(`Error al actualizar el libro: ${errorText}`);
    }

    // Obtener la respuesta de la API externa
    const data = await response.json();
    console.log('Respuesta de la API externa:', data); // Verificar que la respuesta es correcta

    // Devolver la respuesta al frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al manejar la solicitud PUT:', error.message);
    // Devolver el error al cliente con estado 500
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
