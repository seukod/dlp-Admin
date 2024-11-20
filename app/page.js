'use client';
//catalogo
import React, { useState, useEffect } from 'react';
import { fetchAndRenderData } from './API/miniapi'; 
import Image from 'next/image';
import Link from 'next/link'; // Importa Link
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
            {/* Botones en lugar de texto */}
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
  const apiUrl = 'https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json&jscmd=data';

  useEffect(() => {
    const fetchLibros = async () => {
      const apiData = await fetchAndRenderData(apiUrl);
      if (apiData) {
        setLibros(apiData); // Asumiendo que fetchAndRenderData retorna los datos procesados
        localStorage.setItem('libros', JSON.stringify(apiData)); // Guarda los datos en localStorage
      }
    };

    fetchLibros();
  }, []);

  const manejarCambio = (e, index, campo) => {
    const nuevosLibros = [...libros];
    nuevosLibros[index][campo] = e.target.value;
    setLibros(nuevosLibros);
    localStorage.setItem('libros', JSON.stringify(nuevosLibros)); // Actualiza localStorage
  };

  const editarLibro = (index) => {
    setLibroEditado(libroEditado === index ? null : index);
  };

  const getSortIcon = (campo) => {
    // Implementa la lógica para obtener el ícono de ordenamiento
    return '⇅'; // Cambia esto según tu lógica de ordenamiento
  };

  const ordenarLibros = (campo) => {
    // Implementa la lógica para ordenar los libros
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

      <div className="tabla">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              {libroEditado !== null
                ? 'Presione en el tick para guardar'
                : 'Haga click en el lápiz para editar'}
            </TableCaption>
            <Thead>
              <Tr>
                <Th className="esqizq"></Th>
                <Th className="segcolumna">ID</Th>
                <Th
                  onClick={() => ordenarLibros('titulo')}
                  style={{ cursor: 'pointer' }}
                >
                  Título {getSortIcon('titulo')}
                </Th>
                <Th>ISBN</Th>
                <Th
                  onClick={() => ordenarLibros('autores')}
                  style={{ cursor: 'pointer' }}
                >
                  Autores {getSortIcon('autores')}
                </Th>
                <Th>Tags</Th>
                <Th
                  onClick={()=> ordenarLibros('donante')}
                  style={{ cursor: 'pointer' }}
                >
                  Donante {getSortIcon('donante')}
                </Th>
                <Th
                  onClick={() => ordenarLibros('fecha')}
                  style={{ cursor: 'pointer' }}
                >
                  Fecha de donación {getSortIcon('fecha')}
                </Th>
                <Th>GenerarQR</Th>
                <Th
                  className="esqder"
                  onClick={() => ordenarLibros('estado')}
                  style={{ cursor: 'pointer' }}
                >
                  Estado {getSortIcon('estado')}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {libros.map((libro, index) => (
                <Tr key={index}>
                  <Td className="columnalapiz">
                    <Button
                      onClick={() => editarLibro(index)}
                      p={2}
                      w="auto" //ajusta automaticamente al contenido
                      h="auto" //ajusta automaticamente al contenido
                    >
                      <Image
                        src={
                          libroEditado === index
                            ? '/tick-icon.png'
                            : '/lapiz.png'
                        }
                        alt="Lápiz"
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
                        className="camposEdit"
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
                        value={libro.ISBN}
                        className="camposEdit"
                        onChange={(e) => manejarCambio(e, index, 'ISBN')}
                      />
                    ) : (
                      libro.ISBN
                    )}
                  </Td>
                  <Td>
                    {libroEditado === index ? (
                      <input
                        type="text"
                        value={libro.autores}
                        className="camposEdit"
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
                        value={libro.tags}
                        className="camposEdit"
                        onChange={(e) => manejarCambio(e, index, 'tags')}
                      />
                    ) : (
                      libro.tags
                    )}
                  </Td>
                  <Td>
                    {libroEditado === index ? (
                      <input
                        type="text"
                        value={libro.donante}
                        className="camposEdit"
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
                        value={libro.fecha}
                        className="camposEdit"
                        onChange={(e) => manejarCambio(e, index, 'fecha')}
                      />
                    ) : (
                      libro.fecha
                    )}
                  </Td>
                  <Td>
                    <Button
                      w="100%"
                      mb={2}
                      as={Link}
                      href={`/qr?id=${libro.id}`}
                    >
                      Generar QR
                    </Button>
                  </Td>
                  <Td>
                    {libroEditado === index ? (
                      <input
                        type="text"
                        value={libro.estado}
                        className="camposEdit"
                        onChange={(e) => manejarCambio(e, index, 'estado')}
                      />
                    ) : (
                      libro.estado
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>

            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}