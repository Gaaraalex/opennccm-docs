---
title: "Consola"
description: "La consola SSH en el navegador y el centro de consola."
curso: ["5.2"]
---

## Consola del equipo

1.  En **Dispositivos**, pulse el icono de consola de la fila del equipo, o el botón **Consola** en su página; también desde **Operar → Consola**. Arriba se ve «Consola · nombre» con la IP, el modelo y el sistema.
2.  Escriba en la **línea de comando** fija de abajo. Mientras escribe aparece en gris el resto del comando más probable para ese sistema y un menú de sugerencias: **Tab** completa, **↑ ↓** eligen y, con el menú cerrado, **↑** recorre el historial. **Frecuentes** ejecuta los más usados con un clic (los que reinician el equipo van en rojo).
3.  La salida se ve como en una terminal clásica, todo seguido, con colores por significado: el prompt en lima, rutas y comandos en azul, verbos en violeta, «clave=valor» en verde azulado y salmón, direcciones IP en cian, lo que está activo en verde, lo caído o con errores en rojo y lo deshabilitado en ámbar. Los colores dependen del sistema (RouterOS, IOS, VRP, Junos, EXOS, EdgeSwitch, Linux…).
4.  Barra superior: buscar en la salida (resalta lo encontrado), letra más chica o más grande, copiar todo, descargar el registro, tema (**Sala de control**, **Grafito** o **Alto contraste**), compartir, **Reconectar**, **Asistente** y pantalla completa.

| Protección | Qué hace |
| --- | --- |
| Comandos que cortan el servicio | reload, reboot, borrar la configuración (write erase, reset-configuration…): antes de enviarlos aparece «Este comando puede cortar el servicio», con **Cancelar** o **Ejecutar de todos modos**. |
| Solo lectura | El interruptor del pie bloquea los comandos que cambian la configuración y lo avisa en la salida. Si el rol del usuario solo permite lectura, queda fijo; el servidor lo aplica aunque el navegador no lo pida. |
| Comandos prohibidos del grupo | Lo que el administrador prohibió en el grupo del equipo no se envía. |
| Cambio detectado | Si un comando cambia la configuración, aparece en verde «# OpenNCCM: cambio detectado · respaldo vN en cola · se puede revertir» y a los 20 segundos se respalda el equipo (con origen «Consola»). |

El pie muestra el estado, cómo entró (con la credencial del equipo o con usuario y contraseña), el sistema, el cierre tras 15 minutos sin escribir y que la sesión queda en Auditoría y grabada (**● REC**). En MikroTik la consola entra en modo de líneas (sin colores del propio equipo) y en los demás sistemas apaga el paginado al conectar; si un equipo pagina igual, la consola sigue sola.

| Ajuste | Efecto |
| --- | --- |
| Iniciar sesión automáticamente (Ajustes → Seguridad y acceso) | Entra con la credencial asignada al equipo, sin pedir usuario ni contraseña; en Cisco, EdgeSwitch y similares también entra al modo privilegiado. Desactivado por omisión. |
| Quién puede abrirla y cómo (Operar → Consola → Acceso) | Ver «Centro de consola». |

## Centro de consola (Operar → Consola)

| Sección | Qué hace |
| --- | --- |
| Sesiones | A la izquierda, el lanzador con **favoritos** (★), **recientes** y los equipos **por grupo**, con buscador (**Ctrl K**). Cada equipo abre una pestaña de sesión (● REC); se ven de a **1**, **2** lado a lado o **4** en cuadrícula. En cada panel: **Compartir** copia un enlace de solo lectura (quien lo abre necesita usuario en OpenNCCM; el dueño ve «nombre mira») y **Archivos** abre los archivos del equipo por SFTP para bajarlos o subir uno (con la credencial del equipo; queda en Auditoría). |
| Multi-equipo | Elija un grupo o equipos sueltos, escriba el comando una vez y ejecútelo en todos. Las respuestas se agrupan en **Iguales** y **Distintos**, con las líneas distintas resaltadas. Solo se ejecutan consultas: si el comando cambia algo, se ofrece **Crear solicitud de cambio** (con aprobación, respaldo y reversión). Con el asistente activo, **✦ Analizar diferencias** explica qué tienen distinto y cómo igualarlos. |
| Recetas | Guías paso a paso («¿Qué quieres hacer?»), con filtros por categoría (Seguridad, Interfaces y VLAN, Servicios, Diagnóstico) y fabricante. Cada receta tiene introducción, **variables** que se sustituyen en los comandos, pasos numerados con **Copiar** e **Insertar** (en la consola activa), pasos «Ojo» en ámbar y un paso final «Comprobar». Abajo: **Aplicar como solicitud de cambio** (o **Ejecutar en la consola activa** si solo consulta), **Usar en multi-equipo** y **Duplicar y adaptar**; **\+ Nueva** crea una propia. Incluye al menos 10 recetas de las tareas más comunes para Cisco IOS, MikroTik RouterOS, Extreme EXOS y Extreme VOSS / Fabric Engine (nombre del equipo, usuarios y contraseñas, SSH, acceso web por HTTPS, SNMP, syslog hacia OpenNCCM, RADIUS, NTP, VLAN, guardar la configuración, diagnóstico…), con el enlace a la documentación oficial del fabricante cuando la hay. |
| Grabaciones | Cada sesión: usuario, equipo, hora, duración y comandos, con marca roja si hubo un comando que corta el servicio. Busca en lo escrito y en lo visto (por ejemplo «reload»). El reproductor tiene línea de tiempo con esas marcas, velocidad 1×, 2× o 4× y **Exportar** (texto). Se guardan 180 días (se puede cambiar). |
| Herramientas | Ping, Traceroute, Puerto TCP y DNS desde el servidor de OpenNCCM, con la salida en colores, un resumen (pérdida, tiempo, saltos…) y **Abrir consola** si el destino es un equipo de OpenNCCM. Ping y traceroute necesitan permiso para enviar ICMP: el instalador y `sudo opennccm update` se lo dan al servicio. |
| Acceso (administradores) | Por rol: **Sin consola**, **Solo lectura** o **Lectura y escritura**. General: grabar todas las sesiones, aplicar los comandos prohibidos, cierre por inactividad y días que se guardan las grabaciones. Por grupo: **Acceso normal** o **Requiere aprobación** y su lista de comandos prohibidos (lo que empieza así, o una expresión regular entre barras). Las **solicitudes de acceso** llegan con motivo y plazo; **Aprobar por N h** o **Rechazar**. La pestaña muestra cuántas hay pendientes. |
