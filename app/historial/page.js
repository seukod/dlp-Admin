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
  TableContainer
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
  const [modoEdicion, setModoEdicion] = useState(false);
  
  const toggleModoEdicion = () => {
      setModoEdicion(!modoEdicion);
  };

  return (
    <>
      <LeftDrawer />
      <h1>HISTORIAL</h1>
      
      <div className='tabla'>
        <Button onClick={toggleModoEdicion}>
          <Image 
            src="/lapiz.png"  // Aquí se refiere a la imagen en public
            alt="Lápiz"
            width={20}
            height={20}
          />
        </Button>
        <div className={`modoedicion ${modoEdicion ? 'activo' : ''}`}>
          {modoEdicion ? "Modo Edición Activo" : "Modo Edición Inactivo"}
        </div>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Haga click en el lápiz para editar</TableCaption>
            <Thead>
              <Tr>
                <Th className='esqizq'>ID</Th>
                <Th>Título</Th>
                <Th>Autores</Th>
                <Th>Tags</Th>
                <Th>Donante</Th>
                <Th>Fecha de donación</Th>
                <Th className='esqder'>Estado</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>#92</Td>
                <Td>Un golpe de suerte</Td>
                <Td>Lucho Jara</Td>
                <Td>comedia</Td>
                <Td>Francisco</Td>
                <Td>20/04/2001</Td>
                <Td>no prestado</Td>
              </Tr>
              <Tr>
                <Td>#88</Td>
                <Td>El llamado de mi madre</Td>
                <Td>Javier Tauler</Td>
                <Td>romance, BL, horror, acción</Td>
                <Td>Fosox</Td>
                <Td>30/02/2024</Td>
                <Td>prestado</Td>
              </Tr>
              <Tr>
                <Td>#32</Td>
                <Td>SOMOS QUINTILLIZAS</Td>
                <Td>NEGI HARUBA</Td>
                <Td>cine, comedia</Td>
                <Td>Angel Leal</Td>
                <Td>18/09/2024</Td>
                <Td>No disponible</Td>
              </Tr>
              <Tr>
                <Td>#97</Td>
                <Td>Nana</Td>
                <Td>Ai Yazawa</Td>
                <Td>drama</Td>
                <Td>Francisco</Td>
                <Td>22/07/2024</Td>
                <Td>no prestado</Td>
              </Tr>
              <Tr>
                <Td>#95</Td>
                <Td>Gatos</Td>
                <Td>Juan Herrera</Td>
                <Td>comedia</Td>
                <Td>Franco Alun</Td>
                <Td>22/06/2023</Td>
                <Td>no prestado</Td>
              </Tr>
            </Tbody>
            <Tfoot>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
