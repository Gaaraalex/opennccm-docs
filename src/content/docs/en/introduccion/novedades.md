---
title: "What's new"
description: "What's new in OpenNCCM 2.27.0 and earlier versions."
resumen:
  - "2.27.0 lays out the map in 10 ways (stepped, radial, by site, by role, tree, on a floor plan, “My layout”…)."
  - "Nodes group devices by place (branch, tower, building) and the map can be filtered by node."
  - "Extreme VOSS / Fabric Engine gains ports, power supplies and fans, neighbors on the map, syslog and a recipe to change the password."
---

The latest 6 versions. The release notes are written in Spanish; the full history is at [opennccm.com/en/changelog](https://opennccm.com/en/changelog.html) and every version can be downloaded from [GitHub](https://github.com/Gaaraalex/opennccm/releases).

<div lang="es">

## Versión 2.27.0
- **Distribución del mapa:** Un menú sobre el mapa con 10 formas de ordenar los equipos: libre, escalonada hacia abajo o
  hacia la derecha, radial, por sitio, por función, circular, árbol plegable, sobre un plano y «Mi distribución», que se guarda
  arrastrando equipos, solo para ti o para todo el equipo.
- **Nodos:** Agrupa los equipos por lugar (sucursal, torre, edificio). Se crean en Administración › Nodos o al crear o
  editar un equipo, como las credenciales, y el filtro «Nodo» del mapa muestra solo los equipos de ese nodo, o todos.
- **IP de los MikroTik encontrados por RoMON:** El mapa toma su IP de los vecinos MNDP/LLDP o de las tablas ARP, así ya no
  salen solo con la MAC.
- **Receta VOSS para cambiar el usuario y la contraseña:** En Recetas, «Cambiar el usuario y la contraseña de la CLI» de
  Extreme VOSS / Fabric Engine, con admin por defecto, y guarda la configuración al terminar.
- **Puertos y parte de atrás en Extreme VOSS:** La ficha de los VSP / Fabric Engine muestra qué puertos tienen enlace y
  las fuentes y los ventiladores.
- **Extreme VOSS en el mapa y en syslog:** El mapa lee sus vecinos LLDP, y syslog detecta sus cambios de configuración y
  cada «save config».
- **Cambios que renombran el equipo:** Una solicitud que cambiaba el nombre del equipo (y su prompt) se quedaba esperando
  y no guardaba la configuración. Ahora se relee el prompt antes de salir y guardar.
- **Referencia y tabla MAC en VOSS:** La configuración de referencia respeta los bloques que terminan en «exit», y la
  búsqueda de MAC reconoce los puertos «Port-1/2».
- **Equipos del mapa marcados como perdidos:** Un equipo de OpenNCCM ya no se pinta entero como nuevo o perdido: el enlace
  perdido se dibuja aparte, en su puerto.

## Versión 2.26.0
- **Buscar una MAC o una IP:** Escribe una MAC o una IP en el buscador de la barra superior y OpenNCCM dice en qué switch
  y en qué puerto está conectado, con su VLAN, la descripción del puerto, cuándo se vio y el camino. Las tablas MAC y ARP se
  leen en cada respaldo y queda un historial para «Visto por última vez»; «Leer las tablas ahora» las vuelve a leer.
- **Aviso de vecino nuevo o perdido:** Una alarma cuando aparece un equipo que antes no estaba o deja de verse uno que sí
  estaba (LLDP, CDP, MNDP y RoMON), con su ficha, «Es conocido» y «Preparar shutdown del puerto». El perdido avisa recién tras 2
  lecturas y la alarma se cierra sola si vuelve. El mapa resalta los cambios de las últimas 24 h. Se activa en Ajustes › Mapa de
  la red.
- **Configuración de referencia por modelo:** Elige el equipo bien configurado y compara contra él a los demás del
  mismo modelo, por sección (AAA, SNMP, NTP, VLAN…), sin nombre, IP de gestión, descripciones ni claves. Se pueden ignorar
  líneas y preparar una solicitud de cambio para igualarlos, que siempre pasa por aprobación.
- **Comandos favoritos en la consola:** Una barra sobre la terminal con tus comandos de verificación por tipo de equipo;
  un clic los escribe y envía. Los que cambian la configuración se escriben sin enviar. Se ordenan, editan y, los
  administradores, comparten con todo el equipo.
- **RoMON en redes reales:** El mapa no encontraba los MikroTik por RoMON en RouterOS 7 (la salida real trae la marca
  «A», el camino en varias líneas y la identidad solo con «proplist»). Ahora salen todos, también en RouterOS 6.
- **La «ñ» de los nombres MikroTik:** Los nombres como «Cabañas» ya no salen como «CabaF1as», ni en el mapa ni por
  RoMON.
- **«Compartir» en Operar › Consola:** Es un ícono, igual que en la consola de la ficha del equipo.

## Versión 2.25.0
- **MikroTik por RoMON en el mapa:** Con «Buscar también los MikroTik por RoMON» (Ajustes › Mapa de la red,
  desactivado de fábrica), el respaldo de cada MikroTik con RoMON activado encuentra los que están a varios saltos o sin
  dirección IP, y el mapa los une con una línea punteada. RoMON no dice por qué puerto se conectan, así que no cuentan para el
  análisis de impacto ni para Puertos sin uso.
- **«Reconocer todas» con cientos de alarmas:** Con muchas alarmas aparecía «OpenNCCM se está reiniciando» y después
  «Method Not Allowed». Ahora responde enseguida, «Deshacer» funciona con miles y una recarga vuelve a la lista. Las alarmas
  críticas de CVE se reconocen sin pedir un caso de la Base de conocimiento: se resuelven al actualizar el firmware.
- **Mapa del documento de la red ordenado:** Cada grupo de equipos enlazados se arma por niveles, los grupos van uno
  al lado del otro y los equipos sin enlaces al final, en una grilla: ya no se apilan ni se encima nada.
- **Documento de la red más prolijo:** Cada título va en la misma página que su tabla, todas las tablas tienen el
  mismo ancho, la columna «Sitio» solo sale si hay más de uno y Cumplimiento avisa si todavía no se auditó. El logo se sube con
  un botón propio, se ve en la portada de la vista previa y se puede quitar.
- **Impacto y puertos más claros:** La frase dice «quedan aislados 3 equipos y otros 2 de otras ubicaciones pierden la
  conexión», «Aprobar» se ve claramente desactivado hasta marcar «Leí el impacto», Puertos sin uso nunca muestra más días de
  los que hay datos y los textos usan el singular cuando es uno.

## Versión 2.24.0
- **¿Qué se cae si toco este equipo?:** Cuando una solicitud de cambio reinicia equipos o apaga puertos, OpenNCCM
  calcula con el mapa de la red (LLDP/CDP) qué queda sin servicio: en rojo lo que queda aislado, en ámbar los routers y
  sucursales que se cortan y en verde lo que sigue por otro camino, con una frase como «Si reinicias CORE-01 quedan aislados 3
  equipos». «Aprobar» espera a que se marque «Leí el impacto», el impacto queda en Auditoría y la solicitud se puede dejar
  para una hora (la ventana de mantenimiento). Dice también lo que no sabe: los equipos que no informan vecinos.
- **Firmware de varios equipos en el orden que menos corta:** Con reinicio, primero se actualizan los que no aíslan
  a nadie y, de a uno, los que sí; nunca dos que juntos dejan más sin servicio. El mismo análisis aparece en la ficha, en las
  tareas que reinician y en el mapa («¿Qué se cae?»).
- **Puertos sin uso:** Informe nuevo con los puertos de acceso de cada switch sin enlace hace más de 30, 60 o 90
  días, cuántos quedan libres y qué switches están casi llenos. Excluye uplinks, troncales, 802.1X y excepciones, y prepara el
  apagado de los elegidos como solicitud de cambio, con la sintaxis de cada fabricante. El historial se empieza a anotar con
  esta versión: hasta tener los días pedidos, el informe dice desde cuándo hay datos.
- **Documento de la red:** Un PDF o un Word (.docx) por sitio, grupo o toda la red con inventario, mapa, VLAN e IP,
  enlaces, cumplimiento y vulnerabilidades y el último respaldo de cada equipo, con portada, logo del cliente y la opción de
  ocultar las IP públicas. Nunca lleva contraseñas ni claves. Avisa si la red cambió desde que se generó.
- **Operar › Consola como la consola de la ficha:** Cada sesión tiene A−/A+, «Ampliar» en la ventana, abrir en una
  ventana aparte y pantalla completa; el botón «Asistente» lleva el logo del proveedor y la cabecera del asistente se oculta
  desde ella misma con «Ocultar». Además, el configlet que prepara el asistente ya aplica a sus tipos de equipo.

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

</div>
