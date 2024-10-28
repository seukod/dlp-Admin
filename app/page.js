"use client";
import React, { useState } from 'react';
import EditableCell from './Editating';
import LeftDrawer from '@/app/components/LeftDrawer';
import FilterButton from '@/app/components/FilterButton';
import EditButton from '@/app/components/EditButton'; // Importa el nuevo botón de edición
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react';

export default function Catalogo() {
    const [libros, setLibros] = useState(() => {
        const librosGuardados = localStorage.getItem('libros');
        return librosGuardados ? JSON.parse(librosGuardados) : [
            { id: '#92', titulo: 'Un golpe de suerte', autores: 'Lucho Jara', tags: 'comedia', donante: 'Francisco', fecha: '20/04/2001', estado: 'no prestado' },
            { id: '#88', titulo: 'El llamado de mi madre', autores: 'Javier Tauler', tags: 'romance, BL, horror, acción', donante: 'Fosox', fecha: '30/02/2024', estado: 'prestado' },
            { id: '#32', titulo: 'SOMOS QUINTILLIZAS', autores: 'NEGI HARUBA', tags: 'cine, comedia', donante: 'Angel Leal', fecha: '18/09/2024', estado: 'No disponible' },
            { id: '#97', titulo: 'Nana', autores: 'Ai Yazawa', tags: 'drama', donante: 'Francisco', fecha: '22/07/2024', estado: 'no prestado' },
            { id: '#95', titulo: 'Gatos', autores: 'Juan Herrera', tags: 'comedia', donante: 'Franco Alun', fecha: '22/06/2023', estado: 'no prestado' },
        ];
    });

    const [libroEditado, setLibroEditado] = useState(null);
    const [sortConfig, setSortConfig] = useState({ campo: '', direccion: '' });
    const [botonesPulsados, setBotonesPulsados] = useState({});

    const editarLibro = (index) => {
        setLibroEditado(libroEditado === index ? null : index);
        setBotonesPulsados(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const manejarCambio = (e, index, campo) => {
        const nuevosLibros = [...libros];
        nuevosLibros[index][campo] = e.target.value;
        setLibros(nuevosLibros);
        localStorage.setItem('libros', JSON.stringify(nuevosLibros));
    };

    const ordenarLibros = (campo, direccion) => {
        let librosOrdenados;
        if (campo === 'titulo') {
            librosOrdenados = [...libros].sort((a, b) => {
                return direccion === 'asc'
                    ? a.titulo.localeCompare(b.titulo)
                    : b.titulo.localeCompare(a.titulo);
            });
        } else if (campo === 'fecha') {
            librosOrdenados = [...libros].sort((a, b) => {
                return direccion === 'reciente'
                    ? new Date(b.fecha.split('/').reverse().join('-')) - new Date(a.fecha.split('/').reverse().join('-'))
                    : new Date(a.fecha.split('/').reverse().join('-')) - new Date(b.fecha.split('/').reverse().join('-'));
            });
        }
        setLibros(librosOrdenados);
        setSortConfig({ campo, direccion });
    };

    return (
        <>
            <LeftDrawer />
            <h1>Catálogo de libros</h1>
            <FilterButton onSort={ordenarLibros} />
            <div className='tabla'>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Haga clic en el lápiz para editar</TableCaption>
                        <Thead>
                            <Tr>
                                <Th className='esqizq'></Th>
                                <Th>ID</Th>
                                <Th>Título</Th>
                                <Th>Autores</Th>
                                <Th>Tags</Th>
                                <Th>Donante</Th>
                                <Th>Fecha de donación</Th>
                                <Th className='esqder'>Estado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {libros.map((libro, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <EditButton 
                                            onClick={() => editarLibro(index)} 
                                            isEditing={libroEditado === index}
                                        />
                                    </Td>
                                    <Td>{libro.id}</Td> 
                                    <Td>
                                        <EditableCell 
                                            isEditing={libroEditado === index}
                                            value={libro.titulo}
                                            onChange={(e) => manejarCambio(e, index, 'titulo')}
                                        />
                                    </Td>
                                    <Td>
                                        <EditableCell 
                                            isEditing={libroEditado === index}
                                            value={libro.autores}
                                            onChange={(e) => manejarCambio(e, index, 'autores')}
                                        />
                                    </Td>
                                    <Td>
                                        <EditableCell 
                                            isEditing={libroEditado === index}
                                            value={libro.tags}
                                            onChange={(e) => manejarCambio(e, index, 'tags')}
                                        />
                                    </Td>
                                    <Td>
                                        <EditableCell 
                                            isEditing={libroEditado === index}
                                            value={libro.donante}
                                            onChange={(e) => manejarCambio(e, index, 'donante')}
                                        />
                                    </Td>
                                    <Td>
                                        <EditableCell 
                                            isEditing={libroEditado === index}
                                            value={libro.fecha}
                                            onChange={(e) => manejarCambio(e, index, 'fecha')}
                                        />
                                    </Td>
                                    <Td>
                                        <EditableCell 
                                            isEditing={libroEditado === index}
                                            value={libro.estado}
                                            onChange={(e) => manejarCambio(e, index, 'estado')}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}