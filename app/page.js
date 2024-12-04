'use client';
//pagina catalogo

import React, { useState, useEffect } from 'react';
import { fetchAndRenderData } from './miniapi';
import { cambioAPI } from './miniapi';
import LeftDrawer from './components/LeftDrawer';
import Image from 'next/image';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react';

export default function Home() {
  const [libros, setLibros] = useState([]);
  const [libroEditado, setLibroEditado] = useState(null);
  const [orden, setOrden] = useState({ campo: null, ascendente: true });
  const [refresh, setRefresh] = useState(false);

  // Función para obtener datos de la API
  const fetchData = async () => {
    try {
      localStorage.clear();
      const data = await fetchAndRenderData("api/libro");
      console.log("Datos obtenidos de la API:", data);

      if (data && Array.isArray(data.libros)) {
        setLibros(data.libros);
      } else {
        console.error("Estructura de datos no válida:", data);
        setLibros([]);
      }
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
      setLibros([]);
    }
  };

  // Fetch inicial de datos
  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Manejar cambios en los campos
  const manejarCambio = (e, index, campo) => {
    const nuevosLibros = [...libros];
    if (campo === 'tags') {
      nuevosLibros[index][campo] = e.target.value
        .split(',')
        .map(tag => tag.trim());
    } else {
      nuevosLibros[index][campo] = e.target.value;
    }
    setLibros(nuevosLibros);
  };
  const guardarCambiosLibro = async (index) => {
    const isbn = libros[index].isbn; // Obtener el ISBN del libro
    if (!validarISBN13(isbn)) {
      alert('Por favor, ingresa un ISBN válido de 13 dígitos.');
      return;  // Detener el proceso si el ISBN no es válido
    }


    const libroActualizado = {
      id: libros[index].id,
      titulo: libros[index].titulo,
      autores: libros[index].autores,
      caratula: libros[index].caratula,
      isbn: libros[index].isbn,
      tags: libros[index].tags,
      donante: libros[index].donante,
      fecha_donacion: libros[index].fecha_donacion,
      prestado: libros[index].prestado,
      borrado: libros[index].borrado
    };
    console.log(libroActualizado, "en guardarCambiosLibro");
  
    try {
      const url = `https://dlp-api.vercel.app/libros`;
      console.log('Enviando actualización del libro:', libroActualizado);
      await cambioAPI(libroActualizado, url); // Llamada a la función PUT
      await fetchData(); // Volver a obtener los datos después de guardar
      console.log('Libro actualizado correctamente en el frontend.');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Ocurrió un error al guardar los cambios.'); // Notificar al usuario
    }
  };

  
  // validar formato del ibsn
  const validarISBN13 = (isbn) => {
    // Eliminar caracteres no numéricos (como guiones)
    isbn = isbn.replace(/[^0-9]/g, '');
  
    // Verificar que sea exactamente un número de 13 dígitos
    if (isbn.length !== 13) {
      return false;
    }
  
    // Calcular la suma ponderada para la validación del ISBN-13
    let suma = 0;
    for (let i = 0; i < 12; i++) {
      // Multiplicar alternando entre 1 y 3
      suma += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
    }
  
    // El dígito de control es el valor que completa la suma para que el total sea múltiplo de 10
    const digitoControl = 10 - (suma % 10);
    const digitoControlFinal = digitoControl === 10 ? 0 : digitoControl;
  
    // Verificar si el dígito de control coincide con el último dígito
    return parseInt(isbn[12]) === digitoControlFinal;
  };
  
  
  

  // Guardar cambios del libro editado
  
  // Alternar edición
  const editarLibro = (index) => {
    setLibroEditado(libroEditado === index ? null : index);
  };

  // Ordenar libros por campo
  const ordenarLibros = (campo) => {
    const ascendente = orden.campo === campo ? !orden.ascendente : true;
    const librosOrdenados = [...libros].sort((a, b) => {
      if (a[campo] < b[campo]) return ascendente ? -1 : 1;
      if (a[campo] > b[campo]) return ascendente ? 1 : -1;
      return 0;
    });
    setLibros(librosOrdenados);
    setOrden({ campo, ascendente });
  };

  return (
    <>

      <div style={{
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        zIndex: 10
      }}>
        <Image 
          src="/logoAdmin.png" 
          alt="Logo" 
          width={180} 
          height={100} 
        />
      </div>

      <LeftDrawer />
      <h1>CATÁLOGO LIBROS</h1>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Lista de libros disponibles</TableCaption>
          <Thead>
            <Tr>
              <Th>Editar</Th>
              <Th onClick={() => ordenarLibros('id')}>ID ⇅</Th>
              <Th onClick={() => ordenarLibros('titulo')}>Título ⇅</Th>
              <Th>ISBN</Th>
              <Th>Carátula</Th>
              <Th>Autores</Th>
              <Th>Tags</Th>
              <Th>Donante</Th>
              <Th>Fecha de donación</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {libros.length > 0 ? (
              libros.map((libro, index) => (
                <Tr key={libro.id || index}>
                  <Td>
                    <Button onClick={() => editarLibro(index)}>
                      <Image
                        src={libroEditado === index ? '/tick-icon.png' : '/lapiz.png'}
                        alt="Editar"
                        width={22}
                        height={22}
                      />
                    </Button>
                  </Td>
                  <Td>{libro.id}</Td>
                  <Td>
                    {libroEditado === index ? (
                      <input
                        type="text"
                        value={libro.titulo}
                        className='camposEdit'
                        onChange={(e) => manejarCambio(e, index, 'titulo')}
                        onBlur={() => guardarCambiosLibro(index)}
                      />
                    ) : (
                      libro.titulo
                    )}
                  </Td>
                  <Td>{libro.isbn}</Td>
                  <Td>
                    {libroEditado === index ? (
                      <input
                        type="text"
                        value={libro.isbn}
                        className='camposEdit'
                        onChange={(e) => manejarCambio(e, index, 'isbn')}
                        onBlur={() => guardarCambiosLibro(index)}
                      />
                    ) : (
                      libro.caratula ? (
                        <Image
                          src={`data:image/jpeg;base64,${libro.caratula}`}
                          alt={libro.titulo}
                          width={50}
                          height={75}
                        />
                      ) : 'Sin Carátula'
                    )}
                  </Td>
                  <Td>
                    {libroEditado === index ? (
                      <input
                        type="text"
                        className='camposEdit'
                        value={libro.autores}
                        onChange={(e) => manejarCambio(e, index, 'autores')}
                        onBlur={() => guardarCambiosLibro(index)}
                      />
                    ) : (
                      libro.autores
                    )}
                  </Td>
                  <Td>
                    {libroEditado === index ? (
                      <input
                        type="text"
                        className='camposEdit'
                        value={Array.isArray(libro.tags) ? libro.tags.join(', ') : ''}
                        onChange={(e) => manejarCambio(e, index, 'tags')}
                        onBlur={() => guardarCambiosLibro(index)}
                      />
                    ) : (
                      Array.isArray(libro.tags) ? libro.tags.join(', ') : ''
                    )}
                  </Td>
                  <Td>{libro.donante}</Td>
                  <Td>
                    {libro.fecha_donacion
                      ? new Date(libro.fecha_donacion).toLocaleDateString()
                      : 'Sin fecha'}
                  </Td>
                  <Td>{libro.prestado ? 'Prestado' : 'Disponible'}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={9}>No hay libros disponibles</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
