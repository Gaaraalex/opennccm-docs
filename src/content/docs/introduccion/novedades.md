---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.20.0 y las versiones anteriores."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

## Versión 2.20.0
- [nuevo] **Imagen completa de WatchGuard (.fxi):** OpenNCCM puede guardar la imagen completa y cifrada de un Firebox, para
  recuperar ese mismo equipo tras un fallo. Además de la configuración trae los certificados con sus claves, la feature key, las
  contraseñas y la información propia del equipo. Se configura en la nueva pestaña **Respaldos** de la ficha con una credencial de
  administrador del Firebox y una clave de cifrado; se crea semanal, diaria o a mano, y se guardan las N últimas. «Probar
  conexión» comprueba que el Firebox llega a OpenNCCM sin crear ninguna imagen.
- [nuevo] **Receptor FTP temporal:** Fireware solo entrega la imagen por FTP, así que OpenNCCM abre un receptor propio solo
  mientras dura el respaldo. Acepta únicamente la IP del Firebox, con usuario y contraseña de un solo uso, y se cierra al recibir
  el archivo o a los 5 minutos (puerto 2121 y pasivos 50000–50010, configurables). Si el servidor usa ufw, abre esos puertos solo
  para el Firebox y los cierra al terminar; la regla se quita sola a los 6 minutos aunque el servicio se detenga. En el Firebox no
  queda ninguna copia.
- [nuevo] **Respaldos de WatchGuard en la ficha:** La pestaña Respaldos explica qué guarda la configuración (XML) y qué la imagen
  (.fxi), y cuándo usar cada una. Cada archivo se descarga en su formato (`EQUIPO_v48.xml`, `EQUIPO_img-12.fxi`), nunca en
  .zip; «Descargar .xml y .fxi» baja los dos. La clave de la imagen nunca va dentro de un archivo: los administradores la ven en
  «Cómo restaurar» y queda en Auditoría quién la vio.
- [mejora] **Puertos de WatchGuard con su enlace:** La ficha de un WatchGuard muestra qué puertos tienen enlace y a qué velocidad,
  delante y detrás. OpenNCCM lo lee en cada respaldo con `show status-report` (solo lectura; basta un usuario Device Monitor) y
  guarda solo la sección de los puertos. Atrás, el puerto con enlace sale en verde; delante se enciende la luz de su velocidad,
  amarilla para 1000 y verde para 10/100, como en el Firebox T40.
- [mejora] **Si la imagen falla:** La pantalla muestra el mensaje exacto del Firebox y qué revisar (cortafuegos, dirección,
  política del Firebox o credencial sin permiso). Al segundo fallo seguido se abre la alarma «Imagen .fxi sin crear»; el respaldo
  XML no se ve afectado.

## Versión 2.19.0
- [mejora] **WatchGuard Fireware:** Los firewalls WatchGuard se respaldan completos y su ficha muestra los puertos. El respaldo
  usa `export config to console` (Fireware no tiene `show running-config`; probado en un Firebox T40 con 12.8.1 y un usuario de
  solo lectura Device Monitor). Los puertos salen de la configuración: nombre de la interfaz, si está habilitada y su IP o las
  VLAN que pasan por él.
- [nuevo] **Feature key de WatchGuard:** Al agregar un WatchGuard se guarda su feature key una sola vez, cifrada, y se descarga
  desde la ficha del equipo. Si el equipo no la da en el primer respaldo, se intenta en el siguiente; la descarga queda en
  Auditoría.
- [nuevo] **Frente y parte de atrás del Firebox T40:** La ficha dibuja el T40 como es, con los puertos detrás y las luces
  delante. Atrás: consola serie, dos USB, 0/WAN, 1/LAN, 2, 3 y 4-PoE, Reset, interruptor y entrada de 54 V DC; frente: Failover,
  las luces de cada puerto, Status, Mode, Attn y encendido. La ficha se abre por detrás.
