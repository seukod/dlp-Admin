import { NextResponse } from 'next/server';

const API_URL = 'https://dlp-api.vercel.app/libros'; // API externa


// Manejador para GET
export async function GET() {
  try {
    // Agregar un parámetro de fecha y hora para hacer la URL única
    const timestamp = new Date()
    console.log("timestam:", timestamp);
    const uniqueURL = `${API_URL}?t=${timestamp}`;

    // Solicitar los datos de la API externa con caché desactivado
    const response = await fetch(uniqueURL, {
      headers: { 
        'Cache-Control': 'no-cache', 
        'Pragma': 'no-cache' 
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener datos desde la API externa: ${response.statusText}`);
    }

    // Procesar los datos y devolver la respuesta con control de caché
    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error al manejar GET:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


   
