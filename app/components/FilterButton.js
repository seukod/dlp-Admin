// FilterButton.js
'use client';
import { forwardRef, useStyleConfig, omitThemingProps } from '@chakra-ui/react';
import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';

const FilterButton = ({ onSort }) => {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="teal" mt={4}>
        Ordenar / Filtrar
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSort('titulo', 'asc')}>
          Ordenar por Título (A-Z)
        </MenuItem>
        <MenuItem onClick={() => onSort('titulo', 'desc')}>
          Ordenar por Título (Z-A)
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => onSort('fecha', 'reciente')}>
          Ordenar por Fecha (Más Reciente)
        </MenuItem>
        <MenuItem onClick={() => onSort('fecha', 'antiguo')}>
          Ordenar por Fecha (Más Antiguo)
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FilterButton;
