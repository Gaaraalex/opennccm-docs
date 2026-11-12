---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.38.0 y las versiones anteriores."
resumen:
  - "2.38.0 arregla Cisco IOS: restaurar con SNMP ya no se detiene, y guardar después de cambiar de imagen ya no queda esperando."
  - "Cisco ASA restaura bien una copia, iguala bien la configuración de referencia y en la consola distingue las consultas de los comandos que cortan el servicio."
  - "Las recetas de Cisco IOS / IOS-XE (de 12.2 a 17.6) y las 11 de Cisco ASA 9.9.2 quedan verificadas; «Activar SSH» en IOS usa una clave de 2048 bits."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

## Versión 2.38.0
- **Cisco IOS: restaurar con SNMP:** La reversión ya no escribe «snmp-server chassis-id» sin valor (IOS lo muestra en
  cuanto hay otra línea de SNMP y no se puede escribir así): la restauración se detenía en «% Incomplete command». Visto en
  un IOSv 15.6(2)T.
- **Cisco IOS: guardar tras cambiar de imagen:** El primer «write memory» después de cargar otra versión pregunta
  «Overwrite the previous NVRAM configuration?[confirm]»; ahora se contesta, en lugar de esperar hasta fallar (cambios,
  recetas y actualización de firmware quedaban sin guardar). Visto en un 7200 y un 3745.
- **Cisco ASA: restaurar una copia:** No se mandan los comentarios «: Serial Number…», «: Hardware…» ni
  «ASA Version …», y el «no snmp-server location» de fábrica no se niega cuando la copia trae la línea con valor. Visto en
  un ASAv 9.9.2.
- **Cisco ASA: configuración de referencia:** Los bloques («interface», «object network») van primero, cada uno
  con su «exit», y después las líneas sueltas que dependen de ellos («mtu puesto …», «route puesto …»); lo que sobra se quita
  antes de poner lo nuevo (el ASA no acepta un segundo «inspect dns …» sin quitar el que tiene) y la marca
  «call-home reporting anonymous prompt N» queda como propia del equipo.
- **Bloques de tres niveles:** Restaurar e igualar a la referencia escriben las líneas de tercer nivel entrando en
  su sub-bloque («policy-map › class › inspect», «router bgp › address-family › network»); antes se escribían en el bloque
  de arriba y el equipo las rechazaba.
- **Cisco ASA en la consola:** «packet-tracer» cuenta como consulta, y «write erase», «reload», «format» y
  «configure factory-default» se marcan como corte del servicio.
- **Receta «Activar SSH» en IOS:** Usa una clave RSA de 2048 bits («general-keys modulus 2048»), que existe en
  todas las versiones; la de 4096 no existe en IOS 12.x y la receta fallaba.
- **Recetas verificadas en Cisco IOS / IOS-XE:** Las 10 recetas de IOS quedan con el sello «Verificada» y las
  versiones en las que pasaron 3 rondas seguidas sin fallos: IOSv 15.6(2)T, Catalyst 8000v 17.6.1a, 7200 15.3(3)XB12,
  3745 12.4(25d) (todas menos RADIUS, cuya sintaxis «radius server» no existe en 12.4) y 3620 12.2(26c) (las que no
  necesitan SSH, HTTPS ni «secret»).
- **Recetas verificadas en Cisco ASA:** Las 11 recetas del ASA quedan con el sello «Verificada · ASA 9.9.2»
  (3 rondas seguidas sin fallos en un ASAv 9.9.2).

## Versión 2.37.0
- **Más rápido con muchos equipos:** Con 2000 equipos, el panel pasa de 1,4 s a 0,4 s, IP y VLAN de 1,7 s a 0,07 s,
  Analítica de 1 s a 0,08 s, Cumplimiento de 1,1 s a 0,35 s y la búsqueda en las configuraciones de 0,8 s a 0,2 s. Los
  indicadores se cuentan en la base de datos, se leen solo los datos que cada página usa y hay índices nuevos (se crean
  solos al actualizar).
- **Páginas más livianas:** Las respuestas van comprimidas (la lista de 2000 equipos pasa de 4 MB a 200 KB) y el
  navegador guarda los estilos y los scripts hasta la versión siguiente, en lugar de volver a pedirlos en cada página.
- **Firmware en un respaldo sin cambios:** Si la configuración es la misma y la última copia es de antes de registrar
  el firmware, esa copia recibe la versión leída en la misma conexión (las copias más viejas siguen «sin registrar»).
- **FortiGate: los cambios no se aplicaban:** Las recetas, Multi-equipo y el asistente quitaban el «end» de los
  bloques «config … end», que en FortiOS es lo que aplica el bloque: el cambio no quedaba hecho aunque la solicitud terminaba
  «bien» (por ejemplo, cambiar el nombre). Visto en un FortiGate-VM 7.4.2.
- **FortiGate: comprobación de las recetas:** «diagnose sys ntp status», «diagnose sniffer packet» y los demás
  diagnose y execute que solo consultan ya cuentan como consulta (la comprobación de «Configurar NTP» y «Ver el tráfico de una
  IP» no se podía ejecutar). «execute reboot», «execute factory-reset» y similares se marcan como corte del servicio.
- **FortiGate: configuración de referencia:** Ya no prepara comandos al estilo Cisco («no set …», bloques sin «end»)
  que el equipo rechazaba a mitad. La comparación se muestra igual; las diferencias se igualan a mano.
- **Junos: un commit fallido dejaba cambios pendientes:** Si el equipo rechazaba el commit de una solicitud, lo
  aplicado quedaba en la configuración candidata (que en Junos es la misma para todas las sesiones) y el siguiente cambio,
  de cualquiera, lo arrastraba y fallaba igual. Ahora se descarta («rollback 0») y la solicitud lo dice.
- **Junos: volver a una versión con DHCP en un puerto:** «family inet dhcp vendor-id …» (de fábrica en los puertos
  del QFX) se borra entero; antes se quitaba solo «vendor-id» y restaurar una copia con IP fija fallaba en el commit
  («Incompatible with interface assigned with address»). Visto en un vQFX 19.4R1.10.
- **Recetas verificadas en FortiGate:** Las 12 recetas de FortiOS quedan con el sello «Verificada · FortiOS 7.4.2»
  (3 rondas seguidas sin fallos en un FortiGate-VM 7.4.2: todos sus pasos y su comprobación).
- **Recetas verificadas en switches Juniper:** Las 10 recetas de Junos pasaron 3 rondas seguidas sin fallos en un
  vQFX 19.4R1.10 (las 9 que ya estaban verificadas en Junos 14.1 suman esa versión; «Crear una VLAN y poner un puerto de
  acceso» queda verificada por primera vez).
- **Consola: el aviso «cambio detectado» en su lugar:** Si un cambio se escribía justo después de un comando
  bloqueado (modo solo lectura), el aviso verde podía salir antes del comando, en el prompt anterior. Ahora espera a que el
  equipo repita el comando.
- **Guía del desarrollador:** docs/desarrollo (y en PDF, docs/OpenNCCM-Guia-del-desarrollador.pdf): arquitectura,
  mapa del código, datos y migraciones, cómo agregar una plataforma, interfaz, API, pruebas, laboratorio, publicación y
  rendimiento, para continuar el proyecto.

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
