"use client";
import React, { useState } from 'react'; // Asegúrate de importar useState
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';

function LeftDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placement = 'left';

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>
        MENU
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>ADMIN</DrawerHeader>
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
const [libros, setLibros] = useState(() => {
  const librosGuardados = localStorage.getItem('libros');
  return librosGuardados ? JSON.parse(librosGuardados) : [
    { id: '#92', titulo: 'Un golpe de suerte', autores: 'Lucho Jara', tags: 'comedia', donante: 'Francisco', fecha: '20/04/2001', estado: 'no prestado' },
    { id: '#88', titulo: 'El llamado de mi madre', autores: 'Javier Tauler', tags: 'romance, BL, horror, acción', donante: 'Fosox', fecha: '30/02/2024', estado: 'prestado' },
    { id: '#32', titulo: 'SOMOS QUINTILLIZAS', autores: 'NEGI HARUBA', tags: 'cine, comedia', donante: 'Angel Leal', fecha: '18/09/2024', estado: 'No disponible' },
    { id: '#97', titulo: 'Nana', autores: 'Ai Yazawa', tags: 'drama', donante: 'Francisco', fecha: '22/07/2024', estado: 'no prestado' },
    { id: '#95', titulo: 'Gatos', autores: 'Juan Herrera', tags: 'comedia', donante: 'Franco Alun', fecha: '22/06/2023', estado: 'no prestado' },
  ];
});

  const [libroEditado, setLibroEditado] = useState(null);

  const editarLibro = (index) => {
    if (libroEditado === index) {
      setLibroEditado(null); // Si ya está en modo edición, lo desactiva
    } else {
      setLibroEditado(index); // Activa el modo edición para el libro seleccionado
    }
  };

  const manejarCambio = (e, index, campo) => {
    const nuevosLibros = [...libros];
    nuevosLibros[index][campo] = e.target.value;
    setLibros(nuevosLibros);
    
    // Guardar en localStorage
    localStorage.setItem('libros', JSON.stringify(nuevosLibros));
  };

  const ordenarPorTituloAZ = () => {
    const librosOrdenados = [...libros].sort((a, b) => a.titulo.localeCompare(b.titulo));
    setLibros(librosOrdenados);
  };

  const ordenarPorTituloZA = () => {
    const librosOrdenados = [...libros].sort((a, b) => b.titulo.localeCompare(a.titulo));
    setLibros(librosOrdenados);
  };

  const ordenarPorFechaReciente = () => {
    const librosOrdenados = [...libros].sort((a, b) => new Date(b.fecha.split('/').reverse().join('-')) - new Date(a.fecha.split('/').reverse().join('-')));
    setLibros(librosOrdenados);
  };

  const ordenarPorFechaAntiguo = () => {
    const librosOrdenados = [...libros].sort((a, b) => new Date(a.fecha.split('/').reverse().join('-')) - new Date(b.fecha.split('/').reverse().join('-')));
    setLibros(librosOrdenados);
  };

  return (
    <>
      <LeftDrawer />
      <h1>CATALOGO LIBROS</h1>
      
      <div className='tabla'>
        
        <Menu>
          <MenuButton as={Button} colorScheme='teal' mt={4}>
            Ordenar / Filtrar
          </MenuButton>
          <MenuList>
            <MenuItem onClick={ordenarPorTituloAZ}>Ordenar por Título (A-Z)</MenuItem>
            <MenuItem onClick={ordenarPorTituloZA}>Ordenar por Título (Z-A)</MenuItem>
            <MenuDivider />
            <MenuItem onClick={ordenarPorFechaReciente}>Ordenar por Fecha (Más Reciente)</MenuItem>
            <MenuItem onClick={ordenarPorFechaAntiguo}>Ordenar por Fecha (Más Antiguo)</MenuItem>
            {/* Puedes agregar más opciones aquí */}
          </MenuList>
        </Menu>

        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Haga click en el lápiz para editar</TableCaption>
            <Thead>
              <Tr>
                <Th className='esqizq'></Th>
                <Th>ID</Th>
                <Th>Título</Th>
                <Th>Autores</Th>
                <Th>Tags</Th>
                <Th>Donante</Th>
                <Th>Fecha de donación</Th>
                <Th className='esqder'>Estado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {libros.map((libro, index) => (
                <Tr key={index}>
                  <Td>
                    <Button onClick={() => editarLibro(index)}>
                      <Image 
                        src="/lapiz.png"  // Referencia al ícono de lápiz
                        alt="Lápiz"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </Td>
                  <Td>{libro.id}</Td> {/* ID no es editable */}
                  <Td>
                    {libroEditado === index ? (
                      <input 
                        type="text" 
                        value={libro.titulo}
                        className='camposEdit'
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
                        value={libro.autores}
                        className='camposEdit'
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
                        className='camposEdit'
                        onChange={(e) => manejarCambio(e, index, 'tags')}
                      />
                    ) : (
                      libro.tags
                    )}
                  </Td>

                  <Td>
                    {libroEditado === index ? (
                      <input
                        type='text'
                        value={libro.donante}
                        className='camposEdit'
                        onChange={(e) => manejarCambio(e, index, 'donante')}
                      />
                    ) : (
                      libro.donante
                    )}
                    </Td>
                  <Td>
                    {libroEditado === index ? (
                       <input 
                       type='text'
                       value={libro.fecha}
                       className='camposEdit'
                       onChange={(e) => manejarCambio(e, index, 'estado')}
                       />
                    ) : (
                      libro.fecha
                    )}
                    </Td>
                  <Td>
                    {libroEditado === index ? (
                      <input 
                      type='text'
                      value={libro.estado}
                      className='camposEdit'
                      onChange={(e) => manejarCambio(e, index, 'fecha')}
                      />
                    ):(
                      libro.estado
                    )}
                    </Td>
                </Tr>
            ))}
            </Tbody>
            <Tfoot>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
