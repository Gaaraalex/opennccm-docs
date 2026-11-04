---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.23.0 y las versiones anteriores."
resumen:
  - "2.23.0 lleva el asistente IA a todo el sistema: consulta vulnerabilidades, la base de conocimiento, configlets y tareas, y prepara configlets, scripts, casos, tareas y migraciones."
  - "Cada usuario puede elegir su modelo de IA en el chat o en la consola, sin cambiar el de los demás."
  - "El asistente solo habla de la red, y su panel en la consola deja más espacio a las respuestas."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

## Versión 2.23.0
- **Panel del asistente más amplio:** En la consola, las preguntas sugeridas ya no se salen del panel, se pliegan
  solas al preguntar y se vuelven a abrir con «✦ Preguntas sugeridas». El botón ⓘ oculta la parte de arriba (proveedor,
  contexto y aviso) para dejar más espacio a las respuestas, y la pregunta se escribe al fondo del panel.
- **Elegir el modelo de IA:** En Ajustes › Asistente IA el modelo se elige en un desplegable con los de la cuenta
  del proveedor. Cada usuario puede cambiarlo a su gusto desde el chat de la barra superior o desde el panel de la consola,
  sin cambiar el de los demás.
- **El asistente solo habla de la red:** Responde sobre redes y seguridad, los equipos que OpenNCCM admite y
  administra y el uso de OpenNCCM. A una pregunta ajena contesta en una frase que solo ayuda con la red.
- **Asistente en Operar › Consola:** Cada sesión abierta tiene su botón «✦ Asistente», como la consola de la
  ficha del equipo.
- **El asistente ayuda en todo el sistema:** El chat consulta las vulnerabilidades, la Base de conocimiento, los
  configlets, las tareas programadas y los tipos de equipo admitidos. Prepara configlets y scripts, borradores de casos de
  la Base de conocimiento, tareas, correcciones de vulnerabilidades como solicitud de cambio y migraciones desde otro
  sistema (el CSV para importar equipos). Todo se hace solo cuando el usuario confirma.

## Versión 2.22.0
- **Feature key de WatchGuard lista para restaurar:** OpenNCCM guarda la feature key tal como se pega en el Firebox
  para restaurarla (Serial Number, License ID, Name, Model, Version, una línea Feature por función, Expiration y Signature). La
  firma no sale por la CLI, así que entra un momento a la Web UI del Firebox con la misma credencial, la lee y cierra la sesión.
  Si la Web UI no responde lo reintenta pasada una hora, y si rechaza el ingreso, al día siguiente, para no insistir con la
  contraseña; el aviso sale una sola vez por motivo. Lee los campos aunque otra versión de Fireware cambie un poco la página.
- **Ver las credenciales de los equipos:** En Ajustes › Seguridad y acceso se elige quién puede verlas: nadie (de
  fábrica), solo los administradores o también los operadores. Hace falta tener activa la verificación en dos pasos, y cada vez
  que se pulsa «Ver» se confirma con el usuario y la contraseña propios (las cuentas de Microsoft, con el código de su app). Se
  muestran el usuario, la contraseña y el enable con botón Copiar y se ocultan a los 60 segundos. Cada vista y cada intento fallido
  quedan en la Auditoría, y 5 intentos fallidos bloquean la cuenta 15 minutos.
- **Aviso de licencias por vencer:** La ficha de un WatchGuard muestra cuándo vence cada servicio de su feature key
  (antivirus, IPS, LiveSecurity…), en ámbar si faltan 60 días o menos y en rojo si ya venció. OpenNCCM avisa a los 60, 30 y 7 días
  y al vencer, una sola vez por fecha. Cuando algo está por vencer relee la feature key una vez al día para ver la renovación, sin
  entrar a la Web UI si sigue siendo la misma. El informe nuevo «Licencias por vencer» lista lo de todos los equipos.
- **Aviso de equipo reemplazado:** Si el número de serie que lee el respaldo cambia, es otro aparato con la misma
  dirección (un RMA o un cambio de equipo). OpenNCCM avisa con las dos series, lo deja en la Auditoría, etiqueta la versión nueva
  «equipo nuevo» y no le aplica sola la reversión automática con la configuración del aparato anterior.
- **Comandos de la consola según el equipo:** Las sugerencias y los comandos frecuentes de la consola (en la ficha y en
  Operar › Consola) ya no son genéricos: cada tipo de equipo que admite OpenNCCM tiene los suyos, ajustados a su modelo y su
  versión de firmware. Por ejemplo, WatchGuard sugiere los de Fireware y, desde la 12.4, SD-WAN; RouterOS 7 y 6 sugieren lo de
  cada versión, y PoE, Wi-Fi o stack aparecen solo en los modelos que los tienen. El historial se guarda por tipo de equipo, y
  las consultas de cada equipo se pueden usar en modo solo lectura aunque no empiecen por «show».
- **El asistente IA recomienda comandos de ese equipo:** El asistente recibe la plataforma, el modelo, la versión de
  firmware y la lista de comandos del equipo con que se trabaja, y responde solo con comandos de esa plataforma y esa versión.
  Sus preguntas sugeridas también cambian según el equipo.

