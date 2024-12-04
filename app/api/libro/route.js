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
  console.log('Solicitud PUT recibida');
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

   
