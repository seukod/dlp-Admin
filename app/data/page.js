'use client'
import { useEffect } from 'react';

const CambiarDatos = () => {
    useEffect(() => {
       

    // Llama a la función para actualizar el libro
        actualizarLibro();
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            color: '#333'
        }}>
            <h1>Hola</h1>
        </div>
    );
};

export default CambiarDatos;