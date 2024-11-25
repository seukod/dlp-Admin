export async function GET() {
    const url = "https://dlp-api.vercel.app/libros";
    const resp = await fetch(url);
    const data = await resp.json();
    return Response.json(data);
}
//crear funcion put
export async function PUT(id, libro) {
    const url = `https://dlp-api.vercel.app/libros/${id}`;
    const resp = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(libro)
    });
    const data = await resp.json();
    return data; // Cambia aquí para devolver el objeto data
}
        