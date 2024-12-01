// miniapi.js
export async function fetchAndRenderData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status}`);
        }
        const data = await response.json();

        // Convertir el objeto en un arreglo
        const librosArray = Object.values(data).map(libro => ({
            id: libro.bib_key, // Asegúrate de que este campo exista y sea único
            titulo: libro.title || '',
            ISBN: libro.isbn ? libro.isbn[0] : '', // Toma el primer ISBN si existe
            autores: libro.authors ? libro.authors.map(author => author.name).join(', ') : '',
            tags: libro.subjects ? libro.subjects.map(subject => subject.name).join(', ') : '', // Cambia aquí
            donante: libro.donor || '', // Asegúrate de que este campo exista
            fecha: libro.publish_date || '',
            estado: libro.status || '' // Asegúrate de que este campo exista
        }));

        return librosArray; // Devuelve el arreglo de libros
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        return []; // Devuelve un arreglo vacío en caso de error
    }
}