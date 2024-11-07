"# dlp-Admin"
## Sprint 1
### Tareas

|Actividad|Responsable|Estado(-, en proceso, terminada)|
|---------|----------|---------------------------------|
|crear repositorio para el proyecto|FC,ML|terminada|
|confeccionar mockup de página principal de catalogo|GC|terminada|
|desarrollar prototipo semifuncional,paginas principal historial,prestamo|FH,FC|Terminada|
|Desarrollo de funcionalidades|ML,GC,BP|Terminada|
|Modularización del código |AL|Terminada|
|Botones de edición|FH|Terminada|
|Ordenamiento filas|FC,BP|Terminada|
|Merge Branches |FC,AL| terminada|
|Ajustes Fechas, Ajustes de Page Prestamo| BP,GC | terminada |
|Implementación QR| FC, FH | en proceso|
|Impletación de portadas de libros| GC | en proceso|
|?|?|-|

![image](https://github.com/user-attachments/assets/e331fd73-0083-4c4f-973d-1b5ef2e6daff)

## Sprint 2
(conjunto de actualizaciones de ajustes dentro del Sprint 2 y la clase del 6/11/24)
-Implementacion codigo de generacion de QR del grupo, junto con la presentación de las tablas de libro y prestamos. 
-Acuerdo de colores frios determinados por la clase.
-Concenso del uso de ISBN para la presentación de las portadas.
-Uso del datapicker de chakra/java (Por determinar).
-Uso de botones en la linea superior de las tablas (Prestamos y listado librado) para ordenarlas por Titulo, donante, Autor, fecha de donación/limite/entrega/devolución y estado.
-DropDown para la edición de estado del prestamo del libro (por determinar).
-Gestión del ID del prestamo.
## Casos de presentacion de estado de prestamos

//ABIERTO (Prestamo vigente para revision)
fecha dev nula; fecha actual > fecha limite = atrasado no duvuelto ()
fecha dev nula; fecha actual <= fecha limite = a tiempo no duvuelto ()

//CERRADO (Libro devuelto presenta prestamo ya concluido)
fecha dev > fecha limite = devuelto atrasado  ()
fecha dev <= fecha limite = devuelto a tiempo ()



## Presentacion Paginas Prestamo y Listado del libros 
![image](https://github.com/user-attachments/assets/5f96c438-6f0d-4f34-9e67-058a905b6520)

![image](https://github.com/user-attachments/assets/7922df99-f526-4960-89c5-156ceea718c3)



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




