# Comfort++
The energy-coach-remake app but for the web. With a brand new UI and focused on what our project is really about. Made with Reactjs and styled with TailwindCSS.

This is part of a final degree project done by Andrés Cedeño and Angelo Sanchez for the ESCUELA SUPERIOR POLITECNICA DEL LITORAL.  

## Generalidades

El repositorio viene con 3 servicios, la página web y dos APIs de Nodejs. Una que permite la comunicación MQTT con la raspberry del LST y la otra para servir la página en la máquina virtual.

### Librerias usadas

Para construir la interfaz se utilizó la librería React, utilizando una herramienta de compilación llamada Vite que tiene como objetivo proporcionar una experiencia de desarrollo más rápida y ágil para proyectos web modernos, con otros paquetes de Nodejs para hacer gráficos, tener logos e imágenes y conectar directamente con Firebase.

Firebase es la herramienta que utilizamos para el backend, ya que no necesita de mucho para ser configurada. **Sin embargo, una vez que el proyecto se ha continuado por otros estudiantes vamos a dar de baja el servicio** ya que cuesta una suscripción mensual dependiendo del uso. Lo que sugerimos para reemplazar esta herramienta es crear una API REST con Nodejs y Express, conectarla a una base de datos MongoDB y a partir de ahí a replicar lo que teníamos en Firebase.

Para generar la comunicación entre la página web en el módulo administrador y la Raspberry Pi se creó una API que utiliza un paquete de Nodejs que permite la comunicación MQTT, es decir publicar y suscribirse a un tema de un broker MQTT.

Para servir la página web hay que compilarla, de forma que todos los módulos escritos en cosas diferentes a HTML, CSS y Javascript, sean compilados a ellos, ya que el navegador solo entiende estos 3 lenguajes. A partir de esto servir la página en una máquina virtual requeriría de montar un servidor web dentro de ella como Apache o algún otro parecido, sin embargo tomaría mucho trabajo, por lo que haciendo uso del conocimiento obtenido de Nodejs y Express, se creó un microservicio que sirve los archivos estáticos de la página web y se Dockerizo de forma que pueda correr como proceso en segundo plano.

### Estructura del proyecto

La carpeta raíz tiene el proyecto de React principal en la ruta [./src](./src). Aquí se encuentran todos los componentes, estilos y más de nuestra página web. Si el proyecto se compila (de lo cual hablaremos más adelante), los archivos se guardan en una carpeta en la ruta [./dist](./dist).

El servicio MQTT está en la ruta [./servicioMqtt](./servicioMqtt). Este sólo consta de archivos de Javascript.

En la ruta [./servidor2](./servidor2) se encuentra el código del servidor que entrega la página cuando uno accede a su enlace. dentro de la carpeta hay un directorio public que es donde están los archivos compilados de nuestra aplicación y un script de Javascript que levante el servidor y da la ruta para acceder a la página.

## Inntrucciones

### Para levantar la página web en modo desarrollo

Si se desea seguir desarrollando funcionalidades en la página web, cambiar algunos aspectos, mejorarla, etc., basta con copiar el repositorio o descargarlo y ejecutar los siguientes comandos.

Primero se deben instalar las dependencias del proyecto base:

```
npm install
```

Para levantar la página y exponerla a la red local, usar el siguiente comando:

```
npm run dev
```
Con esto se se generará un enlace con el cual se podrá acceder a la página web. Todos los cambios que se hagan al código fuente se verán reflejados en la página después de guardar los cambios hechos en el archivo que se está editando.

El empaquetador está configurado para que al levantar el servidor web automáticamente sea accesible a la red local, si se desea aislarla, se debe comentar la línea 11 del archivo `vite.config.js`, o en su lugar cambiar su valor a falso:

```javascript
host: false
```
Una vez que la pagina esta levantada, cualquier persona puede ingresar con el usuario y contraseña *estudiante*. En el dashboard de estudiante, lo único que pueden hacer es votar por el estado de confort que sientan en el momento. 

Para acceder al dashboard de admin, se necesitan otras credenciales, las cuales serán compartidas con personas del LST. En el dashboard de admin, además de votar, se puede prender y apagar el aire y cambiar su temperatura. Pero para que esto funcione, se debe levantar el servicio MQTT, ya que la Raspberry esta suscrita a un tema para escuchar estos cambios, por lo que se debe publicar en él. 

### Para levantar el servicio MQTT para desarrollo

Se creo una aplicación a parte, ya que el paquete de Nodejs `mqtt` no tiene una buena integración con Vite, el empaquetador. En cambio con un pequeño script ejecutado en Nodejs, funcionó a la perfección. Entonces para comunicar ambas aplicaciones, cree una pequeña API con Expressjs, de forma que cada vez que se cambie el estado del aire, se haga un llamado POST al servicio, enviando el código que corresponde a la acción. La API recibe este código y corre las funciones correspondientes para publicar en el tema a través de MQTT.

Para levantar este servicio, desde el directorio raíz del proyecto se debe acceder al directorio `./servicioMqtt`. Una vez en él, ejecutar los comandos:

```
npm i
npm start
```
El primero para instalar las dependencias y el segundo para ejecutar el servicio.

Con estos pasos es suficiente para poder seguir desarrollando la página web, recomendamos revisar la documentación de React, Vite y el resto de herramientas que hemos usado y de otras que vayan a ser implementadas para una buena integración.

