// HistorialRow.js
'use client';
import React from 'react';
import { Tr, Td } from '@chakra-ui/react';
import EditButton from '@/app/components/EditButton';

const HistorialRow = ({
  historial,
  index,
  editarHistorial,
  historialEditado,
  manejarCambio,
}) => {
  const enEdicion = historialEditado === index;

  return (
    <Tr key={index}>
      <Td>
        <EditButton
          onClick={() => editarHistorial(index)}
          isEditing={enEdicion}
        />
      </Td>
      <Td>{historial.id}</Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={historial.libro}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'libro')}
          />
        ) : (
          historial.libro
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={historial.usuario}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'usuario')}
          />
        ) : (
          historial.usuario
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={historial.fechaPrestamo}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'fechaPrestamo')}
          />
        ) : (
          historial.fechaPrestamo
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={historial.fechaDevolucion}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'fechaDevolucion')}
          />
        ) : (
          historial.fechaDevolucion
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={historial.estado}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'estado')}
          />
        ) : (
          historial.estado
        )}
      </Td>
    </Tr>
  );
};

export default HistorialRow;
