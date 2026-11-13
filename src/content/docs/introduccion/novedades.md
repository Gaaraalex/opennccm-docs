---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.41.0 y las versiones anteriores."
resumen:
  - "2.41.0 actualiza el firmware de muchos equipos en tandas: mira el espacio libre antes de copiar, el propio equipo comprueba la suma y, si uno falla, las tandas siguientes no empiezan."
  - "«Comprobar los equipos» revisa conexión, versión y espacio antes de aprobar, sin copiar nada; al cargar una imagen se puede pegar la suma del fabricante."
  - "Las OLT ZTE muestran qué puertos están activos (ONU en línea por PON, enlace de los uplinks), y la corrección automática queda a nombre de quien la activa, con un interruptor por equipo."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

## Versión 2.41.0
- **Firmware en muchos equipos a la vez:** Las solicitudes de firmware con varios equipos van en tandas («Equipos
  a la vez»: de a 1, 2, 5, 10, 20 o todos). Con reinicio, cada tanda espera a que los equipos de la anterior vuelvan con
  la versión nueva, y si uno falla las siguientes no empiezan (se puede desmarcar). Antes de copiar se mira el espacio
  libre donde va la imagen (`dir flash:`, `free-hdd-space`, `df -k`) y, si no alcanza, ese equipo no se toca. Después de
  copiar, el propio equipo calcula la suma del archivo (MD5 en Cisco, Arista y Junos; SHA-256 o MD5 en airOS y
  EdgeRouter; en RouterOS, que no calcula sumas, se compara el tamaño) y si no coincide no se instala. Los equipos que ya
  tienen esa versión no se tocan. La solicitud muestra al vivo el avance de cada equipo: su tanda, el paso (respaldando,
  copiando con su porcentaje, comprobando la suma, instalando, reiniciando, comprobando la versión) y cómo terminó.
- **Comprobar los equipos antes de aprobar:** En una solicitud de firmware pendiente, «Comprobar los equipos» se
  conecta a cada uno sin copiar ni cambiar nada y dice si responde, qué versión tiene y si hay espacio para la imagen.
- **Suma del fabricante al cargar una imagen:** Al cargar una imagen de firmware se puede pegar el MD5 o el
  SHA-256 que publica el fabricante: si el archivo no coincide no se guarda (ni reemplaza la imagen que hubiera con ese
  nombre). Además de su MD5, ahora se calcula su SHA-256.
- **OLT ZTE: estado de cada puerto:** El frente de las OLT ZXA10 (C300, C320…) ahora muestra qué puertos están
  activos. Un PON está activo si tiene al menos una ONU en línea, y dice «12 de 14 ONU en línea» y cuántas están en LOS,
  DyingGasp u OffLine (`show gpon onu state`). Los uplinks muestran su enlace y su velocidad (`show interface`). Se lee en
  el respaldo: «Respaldar ahora» en cada OLT para verlo. Solo se guarda la cuenta por PON, no los datos de los clientes.
- **Corrección automática a nombre de quien la activa:** Cada política con corrección automática queda a
  nombre de quien la activó y solo corrige los equipos que esa persona puede ver (se comprueba en cada vuelta). Si esa
  persona se elimina, se desactiva o pierde la función «Corrección automática», la política deja de corregir y la página
  lo avisa. Las políticas activadas en 2.40.0 no tienen dueño: dejan de corregir hasta que alguien las vuelva a guardar.
- **«Permitir corrección automática» por equipo:** En Editar equipo, un interruptor (encendido por defecto) deja
  fuera de la corrección automática a un equipo concreto, sin tocar las políticas.
- **Inglés:** La corrección automática nombraba «Remediate» al botón que en la interfaz se llama «Fix».

## Versión 2.40.0
- **Corrección automática de cumplimiento (opcional):** En Cumplimiento › Corrección automática, cada política
  puede corregir sola los equipos que incumplen las reglas elegidas, dentro de una ventana de días y horas. Solo entran
  reglas con el sello «Verificada», y si alguien cambia su patrón o sus comandos dejan de aplicarse hasta volver a
  elegirlas. En cada equipo y regla respalda antes, hace las mismas comprobaciones que una solicitud de cambio
  (direcciones de ejemplo, quedarse sin acceso, reinicios y puertos apagados: si hay algo, no aplica nada y queda
  «Bloqueada»), aplica, vuelve a respaldar y audita; si el equipo rechaza un comando o la regla sigue sin cumplirse,
  vuelve a la versión de antes. Historial con el resultado, el motivo, la salida y las versiones de antes y después,
  además de Eventos y Auditoría; no insiste más de una vez en 24 h por regla y equipo («Reintentar» lo libera), y
  «Pausar todo» la detiene al instante. Viene apagada en todas las políticas, y activarla es la nueva función crítica
  «Corrección automática» (de los administradores; el maestro la da o la quita).
