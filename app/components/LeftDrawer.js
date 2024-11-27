// LeftDrawer.js
'use client';
import { forwardRef, useStyleConfig, omitThemingProps } from '@chakra-ui/react';
import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';

const LeftDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placement = 'left';

  return (
    <>
      <Button
      style={{
        background: 'linear-gradient(180deg, #121219 10%, #5d5889 100%)',
        color: '#fff', // Establece el color del texto en blanco para que sea visible
        border: '0.15vw solid white',
        borderRadius: '2vh',
      }}onClick={onOpen}>
  MENU
</Button> 
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        
        <DrawerContent bg="#2a2b3e"> {/* Aquí cambiamos el fondo */}
          <DrawerHeader borderBottomWidth="1px">ADMIN</DrawerHeader>
          <DrawerBody>
            <Button w="100%" mb={2} as={Link} href="/">
              Libros
            </Button>
            <Button w="100%" mb={2} as={Link} href="/prestamo">
              Préstamo
            </Button>
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LeftDrawer;
