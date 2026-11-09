---
title: "What's new"
description: "What's new in OpenNCCM 2.33.0 and earlier versions."
resumen:
  - "2.33.0 keeps the buttons that run or apply commands disabled until you tick the notice box; once per page is enough."
  - "WatchGuard creates the .fxi image again and no longer leaves admin sessions open on the Firebox."
  - "Ubiquiti EdgeSwitch: VLANs by request, change syslog, “Roll back to this version”, recipes and compliance fixed, and 26 more verified recipes."
---

The latest 6 versions. The release notes are written in Spanish; the full history is at [opennccm.com/en/changelog](https://opennccm.com/en/changelog.html) and every version can be downloaded from [GitHub](https://github.com/Gaaraalex/opennccm/releases).

<div lang="es">

## Versión 2.33.0
- **«Ejecutar» espera la casilla del aviso:** En Configlets, Recetas y el asistente, los botones que ejecutan o aplican
  comandos quedan desactivados hasta marcar «Leí el aviso…». Con marcarla una vez basta para toda la página.
- **Configlets:** El panel de la derecha muestra los comandos completos; antes quedaban en una franja de una línea con
  su propia barra y no se veía qué se iba a ejecutar.
- **WatchGuard: imagen .fxi:** Crear la imagen y «Probar» fallaban siempre («SimpleNamespace is not mapped»). Ahora
  la imagen se crea, se recibe cifrada, se guarda con su clave y se borra del Firebox.
- **WatchGuard: sesiones de administración:** Los respaldos, las solicitudes y la consola web cierran su sesión de
  Fireware. Antes se acumulaban en el Firebox y una solicitud que fallaba dejaba el modo de edición tomado: el Firebox
  rechazaba la imagen .fxi y los cambios de otros administradores.
- **Ubiquiti EdgeSwitch (FastPath):** Las solicitudes crean VLAN («vlan database»); el nombre, el SSH y la web van en
  el modo privilegiado; «Volver a esta versión» quita el syslog, la comunidad SNMP y devuelve los puertos a la VLAN 1; el
  syslog del switch avisa de cada cambio; y las recetas de nombre, SSH/HTTPS, SNMP, SNTP y syslog funcionan en 1.9.3.
- **Cumplimiento de Ubiquiti EdgeSwitch:** «SSH habilitado», «Sin HTTP sin cifrar» y «SNTP» daban el resultado al
  revés (el switch no muestra lo que viene de fábrica). Se corrigen solas en las instalaciones que ya las tienen.
- **Solicitudes de cambio:** Un rechazo del equipo que llegaba tarde ya no se pierde (la solicitud terminaba «bien»
  sin aplicarse); un fallo pasajero del saludo SSH se reintenta.
- **Extreme VOSS, Juniper, Cisco y OPNsense:** VOSS restaura el RADIUS y el banner que sobran; Junos lee la serie de
  «show chassis hardware», ignora el aviso de «commit confirmed» en LLDP y nunca toca fxp0 al restaurar; Cisco no copia el
  certificado, la licencia ni el client-id de otro equipo y lee los puertos de los routers IOS-XE; OPNsense 26.7 conecta bien;
  y un equipo que se ve a sí mismo por un lazo ya no cuenta como vecino.
- **Recetas verificadas en el laboratorio:** 26 recetas más llevan el sello «Verificada» tras 3 rondas seguidas sin
  fallos: Extreme VOSS 9.3, Juniper Junos 14.1 (vMX) y Ubiquiti EdgeSwitch 1.9.3 (equipo físico).

## Versión 2.32.0
- **Errores falsos de SSH:** Equipos en línea quedaban con error («QueuePool limit of size 5 overflow 10 reached») y
  había que respaldarlos a mano: con muchos respaldos a la vez OpenNCCM se quedaba sin conexiones a su base. Ahora cada respaldo
  la suelta mientras habla con el equipo, y la página de Dispositivos ya no se queda en negro durante «Respaldar todos».
- **Respaldar todos con su progreso:** Un panel con el porcentaje, la barra, los correctos, con error, en curso y en
  cola, y cada fila de la lista que se actualiza sola con su paso. Se puede salir de la página, cancelar y, al terminar,
  reintentar solo los que fallaron.
- **Los respaldos que fallan se comprueban solos:** Si la falla fue pasajera (sesión cortada con el puerto respondiendo,
  base ocupada) se reintenta; si el equipo no responde o rechaza la contraseña, se avisa con lo que se comprobó.
- **Informe «Equipos del mapa»:** Los equipos del mapa de la red cruzados con Dispositivos: cuáles ya están agregados y
  respaldados y cuáles no, sin IP ni MAC, con dónde escribir la IP de los que faltan (en la página o en un PDF para llenar).
- **El aviso completo en todos lados:** Recetas, Configlets, Cumplimiento, Multi-equipo, la ficha y el asistente
  muestran el aviso entero con el Foro, GitHub y la casilla, y cada aceptación queda en Auditoría.
- **Configlets:** Las plataformas sin equipos ya no se ven apagadas: se ven igual que en Recetas.

## Versión 2.31.0
- **Respaldar todos sin «Internal Server Error»:** Con varios respaldos a la vez, uno podía terminar en error
  («database is locked») y su versión no se guardaba. Ahora cada respaldo espera su turno para escribir.
- **Buscar dentro de una versión:** Al ver una copia, «Buscar en esta versión» resalta las líneas que tienen el texto o
  la IP y salta entre ellas con Intro.
- **Puertos de los MikroTik con muchos SFP:** El frente del CRS326-24S+2Q+ (y de los CRS con muchos SFP) muestra los
  SFP+ en dos filas y cada QSFP+ dividido en sus 4 interfaces («1-1» a «2-4») en su propio grupo.
- **Número de serie de los MikroTik:** Se lee del RouterBOARD («/system routerboard print») o de la cabecera del
  /export; antes salía vacío.
- **Comprobar ahora, aunque otro equipo se esté comprobando:** La comprobación de firmware de un equipo ya no se
  rechaza con «Ya hay una comprobación en curso».
- **Reintento al entrar por SSH:** Un fallo pasajero de un equipo ocupado («No existing session») se reintenta; una
  contraseña mala no.
- **MikroTik RouterOS:** «Volver a esta versión» restaura los elementos que el /export de RouterOS 7 parte en dos
  líneas; restaurar en otro equipo e igualar a la referencia ya no fallan por el «keymat-provider» que RouterOS 7 crea solo; en
  RouterOS 6, un comando que muestra su avance («/certificate sign») ya no hace perder el siguiente.
- **Recetas de RouterOS:** «Aplicar como solicitud» ya no quita pasos que cambian algo, «Limitar SSH y Winbox» sirve
  en RouterOS 6 y 7, y hay una receta de NTP para RouterOS 6.
- **Extreme EXOS:** El syslog detecta los cambios hechos por fuera; restaurar una copia funciona (las líneas de punto
  de partida de EXOS y las cuentas que ya existen); igualar a la referencia ya no copia el nombre ni la contraseña del switch;
  buscar una MAC encuentra los puertos de EXOS; y las recetas de contraseña y SNMP usan la sintaxis de EXOS 33.
- **Recetas y correcciones verificadas en el laboratorio:** 25 recetas (MikroTik RouterOS 6.49.23 y 7.24.5, Extreme
  EXOS 33.6.1.14) y 8 correcciones de cumplimiento de MikroTik llevan el sello «Verificada», tras 3 rondas seguidas sin fallos.

## Versión 2.30.0
- **Recetas para todos los equipos:** 758 recetas, con al menos 10 para cada tipo de equipo con línea de comandos (131 de
  133), entre ellos Sophos, Cisco SD-WAN, Brocade FC, Ciena, Calix, Ericsson, Nokia ISAM, D-Link, Hirschmann, Yamaha, Eltex,
  Teldat, AudioCodes, ScreenOS, Hillstone, WatchGuard y Prisma SD-WAN.
- **Recetas por equipo y por tarea:** La pestaña Recetas tiene tres columnas: tus plataformas y todas las marcas, sus
  recetas agrupadas por categoría y el detalle. «Por tarea» muestra en qué plataformas hay receta para lo que quieres hacer, y la
  búsqueda agrupa por plataforma y dice dónde está la palabra.
- **Configlets y scripts en columnas:** Primero lo que puedes ejecutar en tus equipos, con la plataforma en palabras,
  el sello «Verificada», el aviso con el foro y GitHub y la casilla obligatoria antes de crear la solicitud.
- **Vista previa de «Ejecutar» un configlet:** Mostraba trozos de código en lugar de los comandos; ahora muestra los
  valores escritos y no deja enviar con una variable vacía.
- **Aviso al aplicar comandos:** Las correcciones de Cumplimiento, Multi-equipo y el asistente IA llevan el aviso
  «Revisa los comandos antes de usarlos en producción», y las correcciones y Multi-equipo piden marcar la casilla antes de crear
  la solicitud. «Corregir N» deja elegir qué correcciones aplicar.
- **Comprobar ahora lee la versión del equipo:** En la pestaña Firmware, «Comprobar ahora» le pregunta al equipo su
  versión instalada antes de buscar la nueva, sin tener que respaldarlo.
- **Comprobación después de actualizar el firmware:** Cuando el equipo vuelve, OpenNCCM lee su versión y avisa si quedó
  en la nueva; si no, guarda en Eventos y en la solicitud el final del registro del equipo con el motivo.
- **Serie de los Ubiquiti:** Los airMAX, airFiber y AP UniFi muestran su número de serie (la MAC, como hace Ubiquiti), y
  se reconoce la serie escrita como «S/N».

## Versión 2.29.0
- **Equipos ZTE:** OLT ZXA10 C300, C320, C350 y C220, OLT TITAN C600, C610, C620, C650 y C680, y switches y routers
  ZXR10 (ZXROS), con respaldo, versión, modelo y serie.
- **Recetas para casi todos los equipos:** 422 recetas, con al menos 10 para 95 de los 133 tipos de equipo: Ubiquiti,
  ZTE, Huawei, H3C/HPE Comware, Juniper, Arista, Cisco NX-OS, IOS-XR y ASA, FortiGate, PAN-OS, Aruba, Dell, Nokia, F5, Citrix,
  pfSense, OPNsense, Linux y los equipos con CLI tipo Cisco, entre otros.
- **Sello «Verificada» en las recetas:** Las recetas probadas completas llevan el sello con la versión del sistema en
  la que se probaron, por ejemplo «Verificada · VOSS 9.3.0.0»; las demás dicen «Sin verificar». Hay un filtro «Solo
  verificadas» y un administrador puede poner o quitar el sello.
- **Aviso en las recetas:** Arriba de la lista, un aviso pide revisar cada receta antes de usarla en producción, porque
  OpenNCCM no tiene todas las plataformas para probarlas. Al aplicar una receta hay que confirmar que se revisaron los comandos, se
  avisa si el equipo tiene otra versión que la del sello, y cada receta se puede reportar en el foro o en GitHub.
- **Firmware y CVE de Ubiquiti:** airMAX, airFiber, los AP UniFi, el USG y el EdgeSwitch X muestran el firmware
  disponible y sus vulnerabilidades. La búsqueda de CVE usa además el modelo del equipo y cubre 70 tipos de equipo.
- **Copia de airOS como system.cfg:** En airMAX, airFiber y los AP UniFi, la copia de seguridad se descarga como
  system.cfg, lista para restaurar en el equipo.
- **Grupos y Nodos con panel lateral:** «Crear grupo» y «Crear nodo» están siempre arriba y abren un panel a la
  derecha, como en Credenciales; cada fila tiene Editar y Borrar.
- **Cambios de vecinos del mapa:** El panel ya no se abre cada vez que se entra al mapa; solo cuando hay cambios
  nuevos, y se puede abrir con el botón «Cambios de vecinos».

## Versión 2.28.0
- **Logos de marca:** Cada equipo muestra el logo de su marca (73 marcas, los 131 tipos de equipo) en Dispositivos, la
  ficha, el mapa, la consola, la búsqueda Ctrl K y las demás pantallas. Dispositivos tiene un filtro «Marca» y una fila de chips
  con cuántos equipos hay de cada una.
- **Distribuciones del mapa más legibles:** Cada distribución usa todo el mapa y los nombres nunca quedan por debajo de
  11 px. Ninguna línea cruza los nombres. Por sitio pone el equipo central al medio, Por función parte las columnas largas, el
  árbol plegable encuadra la rama que se abre y la bandeja «Sin ubicación» baja con la rueda. Debajo del mapa, una franja explica
  la distribución elegida y la leyenda se pliega.
- **Nodos más fáciles de usar:** Filtro «Nodo» y «Asignar al nodo» en Dispositivos, enlace a los equipos de cada nodo,
  Editar y Borrar a la vista, y un aviso propio para el nodo sin equipos. En el mapa, los vecinos de otros nodos salen
  atenuados con el nombre de su nodo.
- **Tipo de equipo en el mapa:** Las antenas MikroTik (RB911, SXT, LHG…) y los MikroTik con Wi-Fi activo salen como
  inalámbricos, y el administrador puede corregir el tipo de un equipo a mano.
- **Filtro de nodos del mapa:** Con un nodo elegido, los equipos de otros nodos salían como vecinos «que no están en
  OpenNCCM».

</div>
