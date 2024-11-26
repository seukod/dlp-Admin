// pages/api/libros.js
import { NextResponse } from 'next/server';

// Obtener la lista de libros
export async function GET() {
  const url = "https://dlp-api.vercel.app/libros";
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    return NextResponse.json({ error: 'Error al obtener los libros' }, { status: 500 });
  }
}

// Actualiza un libro
export async function PUT(req) {
  const { id } = req.nextUrl.searchParams; // Obtiene el ID del libro desde la URL
  const libro = await req.json(); // Obtiene el objeto libro del cuerpo de la solicitud
  const url = 'https://dlp-api.vercel.app/libros'; // URL correcta con ID del libro

  try {
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(libro)
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(`Error al actualizar el libro: ${errorData.error || 'Error desconocido'}`);
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al actualizar el libro:', error.message);
    return NextResponse.json({ error: 'Error al actualizar el libro' }, { status: 500 });
  }
}