- **OLT ZTE: frente con sus puertos:** La ficha de las OLT ZXA10 (C300, C320…) ahora dibuja el frente por
  ranuras desde la configuración, cada tarjeta con su número y su tipo («Ranura 2 · GTGH»): los puertos PON con cuántas
  ONU tienen y los uplinks de 1 G y 10 G. Antes no mostraba ningún puerto. No se guardan datos de los clientes (nombres
  ni descripciones de las ONU).
- **OLT ZTE: número de serie:** La serie no está en «show system-group» ni en «show card»: ahora se busca la
  tarjeta de control (SMXA, SCXN…) en «show card» y se lee su «Serial-Number» con «show card slotno N». Sirve para la C320
  (ranura 3 o 4) y la C300 (ranura 10 u 11). Para verla, «Respaldar ahora» en cada OLT. Visto en una C320 con V2.1.0.
- **OLT ZTE: vulnerabilidades:** NVD casi no registra las OLT ZTE (de la C320, ninguna), así que el «0» de la
  pestaña Vulnerabilidades no significa que no tenga: ahora lo avisa y enlaza a los boletines de seguridad de ZTE.
- **Firmware sin fuente pública:** Cuando el fabricante no publica sus versiones (como ZTE), el aviso dice además
  que las fechas de fin de venta y de soporte se pueden cargar a mano en Firmware y ciclo de vida.

## Versión 2.39.0
- **Permisos por usuario:** Al crear o editar un usuario, el rol (Lector, Operador, Administrador) es una
  plantilla y debajo está la lista de funciones del sistema por secciones (operación, cambios en los equipos,
  administración): se quitan o se agregan a gusto, por ejemplo un operador que no envía configuraciones o un lector que
  respalda. Cada ruta y cada botón obedecen a la función, no al rol. Al actualizar nada cambia: cada usuario sigue con
  las funciones de su rol.
- **Administrador maestro:** El primer administrador (al actualizar, el administrador activo más antiguo) es
  el maestro: nadie lo puede eliminar, bloquear, editar ni quitarle la verificación en dos pasos, y es el único que crea
  administradores y da o quita las funciones críticas (enviar configuraciones, revertir, restaurar, consola con cambios,
  firmware, aprobar, credenciales, usuarios y ajustes). Puede pasar el rol a otro usuario; si se pierde el acceso, en el
  servidor: «opennccm set-master USUARIO».
- **Interruptor «Enviar configuraciones»:** En la lista de usuarios, el maestro da o corta al instante a cada
  usuario el envío de configuraciones a los equipos (solicitudes, recetas, configlets, multi-equipo y correcciones).
- **Junos: respaldo sin permiso de lectura:** Si la clase de login del usuario no tiene «view-configuration», el
  equipo responde «/* ACCESS-DENIED */» en cada sección; antes se guardaba como una versión (que no se podía restaurar).
  Ahora el respaldo falla y dice qué permiso darle. Visto en un QFX5100 con 13.2X51-D25.3.
- **Junos: equipos que tardan en abrir la CLI:** Algunos muestran «--- JUNOS … built …» un rato antes del
  prompt y el respaldo fallaba con «Pattern not detected» aunque el usuario y la contraseña eran correctos. Ahora espera
  el prompt hasta 90 s. Visto en un switch con Junos 21.4R3-S5.4.
- **Alarma de respaldo fallido:** Un respaldo que fallaba por algo que no se reintenta (contraseña rechazada,
  sin permiso…) quedaba como «Respaldo reintentado» informativo en lugar de la alarma «Respaldo fallido».
- **Frente de los switches Juniper QFX:** Los puertos salen en el orden del equipo (antes los de 1 G iban
  primero, como cobre), en dos filas como el frente real (pares arriba, impares abajo, en bloques de 12), con los
  QSFP+ en su bloque y los puertos sin módulo «sin módulo» (antes no aparecían: del 19 se pasaba al 43). Para verlo,
  «Respaldar ahora» en cada QFX.

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
