# Creación de una Api-Rest Node.js y Express

## Marco Express
Es una opción perfectamente válida en aplicaciones web más pequeñas. Si una aplicación aumenta de tamaño, un marco como Express puede ayudarle a crear la arquitectura de una manera escalable.


¿Por qué usar Express como marco para la próxima aplicación?

- Características de calidad: Express tiene un conjunto de características que le permiten ser rápido y productivo.

- Sin complejidad: Express prescinde de conceptos complicados como, las secuencias, y, por tanto, hace que toda la experiencia de desarrollo sea mucho más fácil.

- Solución de problemas web comunes: Express ayuda a solucionar problemas comunes, como la administración de rutas, el almacenamiento en caché y el redireccionamiento.

- Confianza de millones de desarrolladores: según GitHub, en la actualidad 6,8 millones de desarrolladores usan Express para sus aplicaciones web.

[Enlace documentación expresjs](https://expressjs.com/)


## Administración de rutas en Express
Cuando un cliente realiza una solicitud de una aplicación web, usa una dirección URL, es decir, una dirección que apunta a un servidor concreto. Una dirección URL puede tener el aspecto siguiente:
~~~
http://localhost:3000/products
~~~
El término localhost de la URL hace referencia a su equipo. En una dirección URL más orientada a producción, posiblemente el término localhost se sustituya por un nombre de dominio como microsoft.com. La parte final de la dirección URL es la ruta. Decide a qué lugar concreto del servidor dirigirse. En este caso, la ruta es /products.

En el marco Express se usan la dirección URL, la ruta y verbos HTTP para la administración de rutas. Los verbos HTTP como post, put y get describen lo que el cliente quiere realizar. Cada verbo HTTP tiene un significado específico para lo que debería ocurrir con los datos. Express ayuda a registrar rutas y a emparejarlas con los verbos HTTP adecuados para organizar la aplicación web.

Express dispone de métodos dedicados para administrar distintos verbos HTTP y un sistema inteligente para asociar diferentes rutas con otras partes del código. En el ejemplo siguiente, Express le ayuda a controlar las solicitudes dirigidas a una ruta con la dirección /products asociada con el verbo HTTP get:
```javascript
    app.get('/products', (req, res) => {
    // handle the request
    })
```
Express ve get hacia /products de forma distinta a post hacia /products, como se muestra en el ejemplo de código siguiente:
```javascript
    app.get('/products', (req, res) => {
        // handle the request
    })

    app.post('/products', (req, res) => {
        // handle the request
    })
```
El verbo HTTP get significa que un usuario quiere leer datos. El verbo HTTP post significa que un usuario quiere escribir datos. Tiene sentido dividir la aplicación para que distintos emparejamientos de verbo y ruta ejecuten otras partes del código. Más adelante en el módulo se profundizará en este tema.

## Servicio de tipos de contenido diferentes
Express admite muchos formatos de contenido diferentes que se pueden devolver a un cliente que realiza la llamada. El objeto res incluye un conjunto de funciones auxiliares para devolver distintos tipos de datos. Para devolver texto sin formato, tendría que usar el método send() de esta forma:

```javascript
    res.send('plain text')
```
Para otros tipos de datos, como JSON, existen métodos dedicados que garantizan el tipo de contenido y las conversiones de datos correctos. Para devolver JSON en Express, use el método json() de esta forma:
```javascript
    res.json({ id: 1, name: "Catcher in the Rye" })
```
El método de código de Express anterior equivale a este código de módulo HTTP:
```javascript
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ id: 1, name: "Catcher in the Rye" }))
```
Se establece el encabezado Content-Type en HTTP y la respuesta también se convierte de un objeto JavaScript a una versión de cadena JSON antes de devolverla al cliente que realiza la llamada.

Si se comparan los dos ejemplos de código, puede ver que, al usar métodos auxiliares para tipos de archivo comunes, como JSON y HTML, con Express se evita tener que escribir algunas líneas.

## Creación de una aplicación Express
Para empezar a desarrollar una aplicación de Node.js con el marco Express, debemos instalarlo como una dependencia. También se recomienda inicializar primero un proyecto de Node.js para que las dependencias descargadas terminen en el archivo package.json. Esta recomendación es general para cualquier aplicación desarrollada para el runtime de Node.js.

## Pasos
Siga estos pasos para crear una aplicación web con el marco Express:

1. Cree una instancia de la aplicación: cree una instancia de una aplicación web. En este momento, la instancia no se puede ejecutar, pero tiene algo que se puede ampliar.
```javascript
    import express from "express";

    export default class Server{
        constructor(){
            this.port = 3000;
            this.app = express();
        }

        start(){
            this.app.listen(this.port,()=>{
                console.log("Server running at http://localhost:"+this.port);
            })
        }
    }

    const server = new Server();
    server.start();
```

2. Defina rutas y controladores de ruta: defina a qué rutas debe escuchar la aplicación. Una ruta forma parte de la dirección URL. Por ejemplo, en la dirección URL http://localhost:8000/products, el elemento de ruta es http://localhost:8000/products. Express usa otras rutas para ejecutar diferentes fragmentos de código. Otros ejemplos de rutas son /, que también se conoce como la ruta predeterminada, y /. Las rutas se explorarán con más detalle en una sección posterior de este módulo.

```javascript
    import express from "express";

    export default class Server{
        constructor(){
            this.port = 3000;
            this.app = express();
            this.initRoute();
        }
        // agregando rutas
        initRoute(){
            this.app.use("/",(req,res)=>{
                res.send("hola mundo")
            })
        }

        start(){
            this.app.listen(this.port,()=>{
                console.log("Server running at http://localhost:"+this.port);
            })
        }
    }
```



3. Configure el middleware: el middleware es un fragmento de código que se puede ejecutar antes o después de una solicitud. También puede usar middleware para controlar la autenticación y la autorización, o bien para agregar una funcionalidad a la aplicación.

```javascript
    import express from "express";

    export default class Server{
        constructor(){
            this.port = 3000;
            this.app = express();
            this.setMiddleware();
            this.initRoute();
        }
        //configurando middlewares
        setMiddleware(){    
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: false }));
            this.app.use(express.static(path.join(__dirname, 'public')));
        }


        // agregando rutas
        initRoute(){
            this.app.use("/",(req,res)=>{
                res.send("hola mundo")
            })
        }

        start(){
            this.app.listen(this.port,()=>{
                console.log("Server running at http://localhost:"+this.port);
            })
        }
    }

    const server = new Server();
    server.start();
```

4. Inicie la aplicación: defina un puerto y, después, indique a la aplicación que escuche en ese puerto. La aplicación ya está lista para recibir solicitudes.

```javascript
    const server = new Server();
    server.start();
```

# Practica 
Desarrollar un api-rest de contactos con los siguientes requerimientos.
1. Modulo de contactos: 
   Datos:
   - nombre (id autoincrementable)
   - apellido
   - direccion
   - número teléfono
   - fecha de nacimiento
   - correo electrónico
   - uri avatar
   - url perfil social.

   operaciones:
    - crear nuevo contacto.
    - obtener todos los contactos(solo nombres).
    - obtner detalles de un contacto.
    - actulizar un contacto.
    - eliminar un contacto.

2. Modulo de usuario
    Datos:
    - Usuario(id autoincremetable)
    - Correo electronico
    - contraseña

    operaciones:
    - crear usuario
    - Autenticación
    - Actualizar contraseña
    - Eliminar un usuario.# clase30-03-2022
