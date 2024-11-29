import { NextResponse } from 'next/server';

const API_URL = 'https://dlp-api.vercel.app/libros'; // API externa


// Manejador para GET
export async function GET() {
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
    // Obtener datos del cuerpo de la solicitud
    const libroActualizado = await req.json();

    // Validar datos requeridos
    if (!libroActualizado || !libroActualizado.id) {
      return NextResponse.json(
        { error: 'Datos incompletos: falta el ID del libro.' },
        { status: 400 }
      );
    }

    const url = "https://dlp-api.vercel.app/libros";

    // Realizar la solicitud PUT al backend externo
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libroActualizado),
    });

    // Manejo de errores según la respuesta del servidor
    if (!response.ok) {
      const errorBody = await response.json();
      return NextResponse.json(
        { error: `Error al actualizar el libro: ${errorBody.message || response.statusText}` },
        { status: response.status }
      );
    }

    // Respuesta exitosa
    return NextResponse.json({ message: 'Libro actualizado con éxito' }, { status: 200 });
  } catch (error) {
    // Manejo de errores generales
    return NextResponse.json(
      { error: `Error interno del servidor: ${error.message}` },
      { status: 500 }
    );
  }
}


