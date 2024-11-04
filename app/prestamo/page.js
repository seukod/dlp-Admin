"use client";
import React, { useState, useEffect } from 'react'; 
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
      <Button colorScheme='blue' onClick={onOpen}>
        MENU
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>ADMIN</DrawerHeader>
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
  const [prestamoEditado, setPrestamoEditado] = useState(null);
  const [prestamos, setPrestamos] = useState(() => {
    const datosGuardados = localStorage.getItem('prestamos');
    return datosGuardados ? JSON.parse(datosGuardados) : [
      { id: '#92', libro: 'Un golpe de suerte', usuario: 'Lucho Jara', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '20/04/2001', estado: 'no prestado' },
      { id: '#88', libro: 'El llamado de mi madre', usuario: 'Javier Tauler', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '30/02/2024', estado: 'prestado' },
      { id: '#32', libro: 'SOMOS QUINTILLIZAS', usuario: 'NEGI HARUBA', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '18/09/2024', estado: 'No disponible' },
      { id: '#97', libro: 'Nana', usuario: 'Ai Yazawa', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '22/07/2024', estado: 'no prestado' },
      { id: '#95', libro: 'Gatos', usuario: 'Juan Herrera', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '22/06/2023', estado: 'no prestado' },
    ];
  });

  useEffect(() => {
    // Guardar en localStorage cada vez que se actualiza el estado de prestamos
    localStorage.setItem('prestamos', JSON.stringify(prestamos));
  }, [prestamos]);

  const editarPrestamo = (index) => {
    if (prestamoEditado === index) {
      setPrestamoEditado(null); // Desactivar edición si ya está activa
    } else {
      setPrestamoEditado(index); // Activar edición para la fila seleccionada
    }
  };

  const manejarCambio = (e, index, campo) => {
    const nuevosPrestamos = [...prestamos];
    nuevosPrestamos[index][campo] = e.target.value;
    setPrestamos(nuevosPrestamos);
  };

  return (
    <>
      <LeftDrawer />
      <h2>PRESTAMOS</h2>

      <div className='tabla'>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Haga click en el lápiz para editar</TableCaption>
            <Thead>
              <Tr>
                <Th className='esqizq'></Th>
                <Th>ID</Th>
                <Th>Libro</Th>
                <Th>Usuario</Th>
                <Th>Fecha Préstamo</Th>
                <Th>Fecha Devolución</Th>
                <Th>Fecha Límite</Th>
                <Th className='esqder'>Estado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {prestamos.map((prestamo, index) => (
                <Tr key={index}>
                  <Td>
                    <Button onClick={() => editarPrestamo(index)}>
                      <Image 
                        src="/lapiz.png"  // Referencia al ícono de lápiz
                        alt="Lápiz"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </Td>
                  <Td>{prestamo.id}</Td>
                  <Td>
                    {prestamoEditado === index ? (
                      <input
                        type='text'
                        value={prestamo.libro}
                        className='camposEdit'
                        onChange={(e) => manejarCambio(e, index, 'libro')}
                      />
                    ) : (
                      prestamo.libro
                    )}
                  </Td>
                  <Td>
                    {prestamoEditado === index ? (
                      <input
                      type='text'
                      value={prestamo.usuario}
                      className='camposEdit'
                      onChange={(e) => manejarCambio(e, index, 'usuario')}
                      />
                    ) : (
                      prestamo.usuario
                    )}
                  </Td>
                  <Td>
                    {prestamoEditado === index ? (
                      <input
                      type='text'
                      value={prestamo.fechaPrestamo}
                      className='camposEdit'
                      onChange={(e) => manejarCambio(e, index, 'fechaPrestamo')}
                      />
                    ) : ( 
                      prestamo.fechaPrestamo
                    )}
                  </Td>
                  <Td>
                    {prestamoEditado === index ? (
                      <input
                      type='text'
                      value={prestamo.fechaDevolucion}
                      className='camposEdit'
                      onChange={(e) => manejarCambio(e, index, 'fechaDevolucion')}
                      />
                    ) : (
                      prestamo.fechaDevolucion
                    )}
                  </Td>
                  <Td>
                    {prestamoEditado === index ? (
                      <input
                      type='text'
                      value={prestamo.fechaLimite}
                      className='camposEdit'
                      onChange={(e) => manejarCambio(e, index, 'fechaLimite')}
                      />
                    ) : ( 
                      prestamo.fechaLimite
                    )}
                  </Td>
                  <Td>
                    {prestamoEditado === index ? (
                      <input
                      type='text'
                      value={prestamo.estado}
                      className='camposEdit'
                      onChange={(e) => manejarCambio(e, index, 'estado')}
                      />
                    ) : (
                      prestamo.estado
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot />
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
