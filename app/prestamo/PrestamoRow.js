'use client';
import React, { useState } from 'react';
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

  // Estados temporales para los campos en edición
  const [valoresTemporales, setValoresTemporales] = useState({
    fechaPrestamo: prestamo.fechaPrestamo,
    fechaDevolucion: prestamo.fechaDevolucion,
    fechaLimite: prestamo.fechaLimite,
  });
  
    // Manejar cambio en estado temporal
  const manejarCambioTemporal = (campo, valor) => {
    setValoresTemporales((prev) => ({ ...prev, [campo]: valor }));
  };

    // Guardar cambios al dejar de interactuar
  const guardarCambios = (campo) => {
    manejarCambio(valoresTemporales[campo], index, campo);
  };


  return (
    <Tr key={index}>
      <Td>
        <EditButton
          onClick={() => editarPrestamo(index)}
          isEditing={enEdicion}
        />
      </Td>
      <Td>{prestamo.id}</Td>
      <Td>{prestamo.libro}</Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={valoresTemporales.fechaPrestamo}
            className="camposEdit"
            onChange={(e) => manejarCambioTemporal('fechaPrestamo', e.target.value)}
            onBlur={() => guardarCambios('fechaPrestamo')}
          />
        ) : (
          prestamo.fechaPrestamo
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={valoresTemporales.fechaDevolucion}
            className="camposEdit"
            onChange={(e) => manejarCambioTemporal('fechaDevolucion', e.target.value)}
            onBlur ={() => guardarCambios('fechaDevolucion')}
          />
        ) : (
          prestamo.fechaDevolucion
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={valoresTemporales.fechaLimite}
            className="camposEdit"
            onChange={(e) => manejarCambioTemporal('fechaLimite', e.target.value)}
            onBlur={() => guardarCambios('fechaLimite')}
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