- [nuevo] **Cumplimiento para WatchGuard:** Un paquete nuevo de 10 reglas revisa la seguridad básica de los Firebox. Web UI y
  administración no abiertas a Internet, bloqueo de cuentas, sesión inactiva ≤ 15 min, SNMP sin comunidades por defecto y v3, NTP,
  envío de logs, bloqueo de paquetes falsificados y aviso antes del inicio de sesión. Se carga solo al actualizar.
- [arreglo] **Respaldos con error:** Un mensaje de error del equipo ya no se guarda como si fuera una versión de la
  configuración. Antes solo se miraba la primera línea, y Fireware pone el error en la segunda («^» y «% Invalid input…»).
- [arreglo] **Ficha lenta con configuraciones enormes:** La ficha de un equipo con una configuración de decenas de miles de
  líneas vuelve a abrir en menos de un segundo. La comparación aparta lo igual antes de comparar (de 26 s a 0,1 s con 40.000
  líneas) y dibuja como mucho 2.000 filas, con la descarga del .diff completo.
- [arreglo] **Pestañas de página:** Al abrir la ficha de un equipo ya no se ven un momento el Historial y la Comparación dentro
  de Resumen.
- [mejora] **Firmware de un equipo nuevo:** La versión de firmware disponible aparece en cuanto se agrega un equipo, sin esperar
  a la comprobación diaria. La tarjeta «Actualizar firmware» la muestra también en los equipos que OpenNCCM no puede actualizar.
- [arreglo] **Análisis en inglés y en español:** El origen de los cambios hechos desde la consola sale como «Consola» («Console»)
  y no como «console».
- [mejora] **Novedades con su tipo:** Cada punto de las novedades lleva su tipo (Nuevo, Mejora, Arreglo o Seguridad) como una
  etiqueta de color. La ventana tiene la cabecera y el pie fijos, con «Cerrar» siempre a la vista, y se cierra también con un clic
  fuera.
- [arreglo] **Teléfono:** «Soporte profesional» está también al final del menú lateral y el saludo del Panel ya no se monta
  sobre los botones. La insignia de la base de conocimiento es ámbar en todas las páginas.
- [arreglo] **Inglés:** El grupo «Equipo» del menú (las personas) se traduce «Team» y no «Device».

## Versión 2.18.0
- [nuevo] **Botón «Soporte profesional»:** Un botón nuevo en la barra superior lleva a la página de soporte de pago. Está a la
  izquierda de «Apoya OpenNCCM», se abre en otra pestaña y tiene una animación suave que se detiene si el sistema pide reducir
  el movimiento. No cambia ninguna función; el administrador lo oculta para todos en **Ajustes › Organización**.
- [nuevo] **Base de conocimiento:** Cada problema resuelto queda escrito como un caso, para que el equipo lo encuentre y lo
  resuelva igual la próxima vez. Está en Equipo › Base de conocimiento; cada caso tiene síntoma, causa, pasos con sus comandos
  («Copiar» sin la clave oculta y «Abrir en consola», que lo deja escrito sin ejecutarlo), comprobación y prevención.
  «Falta documentar» se llena sola con las alarmas críticas cerradas y los cambios revertidos (y, si se activa, las sesiones de
  consola de más de 15 min); una alarma crítica ya no se cierra sin caso o enlace a uno existente. Los operadores envían a
  revisión y el administrador aprueba o pide cambios; «Proponer cambio» en casos ajenos, versiones, comentarios, «Me sirvió»,
  «Convertir en configlet», asistente IA para proponer causa y comprobación, casos parecidos y resumen por correo los lunes.
  Solo para administradores y operadores (solo lectura, si el administrador lo activa); las contraseñas, claves y comunidades
  SNMP se ocultan al guardar y cada lectura y edición queda en Auditoría.
- [arreglo] **Restaurar en un servidor nuevo:** Una copia del sistema restaurada en un servidor nuevo ya se lee completa,
  porque se usa la clave que viene en la copia. `sudo opennccm restore` con una copia que incluye la clave reemplaza la que creó
  el instalador (la anterior queda como `secret.key.antes-de-restaurar-FECHA`); antes se quedaba con la del instalador y las
  configuraciones y contraseñas no se podían leer. Si la copia no trae la clave y la del servidor no descifra los datos
  restaurados, el comando lo avisa y dice qué hacer en lugar de terminar con «Restaurado.».