## Detalles de la implementación

La implementación tiene un problema y es que la comunicación entre la página web y el broker MQTT de la Raspberry se nos dificultó debido las políticas de seguridad que tiene la Universidad.

El dashboard de estudiante interactúa únicamente con Firebase, por lo que funcionará independientemente de si está o no presente el servicio MQTT.

En cambio, para que las funcionalidades exclusivas del dashboard de administrador funcionen, se debe si o si levantar el servicio MQTT. Aun así, existe la posibilidad de que no funcione. Por esto, en esta sección detallaré las condiciones necesarias para que todo funcione correctamente

### Condiciones necesarias
Todo funcionará bien en 2 escenarios:
1. Se levanta la página y el servicio MQTT en la red local del LST, es decir, en la que está conectada la Raspberry
2. Se levanta la página y el servicio MQTT en una red fuera de la ESPOL.

Veamos por qué. El primero es bastante fácil de deducir, si todo está en la red local, la comunicación entre los componentes es sencilla. 

El segundo escenario es un poco más complicado y la causa no lo tengo tan claro ni yo (Cedeño). Lo que pasa es que el broker MQTT esta alojado en la Raspberry, por lo que no es accesible desde una red remota. Para solucionar esto, decidimos usar un servicio llamado _Ngrok_, que otorga una IP pública (en forma de URL) al puerto del servicio para poder accederlo desde cualquier lugar. Esto no permite de manera efectiva utilzar la aplicación web desde cualquier lugar

Ahora, ¿qué sucede con las redes dentro de ESPOL? Según lo que entendí, como la universidad tiene su propio DNS, este no puede traducir la URL de _ngrok_ a IP y es por eso que no podemos acceder al broker alojado en la Raspberry desde ninguna computadora del LST.

Entonces, dependiendo de en qué red nos encontremos, hay que hacer una configuración en el siguiente archivo [mqttConfig.js](./servicioMqtt/mqttConfig.js) en la linea 1, dependiendo de la red que nos encontremos.

En el escenario 1:
```javascript
const url = "mqtt://${ipRaspberry}:1883";
```

En el escenario 2:
```javascript
const url = "mqtt://${ipNgrok}:${puertoNgrok}";
```

Todos estos valores son accesibles desde la Raspberry.

Por último, recalcamos que el inconveniente es únicamente la comunicación entre la página web y la Raspberry Pi, sin embargo, el cambio de temperatura que se da por el algoritmo de inteligencia artificial no tiene ningún problema, ya que se ejecuta directamente en la Raspberry Pi.

Como solución a esta limitación se podría implementar un broker MQTT en la nube, nunca exploramos en esa posibilidad porque ya era tarde en el desarrollo del proyecto, pero para alguien que retome esto podría ser interesante.


## Puesta en producción de la página web
### NOTA
**Antes de dockerizar, realizar los cambios correspondientes al servicio Mqtt, dependiendo del escenario que se este trabajando. O simplemente ignorar esa funcionalidad :D**

Para poner en producción la página web se nos hizo entrega de una máquina virtual con un puerto abierto: 7201. La máquina virtual tiene una IP pública, pero solo puede ser accedida dentro de la VPN de ESPOL. El detalle de la IP y demás cosas lo pondremos en el manual de usuario. Para saber cómo conectarse a VPN de ESPOL dejo el siguiente enlace: https://www.serviciosti.espol.edu.ec/filesManuales/manual-VPN-para-Windows.pdf

El servidor se correrá con Docker para que puede ser levantado en cualquier lado y además se pueda correr como un proceso en segundo plano. Independientemente de donde se requiera levantar la página yo recomendaría utilizar Linux ya que en este OS Docker funciona tanto en línea de comandos como de manera gráfica.

Entonces, el primer paso para poner la página web en producción sería correr el siguiente comando:


```
npm run build
```
Esto como mencioné al inicio del manual, creará una carpeta dist con los archivos que si puede leer el navegador. El contenido de esta carpeta debería ser copiado en la carpeta public del servidor es decir en la ruta: `./servidor2/public`.

Muy bien, con esto simplemente hay que ingresar al código del servidor que ya tiene un Dockerfile listo para generar la imagen. 

Nos aseguramos estar en la ruta  `./servidor2` y ejecutamos el siguiente comando para la imagen:
```
docker build -t [any name] .
```

Ahora levantamos el contenedor a partir de la imagen, en el puerto 7201:
```
docker run --rm -d -p 7201:7201 --name [nombre del contendor] [nombre de la imagen]
```
El argumento *–rm* significa que el contenedor será borrado una vez que se lo pare con el comando `docker stop`. La opción *-d* (detach) indica a Docker que el programa se ejecute en segundo plano, de forma que si se cierra esa línea de comandos aún se puede acceder a la página.

Comandos útiles para revisar el estado de las imagenes creadas y contenedores activos:
```
docker images
docker ps
```

## Casos comunes (Troubleshooting)

### La máquina virtual se apago o se reinicio y ya no se puede acceder a la página

Entrar a la VM y ver si la imagen sigue creada con (lo más probable es que si):
```
docker images
```

Revisar si hay contenedores activos (lo más probable es que no haya):
```
docker ps
```

Pues si no esta el contendor volver a correr el comando de `docker run` con sus argumentos y opciones para volver a levantar la página.

**Iré poniendo más casos de ser necesario.**