## Versión 2.21.0
- **Clave de la imagen .fxi:** Fireware solo acepta claves de 8 a 15 caracteres, y «Generar» creaba 24, así que la
  imagen fallaba con «the length of password should be between 8 and 15». Ahora «Generar» crea 15 y el formulario y el servidor
  validan de 8 a 15. Si hay guardada una clave más larga, la imagen falla antes de conectar y explica cómo cambiarla. Probado en
  un Firebox T40 con Fireware 12.8.1.
- **Feature key de WatchGuard con su detalle:** `show feature-key` solo trae el resumen (sincronización, avisos y la
  lista de claves). Ahora OpenNCCM guarda `show feature-key ID` de cada clave: modelo, vencimiento y cada función con su fecha.
  La guardada antes, solo con el resumen, se vuelve a leer una vez en el siguiente respaldo. La firma no sale por la CLI de
  Fireware; viene dentro de la imagen .fxi.
- **Luz Mode del frente del T40:** Se ve verde cuando alguna interfaz externa tiene enlace y parpadea si ninguna lo
  tiene, como en el Firebox. Status queda apagada, porque el equipo solo la enciende 30 segundos cuando alguien entra por la Web
  UI o la CLI. Cada luz explica su estado al pasar el ratón.
- **Qué trae la imagen .fxi:** La pestaña Respaldos y el manual aclaran que la imagen no incluye el sistema operativo
  (desde Fireware 12.2.1 no lo trae, y por eso pesa alrededor de 1 MB). Para restaurarla, el Firebox debe tener una versión de
  Fireware compatible.
- **Archivo recibido de la imagen .fxi:** El paso «Recibir el archivo» mostraba el nombre con coma («…,fxi»); ahora
  sale con punto y solo el tamaño lleva coma.

## Versión 2.20.0
- **Imagen completa de WatchGuard (.fxi):** OpenNCCM puede guardar la imagen completa y cifrada de un Firebox, para
  recuperar ese mismo equipo tras un fallo. Además de la configuración trae los certificados con sus claves, la feature key, las
  contraseñas y la información propia del equipo. Se configura en la nueva pestaña **Respaldos** de la ficha con una credencial de
  administrador del Firebox y una clave de cifrado; se crea semanal, diaria o a mano, y se guardan las N últimas. «Probar
  conexión» comprueba que el Firebox llega a OpenNCCM sin crear ninguna imagen.
- **Receptor FTP temporal:** Fireware solo entrega la imagen por FTP, así que OpenNCCM abre un receptor propio solo
  mientras dura el respaldo. Acepta únicamente la IP del Firebox, con usuario y contraseña de un solo uso, y se cierra al recibir
  el archivo o a los 5 minutos (puerto 2121 y pasivos 50000–50010, configurables). Si el servidor usa ufw, abre esos puertos solo
  para el Firebox y los cierra al terminar; la regla se quita sola a los 6 minutos aunque el servicio se detenga. En el Firebox no
  queda ninguna copia.
- **Respaldos de WatchGuard en la ficha:** La pestaña Respaldos explica qué guarda la configuración (XML) y qué la imagen
  (.fxi), y cuándo usar cada una. Cada archivo se descarga en su formato (`EQUIPO_v48.xml`, `EQUIPO_img-12.fxi`), nunca en
  .zip; «Descargar .xml y .fxi» baja los dos. La clave de la imagen nunca va dentro de un archivo: los administradores la ven en
  «Cómo restaurar» y queda en Auditoría quién la vio.
- **Puertos de WatchGuard con su enlace:** La ficha de un WatchGuard muestra qué puertos tienen enlace y a qué velocidad,
  delante y detrás. OpenNCCM lo lee en cada respaldo con `show status-report` (solo lectura; basta un usuario Device Monitor) y
  guarda solo la sección de los puertos. Atrás, el puerto con enlace sale en verde; delante se enciende la luz de su velocidad,
  amarilla para 1000 y verde para 10/100, como en el Firebox T40.
- **Si la imagen falla:** La pantalla muestra el mensaje exacto del Firebox y qué revisar (cortafuegos, dirección,
  política del Firebox o credencial sin permiso). Al segundo fallo seguido se abre la alarma «Imagen .fxi sin crear»; el respaldo
  XML no se ve afectado.

## Versión 2.19.0
- **WatchGuard Fireware:** Los firewalls WatchGuard se respaldan completos y su ficha muestra los puertos. El respaldo
  usa `export config to console` (Fireware no tiene `show running-config`; probado en un Firebox T40 con 12.8.1 y un usuario de
  solo lectura Device Monitor). Los puertos salen de la configuración: nombre de la interfaz, si está habilitada y su IP o las
  VLAN que pasan por él.
- **Feature key de WatchGuard:** Al agregar un WatchGuard se guarda su feature key una sola vez, cifrada, y se descarga
  desde la ficha del equipo. Si el equipo no la da en el primer respaldo, se intenta en el siguiente; la descarga queda en
  Auditoría.
