"use client";
import React, { useState, useEffect } from 'react'; 
import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer } from '@chakra-ui/react';
import LeftDrawer from '@/app/components/LeftDrawer';
import PrestamoRow from './PrestamoRow'; 

export default function Home() {
  const [prestamoEditado, setPrestamoEditado] = useState(null);
  const [prestamos, setPrestamos] = useState(() => {
    const datosGuardados = localStorage.getItem('prestamos');
    return datosGuardados ? JSON.parse(datosGuardados) : [
      { id: '#92', libro: 'Un golpe de suerte', usuario: 'Lucho Jara', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '20/04/2001', estado: 'c',asunto:'prestado' },
      { id: '#88', libro: 'El llamado de mi madre', usuario: 'Javier Tauler', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '30/02/2024', estado: 'c', asunto:'prestado'},
      { id: '#32', libro: 'SOMOS QUINTILLIZAS', usuario: 'NEGI HARUBA', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '18/09/2024', estado: 'c', asunto:'prestado'},
      { id: '#97', libro: 'Nana', usuario: 'Ai Yazawa', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '22/07/2024', estado: 'c', asunto:'prestado' },
      { id: '#95', libro: 'Gatos', usuario: 'Juan Herrera', fechaPrestamo: '00/00/00', fechaDevolucion: '00/00/00', fechaLimite: '00/00/00', estado: 'c', asunto:'prestado' },
    ];
  });


  const [prestamosFiltrados, setPrestamosFiltrados] = useState(prestamos);

  useEffect(() => {
    const prestamosActualizados = prestamos.map(prestamo => {
      if (prestamo.fechaPrestamo !== '00/00/00') {
        prestamo.estado = 'abierto';
        if (esFechaLimiteVencida(prestamo.fechaLimite)) {
          prestamo.asunto = 'atrasado' ;
        } else {
          prestamo.asunto = 'prestado';
        }
      } else {
        prestamo.estado = 'cerrado';
        prestamo.asunto = ''
      }

      return prestamo;
    });

    setPrestamos(prestamosActualizados);
    localStorage.setItem('prestamos', JSON.stringify(prestamosActualizados));
    setPrestamosFiltrados(prestamosActualizados);


    {/*localStorage.clear();  por si se necesita borrar el localStorage*/}


  }, []);

  const esFechaLimiteVencida = (fechaLimite) => {
    const [dia, mes, año] = fechaLimite.split('/');
    const fecha = new Date(`${año}-${mes}-${dia}`);
    const fechaActual = new Date();
    return fecha < fechaActual;
  };

  const editarPrestamo = (index) => {
    setPrestamoEditado(prestamoEditado === index ? null : index);
  };

  const manejarCambio = (e, index, campo) => {
    const nuevosPrestamos = [...prestamos];
    nuevosPrestamos[index][campo] = e.target.value;
  
    if (campo === 'fechaDevolucion') {
      const nuevaFechaDevolucion = e.target.value;
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(nuevaFechaDevolucion)) {
        if (esFechaLimiteVencida(nuevaFechaDevolucion)) {
          nuevosPrestamos[index].estado = 'cerrado';
          nuevosPrestamos[index].asunto = 'atrasado';
        } else {
          nuevosPrestamos[index].estado = 'abierto';
          nuevosPrestamos[index].asunto = 'prestado';
        }
      } else {
        nuevosPrestamos[index].estado = 'cerrado';
        nuevosPrestamos[index].asunto = '';
      }
    }
  
    if (campo === 'fechaPrestamo') {
      const nuevaFechaPrestamo = e.target.value;
      if (nuevaFechaPrestamo === '00/00/0000') {
        nuevosPrestamos[index].estado = 'cerrado';
        nuevosPrestamos[index].asunto = ''; // Vacío si la fecha es '00/00/0000'
      } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(nuevaFechaPrestamo)) {
        nuevosPrestamos[index].estado = 'abierto';
        nuevosPrestamos[index].asunto = 'prestado';
      } else {
        nuevosPrestamos[index].estado = 'cerrado';
        nuevosPrestamos[index].asunto = ''; // Vacío si la fecha no es válida
      }
    }
  
    setPrestamos(nuevosPrestamos);
    localStorage.setItem('prestamos', JSON.stringify(nuevosPrestamos)); 
  };
  

  return (
    <>
      <LeftDrawer />
      <h1>PRESTAMOS</h1>
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
                <Th>estado</Th>
                <Th className='esqder'>asunto</Th>
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
