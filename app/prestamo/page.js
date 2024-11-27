'use client';
import { cambioAPI, cambioAPIp } from '../miniapi';
import React, { useState, useEffect } from 'react';
import EditButton from '@/app/components/EditButton';
import { fetchAndRenderData } from '../miniapi';
import Image from 'next/image';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
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
        
  // Función para convertir fechas de ISO 8601 a DD/MM/AAAA
  const convertirFechaEdit = (fechaISO) => {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  // Función para convertir fechas de DD/MM/AAAA a ISO 8601
  const convertirFechaAISO = (fechaDDMMYYYY) => {
    if (!fechaDDMMYYYY) return '';
    const [dia, mes, año] = fechaDDMMYYYY.split('/').map(Number);
    return new Date(año, mes - 1, dia).toISOString();
  };
  const esFechaValida = (fecha) => {
    const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/; // Formato DD/MM/AAAA
    if (!regexFecha.test(fecha)) return false; // Verifica el formato

    const [dia, mes, año] = fecha.split('/').map(Number); // Divide la fecha en partes numéricas

    // Verifica que no sea "00/00/0000"
    if (dia === 0 && mes === 0 && año === 0) return false;

    const fechaObjeto = new Date(año, mes - 1, dia); // Crea un objeto Date para validación

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
      setPrestamoEditado(null); // Cierra la edición si ya está en modo edición
    } else {
      setPrestamoEditado(index); // Activa la edición para este índice
      setValoresTemporales({
        fecha_prestamo: convertirFechaEdit(prestamos[index].fecha_prestamo),
        fecha_devuelto: convertirFechaEdit(prestamos[index].fecha_devuelto),
        fecha_limite: convertirFechaEdit(prestamos[index].fecha_limite),
      });
    }
  };
  const obtenerEstadoPrestamo = (fechaDevolucion, fechaLimite) => {
    // Si la fecha de devolución es diferente de null, el estado es "devuelto"
    if (fechaDevolucion) {
      return 'devuelto';
    }
  
    // Si la fecha límite es mayor que la fecha actual, el estado es "prestado"
    const fechaLimiteArray = fechaLimite.split('/');
    const fechaLimiteDate = new Date(`${fechaLimiteArray[2]}-${fechaLimiteArray[1]}-${fechaLimiteArray[0]}`);
    const fechaActual = new Date();
  
    if (fechaLimiteDate > fechaActual) {
      return 'prestado';
    }
  
    // Si la fecha límite ha pasado, el estado es "atrasado"
    return 'atrasado';
  };
  const manejarCambio = (nuevoValor, index, campo) => {
    const nuevosPrestamos = [...prestamos];
    nuevosPrestamos[index][campo] = convertirFechaAISO(nuevoValor);
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
        if (key.includes('fecha')&& a[key] != null && b[key] != null) {
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
  const guardarCambios = async (campo, index) => {
    
    const nuevoValor = valoresTemporales[campo];
    if (nuevoValor && esFechaValida(nuevoValor)) {
      manejarCambio(nuevoValor, index, campo);
    } else {
      alert('Por favor, ingresa una fecha válida.');
    }
    setValoresTemporales({ fecha_prestamo: '', fecha_devuelto: '', fecha_limite: '' });
    const prestamoActuaizado ={
      id : prestamos[index].id,
      id_libro: prestamos[index].id_libro,
      usuario: prestamos[index].usuario,
      fecha_prestamo: prestamos[index].fecha_prestamo,
      fecha_devuelto: prestamos[index].fecha_devuelto,
      fecha_limite: prestamos[index].fecha_limite,
      borrado: prestamos[index].borrado
    }
    try {
      console.log('Enviando actualización del libro:', );
      await cambioAPIp(prestamoActuaizado, '/API/prestamo'); // Llamada a la función PUT
  
      
  
      console.log('Libro actualizado correctamente en el frontend.');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
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
                <Th></Th>
                <Th className="esqizq">ID Prestamo</Th>
                <Th>Id libro</Th>
                
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
                <Th className="esqder">estado</Th>
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
                    <Button onClick={() => editarPrestamo(index)}>
                      <Image
                        src={prestamoEditado === index ? '/tick-icon.png' : '/lapiz.png'}
                        alt={prestamoEditado === index ? 'Guardar' : 'Editar'}
                        width={22}
                        height={22}
                      />
                    </Button>
                    </Td>
                    <Td>{prestamo.id}</Td>
                    <Td>{prestamo.id_libro}</Td>
                    
                    <Td>
                      {prestamoEditado === index ? (
                        <input
                          type="text"
                          value={valoresTemporales.fecha_prestamo || convertirFechaEdit(prestamo.fecha_prestamo)}
                          className="camposEdit"
                          onChange={(e) => manejarCambioTemporal('fecha_prestamo', e.target.value)}
                          onBlur={() => guardarCambios('fecha_prestamo', index)}
                        />
                      ) : (
                        convertirFechaEdit(prestamo.fecha_prestamo)
                      )}
                    </Td>
                    <Td>
                      {prestamoEditado === index ? (
                        <input
                          type="text"
                          value={valoresTemporales.fecha_devuelto || convertirFechaEdit(prestamo.fecha_devuelto)}
                          className="camposEdit"
                          onChange={(e) => manejarCambioTemporal('fecha_devuelto', e.target.value)}
                          onBlur={() => guardarCambios('fecha_devuelto', index)}
                        />
                      ) : (
                        convertirFechaEdit(prestamo.fecha_devuelto)
                      )}
                    </Td>
                    <Td>
                      {prestamoEditado === index ? (
                        <input
                          type="text"
                          value={valoresTemporales.fecha_limite || convertirFechaEdit(prestamo.fecha_limite)}
                          className="camposEdit"
                          onChange={(e) => manejarCambioTemporal('fecha_limite', e.target.value)}
                          onBlur={() => guardarCambios('fecha_limite', index)}
                        />
                      ) : (
                        convertirFechaEdit(prestamo.fecha_limite)
                      )}
                    </Td>

                    <Td>{obtenerEstadoPrestamo(prestamo.fecha_devuelto, prestamo.fecha_limite)}</Td>
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