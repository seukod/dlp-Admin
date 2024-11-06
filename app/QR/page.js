"use client";

import { useSearchParams } from 'next/navigation';
import QRCode from 'react-qr-code';
import { useRef } from 'react';

export default function QRPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 12; //esto deja 0 si no hay id, osea que mientras no tenemos las variables del api
  //hay que eliminarlo una vez tengamos todo lo de la api andando
  const linkqr = `https://dlp.com/donacion/${id}`;
  const qrRef = useRef();

  // funcion para descargar qr, no tocar nada
  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const size = 256;
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      const png = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = png;
      link.download = `codigo-qr-libroid-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>¡Gracias por tu donación!</h1>
      <div ref={qrRef} style={{ marginBottom: '20px' }}>
        <QRCode value={linkqr} size={256} style={{border: "5px solid black"}} />
      </div>
      <p style={{ fontSize: '14px', color: '#666' }}>Descarga e imprime este código para pegarlo en tu libro. Id de tu libro: {id}</p>
      <button 
        onClick={downloadQR} 
        style={{ padding: '10px 20px', marginTop: '20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Descarga tu código QR
      </button>
    </div>
  );
}