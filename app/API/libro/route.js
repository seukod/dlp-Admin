export async function GET() {
    const url = "https://dlp-api.vercel.app/libros";
    const resp = await fetch(url);
    const data = await resp.json();
    return Response.json(data);
}