- **Frente y parte de atrás del Firebox T40:** La ficha dibuja el T40 como es, con los puertos detrás y las luces
  delante. Atrás: consola serie, dos USB, 0/WAN, 1/LAN, 2, 3 y 4-PoE, Reset, interruptor y entrada de 54 V DC; frente: Failover,
  las luces de cada puerto, Status, Mode, Attn y encendido. La ficha se abre por detrás.
- **Cumplimiento para WatchGuard:** Un paquete nuevo de 10 reglas revisa la seguridad básica de los Firebox. Web UI y
  administración no abiertas a Internet, bloqueo de cuentas, sesión inactiva ≤ 15 min, SNMP sin comunidades por defecto y v3, NTP,
  envío de logs, bloqueo de paquetes falsificados y aviso antes del inicio de sesión. Se carga solo al actualizar.
- **Respaldos con error:** Un mensaje de error del equipo ya no se guarda como si fuera una versión de la
  configuración. Antes solo se miraba la primera línea, y Fireware pone el error en la segunda («^» y «% Invalid input…»).
- **Ficha lenta con configuraciones enormes:** La ficha de un equipo con una configuración de decenas de miles de
  líneas vuelve a abrir en menos de un segundo. La comparación aparta lo igual antes de comparar (de 26 s a 0,1 s con 40.000
  líneas) y dibuja como mucho 2.000 filas, con la descarga del .diff completo.
- **Pestañas de página:** Al abrir la ficha de un equipo ya no se ven un momento el Historial y la Comparación dentro
  de Resumen.
- **Firmware de un equipo nuevo:** La versión de firmware disponible aparece en cuanto se agrega un equipo, sin esperar
  a la comprobación diaria. La tarjeta «Actualizar firmware» la muestra también en los equipos que OpenNCCM no puede actualizar.
- **Análisis en inglés y en español:** El origen de los cambios hechos desde la consola sale como «Consola» («Console»)
  y no como «console».
- **Novedades con su tipo:** Cada punto de las novedades lleva su tipo (Nuevo, Mejora, Arreglo o Seguridad) como una
  etiqueta de color. La ventana tiene la cabecera y el pie fijos, con «Cerrar» siempre a la vista, y se cierra también con un clic
  fuera.
- **Teléfono:** «Soporte profesional» está también al final del menú lateral y el saludo del Panel ya no se monta
  sobre los botones. La insignia de la base de conocimiento es ámbar en todas las páginas.
- **Inglés:** El grupo «Equipo» del menú (las personas) se traduce «Team» y no «Device».

## Versión 2.18.0
- **Botón «Soporte profesional»:** Un botón nuevo en la barra superior lleva a la página de soporte de pago. Está a la
  izquierda de «Apoya OpenNCCM», se abre en otra pestaña y tiene una animación suave que se detiene si el sistema pide reducir
  el movimiento. No cambia ninguna función; el administrador lo oculta para todos en **Ajustes › Organización**.
- **Base de conocimiento:** Cada problema resuelto queda escrito como un caso, para que el equipo lo encuentre y lo
  resuelva igual la próxima vez. Está en Equipo › Base de conocimiento; cada caso tiene síntoma, causa, pasos con sus comandos
  («Copiar» sin la clave oculta y «Abrir en consola», que lo deja escrito sin ejecutarlo), comprobación y prevención.
  «Falta documentar» se llena sola con las alarmas críticas cerradas y los cambios revertidos (y, si se activa, las sesiones de
  consola de más de 15 min); una alarma crítica ya no se cierra sin caso o enlace a uno existente. Los operadores envían a
  revisión y el administrador aprueba o pide cambios; «Proponer cambio» en casos ajenos, versiones, comentarios, «Me sirvió»,
  «Convertir en configlet», asistente IA para proponer causa y comprobación, casos parecidos y resumen por correo los lunes.
  Solo para administradores y operadores (solo lectura, si el administrador lo activa); las contraseñas, claves y comunidades
  SNMP se ocultan al guardar y cada lectura y edición queda en Auditoría.
- **Restaurar en un servidor nuevo:** Una copia del sistema restaurada en un servidor nuevo ya se lee completa,
  porque se usa la clave que viene en la copia. `sudo opennccm restore` con una copia que incluye la clave reemplaza la que creó
  el instalador (la anterior queda como `secret.key.antes-de-restaurar-FECHA`); antes se quedaba con la del instalador y las
  configuraciones y contraseñas no se podían leer. Si la copia no trae la clave y la del servidor no descifra los datos
  restaurados, el comando lo avisa y dice qué hacer en lugar de terminar con «Restaurado.».
- **Restaurar con PostgreSQL:** Las copias del sistema también se pueden restaurar en servidores que usan PostgreSQL.
  `sudo opennccm restore` usa `pg_restore`; una copia de otra base de datos (SQLite en un servidor con PostgreSQL o al revés) se
  rechaza con el motivo.
