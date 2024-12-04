import { NextResponse } from 'next/server';

const API_URL = 'https://dlp-api.vercel.app/libros'; // API externa


// Manejador para GET
export async function GET(req) {
  try {
    // Solicitar los datos de la API externa
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener datos desde la API externa');

    const data = await response.json();
    return NextResponse.json(data);  // Devuelve los datos obtenidos
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}






export async function PUT(req) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const libroActualizado = await req.json();

    // Crear la URL para la API externa, usando el id del libro actualizado
    const url = `https://dlp-api.vercel.app/libros`;

    // Hacer el PUT a la API externa con el libro actualizado
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(libroActualizado), // Enviar el libro actualizado como cuerpo
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el libro');
    }

    // Responder con éxito si todo va bien
    return NextResponse.json({ message: 'Libro actualizado con éxito' });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
   
