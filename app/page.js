'use client';
import React, { useState, useEffect } from 'react';
import { fetchAndRenderData } from './miniapi';
import LeftDrawer from './components/LeftDrawer'; 
import Image from 'next/image';
import Link from 'next/link';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';



export default function Home() {
  const [libros, setLibros] = useState([]);
  const [libroEditado, setLibroEditado] = useState(null);
  
  useEffect(() => {
    fetchAndRenderData("API/libro").then((data) => setLibros(data));
  }, []);

const [cambiosLocales, setCambiosLocales] = useState(false);

const manejarCambio = (e, index, campo) => {
  const nuevosLibros = [...libros];
  nuevosLibros[index][campo] = campo === 'tags' 
    ? e.target.value.split(',').map(tag => tag.trim())
    : e.target.value;
  setLibros(nuevosLibros);
  localStorage.setItem('libros', JSON.stringify(nuevosLibros));
  setCambiosLocales(true); // Marca que hay cambios no sincronizados
};

  

  const editarLibro = (index) => {
    setLibroEditado(libroEditado === index ? null : index);
  };

  const getSortIcon = (campo) => {
    return '⇅'; // Cambia esto según tu lógica de ordenamiento
  };

  const ordenarLibros = (campo) => {
    const librosOrdenados = [...libros].sort((a, b) => {
      if (a[campo] < b[campo]) return -1;
      if (a[campo] > b[campo]) return 1;
      return 0;
    });
    setLibros(librosOrdenados);
  };

  return (
    <>
      <LeftDrawer />
      <h1>CATÁLOGO LIBROS</h1>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Lista de libros disponibles</TableCaption>
          <Thead>
            <Tr>
              <Th className="esqizq"></Th>
              <Th>ID</Th>
              <Th>Título</Th>
              <Th>Carátula</Th>
              <Th>ISBN</Th> 
              <Th>Autores</Th>
              <Th>Tags</Th>
              <Th>Donante</Th>
              <Th>Fecha de donación</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
          <Tbody>
              {libros && libros.libros && libros.libros.length > 0 ? (
                libros.libros.map((libro, index) => (
                  <Tr key={libro.id}>
                    <Td>
                      <Button onClick={() => editarLibro(index)} p={2}>
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
                          onChange={(e) => manejarCambio(e, index, 'titulo')}
                        />
                      ) : (
                        libro.titulo
                      )}
                    </Td>
                    <Td>
                      {libroEditado === index ? (
                        <input
                          type="text"
                          value={libro.caratula || ''} // Asegúrate de manejar el caso de carátula nula
                          onChange={(e) => manejarCambio(e, index, 'caratula')}
                        />
                      ) : (
                        libro.caratula ? <Image src={`data:image/jpeg;base64,${(libro.caratula)}`} alt={libro.titulo} width={50} height={75} /> : 'Sin Carátula'
                      )}
                    </Td>
                    <Td>
                      {libroEditado === index ? (
                        <input
                          type="text"
                          value={libro.autores}
                          onChange={(e) => manejarCambio(e, index, 'autores')}
                        />
                      ) : (
                        libro.autores
                      )}
                    </Td>
                    <Td>
                      {libroEditado === index ? (
                        <input
                          type="text"
                          value={Array.isArray(libro.tags) ? libro.tags.join(', ') : ''} 
                          onChange={(e) => manejarCambio(e, index, 'tags')}
                        />
                      ) : (
                        Array.isArray(libro.tags) ? libro.tags.join(', ') : ''
                      )}
                    </Td>
                    <Td>
                      {libroEditado === index ? (
                        <input
                          type="text"
                          value={libro.donante}
                          onChange={(e) => manejarCambio(e, index, 'donante')}
                        />
                      ) : (
                        libro.donante
                      )}
                    </Td>
                    <Td>
                      {libroEditado === index ? (
                        <input
                          type="text"
                          value={libro.fecha_donacion ? new Date(libro.fecha_donacion).toLocaleDateString() : ''} 
                          onChange={(e) => manejarCambio(e, index, 'fecha_donacion')}
                        />
                      ) : (
                        libro.fecha_donacion ? new Date(libro.fecha_donacion).toLocaleDateString() : ''
                      )}
                    </Td>
                    <Td>
                      {libroEditado === index ? (
                        <input
                          type="text"
                          value={libro.prestado ? 'Prestado' : 'Disponible'}
                          onChange={(e) => manejarCambio(e, index, 'prestado')}
                        />
                      ) : (
                        libro.prestado ? 'Prestado' : 'Disponible'
                      )}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={9}>No hay libros disponibles</Td>
                </Tr>
              )}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}