- [mejora] **Restaurar con PostgreSQL:** Las copias del sistema también se pueden restaurar en servidores que usan PostgreSQL.
  `sudo opennccm restore` usa `pg_restore`; una copia de otra base de datos (SQLite en un servidor con PostgreSQL o al revés) se
  rechaza con el motivo.

## Versión 2.17.0
- [arreglo] **Operar › Consola:** Elegir un equipo vuelve a abrir su consola y las recetas se ven todas otra vez. En la 2.16.0
  un fallo de la página dejaba las dos cosas sin funcionar; ahora en **Recetas**, con «Todas» y «Todos los fabricantes», se ven
  todas.
- [mejora] **Herramientas con parámetros:** Ping, traceroute, puerto TCP y DNS aceptan las opciones de siempre, de Windows o de
  Linux. Detrás de la IP o el nombre: `8.8.8.8 -t` (ping continuo hasta pulsar **Detener**), `-n 10`, `-l 1400 -f`, `-i 0.2`,
  `--ttl 5`; traceroute `-h 30 -q 3`, `-I` o `-T -p 443`; puerto TCP `host:443 -c 5`; DNS `ejemplo.com MX @1.1.1.1` o
  `-x 8.8.8.8`. Debajo de la casilla se ven las de cada herramienta. La salida llega a medida que se produce. Solo se aceptan
  esas opciones (nada se pasa tal cual al sistema). El instalador y `sudo opennccm update` instalan `dnsutils` (dig) para los
  tipos de registro DNS.
- [mejora] **Chat del asistente:** El asistente solo nombra equipos que existen y dice cuántos equipos toca una acción antes de
  hacerla. La confirmación lista los equipos con su número («Respaldar 3 equipos»); la barra superior se acomoda con el chat
  abierto y el chat vacío saluda con sugerencias.
- [mejora] **Errores en pocas palabras:** Los fallos de conexión y de respaldo se explican con un motivo corto y traducido. En
  el Panel («Necesita tu atención») y en el chat salen como «sin respuesta por SSH», «credencial rechazada», «cambió la clave SSH
  del equipo», «falta la contraseña enable»…; el mensaje completo sigue en la ficha del equipo.

## Versión 2.16.0
- [nuevo] **Chat del asistente en todo el sistema:** Un chat con el asistente IA se abre desde cualquier página para preguntar
  por la red y pedir acciones, que siempre se confirman antes. El botón «Asistente» de la barra superior (con el logo del
  proveedor) abre el chat a la derecha. Consulta OpenNCCM con funciones de solo lectura (equipos, respaldos, alarmas, cambios y
  versiones, cumplimiento, ciclo de vida, búsqueda en configuraciones) y el manual, con el rol y los grupos del usuario y los
  secretos ocultos. Respuestas cortas, equipos en una línea, como mucho 2 botones y «Más acciones», y la fuente. Las acciones que
  cambian algo (respaldar, crear una tarea, crear una solicitud de cambio) piden confirmación en el chat. La conversación se
  guarda por usuario; cada pregunta queda en Auditoría con las funciones usadas.
- [mejora] **Recetas:** La consola trae al menos 10 recetas paso a paso por fabricante para Cisco IOS, MikroTik RouterOS,
  Extreme EXOS y Extreme VOSS / Fabric Engine. Cubren nombre, usuarios y contraseñas, SSH, HTTPS, SNMP, syslog hacia OpenNCCM,
  RADIUS, NTP, VLAN, troncales, rutas, guardar… La consola reconoce VOSS (autocompletado, frecuentes, paginado y comandos que
  cortan el servicio).
- [arreglo] **Herramientas de la consola:** Ping y traceroute ya funcionan desde el servidor. El servicio tiene permiso para
  ICMP y se instalan `iputils-ping` y `traceroute` al instalar o actualizar. Si traceroute tarda, se ve lo que alcanzó a
  responder.
