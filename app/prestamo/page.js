'use client';
import React, { useState, useEffect } from 'react';
import { fetchAndRenderData } from '.app/miniapi';
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
import PrestamoRow from './PrestamoRow';

export default function Home() {
  const [prestamoEditado, setPrestamoEditado] = useState(null);
  const [prestamos, setPrestamos] = useState(() => {
    const datosGuardados = localStorage.getItem('prestamos');


    useEffect(() => {
      fetchAndRenderData("API/libro").then((data) => setLibros(data));
    }, []);
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : [
          {
            id: '#92',
            libro: 'Un golpe de suerte',
            usuario: 'Lucho Jara',
            fechaPrestamo: '00/00/00',
            fechaDevolucion: '00/00/00',
            fechaLimite: '20/04/2001',
            estado: 'c',
            asunto: 'prestado',
          },
          {
            id: '#88',
            libro: 'El llamado de mi madre',
            usuario: 'Javier Tauler',
            fechaPrestamo: '00/00/00',
            fechaDevolucion: '00/00/00',
            fechaLimite: '30/02/2024',
            estado: 'c',
            asunto: 'prestado',
          },
          {
            id: '#32',
            libro: 'SOMOS QUINTILLIZAS',
            usuario: 'NEGI HARUBA',
            fechaPrestamo: '00/00/00',
            fechaDevolucion: '00/00/00',
            fechaLimite: '18/09/2024',
            estado: 'c',
            asunto: 'prestado',
          },
          {
            id: '#97',
            libro: 'Nana',
            usuario: 'Ai Yazawa',
            fechaPrestamo: '00/00/00',
            fechaDevolucion: '00/00/00',
            fechaLimite: '22/07/2024',
            estado: 'c',
            asunto: 'prestado',
          },
          {
            id: '#95',
            libro: 'Gatos',
            usuario: 'Juan Herrera',
            fechaPrestamo: '00/00/00',
            fechaDevolucion: '00/00/00',
            fechaLimite: '00/00/00',
            estado: 'c',
            asunto: 'prestado',
          },
        ];
  });

  const [prestamosFiltrados, setPrestamosFiltrados] = useState(prestamos);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'initial',
  });

  useEffect(() => {
    const prestamosActualizados = prestamos.map((prestamo) => {
      if (prestamo.fechaDevolucion !== "00/00/00" && prestamo.fechaDevolucion !== "") {
        // Si hay fecha de devolución, marcar como cerrado y devuelto
        prestamo.estado = "cerrado";
        prestamo.asunto = "devuelto";
      } else if (prestamo.fechaPrestamo !== "00/00/00") {
        // Si no hay fecha de devolución pero hay fecha de préstamo
        prestamo.estado = "abierto";
        if (esFechaLimiteVencida(prestamo.fechaLimite)) {
          prestamo.asunto = "atrasado";
        } else {
          prestamo.asunto = "prestado";
        }
      } else {
        // Si no hay fecha de préstamo
        prestamo.estado = "cerrado";
        prestamo.asunto = "devuelto";
      }
  
      return prestamo;
    });
  

    setPrestamos(prestamosActualizados);
    localStorage.setItem('prestamos', JSON.stringify(prestamosActualizados));
    setPrestamosFiltrados(prestamosActualizados);

    {
      /*localStorage.clear();  por si se necesita borrar el localStorage*/
    }
  }, []);
  const esFechaValida = (fecha) => {

    if (fecha === "00/00/0000") return true
    const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/; // Formato DD/MM/AAAA
    if (!regexFecha.test(fecha)) return false; // Verifica formato
    
    const [dia, mes, año] = fecha.split('/').map(Number); // Divide en partes numéricas
    const fechaObjeto = new Date(año, mes - 1, dia); // Crea el objeto Date (mes empieza en 0)
  
    // Verifica que los valores originales coincidan con los del objeto Date
    return (
      fechaObjeto.getFullYear() === año &&
      fechaObjeto.getMonth() === mes - 1 &&
      fechaObjeto.getDate() === dia
    );
  };
  
  const esFechaLimiteVencida = (fechaLimite) => {
    const [dia, mes, año] = fechaLimite.split('/');
    const fecha = new Date(`${año}-${mes}-${dia}`);
    const fechaActual = new Date();
    return fecha < fechaActual;
  };

  const editarPrestamo = (index) => {
    setPrestamoEditado(prestamoEditado === index ? null : index);
  };

  const manejarCambio = (nuevoValor, index, campo) => {
    if (
      (campo === 'fechaPrestamo' || campo === 'fechaDevolucion' || campo === 'fechaLimite') &&
      !esFechaValida(nuevoValor)
    ) {
      alert('La fecha ingresada no es válida. Por favor, usa el formato DD/MM/AAAA.');
      return; // Detener si la fecha no es válida
    }
    
    const nuevosPrestamos = [...prestamos];
    nuevosPrestamos[index][campo] = nuevoValor;

    if (campo === 'fechaDevolucion') {
      //Cambiar estado al marcar devolución
      if (nuevoValor !== '00/00/00') {
        nuevosPrestamos[index].estado = 'cerrado';
        nuevosPrestamos[index].asunto = 'devuelto';
      }
    }
    //Cambiar estado al marcar fecha límite
    if(campo === 'fechaLimite'){
      if (esFechaLimiteVencida(nuevoValor)){
        nuevosPrestamos[index].estado = 'abierto';
        nuevosPrestamos[index].asunto = 'prestado' 
      }
      else{
        nuevosPrestamos[index].estado = 'abierto'
        nuevosPrestamos[index].asunto = 'atrasado'
      }
    }
    setPrestamos(nuevosPrestamos);
    localStorage.setItem('prestamos', JSON.stringify(nuevosPrestamos));
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
      const prestamosGuardados =
        JSON.parse(localStorage.getItem('prestamos')) || prestamos;
      setPrestamos(prestamosGuardados);
      setPrestamosFiltrados(prestamosGuardados);
    } else {
      const prestamosOrdenados = [...prestamos].sort((a, b) => {
        if (key.includes('fecha')) {
          const fechaA = new Date(a[key].split('/').reverse().join('-'));
          const fechaB = new Date(b[key].split('/').reverse().join('-'));
          return direction === 'asc' ? fechaA - fechaB : fechaB - fechaA;
        } else {
          if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
          if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
          return 0;
        }
      });
      setPrestamos(prestamosOrdenados);
      setPrestamosFiltrados(prestamosOrdenados);
    }
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
      <h1>PRESTAMOS</h1>
      <div className="tabla">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Haga click en el lápiz para editar</TableCaption>
            <Thead>
              <Tr>
                <Th className="esqizq"></Th>
                <Th>ID</Th>
                <Th
                  onClick={() => ordenarLibros('libro')}
                  style={{ cursor: 'pointer' }}
                >
                  Libro {getSortIcon('libro')}
                </Th>
                <Th
                  onClick={() => ordenarLibros('fechaPrestamo')}
                  style={{ cursor: 'pointer' }}
                >
                  Fecha Prestamo {getSortIcon('fechaPrestamo')}
                </Th>
                <Th
                  onClick={() => ordenarLibros('fechaDevolucion')}
                  style={{ cursor: 'pointer' }}
                >
                  Fecha Devolución {getSortIcon('fechaDevolucion')}
                </Th>
                <Th
                  onClick={() => ordenarLibros('fechaLimite')}
                  style={{ cursor: 'pointer' }}
                >
                  Fecha Límite {getSortIcon('fechaLimite')}
                </Th>
                <Th>estado</Th>
                <Th className="esqder">asunto</Th>
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