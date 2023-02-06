# Comfort++
The energy-coach-remake app but for the web. With a brand new UI and focused on what our project is really about. Made with Reactjs and styled with TailwindCSS.

This is part of a final degree project done by Andrés Cedeño and Angelo Sanchez for the ESCUELA SUPERIOR POLITECNICA DEL LITORAL.  

## Instrucciones

El repositorio viene con 2 servicios, la página web y una API de Nodejs que permite la comunicación MQTT con la raspberry del LST.

### Para levantar la página web

Para los propósitos de la materia integradora, no consideramos necesario compilar el código salir a producción. Lo que se hará es otorgar comandos para levantar un servidor de desarrollo, y exponerlo a la red local. Si se desea compilar el código para producción se aconseja visitar la documentación del empaquetador que usamos: https://vitejs.dev/guide/build.html

Primero se deben instalar las dependencias del proyecto base:

```
npm install
```

Para levantar la página y exponerla a la red local, usar el siguiente comando:

```
npm run dev
```
El empaquetador está configurado para que al levantar el servidor web automáticamente sea accesible a la red local, si se desea aislarla, se debe comentar la línea 11 del archivo `vite.config.js`, o en su lugar cambiar su valor a falso:

```javascript
host: false
```
Una vez que la pagina esta levantada, cualquier persona puede ingresar con el usuario y contraseña *estudiante*. En el dashboard de estudiante, lo único que pueden hacer es votar por el estado de confort que sientan en el momento. 

Para acceder al dashboard de admin, se necesitan otras credenciales, las cuales serán compartidas con personas del LST. En el dashboard de admin, además de votar, se puede prender y apagar el aire y cambiar su temperatura. Pero para que esto funcione, se debe levantar el servicio MQTT, ya que la Raspberry esta suscrita a un tema para escuchar estos cambios, por lo que se debe publicar en él. 

### Para levantar el servicio MQTT

Se creo una aplicación a parte, ya que el paquete de Nodejs mqtt no tiene una buena integración con Vite, el empaquetador. En cambio con un pequeño script ejecutado en Nodejs, funcionó a la perfección. Entonces para comunicar ambas aplicaciones, cree una pequeña API con Express.js, de forma que cada vez que se cambie el estado del aire, se haga un llamado POST al servicio, enviando el código que corresponde a la acción. La API recibe este código y corre las funciones correspondientes para publicar en el tema a través de MQTT.

Para levantar este servicio, desde el directorio raíz del proyecto se debe acceder al directorio `./servicioMqtt`. Una vez en él, ejecutar los comandos:

```
npm i
npm start
```
El primero para instalar las dependencias y el segundo para ejecutar el servicio.

## Detalles de la implementación
El dashboard de estudiante interactúa únicamente con Firebase, por lo que funcionará independientemente de si está o no presente el servicio MQTT.

En cambio, para que las funcionalidades exclusivas del dashboard de administrador funcionen, se debe si o si levantar el servicio MQTT. Aun así, existe la posibilidad de que no funcione. Por esto, en esta sección detallaré las condiciones necesarias para que todo funcione correctamente

### Condiciones necesarias
Todo funcionará bien en 2 escenarios:
1. Se levanta la página y el servicio MQTT en la red local del LST, es decir, en la que está conectada la Raspberry
2. Se levanta la página y el servicio MQTT en una red fuera de la ESPOL.

Veamos por qué. El primero es bastante fácil de deducir, si todo está en la red local, la comunicación entre los componentes es sencilla. 

El segundo escenario es un poco más complicado y la causa no lo tengo tan claro ni yo (Cedeño). Lo que pasa es que el broker MQTT esta alojado en la Raspberry, por lo que no es accesible desde una red remota. Para solucionar esto, decidimos usar un servicio llamado _Ngrok_, que otorga una IP pública (en forma de URL) al puerto del servicio para poder accederlo desde cualquier lugar. Esto no permite de manera efectiva utilzar la aplicación web desde cualquier lugar

Ahora, ¿qué sucede con las redes dentro de ESPOL? Según lo que entendí, como la universidad tiene su propio DNS, este no puede traducir la URL de _ngrok_ a IP y es por eso que no podemos acceder al broker alojado en la Raspberry desde ninguna computadora del LST.

Entonces, dependiendo de en qué red nos encontremos, hay que hacer una configuración en el siguiente archivo `./servicioMqtt/mqttConfig.js` en la linea 1, dependiendo de la red que nos encontremos.

En el escenario 1:
```javascript
const url = "mqtt://${ipRaspberry}:1883";
```

En el escenario 2:
```javascript
const url = "mqtt://${ipNgrok}:${puertoNgrok}";
```

Todos estos valores son accesibles desde la Raspberry.

## Dockerizar la página
