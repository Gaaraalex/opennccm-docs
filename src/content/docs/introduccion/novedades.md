---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.15.0 y las versiones anteriores."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

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

## Versión 2.13.0
- **Puertos en todas las plataformas.** El estado de los puertos se lee con la orden de cada fabricante: Ubiquiti
  EdgeSwitch y UniFi (FastPath), Huawei, H3C/Comware, HPE ProCurve/Aruba OS-Switch, Aruba AOS-CX, Cisco IOS/IOS-XE,
  NX-OS, ASA/FTD y WLC, Arista, Dell, TP-Link y demás switches con CLI tipo Cisco, Juniper, Extreme EXOS, Nokia SR OS,
  EdgeRouter/USG/VyOS, FortiGate, Palo Alto, Check Point, Linux (también airOS, airFiber y UniFi AP) y pfSense/OPNsense.
  Si el equipo no responde a ninguna, los puertos salen de la configuración (apagado o habilitado).
- **Frente fiel al modelo.** Una fila en routers y switches pequeños (hEX, RB4011 con su separación, US-8, firewalls de
  escritorio) y dos filas en los grandes, en bloques como en el equipo (CRS326 de 4 en 4 con los SFP+ abajo; UniFi,
  EdgeSwitch y Cisco de 6 en 6 con los SFP de dos en dos). Los SFP sin tipo se reconocen por el modelo (ES-24: 25 y 26).
- **Parte de atrás: fuentes y ventiladores.** Botón «Atrás» en la franja de puertos: fuentes de alimentación y
  ventiladores en verde si funcionan y en rojo si fallan o están sin corriente; aviso en la franja si alguno falla.
  Se lee en el respaldo (MikroTik, Cisco, Juniper, Huawei, HPE, Aruba, Arista, FastPath, Extreme y FortiGate).
- **Ficha con puertos, ajustes de diseño:** resumen en la columna derecha, números fuera del contorno de selección,
  tabla Interfaces en una línea por puerto con 10 a la vista y barra para desplazarse, «Dirección», «Bridge» o «Red»
  según el puerto, frente desplazable en el móvil y cabecera del equipo ordenada en pantallas estrechas.

## Versión 2.12.0
- **Puertos en la ficha del equipo.** Una franja entre la cabecera y las pestañas dibuja el frente del equipo con cada puerto en
  su orden físico (RJ45 de cobre, jaula SFP con o sin módulo; dos filas en equipos grandes) y su estado: activo, sin enlace,
  apagado o sin módulo. Al tocarlo se ven su descripción, velocidad, dirección y vecino. Pestaña nueva **Puertos** con la tabla
  de interfaces, filtros, «Exportar CSV» y «Lo que dice el respaldo» (la línea de la configuración y la de estado). El estado se
  lee en la misma conexión del respaldo: MikroTik, Cisco IOS/IOS-XE, ASA/FTD y Juniper; en el resto, apagado o habilitado según
  la configuración.
- **Restaurar una copia en otro equipo del mismo modelo.** Desde la versión o el menú «…» de la ficha: en otro equipo de
  OpenNCCM, en uno nuevo por SSH (IP, usuario y contraseña, que no se guardan) o por cable de consola conectado al PC del
  administrador (puerto serie desde Chrome o Edge). Primero se valida que el modelo coincide y se muestran los comandos; el
  equipo de origen y sus copias no se tocan.

## Versión 2.11.1
- **Mapa de la red: el clic en un equipo vuelve a abrir su panel.** Con un clic de ratón no pasaba nada; ahora se abre
  el panel con cómo se reconoció, sus enlaces y «Agregar a OpenNCCM» o «Abrir el equipo».
