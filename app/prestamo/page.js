'use client';
import React, { useState, useEffect } from 'react';
import EditButton from '@/app/components/EditButton';
import { fetchAndRenderData } from '../miniapi';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import LeftDrawer from '@/app/components/LeftDrawer';
import PrestamoRow from './PrestamoRow';

export default function Home() {
  const [prestamoEditado, setPrestamoEditado] = useState(null);
  const [prestamos, setPrestamos] = useState([]); // Inicializa como un array vacío

  useEffect(() => {
    fetchAndRenderData("API/prestamo").then((data) => {
      if (data && data.prestamos) {
        setPrestamos(data.prestamos);
        setPrestamosFiltrados(data.prestamos);
      } else {
        console.error("Los datos obtenidos no contienen la propiedad 'prestamos':", data);
      }
    });
  }, []);

  console.log(prestamos);

  const [prestamosFiltrados, setPrestamosFiltrados] = useState(prestamos);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'initial',
  });
        
  // useEffect(() => {
  //   const prestamosActualizados = prestamos.map((prestamo) => {
  //     if (prestamo.fechaDevolucion !== "00/00/00" && prestamo.fechaDevolucion !== "") {
  //       // Si hay fecha de devolución, marcar como cerrado y devuelto
  //       prestamo.estado = "cerrado";
  //       prestamo.asunto = "devuelto";
  //     } else if (prestamo.fechaPrestamo !== "00/00/00") {
  //       // Si no hay fecha de devolución pero hay fecha de préstamo
  //       prestamo.estado = "abierto";
  //       if (esFechaLimiteVencida(prestamo.fechaLimite)) {
  //         prestamo.asunto = "atrasado";
  //       } else {
  //         prestamo.asunto = "prestado";
  //       }
  //     } else {
  //       // Si no hay fecha de préstamo
  //       prestamo.estado = "cerrado";
  //       prestamo.asunto = "devuelto";
  //     }
  
  //     return prestamo;
  //   });

  //   setPrestamos(prestamosActualizados);
  //   setPrestamosFiltrados(prestamosActualizados);
  // }, []);

  // funcion que convierte de iso 8601 a DD/MM/AAAA
  const convertirFecha = (fechaISO) => {
    if (!fechaISO) return '';
    
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0'); // Añade 0 al día si es menor a 10
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0, así que sumamos 1
    const año = fecha.getFullYear();
  
    return `${dia}/${mes}/${año}`;
  };
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
    if (prestamoEditado === index) {
      // Si ya estamos editando la misma fila, limpiamos la edición
      setPrestamoEditado(null);
    } else {
      // Si estamos editando una fila nueva, establecemos los valores temporales
      setPrestamoEditado(index);
      setValoresTemporales({
        fecha_prestamo: prestamos[index].fecha_prestamo,
        fecha_devolucion: prestamos[index].fecha_devolucion,
        fecha_limite: prestamos[index].fecha_limite,
      });
    }
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
      // Restaurar el orden original de los datos
      setPrestamosFiltrados(prestamos);
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


  // Estados temporales para los campos en edición
  const [valoresTemporales, setValoresTemporales] = useState({
    fecha_prestamo: '',
    fecha_devuelto: '',
    fecha_limite: '',
  });
  
  // Manejar cambio en estado temporal
  const manejarCambioTemporal = (campo, valor) => {
    setValoresTemporales((prev) => ({ ...prev, [campo]: valor }));
  };
  
  // Guardar cambios al dejar de interactuar
  const guardarCambios = (campo, index) => {
    const nuevoValor = valoresTemporales[campo];
    if (nuevoValor) {
      manejarCambio(nuevoValor, index, campo);
      // Limpiar valores temporales después de guardar
      setValoresTemporales({
        fecha_prestamo: '',
        fecha_devolucion: '',
        fecha_limite: '',
      });
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
                  onClick={() => ordenarLibros('fecha_prestamo')}
                  style={{ cursor: 'pointer' }}
                >
                  Fecha Prestamo {getSortIcon('fecha_prestamo')}
                </Th>
                <Th
                  onClick={() => ordenarLibros('fecha_devuelto')}
                  style={{ cursor: 'pointer' }}
                >
                  Fecha Devolución {getSortIcon('fecha_devuelto')}
                </Th>
                <Th
                  onClick={() => ordenarLibros('fecha_limite')}
                  style={{ cursor: 'pointer' }}
                >
                  Fecha Límite {getSortIcon('fecha_limite')}
                </Th>
                <Th>estado</Th>
                <Th className="esqder">asunto</Th>
              </Tr>
            </Thead>
            <Tbody>
              {prestamos.length === 0 ? (
                <Tr>
                  <Td colSpan={9}>No hay libros disponibles</Td>
                </Tr>
              ) : (
                prestamos.map((prestamo, index) => (
                  <Tr key={index}>
                    <Td>
                      <button onClick={() => editarPrestamo(index)}>Editar</button>
                    </Td>
                    <Td>{prestamo.id}</Td>
                    <Td>{prestamo.libro}</Td>
                    <Td>
                      {prestamoEditado === index ? (
                        <input
                          type="text"
                          value={valoresTemporales.fecha_prestamo || prestamo.fecha_prestamo}
                          className="camposEdit"
                          onChange={(e) => manejarCambioTemporal('fecha_prestamo', e.target.value)}
                          onBlur={() => guardarCambios('fecha_prestamo', index)}
                        />
                      ) : (
                        prestamo.fecha_prestamo
                      )}
                    </Td>
                    <Td>
                      {prestamoEditado === index ? (
                        <input
                          type="text"
                          value={valoresTemporales.fecha_devuelto || prestamo.fecha_devuelto}
                          className="camposEdit"
                          onChange={(e) => manejarCambioTemporal('fecha_devuelto', e.target.value)}
                          onBlur={() => guardarCambios('fecha_devuelto', index)}
                        />
                      ) : (
                        prestamo.fecha_devuelto
                      )}
                    </Td>
                    <Td>
                      {prestamoEditado === index ? (
                        <input
                          type="text"
                          value={valoresTemporales.fecha_limite || prestamo.fecha_limite}
                          className="camposEdit"
                          onChange={(e) => manejarCambioTemporal('fecha_limite', e.target.value)}
                          onBlur={() => guardarCambios('fecha_limite, index')}
                        />
                      ) : (
                        prestamo.fecha_limite
                      )}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}