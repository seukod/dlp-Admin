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
    const body = await req.json(); // Obtener los datos del cuerpo de la solicitud como JSON

    // Verificación de los datos (asegurándonos de que 'id' y 'titulo' estén presentes)
    if (!body.id || !body.titulo) {
      return NextResponse.json({ error: 'Faltan datos necesarios (id o titulo)' }, { status: 400 });
    }

    // Solicitar los datos actuales desde la API externa
    const response = await fetch(API_URL);
    const data = await response.json();

    // Buscar el libro dentro del arreglo 'libros'
    const libroIndex = data.libros.findIndex(libro => libro.id === body.id);

    if (libroIndex === -1) {
      return NextResponse.json({ error: 'Libro no encontrado' }, { status: 404 });
    }

    // Actualizar el libro en el arreglo
    data.libros[libroIndex] = { ...data.libros[libroIndex], ...body };

    // Enviar los datos actualizados a la API externa
    const updateResponse = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.libros), // Enviar el arreglo completo de libros actualizado
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error('Error al actualizar en la API externa:', errorData);
      throw new Error(`Error al actualizar los datos en la API externa: ${errorData.message || 'Desconocido'}`);
    }

    // No esperamos respuesta, simplemente indicamos que el libro fue actualizado
    return NextResponse.json({ message: 'Libro actualizado correctamente' });

  } catch (error) {
    console.error('Error en el PUT:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
