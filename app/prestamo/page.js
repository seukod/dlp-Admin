// Home.js
"use client";
import React, { useState, useEffect } from 'react'; 
import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer } from '@chakra-ui/react';
import LeftDrawer from '@/app/components/LeftDrawer';
import PrestamoRow from './PrestamoRow'; 
import FilterButton from '@/app/components/FilterButton';

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

  const [prestamosFiltrados, setPrestamosFiltrados] = useState(prestamos);

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
    return sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '⇅';
  };

  
  useEffect(() => {
    // Actualiza el estado de libros al iniciar la pagina
    const prestamosActualizados = prestamos.map(prestamo => {
      if (esFechaLimiteVencida(prestamo.fechaLimite)) {
        return { ...prestamo, estado: 'Cerrado' };
      }
      else {
        return { ...prestamo, estado: 'Abierto' };
      }
      return prestamo;
    });
  
    setPrestamos(prestamosActualizados);
    localStorage.setItem('prestamos', JSON.stringify(prestamosActualizados));
    setPrestamosFiltrados(prestamosActualizados);
  }, []);
  

  const esFechaLimiteVencida = (fechaLimite) => {
    const [dia, mes, año] = fechaLimite.split('/');
    const fecha = new Date(`${año}-${mes}-${dia}`); // Convertir a yyyy-mm-dd
    const fechaActual = new Date();
    return fecha < fechaActual;
  };


  const editarPrestamo = (index) => {
    if (prestamoEditado === index) {
      setPrestamoEditado(null);
    } else {
      setPrestamoEditado(index);
    }
  };

  const manejarCambio = (e, index, campo) => {
    const nuevosPrestamos = [...prestamos];
    nuevosPrestamos[index][campo] = e.target.value;

    if (campo === 'fechaLimite') {
      const nuevaFechaLimite = e.target.value;
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(nuevaFechaLimite) ) {
        if (esFechaLimiteVencida(nuevaFechaLimite)){
        nuevosPrestamos[index].estado = 'Abierto';}
        else{
          nuevosPrestamos[index].estado = 'Cerrado';
        }
      } else {
        nuevosPrestamos[index].estado = 'fecha incorrecta';
      }
    }
    setPrestamos(nuevosPrestamos);
  };

  const aplicarFiltro = (filtro) => {
    if (filtro === '') {
      setPrestamosFiltrados(prestamos);
    } else {
      const prestamosFiltrados = prestamos.filter(prestamo => prestamo.estado === filtro);
      setPrestamosFiltrados(prestamosFiltrados);
    }
  };

  const ordenarPrestamos = (campo, direccion) => {
    let prestamosOrdenados = [...prestamos];

    if (campo === 'libro') {
      prestamosOrdenados.sort((a, b) => {
        return direccion === 'asc' ? a.libro.localeCompare(b.libro) : b.libro.localeCompare(a.libro);
      });
    } else if (campo === 'fechaLimite') {
      prestamosOrdenados.sort((a, b) => {
        const fechaA = new Date(a.fechaLimite.split('/').reverse().join('-'));
        const fechaB = new Date(b.fechaLimite.split('/').reverse().join('-'));
        return direccion === 'reciente' ? fechaB - fechaA : fechaA - fechaB;
      });
    }

    setPrestamos(prestamosOrdenados);
  };

  return (
    <>
      <LeftDrawer />
      <h1>PRESTAMOS</h1>

      {/*<FilterButton onSort={ordenarPrestamos} onFilter={aplicarFiltro} />*/}

      <div className='tabla'>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Haga click en el lápiz para editar</TableCaption>
            <Thead>
              <Tr>
                <Th className='esqizq'></Th>
                <Th>ID</Th>
                <Th>Libro</Th>
                <Th>Fecha Préstamo</Th>
                <Th>Fecha Devolución</Th>
                <Th>Fecha Límite</Th>
                <Th className='esqder'>Estado</Th>
              </Tr>
            </Thead>
            <Tbody> 
              {prestamosFiltrados.map((prestamo, index) => (
                <PrestamoRow
                  key={index}
                  prestamo={prestamo}
                  index={index}
                  editarPrestamo={editarPrestamo}
                  prestamoEditado={prestamoEditado}
                  manejarCambio={manejarCambio}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
