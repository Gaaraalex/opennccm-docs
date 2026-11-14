---
title: "Novedades de la versión"
description: "Lo nuevo de OpenNCCM 2.43.0 y las versiones anteriores."
resumen:
  - "2.43.0 deja las contraseñas fuera de las grabaciones de la consola: lo que se escribe cuando el equipo pide una contraseña queda ******** (también en las grabaciones anteriores)."
  - "En Dispositivos, «Eliminar…» borra varios equipos a la vez, y cada equipo de la lista tiene Ping desde el servidor."
  - "«Copiar todo» en la versión de una copia, copias muy grandes que abren al instante y un botón por cada parámetro en las Herramientas de la consola."
---

Las 6 últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).

## Versión 2.43.0
- **Consola: las contraseñas ya no quedan en las grabaciones:** Lo que se escribe cuando el equipo pide una
  contraseña («Password:» de enable, «Contraseña:»…) va al equipo pero no a la grabación: queda `********` al reproducirla,
  al exportarla y al buscar. Las grabaciones anteriores, que la guardaban tal cual, también se muestran ocultas. En la consola
  ese texto se escribe oculto y no entra en el historial de comandos.
- **Eliminar varios equipos a la vez:** En Dispositivos, al marcar uno o varios equipos, la barra de abajo tiene
  «Eliminar…». Pide escribir ELIMINAR y borra los equipos con sus versiones, resultados y eventos.
- **Ping desde la lista de equipos:** Al pasar el puntero sobre un equipo, junto a Consola, Interfaz web y Respaldar
  ahora, está Ping: el servidor envía tres paquetes y dice si responde, con la pérdida y el tiempo medio. Aparece también
  cuando el equipo tiene error de respaldo.
- **Copiar todo en la versión de una copia:** Un botón copia la configuración entera al portapapeles, sin los
  números de línea.
- **Las copias muy grandes se abren al instante:** La versión de una OLT C300 (40.000 líneas) tardaba unos
  segundos en verse; ahora la página solo dibuja lo que está a la vista y pesa menos de la mitad.
- **Herramientas de la consola con botones de parámetros:** Debajo de la casilla, un botón por cada parámetro de
  Ping, Traceroute, Puerto TCP y DNS: se escribe la IP o el nombre y se tocan los que se quieran (otra vez, se quitan).
- **Soporte profesional y Apoya OpenNCCM siempre visibles:** Los dos botones de la barra superior se ven para todos
  los usuarios y ya no se pueden ocultar (Ajustes › Organización ya no tiene la casilla).

## Versión 2.42.0
- **OLT ZTE C300 y C320: el chasis entero en la ficha:** En lugar de la franja de puertos con barra de desplazamiento,
  la cabecera muestra el chasis completo: la C300 con las tarjetas de pie (ranuras 2 a 20) y la C320 acostada, con la fuente
  abajo. Las controladoras dicen si están activas o en espera, las ranuras vacías salen punteadas y el número de una ranura va
  en rojo si más del 10 % de sus ONU están sin señal. Al tocar una ranura se ven sus puertos con las ONU en línea de cada uno;
  «Ver todos los puertos» abre Puertos filtrada por esa ranura y «Ver las N ONU» abre el puerto con sus ONU del respaldo.
- **La ficha de una OLT grande abre al instante:** En una OLT C300 con miles de ONU (configuración de 40.000 líneas)
  la ficha tardaba casi un minuto en abrir, porque comparaba las copias grandes línea por línea varias veces. Ahora abre en
  menos de un segundo, con la misma comparación. Respaldar esos equipos también es más rápido.
- **Firmware de cada copia:** En la ventana de una versión, la marca «de aquí sale el firmware» va en la misma línea
  de la que sale la versión, a la derecha. En el historial, una copia programada sin usuario dice «Programado» (antes
  «scheduled»).

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
