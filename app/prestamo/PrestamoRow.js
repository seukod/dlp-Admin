'use client';
import React from 'react';
import { Tr, Td } from '@chakra-ui/react';
import EditButton from '@/app/components/EditButton';

const PrestamoRow = ({
  prestamo,
  index,
  editarPrestamo,
  prestamoEditado,
  manejarCambio,
}) => {
  const enEdicion = prestamoEditado === index;

  return (
    <Tr key={index}>
      <Td>
        <EditButton
          onClick={() => editarPrestamo(index)}
          isEditing={enEdicion}
        />
      </Td>
      <Td>{prestamo.id}</Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={prestamo.libro}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'libro')}
          />
        ) : (
          prestamo.libro
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={prestamo.fechaPrestamo}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'fechaPrestamo')}
          />
        ) : (
          prestamo.fechaPrestamo
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={prestamo.fechaDevolucion}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'fechaDevolucion')}
          />
        ) : (
          prestamo.fechaDevolucion
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={prestamo.fechaLimite}
            className="camposEdit"
            onChange={(e) => manejarCambio(e, index, 'fechaLimite')}
          />
        ) : (
          prestamo.fechaLimite
        )}
      </Td>

      <Td>{prestamo.estado}</Td>
      <Td>{prestamo.asunto}</Td>
    </Tr>
  );
};

export default PrestamoRow;
