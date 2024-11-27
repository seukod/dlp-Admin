'use client';

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

  // Fetch inicial de datos
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const data = await fetchAndRenderData("API/libro");
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

    fetchData();
  }, []);

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
  
    try {
      console.log('Enviando actualización del libro:', libroActualizado);
      await cambioAPI(libroActualizado, '/API/libro'); // Llamada a la función PUT
  
      // Actualizar estado local después del PUT exitoso
      const nuevosLibros = [...libros];
      nuevosLibros[index] = libroActualizado;
      setLibros(nuevosLibros);
      // Después de un PUT exitoso, guarda los libros actualizados en localStorage
      localStorage.setItem('libros', JSON.stringify(nuevosLibros));

  
      console.log('Libro actualizado correctamente en el frontend.');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
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
                  <Td>
                    {libro.caratula ? (
                      <Image
                        src={`data:image/jpeg;base64,${libro.caratula}`}
                        alt={libro.titulo}
                        width={50}
                        height={75}
                      />
                    ) : (
                      'Sin Carátula'
                    )}
                  </Td>
                  <Td>{libro.autores}</Td>
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
