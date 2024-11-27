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
    fecha_prestamo: prestamo.fecha_prestamo,
    fecha_devolucion: prestamo.fecha_devolucion,
    fecha_limite: prestamo.fecha_limite,
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
      <Td>{prestamo.id_libro}</Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={valoresTemporales.fecha_prestamo}
            className="camposEdit"
            onChange={(e) => manejarCambioTemporal('fecha_prestamo', e.target.value)}
            onBlur={() => guardarCambios('fecha_prestamo')}
          />
        ) : (
          prestamo.fecha_prestamo
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={valoresTemporales.fecha_devolucion}
            className="camposEdit"
            onChange={(e) => manejarCambioTemporal('fecha_devolucion', e.target.value)}
            onBlur ={() => guardarCambios('fecha_devolucion')}
          />
        ) : (
          prestamo.fecha_devolucion
        )}
      </Td>
      <Td>
        {enEdicion ? (
          <input
            type="text"
            value={valoresTemporales.fecha_limite}
            className="camposEdit"
            onChange={(e) => manejarCambioTemporal('fecha_limite', e.target.value)}
            onBlur={() => guardarCambios('fecha_limite')}
          />
        ) : (
          prestamo.fecha_limite
        )}
      </Td>

      <Td>prestamo.estado</Td>
      <Td>prestamo.asunto</Td>  
    </Tr>
  );
};

export default PrestamoRow;
