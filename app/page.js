'use client';
import React, { useEffect, useState } from 'react'; // Asegúrate de importar useState
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
  useEffect(() => {
    const librosGuardados = localStorage.getItem('libros');

    // Si no hay libros en localStorage o el array es vacío, usa los datos iniciales
    const librosIniciales = librosGuardados
      ? JSON.parse(librosGuardados)
      : [
          {
            id: '92',
            titulo: 'Un golpe de suerte',
            ISBN: '23483',
            autores: 'Lucho Jara',
            tags: 'comedia',
            donante: 'Francisco',
            fecha: '20/04/2001',
            estado: 'no prestado',
          },
          {
            id: '#88',
            titulo: 'El llamado de mi madre',
            ISBN: '2348123',
            autores: 'Javier Tauler',
            tags: 'romance, BL, horror, acción',
            donante: 'Fosox',
            fecha: '30/02/2024',
            estado: 'prestado',
          },
          {
            id: '#32',
            titulo: 'SOMOS QUINTILLIZAS',
            ISBN: '2348123',
            autores: 'NEGI HARUBA',
            tags: 'cine, comedia',
            donante: 'Angel Leal',
            fecha: '18/09/2024',
            estado: 'No disponible',
          },
          {
            id: '#97',
            titulo: 'Nana',
            ISBN: '2348123',
            autores: 'Ai Yazawa',
            tags: 'drama',
            donante: 'Francisco',
            fecha: '22/07/2024',
            estado: 'no prestado',
          },
          {
            id: '#95',
            titulo: 'Gatos',
            ISBN: '2348123',
            autores: 'Juan Herrera',
            tags: 'comedia',
            donante: 'Franco Alun',
            fecha: '22/06/2023',
            estado: 'no prestado',
          },
        ];

    // Guarda los datos iniciales en caso de que no existan en localStorage
    if (!librosGuardados || librosGuardados === '[]') {
      localStorage.setItem('libros', JSON.stringify(librosIniciales));
    }

    // Cargar los libros en el estado
    setLibros(librosIniciales);
  }, []);

  const [enEdicion, setEnEdicion] = useState(false);
  const [libroEditado, setLibroEditado] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'initial',
  });

  const guardarEnLocalStorage = (nuevosLibros) => {
    localStorage.removeItem('libros');
    localStorage.setItem('libros', JSON.stringify(nuevosLibros));
  };

  const editarLibro = (index) => {
    if (libroEditado === index) {
      setLibroEditado(null); // Si ya está en modo edición, lo desactiva
      setEnEdicion(false); // No hay libros en edición
    } else {
      setLibroEditado(index); // Activa el modo edición para el libro seleccionado
      setEnEdicion(true); // Indica que hay un libro en edición
    }
  };

  const manejarCambio = (e, index, campo) => {
    const nuevosLibros = [...libros];
    nuevosLibros[index][campo] = e.target.value;
    setLibros(nuevosLibros);

    // Guardar en localStorage
    guardarEnLocalStorage(nuevosLibros);
  };

  const ordenarLibros = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'initial';
    }

    setSortConfig({ key, direction });

    if (direction === 'initial') {
      setLibros(JSON.parse(localStorage.getItem('libros')) || libros);
    } else if (key === 'fecha') {
      ordenarFechas(direction);
    } else {
      const librosOrdenados = [...libros].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      setLibros(librosOrdenados);
    }
  };

  const ordenarFechas = (direction) => {
    const librosOrdenados = [...libros].sort((a, b) => {
      const fechaA = new Date(a.fecha.split('/').reverse().join('-'));
      const fechaB = new Date(b.fecha.split('/').reverse().join('-'));
      return direction === 'asc' ? fechaA - fechaB : fechaB - fechaA;
    });
    setLibros(librosOrdenados);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc'
      ? '↑'
      : sortConfig.direction === 'desc'
        ? '↓'
        : '⇅';
  };

  return (
    <>
      <LeftDrawer />
      <h1>CATÁLOGO LIBROS</h1>

      <div className="tabla">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              {enEdicion
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
                  onClick={() => ordenarLibros('donante')}
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
