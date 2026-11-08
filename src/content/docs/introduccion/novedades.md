---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.32.0 y las versiones anteriores."
resumen:
  - "2.32.0 muestra el progreso de «Respaldar todos»: porcentaje, correctos, con error y en cola, con Cancelar y Reintentar los que fallaron."
  - "Se acabaron los errores falsos de SSH con muchos respaldos a la vez, y los fallos pasajeros se reintentan solos."
  - "El informe nuevo «Equipos del mapa» dice qué equipos del mapa faltan en Dispositivos, con un PDF para escribir sus IP."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

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
