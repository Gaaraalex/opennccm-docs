---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.36.0 y las versiones anteriores."
resumen:
  - "2.36.0 guarda en cada copia de seguridad la versión de firmware que tenía el equipo, y avisa cuando cambió entre dos copias."
  - "Al comparar dos copias de firmware distinto, las diferencias que trajo la actualización salen en ámbar; revertir a otro firmware avisa antes."
  - "Opcional: logos abreviados en tamaño chico para las marcas cuyo logo es su nombre escrito, y el menú «Marca» con buscador."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

## Versión 2.36.0
- **Firmware de cada copia de seguridad:** Cada copia guarda la versión de software que tenía el equipo cuando se hizo,
  leída en el mismo respaldo. Se ve en la línea de tiempo (azul la de hoy, ámbar otra, «sin registrar» en las copias viejas),
  con un aviso «Firmware actualizado» entre dos copias de firmware distinto, en el inventario, en la versión abierta (con la
  línea de la que sale y un aviso antes de revertir a una versión de otro firmware) y al comparar, donde las diferencias que
  trajo la actualización salen en ámbar. El archivo descargado lleva la versión en el nombre.
- **Logos abreviados en tamaño chico (opcional):** Administración › Ajustes › Organización. Las 10 marcas cuyo logo es
  su nombre escrito (Cisco, Juniper, Nokia, NEC, Netgear, Hitachi, Siemens, Supermicro, Dell y Zyxel) usan su símbolo o sus
  iniciales donde el logo se ve muy pequeño. Apagado por omisión: el logo normal en todos los tamaños.
- **Menú «Marca» de Dispositivos:** Con buscador y barra para bajar; ya no se alarga hasta el final de la página.
- **Menús desplegables:** Junto al borde derecho de la pantalla se cortaban («Todas las mar…»); ahora se abren hacia
  el lado en que entran.
- **Plurales:** «13 equipos en 1 grupo», «1 regla cumple», «1 línea distinta»… en lugar de «1 grupos».

## Versión 2.35.0
- **Equipos retirados:** Un equipo dañado, reemplazado o dado de baja se retira en lugar de borrarlo (ficha › ⋯ ›
  Retirar o reemplazar). Se renombra «NOMBRE (n)», queda sin IP, aislado y fuera de todo lo activo, con todo su historial para
  auditarlo, y se busca por su nombre e IP originales. En el mismo paso se puede dar de alta el reemplazo con sus datos y
  comparar sus respaldos. Se ven en Dispositivos › Retirados y se pueden reincorporar.
- **Equipo desactivado = aislado:** OpenNCCM ya no se conecta con un equipo desactivado por ninguna vía (respaldos,
  consola, SFTP, Multi-equipo, recetas, solicitudes, firmware, imagen .fxi, API). La ficha lo dice y ofrece «Activar».
- **Activar y desactivar en lote:** En Dispositivos, al marcar varios equipos (solo administradores).
- **Credenciales:** «Guardar» al editar una credencial no hacía nada; tampoco al editar un grupo, una política o
  una ficha de ciclo de vida en el panel lateral. Había que borrarla y crearla de nuevo.
- **ArubaOS (S2500 y controladoras):** Sin contraseña de enable prueba la de ingreso y, si no sirve, lo explica en
  lugar de «Pattern not detected». Lee el modelo, la serie y todos los puertos (en el S2500-48P, 48 de cobre y 4 SFP+) y
  muestra su parte trasera.
- **ArubaOS: configlets y cumplimiento:** 10 configlets y scripts y el paquete «Aruba ArubaOS · Seguridad básica».

## Versión 2.34.0
- **pfSense y OPNsense por separado:** Cada uno es su propia plataforma en la consola, en Recetas y en Configlets,
  con sus recetas y sus rutas (config.xml, versión y registro). Los favoritos de consola que ya tenía se copian a los dos.
- **Consola de pfSense y OPNsense:** `ifconfig`, `sockstat`, `tail`, `ls`, `arp -an` y otros comandos de consulta se
  bloqueaban como si cambiaran la configuración (en Multi-equipo y en solo lectura). Ahora son consultas; reiniciar, apagar
  pf o borrar archivos se avisan como cortes de servicio.
- **Recetas de WatchGuard Fireware:** Probadas en un Firebox T40 real. El nombre del equipo usaba un submodo que no
  existe, «show log» y «show connection» daban error, «show system usage» no existe y el ping no terminaba nunca. La receta de
  NTP avisa del máximo de 3 servidores.
- **Recetas verificadas:** 23 recetas más con el sello «Verificada» tras 3 rondas seguidas sin fallos: OPNsense 26.7
  (11) y WatchGuard Fireware 12.8.1 en un equipo físico (12).
- **50 configlets y scripts nuevos:** Diez para cada una de estas plataformas: MikroTik RouterOS, Extreme EXOS, Extreme
  VOSS / Fabric Engine, Ubiquiti EdgeSwitch y WatchGuard Fireware. Llegan también a las instalaciones que ya existen, una sola
  vez: si borra uno, no vuelve. Salen «Sin verificar» hasta que se prueben.

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
