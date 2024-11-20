'use client';
import React, { useState, useEffect } from 'react';
import { fetchAndRenderData } from './API/miniapi'; 
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

function LeftDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placement = 'left';

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        MENU
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">ADMIN</DrawerHeader>
          <DrawerBody>
            <Button w="100%" mb={2} as={Link} href="/">
              Libros
            </Button>
            <Button w="100%" mb={2} as={Link} href="/prestamo">
              Préstamo
            </Button>
            <Button w="100%" mb={2} as={Link} href="/historial">
              Historial de actividades
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function Home() {
  const [libros, setLibros] = useState([]);
  const [libroEditado, setLibroEditado] = useState(null);
  
  // Cambia el ID aquí según sea necesario
  const apiUrl = 'https://dlp-api.vercel.app/libros?id=2'; // Reemplaza '1' con el ID que deseas

  const fetchLibros = async () => {
    try {
      const librosGuardados = localStorage.getItem('libros');
      if (librosGuardados) {
        setLibros(JSON.parse(librosGuardados));
        return; // No realiza el fetch si hay datos locales
      }
      const apiData = await fetchAndRenderData(apiUrl);
      console.log(apiData); // Verifica la respuesta de la API
      if (apiData && apiData.libros) {
        setLibros(apiData.libros);
        localStorage.setItem('libros', JSON.stringify(apiData.libros)); // Guarda datos iniciales
      } else {
        console.error("No se encontraron libros en la respuesta de la API");
      }
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    }
  };
  
  
  useEffect(() => {
    fetchLibros();
  }, []);
  useEffect(() => {
    console.log(libros); // Monitorea el estado de libros cada vez que cambia
  }, [libros]);

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
            {libros.length > 0 ? (
              libros.map((libro, index) => (
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
                        value={libro.caratula} // Cambié ISBN por carátula
                        onChange={(e) => manejarCambio(e, index, 'caratula')}
                      />
                    ) : (
                      libro.caratula // Cambié ISBN por carátula
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
                        value={libro.tags.join(', ')} // Asegúrate de que los tags se muestren correctamente
                        onChange={(e) => manejarCambio(e, index, 'tags')}
                      />
                    ) : (
                      libro.tags.join(', ') // Asegúrate de que los tags se muestren correctamente
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
                        value={new Date(libro.fecha_donacion).toLocaleDateString()} // Formatea la fecha
                        onChange={(e) => manejarCambio(e, index, 'fecha_donacion')}
                      />
                    ) : (
                      new Date(libro.fecha_donacion).toLocaleDateString() // Formatea la fecha
                    )}
                  </Td>
                  <Td>
                    {libroEditado === index ? (
                      <input
                        type="text"
                        value={libro.prestado ? 'Prestado' : 'Disponible'} // Muestra el estado
                        onChange={(e) => manejarCambio(e, index, 'prestado')}
                      />
                    ) : (
                      libro.prestado ? 'Prestado' : 'Disponible' // Muestra el estado
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