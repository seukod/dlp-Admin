import { NextResponse } from 'next/server';

const API_URL = 'https://dlp-api.vercel.app/libros'; // API externa


// Manejador para GET
export async function GET() {
  try {
    // Solicitar los datos de la API externa
    const response = await fetch(API_URL,{
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
    });
    if (!response.ok) throw new Error('Error al obtener datos desde la API externa');

    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'no-store');

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store',  // Evita que la respuesta se almacene en caché
        'Pragma': 'no-cache',         // Para navegadores más antiguos
        'Expires': '0',               // Define que los datos ya han expirado
      },
    });  // Devuelve los datos obtenidos
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


   
