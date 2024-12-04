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


   
