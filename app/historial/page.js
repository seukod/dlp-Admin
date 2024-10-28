"use client";
import React, { useState } from 'react'; 
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
                <Th></Th>

              </Tr>
            </Thead>
            <Tbody>
        
            </Tbody>
            <Tfoot>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
