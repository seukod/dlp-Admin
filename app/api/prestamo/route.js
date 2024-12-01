import { NextResponse } from 'next/server';

export async function GET() {
    const url = "https://dlp-api.vercel.app/prestamos";
    const resp = await fetch(url);
    const data = await resp.json();
    return Response.json(data);
}

export async function PUT(req) {
    try {
      // Obtener los datos del cuerpo de la solicitud
      const prestamoActualizado = await req.json();
  
      // Crear la URL para la API externa, usando el id del libro actualizado
      const url = `https://dlp-api.vercel.app/prestamos`;
  
      // Hacer el PUT a la API externa con el libro actualizado
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prestamoActualizado), // Enviar el libro actualizado como cuerpo
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