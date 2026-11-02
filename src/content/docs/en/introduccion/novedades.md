---
title: "What's new"
description: "What's new in OpenNCCM 2.18.0 and earlier versions."
---

The latest 6 versions. The release notes are written in Spanish; the full history is at [opennccm.com/en/changelog](https://opennccm.com/en/changelog.html) and every version can be downloaded from [GitHub](https://github.com/Gaaraalex/opennccm/releases).

<div lang="es">

## Versión 2.18.0
- **Botón «Soporte profesional»** en la barra superior, a la izquierda de «Apoya OpenNCCM»: un enlace a la página de soporte de pago
  (en otra pestaña) con una animación suave que se detiene si el sistema pide reducir el movimiento. No cambia ninguna función;
  el administrador lo oculta para todos en **Ajustes › Organización**.
- **Base de conocimiento (Equipo › Base de conocimiento):** cada caso resuelto queda escrito con síntoma, causa, pasos con sus
  comandos («Copiar» sin la clave oculta y «Abrir en consola», que lo deja escrito sin ejecutarlo), comprobación y prevención.
  «Falta documentar» se llena sola con las alarmas críticas cerradas y los cambios revertidos (y, si se activa, las sesiones de
  consola de más de 15 min); una alarma crítica ya no se cierra sin caso o enlace a uno existente. Los operadores envían a
  revisión y el administrador aprueba o pide cambios; «Proponer cambio» en casos ajenos, versiones, comentarios, «Me sirvió»,
  «Convertir en configlet», asistente IA para proponer causa y comprobación, casos parecidos y resumen por correo los lunes.
  Solo para administradores y operadores (solo lectura, si el administrador lo activa); las contraseñas, claves y comunidades
  SNMP se ocultan al guardar y cada lectura y edición queda en Auditoría.
- **Restaurar en un servidor nuevo:** `sudo opennccm restore` con una copia que incluye la clave reemplaza la que creó el
  instalador (la anterior queda como `secret.key.antes-de-restaurar-FECHA`); antes se quedaba con la del instalador y las
  configuraciones y contraseñas no se podían leer. Si la copia no trae la clave y la del servidor no descifra los datos
  restaurados, el comando lo avisa y dice qué hacer en lugar de terminar con «Restaurado.».
- **Restaurar con PostgreSQL:** `sudo opennccm restore` también funciona con PostgreSQL (`pg_restore`); una copia de otra base
  de datos (SQLite en un servidor con PostgreSQL o al revés) se rechaza con el motivo.

## Versión 2.17.0
- **Operar › Consola:** al elegir un equipo se vuelve a abrir su consola, y en **Recetas** con «Todas» y «Todos los fabricantes»
  se ven todas (en la 2.16.0 un fallo de la página dejaba las dos cosas sin funcionar).
- **Herramientas con parámetros:** detrás de la IP o el nombre se pueden poner las opciones de siempre, de Windows o de Linux:
  `8.8.8.8 -t` (ping continuo hasta pulsar **Detener**), `-n 10`, `-l 1400 -f`, `-i 0.2`, `--ttl 5`; traceroute `-h 30 -q 3`,
  `-I` o `-T -p 443`; puerto TCP `host:443 -c 5`; DNS `ejemplo.com MX @1.1.1.1` o `-x 8.8.8.8`. Debajo de la casilla se ven las
  de cada herramienta. La salida llega a medida que se produce. Solo se aceptan esas opciones (nada se pasa tal cual al
  sistema). El instalador y `sudo opennccm update` instalan `dnsutils` (dig) para los tipos de registro DNS.
- **Chat del asistente:** solo nombra equipos que existen en el inventario; la confirmación de una acción lista los equipos con
  su número («Respaldar 3 equipos»); la barra superior se acomoda con el chat abierto y el chat vacío saluda con sugerencias.
- **Errores en pocas palabras:** en el Panel («Necesita tu atención») y en el chat, los fallos de conexión y de respaldo salen
  con un motivo corto y traducido («sin respuesta por SSH», «credencial rechazada», «cambió la clave SSH del equipo», «falta la
  contraseña enable»…); el mensaje completo sigue en la ficha del equipo.

## Versión 2.16.0
- **Chat del asistente en todo el sistema:** el botón «Asistente» de la barra superior (con el logo del proveedor) abre un chat a
  la derecha en cualquier página. Consulta OpenNCCM con funciones de solo lectura (equipos, respaldos, alarmas, cambios y
  versiones, cumplimiento, ciclo de vida, búsqueda en configuraciones) y el manual, con el rol y los grupos del usuario y los
  secretos ocultos. Respuestas cortas, equipos en una línea, como mucho 2 botones y «Más acciones», y la fuente. Las acciones que
  cambian algo (respaldar, crear una tarea, crear una solicitud de cambio) piden confirmación en el chat. La conversación se
  guarda por usuario; cada pregunta queda en Auditoría con las funciones usadas.
- **Recetas:** al menos 10 por fabricante para Cisco IOS, MikroTik RouterOS, Extreme EXOS y Extreme VOSS / Fabric Engine (nombre,
  usuarios y contraseñas, SSH, HTTPS, SNMP, syslog hacia OpenNCCM, RADIUS, NTP, VLAN, troncales, rutas, guardar…). La consola
  reconoce VOSS (autocompletado, frecuentes, paginado y comandos que cortan el servicio).
- **Herramientas de la consola:** ping y traceroute funcionan en el servidor (el servicio tiene permiso para ICMP y se instalan
  `iputils-ping` y `traceroute` al instalar o actualizar). Si traceroute tarda, se ve lo que alcanzó a responder.
- **Asistente IA:** logo de cada proveedor en un cuadrito con el color de la marca (Ajustes, consola y barra superior), tarjetas
  de proveedor de la misma altura; si al guardar no hay ningún rol marcado, quedan administradores y operadores.
- **Consola:** el aviso verde de cambio sale al salir del modo configuración (tras el «end»), nunca antes del comando; el panel de
  Operar › Consola tiene una sola fila de botones y cabe en la ventana; textos en singular («1 sesión abierta»).
- **Grabaciones:** el reproductor muestra lo escrito y lo visto con los colores de la consola y la lista de comandos con su hora;
  las sesiones vacías se ocultan («Mostrar sesiones vacías»); al arrancar, las sesiones que quedaron «en curso» se cierran.
- Recetas: los filtros quedan separados del buscador.
- **Puertos de los Ubiquiti EdgeSwitch X (ES-10X, ES-18X…):** ya se ve qué puertos están activos y cuáles son de fibra. Estos
  equipos no tienen «show interfaces status»: se lee «show interfaces GigabitEthernet 1-N» (verificado en un ES-18X real).

## Versión 2.15.0
- **Consola nueva:** terminal clásica con colores por significado según el sistema (prompt, rutas y comandos, verbos,
  clave=valor, IP, estados activos, caídos y deshabilitados), tres temas (Sala de control, Grafito y Alto contraste) y una línea
  de comando fija con autocompletado (texto fantasma, sugerencias del sistema del equipo, Tab, historial con ↑) y comandos
  frecuentes. Antes de un comando que corta el servicio (reload, reboot, borrar la configuración) pide confirmación; el modo
  **solo lectura** bloquea los cambios; buscar en la salida, tamaño de letra, copiar, descargar el registro y pantalla completa.
  Si un comando cambia la configuración, lo avisa en verde y pone un respaldo en cola (origen «Consola»).
- **Operar › Consola** (nuevo): sesiones con lanzador (favoritos, recientes, grupos, Ctrl K), varias consolas a la vez (1, 2 o
  4), compartir en solo lectura y archivos del equipo por SFTP; **multi-equipo** (la misma consulta en N equipos, con las
  respuestas agrupadas en iguales y distintas; los cambios van como solicitud de cambio); **recetas** paso a paso con variables,
  revisadas contra la documentación oficial de Cisco, MikroTik y Extreme Networks, y las propias de cada usuario;
  **grabaciones** de cada sesión con búsqueda y reproductor (1×, 2×, 4×, marcas de comandos peligrosos, exportar; 180 días);
  **herramientas** (ping, traceroute, puerto TCP y DNS desde el servidor) y **acceso**: consola por rol (sin consola, solo
  lectura, lectura y escritura), comandos prohibidos y aprobación previa por grupo, con solicitudes de acceso con motivo y plazo.
- **Asistente IA** (desactivado por omisión; cada organización conecta su proveedor): Anthropic (Claude), OpenAI, Google
  (Gemini), Mistral o cualquier servicio compatible con OpenAI. Antes de enviar se ocultan siempre contraseñas, comunidades SNMP
  y claves. En la consola (panel con preguntas sugeridas y comandos con su riesgo, Copiar, Insertar y «Enviar como solicitud de
  cambio»), en la barra superior, en la comparación de versiones («✦ Explicar este cambio») y en Cumplimiento («✦ ¿Cómo lo
  corrijo?»). Roles que pueden usarlo, límite diario, uso del mes y cada pregunta en Auditoría. Nunca ejecuta nada.

## Versión 2.14.0
- **API para apps móviles** (/api/mobile): sesión de un teléfono con usuario y contraseña (y código de dos pasos si la cuenta
  lo tiene), panel, equipos, ficha con puertos de frente y de atrás, respaldo, versiones, alarmas, cambios con aprobación y
  avisos, con los mismos roles y grupos que la web; las acciones quedan en Auditoría con «[Android]». Los teléfonos
  conectados aparecen en Mi cuenta › Tokens de API y se pueden revocar.
- **EdgeSwitch 18X:** frente con sus 16 RJ45 y los 2 SFP (gi17 y gi18), sin comillas en las descripciones y, atrás, su entrada
  de 24 V y «sin ventiladores». La ficha guarda lo que respondió el equipo al leer los puertos (pestaña Puertos, solo
  administradores) para corregir las plataformas que no den el estado de enlace.
- Aprobar o rechazar un cambio usa la misma comprobación en la web y en la API.

## Versión 2.13.1
- **Puertos de los EdgeSwitch con chip Realtek (por ejemplo ES-18X, puertos «gi1»…).** No salían: se probaba solo la orden
  de los EdgeSwitch clásicos. Ahora se lee también «show interfaces status» y, si el equipo no da la tabla, los puertos
  salen de la configuración sea cual sea su estilo. El firmware es el real (1.11.1) y no la versión del cargador, y el
  modelo se toma de la cabecera de la configuración.
- **Ficha con puertos:** los números y rótulos quedan a 12 px del contorno del puerto elegido; en el móvil, la tabla
  Interfaces va en dos renglones por puerto y la ruta muestra solo «‹ Dispositivos».

</div>
