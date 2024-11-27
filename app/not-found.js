import Link from 'next/link';

// Esto es una página de error 404 personalizada
// Solo debemos crear un archivo not-found.js en la carpeta pages y Next.js lo detectará automáticamente

function Error404() {
  return (
    <div
      style={{
        fontFamily:
          "system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
        textAlign: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container-404-general">
        <h1 className="title-404">404</h1>
        <div className="container-404">
          <h2 className="text">This page could not be found</h2>
          <Link href="/" className="btn">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error404;
