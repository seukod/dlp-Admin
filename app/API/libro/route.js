export async function GET() {
    const url = "https://dlp-api.vercel.app/libros";
    const resp = await fetch(url);
    const data = await resp.json();
    return Response.json(data);
}
//crear funcion put
export async function PUT(id, libro) {
    const url = `https://dlp-api.vercel.app/libros`;
    try {
        const resp = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        });
        if (!resp.ok) {
            throw new Error('Network response was not ok');
        }
        const data = resp;
        return data
        ; // Devuelve los datos actualizados
    } catch (error) {
        console.error('Error updating data:', error);
        throw new Error('Failed to update data exception'); // Lanza un error manejable
    }
}
        