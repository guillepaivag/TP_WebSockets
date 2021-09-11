# TP_WebSockets

## Asignatura: Sistemas Distribuidos

## Tutores:

-	Prof. Ing. Fernando Mancía.
-	Prof. Ing. Juan M. Ferreira.

## Alumnos:

- Ivan Weiss Van Der Pol
- Guillermo José Paiva Galeano
- Arturo Gabriel Jara Eichenbrenner
- Alejandro Alexander Notario Candia
- Cristian Daniel Ortellado Fernandez

## Sitio Web Cliente: 

Se puede acceder al trabajo, ya en producción, a través de los siguientes enlaces:
- [Enlace 1: https://websocketscamasuti.web.app](https://websocketscamasuti.web.app)
- [Enlace 2: https://camasuti.herokuapp.com](https://camasuti.herokuapp.com)

<hr>

<b>Nota:</b> Los sitios web [https://websocketscamasuti.web.app](https://websocketscamasuti.web.app) y [https://camasuti.herokuapp.com](https://camasuti.herokuapp.com) son los mismos.

1. [https://websocketscamasuti.web.app](https://websocketscamasuti.web.app) esta alojado en Firebase.

2. [https://camasuti.herokuapp.com](https://camasuti.herokuapp.com) esta alojado en Heroku.

<hr>

# Contenido

1. [WebSockets](https://github.com/guillepaivag1605/TP_WebSockets#websockets)
   - [Preliminares](https://github.com/guillepaivag1605/TP_WebSockets#preliminares)
   - [¿Qué es WebSocket?](https://github.com/guillepaivag1605/TP_WebSockets#qu%C3%A9-es-websocket)
   - [¿Qué es el handshake?](https://github.com/guillepaivag1605/TP_WebSockets#qu%C3%A9-es-el-handshake)
   - [Ventajas](https://github.com/guillepaivag1605/TP_WebSockets#ventajas)
   - [Cuando utilizar WebSockets](https://github.com/guillepaivag1605/TP_WebSockets#cuando-utilizar-websockets)
   - [¿Qué es Socket.io?](https://github.com/guillepaivag1605/TP_WebSockets#qu%C3%A9-es-socketio)
2. [Requerimientos de Instalación](https://github.com/guillepaivag1605/TP_WebSockets#requerimientos-de-instalacion)
3. [Como ejecutar los componentes del servidor](https://github.com/guillepaivag1605/TP_WebSockets#como-ejecutar-los-componentes-del-servidor)
4. [Como ejecutar los clientes](https://github.com/guillepaivag1605/TP_WebSockets#como-ejecutar-los-clientes)
5. [Servicios ofrecidos](https://github.com/guillepaivag1605/TP_WebSockets#servicios-ofrecidos)
   - [Interacción cliente-servidor](https://github.com/guillepaivag1605/TP_WebSockets#interacci%C3%B3n-cliente-servidor)
   - [¿Como funciona el sitio Web?](https://github.com/guillepaivag1605/TP_WebSockets#c%C3%B3mo-funciona-el-sitio-web)
     - [1. Pantalla de Inicio](https://github.com/guillepaivag1605/TP_WebSockets#1-pantalla-de-inicio)
     - [2. Listado de Hospitales (en Ver Estado)](https://github.com/guillepaivag1605/TP_WebSockets#2-listado-de-hospitales-en-ver-estado)
     - [3. Editar datos en cada hopital (en Ver Hospital)](https://github.com/guillepaivag1605/TP_WebSockets#3-editar-datos-en-cada-hospital-en-ver-hospital)
     - [4. Agregar una cama](https://github.com/guillepaivag1605/TP_WebSockets#4-agregar-una-cama)
     - [5. Modificar el estado de una cama](https://github.com/guillepaivag1605/TP_WebSockets#5-modificar-el-estado-de-una-cama)
     - [6. Eliminar una cama](https://github.com/guillepaivag1605/TP_WebSockets#6-eliminar-una-cama)
6. [Bibliografía](https://github.com/guillepaivag1605/TP_WebSockets#bibliograf%C3%ADa)

# WebSockets

## **Preliminares**

Anteriormente, crear una aplicación web que necesite una comunicación bidireccional entre el cliente y el servidor (por ejemplo, mensajería instantánea y aplicaciones de juegos) ha requerido de un abuso de HTTP para sondear el server por actualizaciones mientras se envían notificaciones en flujo hacia el servidor como diferentes llamadas HTTP.

Esto resultó en una variedad de problemas:

- Cada servidor es forzado a usar un número de diferentes conexiones TCP para cada cliente; uno para enviar información al cliente y uno nuevo para cada mensaje entrante.
- El protocolo de enlace es altamente sobrecargado, con cada mensaje cliente-servidor con propio encabezado HTTP.
- El proceso del lado cliente es forzado a mantener un mapeo de las conexiones salientes a las conexiones entrantes para dar seguimiento a las respuestas.
Una solución simple sería utilizar una única conexión TCP para el tráfico en ambas direcciones. Esto es lo que el protocolo WebSocket provee. 
Esta técnica puede ser usada por una variedad de aplicaciones; juegos, ventanas de ventas, aplicaciones multiusuario con modificaciones en simultáneo, interfaces exponiendo servicios del lado servidor en tiempo real, etc.

## **¿Qué es WebSocket?**

WebSocket es un protocolo de red basado en TCP que establece cómo deben intercambiarse datos entre redes. Puesto que es un protocolo fiable y eficiente, es utilizado por prácticamente todos los clientes. El protocolo TCP establece conexiones entre dos puntos finales de comunicación, llamados sockets. De esta manera, el intercambio de datos puede producirse en las dos direcciones.

En las conexiones bidireccionales, como las que crea WebSocket, se intercambian datos en ambas direcciones al mismo tiempo. La ventaja de este intercambio es que se accede de forma más rápida a los datos. En concreto, WebSocket permite así una comunicación directa entre una aplicación web y un servidor WebSocket. En otras palabras: la web que se solicita se muestra en tiempo real.

El protocolo WebSocket es diseñado para reemplazar la comunicación de tecnologías bidireccionales que usan HTTP como una capa de transporte beneficiándose de la infraestructura existente (proxis, autenticación, etc.). Tales tecnologías fueron implementadas como concesiones entre eficiencia y confiabilidad porque HTTP no fue originalmente pensado para su uso bidireccional.

WebSocket, siendo un protocolo full-dúplex usado en el mismo escenario de comunicación cliente-servidor como HTTP, a diferencia de este inicia con ws:// o wss://. Es un protocolo de estado, lo cual significa que la conexión entre cliente y servidor se mantiene operativa hasta que es finalizada por una de las partes involucradas (cliente o servidor). Luego de cerrada la conexión, la conexión es finalizada para ambos extremos de la comunicación.

## **¿Qué es el handshake?**

El handshake se denomina al proceso de establecer la conexión usando el protocolo WebSocket, entre un cliente y un servidor. Se establece mediante TCP, es compatible con intermediarios y software del lado cliente basados en HTTP, de tal forma que un único puerto puede ser usado tanto por clientes HTTP comunicándose con el server y clientes WebSocket en conexión con el server. Para este fin, el handshake del cliente WebSocket es una solicitud HTTP de la siguiente estructura:

```
        GET /chat HTTP/1.1
        Host: server.example.com
        Upgrade: websocket
        Connection: Upgrade
        Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
        Origin: http://example.com
        Sec-WebSocket-Protocol: chat, superchat
        Sec-WebSocket-Version: 13
```

Esta solicitud de upgrade a una conexión WebSocket es respondida por el servidor que maneja dicho protocolo como:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: superchat
```

Este proceso de establecer una conexión anteriormente descrita se conoce como handshake.

## **Ventajas**

El uso tradicional de las conexiones HTTP tiene el inconveniente de que el cliente siempre carga la página HTML entera. Para resolver el problema, se desarrolló la tecnología AJAX. Esta tenía, por su parte, la desventaja de establecer conexiones unidireccionales, es decir, que solo permiten la comunicación en una dirección, lo cual daría lugar a largos tiempos de espera en las intensivas aplicaciones de hoy en día, especialmente en los chats. 
WebSocket, en cambio, crea conexiones bidireccionales que permiten el intercambio de datos en ambos sentidos, lo cual hace posible el contacto directo con el navegador y, con ello, permite **cortos periodos de carga**: en cuanto se envía un mensaje, como podría ser uno en un chat de soporte técnico, este llega y se muestra directamente al otro lado.

## **Cuando Utilizar WebSockets**

- Aplicaciones web de tiempo real: Las aplicaciones web de tiempo real usan WebSockets para mostrar el dato en el extremo cliente, el cual está continuamente siendo enviada al servidor del backend. En WebSockets, los datos son continuamente empujadas/transmitidas en la misma conexión ya abierta, por este motivo es rápido y mejora el rendimiento y desempeño de la aplicación.
Por ejemplo, en un sitio web de trading o de bitcoin trading, los cuales se encuentran cambiando constantemente, para mostrar la fluctuación de precio y para la transferencia de datos continuos del servidor de datos continuos al extremo cliente mediante el canal WebSocket.
- Aplicaciones de juegos: En una aplicación de juegos, el enfoque se centra en los datos continuamente siendo recibidos por el server sin recargar la UI, tendrá efecto en la visualización. La UI consigue automáticamente recargar sin necesitar una nueva conexión, lo cual es muy importante una aplicación de videojuegos.
- Aplicaciones de Chat: Una aplicación de chat que usa WebSockets establecerá la conexión una única vez para el intercambio, publicación o la difusión de los mensajes entre los participantes. Se rehúsa la misma conexión WebSocket, tanto para enviar como para recibir mensajes y para intercambios entre pares. 

## **¿Qué es Socket.IO?**

Socket.IO es una librería que permite la comunicación en tiempo real, bidireccional y basado en eventos entre el navegador y el servidor. Consiste de:

- Un servidor Node.js.
- Una librería cliente JavaScript para el navegador (el cuál puede también ejecutarse con Node.js).
El canal bidireccional entre el servidor Node.js y el cliente Socket.io (navegador, Node.js, o algún otro lenguaje de programación) es establecido con una conexión WebSocket, y usará el sondeo HTTP como alternativa.

Socket.IO enmascara y nos abstrae de los procedimientos básicos del protocolo WebSocket, facilitando el desarrollo de la aplicación web responsiva. Permite al desarrollador enfocarse en los niveles superiores de la estructura y diseño de una web. No necesitamos iniciar el *handshake* ni cerrar la conexión entre cliente servidor, porque se efectúan con esta herramienta sin necesitar que el desarrollador los realice de manera explícita.

## **Requerimientos de Instalacion**
- Vue CLI
- Node.js & NPM
- Firebase CLI


## **Como ejecutar los componentes del servidor**

- Realizar el comando “npm i” o “npm install” para instalar los módulos necesarios (módulos a instalar en package.json).

- Comando “npm run dev” para correr el servidor en modo desarrollo.

- Comando “npm start” para correr el servidor en modo producción, usando Heroku para alojar el servidor, Heroku ya ejecuta ese primer y único comando para que pueda ser utilizado en producción.

## **Como ejecutar los clientes**

- Realizar el comando “npm i” o “npm install” para instalar los módulos necesarios (módulos a instalar en package.json).

- Comando “npm run serve” para correr el cliente en modo desarrollo.

- Comando “npm run build” para construir el cliente en modo producción.

- Comando “npm run deployHosting” para subir el cliente en el hosting de Firebase (Firebase Hosting).

- Comando (en el directorio Cliente (Client)) “firebase deploy --only hosting” para subir el cliente en el hosting de Firebase (Firebase Hosting).

- Comando “npm run toPublic-windows” sirve para copiar los archivos del directorio dist del cliente al directorio público del servidor (Server/src/public) con comandos de Windows.

- Comando “npm run toPublic- linux” sirve para copiar los archivos del directorio dist del cliente (Client/dist) al directorio público del servidor (Server/src/public) con comandos de Linux.

- Comando “npm run buildToProduction-windows” es una mezcla del comando “npm run build” y “toPublic-windows” que sirve para construir el cliente en producción y copiar los archivos del directorio dist (Client/dist) al directorio público del servidor (Server/src/public) con comandos de Windows.

- Comando “npm run buildToProduction- linux” es una mezcla del comando “npm run build” y “toPublic- linux” que sirve para construir el cliente en producción y copiar los archivos del directorio dist (Client/dist) al directorio público del servidor (Server/src/public) con comandos de Linux.

## **Servicios ofrecidos**

## **Interacción cliente-servidor**

Tenemos en el extremo servidor las operaciones emitidas por el websocket, en un switch para cada operación válida:

![case 1_socketio](https://drive.google.com/uc?export=view&id=1F846KIr9HuBONu0kZN938PQyy_jcBNRE)

El emit de las otras operaciones se realiza de manera análoga y se puede observar en el código fuente del proyecto Server (TP_WebSockets/Server/src/Socket.io).
Para las funciones de WebSockets que son llamadas en el archivo anterior (de forma desestructurada), generando una respuesta por parte del servidor, tenemos:

![case 1_websocketio](https://drive.google.com/uc?export=view&id=1ISD8CXIKzCXUuDCekuqQr2haMGvvD-zl)

Las respuestas que se obtiene luego de verificar la base de datos se envían a Socket.io para luego ser actualizada en el extremo cliente, en tiempo real.
Esta función mostrada es de la primera función requerida, ver estado de una cama. El proceso de generar la respuesta del server y enviarla, es análogo para las demás funciones WebSocket.

![case main.js](https://drive.google.com/uc?export=view&id=16tOeQVliFstmpK1sAVCPIEIfphrw7Kto)

Desde el lado cliente se utiliza le modulo socket.io-client, donde en su archivo main.js (imagen de arriba) importamos y utilizamos como función. Como primer parámetro del socket.io-client al que llamamos SocketIOClient, tenemos la url del servidos y como segundo parámetro ```opciones```, en las que se configura el socket cliente una vez llamada la funcion SocketIOClient.

![ítem agregado, ítem 0](https://drive.google.com/uc?export=view&id=1U09nI98yBTdlwk79_1t10W6GLWtZxcZ9)

Con la imagen anterior, se puede ejemplificar parte del proceso. Cuando se llama a la vista "estado", se ejecuta la llamada ```created()```, y este llama a la operación del tipo 1.

Entonces, el servidor ejecuta la operación del mismo tipo (en este caso, del tipo 1), que se encuentra en el Switch-case principal del lado servidor (primera imagen), el cual llama a la función ```ver_estado()```, cuyo objetivo es brindar los datos de estado de los hospitales.

Ya manejando el servidor, si no hay errores en la comunicación, llama a ```responseServer_verEstado'``` (segunda imagen) que extrae los datos de hospitales de la base de datos.
Por último, el cliente ejecuta el evento iniciado y los datos se visualizan.

## **¿Cómo funciona el sitio web?**

Accediendo a la dirección [enlace 1](https://websocketscamasuti.web.app), [enlace 2](https://camasuti.herokuapp.com), podemos ver la lista de hospitales y comenzar a interactuar registrando, ocupando, desocupando, listando y viendo el estado de las camas UTI disponibles.
La página presenta las siguientes pantallas:

### **1. Pantalla de Inicio**

![Pantalla de Inicio, item 1](https://drive.google.com/uc?export=view&id=1MW8hfC4ryACh0_LGDXMoXvMt7wQtuwRu)

Se presenta la Lista de Hospitales, mostrando los datos de cada hospital y la opción de obtener los datos específicos de cada hospital, además de permitir modificar o actualizar los datos (en Ver Hospital). También se puede acceder al listado general del estado de todas las camas, diferenciando entre hospitales (en Ver Estado).

### **2. Listado de Hospitales (en Ver Estado)**

Podemos acceder a la lista de camas en cada hospital. El punto parpadeante indica el estado de cada cama. Rojo es desocupado y verde como ocupado.
En este ejemplo, tenemos el hospital 1,

![Lista de Hospitales, item 1.1](https://drive.google.com/uc?export=view&id=1i-pZbBHKaxEM45DnNEjIczdH3oNrilhk)

 y el hospital número 2:
![Lista de Hospitales, item 1.2](https://drive.google.com/uc?export=view&id=1Z3cviNRruIwvCPTBZ7mvZxHyoU0nLwWY)

### **3. Editar datos en cada hospital (en Ver Hospital)**

Si accedemos a la opción Ver Hospital, en la pantalla de inicio (ítem 1), se despliega una lista de las camas en el respectivo hospital, además de un chart representando las estadísticas en tiempo real de el nivel de ocupación de las camas.

![Editar datos en cada hospital, item 3](https://drive.google.com/uc?export=view&id=1PHFSP63rM9z-6GdJuA1NfgjiseacXvjr)

Podemos agregar una nueva cama en el hospital (en Agregar Cama), o ver una cama específica para modificar su estado (en Ver Cama).

### **4. Agregar una Cama**

Continuando de la pantalla 4, podemos agregar una nueva cama.

![Agregar una cama, item 4](https://drive.google.com/uc?export=view&id=1PnIw8-szokvGtUhTxit9XiXmv8_uMfQ3)

Se guardan los cambios y se muestra el estado actualizado del hospital en la pantalla del ítem 3.

### **5. Modificar el estado de una cama**

En Ver Cama, de la pantalla del ítem 3, se puede modificar el estado de una cama.

![Modificar el estado de una cama, item 5.1](https://drive.google.com/uc?export=view&id=13P5qLSKTjsYPog7YyQvUaeqcx4TKKacJ)

Si se encuentra desocupado e intentamos ocupar, el estado de la cama se actualiza.

Si intentamos desocupar una cama ya desocupada, nos muestra un mensaje de error:

![Modificar el estado de una cama, item 5.2](https://drive.google.com/uc?export=view&id=155mtj8ufwZgCYbe3zPPMFSOe0UMcGNti)

### **6. Eliminar una cama**

Con la opción de Eliminar Cama, en la pantalla del ítem 5, podemos eliminar una cama del sistema.

![Eliminar una cama, item 6.1](https://drive.google.com/uc?export=view&id=1NtwNvRK8pAjeDCEyz5D_FKFXbo3bK8nI)

Debemos ingresar el UID de la cama para confirmar la eliminación. Confirmamos y se regresa a la pantalla anterior.
Si la cama se encuentra actualmente ocupada, entonces nos muestra el siguiente mensaje de error:

![Eliminar una cama, item 6.2](https://drive.google.com/uc?export=view&id=1SKgoEtWilZ31XD05ZxIehtZZP4a74DJc)

Y la cama no sera eliminada.

## **Bibliografía**

•	Ian Fette, Alexey Melnikov. The WebSocket Protocol.  IETF. Recuperado el 24 de agosto de 2021. [The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)

•	Digital Guide, IONOS (07 de agosto de 2020). ¿Qué es WebSocket? IONOS. Recuperado el 25 de agosto de 2021. [Digital Guide](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/que-es-websocket/)

•	Arpit Asati (actualizado el 27 de junio de 2021). What is web socket and how it is different from the HTTP. Recuperado el 24 de agosto de 2021.  [What is web socket and how it is different from the HTTP](https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/)

•	Nikhil. How to Implement WebSocket Server with Node.js. Mind Bowser. [How to Implement WebSocket Server with Node.js. Mind Bowser.](https://www.mindbowser.com/websockets-with-node-js/)
