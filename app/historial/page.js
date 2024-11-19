'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import LeftDrawer from '@/app/components/LeftDrawer';
import HistorialRow from './HistorialRow';
import FilterButton from '@/app/components/FilterButton';

export default function HistorialPage() {
  const [historialEditado, setHistorialEditado] = useState(null);
  const [historial, setHistorial] = useState(() => {
    const datosGuardados = localStorage.getItem('historial');
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : [
          {
            id: '#1',
            libro: 'El gran Gatsby',
            usuario: 'Juan Pérez',
            fecha: '01/01/2024',
            estado: 'prestado',
          },
          {
            id: '#2',
            libro: 'Cien años de soledad',
            usuario: 'María López',
            fecha: '05/01/2024',
            estado: 'no prestado',
          },
          {
            id: '#3',
            libro: '1984',
            usuario: 'Carlos Fernández',
            fecha: '10/01/2024',
            estado: 'prestado',
          },
          {
            id: '#4',
            libro: 'El amor en los tiempos del cólera',
            usuario: 'Laura García',
            fecha: '15/01/2024',
            estado: 'no prestado',
          },
        ];
  });

  const [historialFiltrado, setHistorialFiltrado] = useState(historial);

  useEffect(() => {
    localStorage.setItem('historial', JSON.stringify(historial));
  }, [historial]);

  const editarHistorial = (index) => {
    if (historialEditado === index) {
      setHistorialEditado(null); // Desactivar edición si ya está activa
    } else {
      setHistorialEditado(index); // Activar edición para la fila seleccionada
    }
  };

  const aplicarFiltro = (filtro) => {
    if (filtro === '') {
      setHistorialFiltrado(historial); // Mostrar todos
    } else {
      const historialFiltrado = historial.filter(
        (item) => item.estado === filtro
      );
      setHistorialFiltrado(historialFiltrado);
    }
  };

  const aplicarOrdenamiento = (campo, orden) => {
    const ordenado = [...historialFiltrado].sort((a, b) => {
      if (campo === 'titulo') {
        return orden === 'asc'
          ? a.libro.localeCompare(b.libro)
          : b.libro.localeCompare(a.libro);
      } else if (campo === 'fecha') {
        return orden === 'reciente'
          ? new Date(b.fecha) - new Date(a.fecha)
          : new Date(a.fecha) - new Date(b.fecha);
      }
      return 0;
    });
    setHistorialFiltrado(ordenado);
  };

  return (
    <>
      <LeftDrawer />
      <h1>HISTORIAL</h1>
      <FilterButton
        onSort={aplicarOrdenamiento}
        onFilter={aplicarFiltro}
      />{' '}
      {/* Aquí se usa el botón de filtro */}
      <div className="tabla">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Haga click en el lápiz para editar</TableCaption>
            <Thead>
              <Tr>
                <Th className="esqizq"></Th>
                <Th>ID</Th>
                <Th>Libro</Th>
                <Th>Usuario</Th>
                <Th>Fecha</Th>
                <Th className="esqder">Estado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {historialFiltrado.map((item, index) => (
                <HistorialRow
                  key={index}
                  historial={item}
                  index={index}
                  editarHistorial={editarHistorial}
                  historialEditado={historialEditado}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