- [mejora] **Asistente IA:** Cada proveedor de IA se reconoce por su logo, en un cuadrito con el color de su marca. Se ve en
  Ajustes, en la consola y en la barra superior, y las tarjetas de proveedor tienen la misma altura; si al guardar no hay ningún
  rol marcado, quedan administradores y operadores.
- [arreglo] **Consola:** El aviso verde de cambio sale en el momento correcto y el panel de la consola cabe en la ventana. El
  aviso sale al salir del modo configuración (tras el «end»), nunca antes del comando; el panel de Operar › Consola tiene una
  sola fila de botones; textos en singular («1 sesión abierta»).
- [mejora] **Grabaciones:** El reproductor muestra la sesión grabada con los colores de la consola y la lista de comandos con su
  hora. Las sesiones vacías se ocultan («Mostrar sesiones vacías»); al arrancar, las sesiones que quedaron «en curso» se cierran.
- [mejora] **Filtros de recetas:** Los filtros de las recetas quedan separados del buscador.
- [arreglo] **Puertos de los Ubiquiti EdgeSwitch X:** Los EdgeSwitch X (ES-10X, ES-18X…) ya muestran qué puertos están
  activos y cuáles son de fibra. Estos equipos no tienen «show interfaces status»: se lee «show interfaces GigabitEthernet 1-N»
  (verificado en un ES-18X real).

## Versión 2.15.0
- [nuevo] **Consola nueva:** La consola web es ahora una terminal clásica con colores, autocompletado y protección ante
  comandos peligrosos. Colores por significado según el sistema (prompt, rutas y comandos, verbos, clave=valor, IP, estados
  activos, caídos y deshabilitados), tres temas (Sala de control, Grafito y Alto contraste) y una línea de comando fija con
  autocompletado (texto fantasma, sugerencias del sistema del equipo, Tab, historial con ↑) y comandos frecuentes. Antes de un
  comando que corta el servicio (reload, reboot, borrar la configuración) pide confirmación; el modo **solo lectura** bloquea
  los cambios; buscar en la salida, tamaño de letra, copiar, descargar el registro y pantalla completa. Si un comando cambia la
  configuración, lo avisa en verde y pone un respaldo en cola (origen «Consola»).
- [nuevo] **Operar › Consola:** Una página nueva reúne las sesiones de consola, varias consolas a la vez, consultas a muchos
  equipos, recetas, grabaciones y herramientas. Sesiones con lanzador (favoritos, recientes, grupos, Ctrl K), varias consolas a
  la vez (1, 2 o 4), compartir en solo lectura y archivos del equipo por SFTP; **multi-equipo** (la misma consulta en N equipos,
  con las respuestas agrupadas en iguales y distintas; los cambios van como solicitud de cambio); **recetas** paso a paso con
  variables, revisadas contra la documentación oficial de Cisco, MikroTik y Extreme Networks, y las propias de cada usuario;
  **grabaciones** de cada sesión con búsqueda y reproductor (1×, 2×, 4×, marcas de comandos peligrosos, exportar; 180 días);
  **herramientas** (ping, traceroute, puerto TCP y DNS desde el servidor) y **acceso**: consola por rol (sin consola, solo
  lectura, lectura y escritura), comandos prohibidos y aprobación previa por grupo, con solicitudes de acceso con motivo y plazo.
- [nuevo] **Asistente IA:** Un asistente de IA opcional ayuda en la consola, en la comparación de versiones y en Cumplimiento,
  y nunca ejecuta nada. Está desactivado por omisión; cada organización conecta su proveedor: Anthropic (Claude), OpenAI, Google
  (Gemini), Mistral o cualquier servicio compatible con OpenAI. Antes de enviar se ocultan siempre contraseñas, comunidades SNMP
  y claves. En la consola (panel con preguntas sugeridas y comandos con su riesgo, Copiar, Insertar y «Enviar como solicitud de
  cambio»), en la barra superior, en la comparación de versiones («✦ Explicar este cambio») y en Cumplimiento («✦ ¿Cómo lo
  corrijo?»). Roles que pueden usarlo, límite diario, uso del mes y cada pregunta en Auditoría.
