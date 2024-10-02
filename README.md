"# dlp-Admin"
## Sprint 1
### Tareas

|Actividad|Responsable|Estado(-, en proceso, terminada)|
|---------|----------|---------------------------------|
|crear repositorio para el proyecto|FC,ML|terminada|
|confeccionar mockup de página principal de catalogo|GC|terminada|
||?|-|
|desarrollar prototipo semifuncional|?|-|

![image](https://github.com/user-attachments/assets/e331fd73-0083-4c4f-973d-1b5ef2e6daff)
# Sistema de Administración de Libros

## Funcionalidades del Admin

### Pestaña 1: Información General del Libro

| ID       | TÍTULO           | ESTADO     |
|----------|------------------|------------|
| 1011001  | /Titulo_Generico/ | /Prestado/   |
| ...      | ...              | ...        |
- **Botones**: Dentro de la tabla los / " " / elementos redireccionan a la Pestaña 2 y 3 respectivamente
  - **Rojo**: Prestado
  - **Verde**: Disponible
  - **Amarillo**: Extraviado o Irregular

### Pestaña 2: Detalles del Libro

| Campo           | Información                 |
|-----------------|-----------------------------|
| **ID**          | "ID del libro"              |
| **Título**      | "Título del libro"          |
| **Autores**     | "Autor/es del Libro"        |
| **Tags**        | "Género, tipo de libro, etc."|
| **Donante**     | "Nombre del donador del libro"|
| **FechaDonación** | "Fecha del primer ingreso del libro a la Biblioteca" |
| **Estado**      | "Estado actual del libro: En biblioteca, prestado, irregular" |

### Pestaña 3: Información del Préstamo

| Campo             | Información                        |
|-------------------|------------------------------------|
| **Título**        | "Título del libro prestado"        |
| **ID**            | "ID del libro prestado"            |
| **Usuario**       | "Usuario al que se le prestó el libro" |
| **FechaPréstamo** | "Fecha de retiro del libro"        |
| **FechaDevolución** | "Última fecha de devolución"     |
| **Estado**        | "Estado actual del libro: En biblioteca, prestado, irregular" |


## Retroalimentacion de Clase 02/10/2024

-**Comentarios**: No hemos definidos el historial de actividades, devido a la no definicion de los logs.

Acomodar los campos de la pestaña Prestamo, ademas los siguientes casos.
Ordenar por fecha de los prestamos en forma descendente
Evitar de un prestamo prestado, devuelto y siga en la pestaña prestamo.
Evitar si tiene prestamos anteriores no cerrado. (Consitencia en el guardado de los estados en toda su ocupación)
Hay libros que pueden no estar en la biblioteca pero siguen en la base de datos, para tener una consistencia de su presencia en su historial.




