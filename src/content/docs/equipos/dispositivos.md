---
title: "Dispositivos y ficha"
description: "Inventario de todos los equipos gestionados, con su estado de respaldo, modelo, versión de firmware y grupo."
curso: ["3.2","3.3","3.4"]
---

![Lista de dispositivos con filtros por estado. Las etiquetas «Sin guardar» y «Difiere de la base» señalan conflictos.](../../../assets/manual/03-dispositivos.png)

## Cómo usarlo

-   **Buscar y filtrar:** por nombre, IP, modelo, serie, versión o ubicación; por grupo, [nodo](/observar/analisis/#nodos) y marca; y por estado (ok, error, pendiente, startup ≠ running, fuera de línea base). Cada equipo lleva el logo de su marca (también en la ficha, el mapa, la consola y Ctrl K); la fila **MARCA** muestra cuántos hay de cada una y filtra con un toque. El menú **Marca** muestra unas 12 a la vista, con barra para bajar y un buscador arriba («Buscar marca»).
-   **Respaldar todos:** respalda todos los equipos (o los del grupo filtrado, o los marcados), 4 a la vez. Se ve el progreso con su porcentaje: un panel con la barra, cuántos van correctos, con error, respaldándose y en cola, y quién se respalda ahora; cada fila de la lista dice su paso («Conectando…», «Leyendo la configuración…», «Guardando…») y se actualiza sola al terminar. El respaldo corre en el servidor: se puede salir de la página (la píldora con el porcentaje queda junto a «Dispositivos» en el menú) y al terminar avisa. **Cancelar** no lanza los que faltan; al terminar, los que dieron error salen con su motivo y **Reintentar** respalda solo esos. Un respaldo que falla por algo pasajero (el equipo cortó la sesión con el puerto respondiendo, la base de OpenNCCM ocupada) se comprueba y se reintenta solo; si el equipo no responde o rechaza la contraseña, se avisa sin reintentar.
-   **Acciones de la fila:** al pasar el ratón aparecen respaldar, consola e interfaz web del equipo.
-   **Acciones masivas:** marque varias filas y use la barra inferior para respaldarlas, auditarlas, moverlas a un grupo o asignarlas a un nodo (**Asignar al nodo**, administradores).
-   **\+ Agregar** (admin): **Agregar un equipo** abre el formulario de alta en un panel lateral; **Importar CSV** abre la importación masiva; **Importar desde Zabbix** trae los hosts de Zabbix.

## Importar desde CSV

El panel explica las columnas (`name,host,device_type,credential,group,port,protocol,location`; solo las tres primeras son obligatorias) y ofrece una plantilla para descargar. Al elegir el archivo muestra una **vista previa** con cada fila válida o su error (plataforma desconocida, credencial inexistente, puerto o protocolo no válidos, nombre repetido). Las filas con error se omiten y las válidas se importan; los grupos que no existen se crean.

![Importación desde CSV con su ayuda.](../../../assets/manual/04b-importar-csv.png)

## Importar desde Zabbix

Si los equipos ya están en Zabbix (6.0 o posterior), **\+ Agregar › Importar desde Zabbix** los crea sin escribirlos uno a uno:

1.  **Conectar:** la dirección de la interfaz web de Zabbix y un **token de API** (en Zabbix 7: Usuarios › Tokens de API; en 6.0: Administración › General › Tokens de API), o un usuario y su contraseña. Basta con un usuario de solo lectura que vea los hosts. El token y la contraseña no se guardan; la dirección sí. Si Zabbix usa un certificado autofirmado, desmarque *Verificar el certificado*.
2.  **Elegir los grupos:** salen los grupos de Zabbix con cuántos hosts tiene cada uno y cuántos son nuevos. Marque los que quiere migrar (o *Marcar todos*); solo se importan los equipos de esos grupos.
3.  **Quitar equipos:** la lista muestra los hosts de los grupos marcados con su nombre, dirección (IP de la interfaz principal, o su nombre DNS), descripción, grupos de Zabbix y la **plataforma** deducida de las plantillas y el inventario de Zabbix (por ejemplo «Mikrotik by SNMP» → MikroTik RouterOS). Las que no se reconocen quedan como «Genérico» con la marca *revisar*; cada una se puede cambiar. Desmarque los que no quiera traer; se puede filtrar por texto. No se marcan los que ya existen en OpenNCCM (mismo nombre o dirección), los que no tienen dirección ni los desactivados en Zabbix.
4.  **Importar:** se guardan el nombre, la dirección (SSH, puerto 22), la descripción en *Notas* y, si Zabbix tiene inventario, el modelo, el n.º de serie y la ubicación. Opcionalmente, una credencial y un grupo para todos.

Las credenciales SSH no están en Zabbix. Si no elige una para todos, los equipos se crean **desactivados** (no se respaldan ni generan errores) hasta que edite cada uno, le asigne su credencial y su grupo, y lo active. Para activar varios a la vez, márquelos en la lista de Dispositivos y pulse **Activar**. Volver a importar más adelante solo añade los hosts nuevos.

## Alta de un dispositivo

| Campo | Descripción |
| --- | --- |
| Nombre | Identificador único (por ejemplo el hostname). |
| IP / hostname | Dirección de gestión. Debe ser la misma desde la que el equipo envía syslog. |
| Fabricante / sistema operativo | Perfil de la plataforma (133 opciones agrupadas por fabricante). Define los comandos que se usan. |
| Protocolo y puerto | SSH (22) o Telnet (23). Telnet solo en plataformas que lo admiten. |
| Credencial y grupo | Perfil de usuario/contraseña y grupo del equipo. Puede crear un grupo nuevo desde aquí mismo con «…o crear un grupo nuevo». También se administran en **Dispositivos → Grupos**. |
| Nodo | Lugar del equipo (torre, sucursal, centro de datos). Se elige de la lista o con «+ Crear nodo nuevo…». Ver [Nodos](/observar/analisis/#nodos). |
| Tipo en el mapa | (Administradores) Router, switch, antena / AP o firewall, si el mapa lo pone en la columna equivocada. **Automático** lo deduce del modelo; las antenas MikroTik (RB911, SXT, LHG…) y un MikroTik con una wlan o wifi activa cuentan como inalámbricos. |
| ¿Tiene interfaz web? | **Sí** (por omisión) muestra el botón **Interfaz web** del equipo; se puede indicar su dirección si no es `https://IP/`. **No** oculta el botón para los equipos sin página de administración (muchos switches de acceso, servidores Linux…). Se puede cambiar después en **Editar**. |
| Comando de respaldo personalizado | Opcional: sustituye al comando del perfil (útil con el perfil «Genérico SSH» o versiones con otra sintaxis). |
| Habilitado | Si se desmarca, el equipo queda **aislado**: OpenNCCM no se conecta con él por ninguna vía (respaldos, consola, Multi-equipo, recetas, solicitudes de cambio, firmware, imagen .fxi ni la API) hasta que se vuelva a activar. Sus respaldos y su historial se conservan. |
| Revertir automáticamente | Deshace los cambios no autorizados que se detecten (ver [Reversión](/cambios/reversion/)). |

![Formulario de alta.](../../../assets/manual/04-dispositivo-nuevo.png)

## Ficha del dispositivo

Reúne todo sobre un equipo en pestañas: **Resumen** (inventario, línea base, ciclo de vida y últimas versiones), **Versiones**, **Cumplimiento**, **Vulnerabilidades**, **Firmware** y **Eventos**. Arriba están **Consola**, **Interfaz web** y **Respaldar ahora**; el menú **⋯** agrupa auditar, buscar CVE, actualizar firmware, editar, comparar con otro equipo, ver las diferencias con la línea base, volver a ella (si el equipo aún no tiene línea base, permite marcar la última versión) y eliminar. Para eliminar un equipo hay que escribir su nombre, porque se borra con todo su historial.

**Equipo desactivado.** En lugar de «En línea» dice **Desactivado** y no ofrece Consola, Interfaz web ni Respaldar ahora: el equipo está aislado y OpenNCCM no se conecta con él. Un administrador lo vuelve a activar con **Activar**, en la propia ficha. En la lista de Dispositivos, al marcar varios equipos, **Activar** y **Desactivar** lo hacen con todos a la vez (solo administradores; queda en Auditoría).

### Equipos retirados (dañados o reemplazados)

Cuando un equipo se daña, se reemplaza por otro que hará su misma función o se da de baja, no hace falta borrarlo: en su ficha, menú **⋯ → Retirar o reemplazar…** (solo administradores). Se elige el motivo (dañado, reemplazado, devuelto u otro) y, si se quiere, una nota.

-   El equipo se renombra con un número de secuencia por nombre: el primero que se retira de `SW-CORE-01` queda como `SW-CORE-01 (1)`, el siguiente como `SW-CORE-01 (2)`, y así.
-   Queda **sin dirección**: el nombre y la IP quedan libres para el equipo nuevo. El nombre y la IP originales se guardan y se puede buscar por ellos (en Dispositivos, en Retirados y con Ctrl K).
-   Queda **desactivado y aislado** (OpenNCCM no se conecta con él) y fuera de todo lo activo: panel, mapa, alarmas, informes, tareas y la API. Sus alarmas abiertas se cierran y sus versiones no se purgan.
-   Conserva **todo su historial** para auditarlo: versiones y respaldos, cumplimiento, vulnerabilidades, eventos y puertos.
-   Con **Dar de alta el equipo que lo reemplaza** (activado por omisión), en el mismo paso se crea el equipo nuevo con el nombre, la IP, el tipo, la credencial, el grupo, el nodo y la ubicación del retirado, y se lanza su primer respaldo. Su ficha dice a quién reemplaza y ofrece **Comparar** su respaldo con el último del retirado, para ver si quedó configurado igual.

Los retirados se ven en **Dispositivos › Retirados**, con su nombre e IP originales, el motivo, quién y cuándo lo retiró y qué equipo lo reemplazó. Un retirado no se edita: con **Reincorporar** vuelve al servicio con el nombre y la IP que se indiquen (por omisión, los originales, si están libres) y, si se marca, activado.

![Ficha del dispositivo R1, pestaña Resumen.](../../../assets/manual/05-dispositivo.png)

### Puertos del equipo

Entre la cabecera y las pestañas, una **franja de puertos** dibuja el frente del equipo con un icono por puerto en su orden físico: RJ45 para cobre y jaula SFP para fibra (vacía si no tiene módulo). En los equipos grandes van en dos filas, los impares arriba y los pares abajo. Al tocar un puerto se ven su estado, tipo, descripción, velocidad, dirección y vecino; «Ver todos los puertos» abre la pestaña **Puertos**, con la tabla *Interfaces* (filtros Todos, Activos, Inactivos, Fibra y, en equipos grandes, Apagados y Cobre; **Exportar CSV**) y una tarjeta del puerto con **Lo que dice el respaldo**: la línea de la configuración y la línea de estado que explican su color.

| Color | Significa |
| --- | --- |
| Verde | Activo: tiene enlace. |
| Gris | Habilitado sin enlace (o, si la plataforma no da el estado, habilitado sin más). |
| Ámbar con borde discontinuo | Apagado en la configuración (`disabled=yes`, `shutdown`). |
| Jaula vacía | Puerto de fibra sin módulo SFP. |

El frente se dibuja como el del modelo: una fila en routers y switches pequeños (hEX, RB4011 con su separación tras el puerto 5, US-8, firewalls de escritorio) y dos filas en los grandes, en bloques como en el equipo (CRS326 de 4 en 4 con los SFP+ abajo a la derecha; UniFi y EdgeSwitch de 24/48 y Cisco de 6 en 6 con los SFP de dos en dos). Los modelos que OpenNCCM no conoce se dibujan según cuántos puertos tienen.

La configuración solo dice si un puerto está apagado; el enlace se lee en la misma conexión del respaldo («leído en el respaldo de hace…»), con la orden de cada plataforma:

| Plataforma | Orden |
| --- | --- |
| MikroTik RouterOS | `/interface ethernet print` y `monitor` (estado, velocidad, módulo SFP) |
| Cisco IOS/IOS-XE, Arista, Dell, TP-Link, Ruckus y la mayoría de switches con CLI tipo Cisco | `show interfaces status` (o `show interface status/brief`) |
| Ubiquiti EdgeSwitch y UniFi (FastPath) | `show interfaces status all` |
| Huawei, H3C, HPE Comware | `display interface brief` |
| HPE ProCurve / Aruba OS-Switch · Aruba AOS-CX | `show interfaces brief` · `show interface brief` |
| Cisco NX-OS · ASA/FTD · WLC | `show interface status` · `show interface ip brief` · `show port summary` |
| Juniper · Extreme EXOS · Nokia SR OS | `show interfaces terse` · `show ports no-refresh` · `show port` |
| OLT ZTE ZXA10 (C300, C320…) | PON: `show gpon onu state` (activo si tiene al menos una ONU en línea; dice «12 de 14 ONU en línea» y cuántas en LOS, DyingGasp u OffLine) · uplinks: `show interface gei_…/xgei_…`. Solo se guarda la cuenta por PON, no los datos de los clientes. |
| Extreme VOSS / Fabric Engine (VSP) | `show interfaces gigabitEthernet` (columna OPERATE de STATUS) |
| EdgeRouter, USG, VyOS | `show interfaces` (columna S/L) |
| FortiGate · Palo Alto · Check Point | `get system interface physical` · `show interface all` · `show interfaces all` |
| WatchGuard Fireware | `show status-report` (solo la sección «Physical Interfaces Link Status»; basta Device Monitor) |
| Linux, Ubuntu, airOS, airFiber, UniFi AP · pfSense, OPNsense | `/sys/class/net` · `ifconfig -a` |

Si el equipo no responde a ninguna, los puertos salen de la configuración en gris (apagado o habilitado) con el aviso «sin estado de enlace».

### OLT ZTE C300 y C320: el chasis entero

En las OLT ZXA10 C300 y C320 la cabecera muestra el chasis completo, sin barra de desplazamiento: la C300 con las tarjetas de pie (ranuras 2 a 20, cada una con su número, sus puertos y su tipo: GTGH, SCXN, HUVQ, GUFQ…) y la C320 acostada, en filas, con la fuente abajo. Las controladoras (SCXN, SMXA) llevan una luz: **verde** si está activa y **ámbar** si está en espera (de `show card`); las ranuras vacías salen con borde punteado. El número de una ranura va en **rojo** cuando las ONU sin señal pasan del 10 % de las dadas de alta en ella (las de un PON apagado no cuentan).

Al tocar una ranura, a la derecha salen sus puertos con las ONU en línea / dadas de alta de cada uno, y debajo el puerto elegido («15 de 22 ONU en línea · 7 sin señal»). **Ver las N ONU de este puerto** abre la pestaña **Puertos** con ese puerto, cuya tarjeta lista sus ONU del respaldo (número, tipo y serie). **Ver todos los puertos** abre **Puertos** filtrada por la ranura elegida; la ✕ del filtro la quita. Las demás OLT ZTE (C220, C350…) siguen con la franja de puertos.

### Parte de atrás: fuentes y ventiladores

El botón **Atrás** de la franja muestra las **fuentes de alimentación** y los **ventiladores** del equipo: en verde los que funcionan (fuente con corriente, ventilador girando) y en rojo los que fallan o están sin corriente; con borde discontinuo, los que no están instalados. Así se ve de un vistazo si un equipo con dos fuentes tiene las dos conectadas. Si alguna falla, la franja lo avisa también desde el frente («Sin corriente o con fallo: PSU 2», «Ventilador parado: Fan 3») y el botón Atrás lleva un punto rojo. Se lee en el respaldo con la orden de cada fabricante: MikroTik `/system health print`, Cisco `show environment all`, Juniper `show chassis environment`, Huawei `display power` y `display fan`, HPE `show system fans/power-supply`, Aruba AOS-CX y Arista `show environment …`, FastPath `show environment`, Extreme EXOS `show fans/power`, Extreme VOSS / Fabric Engine `show sys-info` (secciones «Power Supply Info» y «Fan Info») y FortiGate `execute sensor list`. Los equipos que no informan de ello por SSH (por ejemplo, los routers pequeños sin ventiladores) lo indican en la vista Atrás.

En los equipos que tienen los puertos detrás, como el **WatchGuard Firebox T40**, la ficha se abre por **Atrás** y muestra el equipo como es: consola serie, los dos USB, los puertos con su rótulo (0/WAN, 1/LAN, 2, 3, 4-PoE), Reset, el interruptor y la entrada de corriente. **Frente** muestra sus luces (Failover, las de cada puerto, Status, Mode, Attn y encendido); pulsar las luces de un puerto lo elige. En WatchGuard el nombre de la interfaz, si está habilitada y su IP o las VLAN que pasan por el puerto salen de la configuración; el enlace y la velocidad, de `show status-report`. Atrás, el puerto con enlace sale en verde; delante se enciende la luz de su velocidad: la de 1000 en amarillo y la de 10/100 en verde, como en el equipo. **Mode** se ve verde si alguna interfaz externa tiene enlace y parpadea si ninguna lo tiene; **Status** queda apagada, porque en el Firebox solo se enciende 30 segundos cuando alguien entra por la Web UI o la CLI. Cada luz explica su estado al pasar el ratón.

![Pestaña Cumplimiento: reglas agrupadas por política, con «Corregir N».](../../../assets/manual/05c-dispositivo-cumplimiento.png)

## WatchGuard: configuración (XML) e imagen completa (.fxi)

La ficha de un Firebox tiene la pestaña **Respaldos** con los dos tipos de respaldo de WatchGuard:

| | Configuración (XML) | Imagen completa (.fxi) |
| --- | --- | --- |
| **Qué guarda** | Políticas, interfaces, VLAN, NAT, VPN, alias, usuarios y ajustes | Todo lo anterior, más los certificados con sus claves privadas, la feature key, las contraseñas y la información propia de ese Firebox. No el sistema operativo: desde Fireware 12.2.1 la imagen no lo incluye, y por eso pesa alrededor de 1 MB; para restaurarla, el Firebox debe tener una versión de Fireware compatible |
| **Qué no guarda** | La feature key (OpenNCCM la guarda aparte), los certificados con sus claves, las contraseñas propias del equipo y el Fireware OS | — |
| **Cuándo** | En cada respaldo; no cambia nada en el Firebox | Semanal, diaria (a las 03:00) o solo a mano |
| **Credencial** | Basta una de solo lectura (Device Monitor) | De administrador (Device Administrator) |
| **Úsela para** | Ver qué cambió, auditar el cumplimiento y llevar la configuración a otro Firebox (de reemplazo o de otro modelo) con Policy Manager | Recuperar el mismo Firebox tras un fallo, un restablecimiento de fábrica o una actualización que salió mal. No sirve para otro equipo: WatchGuard la considera única de cada Firebox |

Al configurar la imagen se elige la credencial de administrador, la **clave de cifrado** (8 a 15 caracteres, el máximo que admite Fireware; **Generar** crea una de 15; sin ella no se puede restaurar), la dirección por la que el Firebox llega a OpenNCCM (se detecta sola) y cuántas imágenes guardar; se conservan las últimas. **Probar conexión** pide al Firebox que suba su configuración al receptor, sin crear ninguna imagen.

Fireware solo entrega la imagen subiéndola por FTP. Para eso OpenNCCM abre un **receptor FTP temporal** solo mientras dura el respaldo (puerto 2121 y pasivos 50000–50010, configurables): acepta únicamente la IP del Firebox, con usuario y contraseña de un solo uso, y se cierra al recibir el archivo o a los 5 minutos. Si el servidor usa `ufw`, abre esos puertos solo para el Firebox y los cierra al terminar (si el servicio se detuviera, la regla se quita sola a los 6 minutos). En el Firebox se ejecuta `backup image`, `export image … to ftp://…` y `delete backup`: no queda ninguna copia en el equipo.

:::caution[Otro cortafuegos en el camino]
Si hay un cortafuegos entre el Firebox y OpenNCCM, permita el puerto 2121 y los pasivos 50000–50010 (TCP) desde el Firebox hacia el servidor.
:::

Si la imagen falla, la pantalla muestra el mensaje exacto del Firebox y qué revisar (cortafuegos, dirección, política del Firebox o credencial sin permiso). Si falla dos veces seguidas se abre la alarma **«Imagen .fxi sin crear»**; el respaldo XML no se ve afectado.

Cada archivo se descarga en su formato (`EQUIPO_v48.xml`, `EQUIPO_img-12.fxi`), nunca en .zip; **Descargar .xml y .fxi** baja los dos. La clave no va dentro de ningún archivo: solo los administradores la ven, en **Cómo restaurar**, y queda en [Auditoría](/administracion/auditoria/) quién la vio. Para restaurar la imagen: Fireware Web UI › **Sistema › Backup and Restore Image**, importar el .fxi y escribir su clave.

## Interfaz web del equipo

El icono de globo (junto al de la consola) y el botón **Interfaz web** de la página del equipo abren su página de administración en una ventana aparte. Por omisión se usa `https://IP-del-equipo/`; si el equipo usa otra dirección o puerto (por ejemplo `http://10.0.0.1:8080`), escríbala en **Editar → ¿El equipo tiene interfaz web? → Dirección**. Si el equipo no tiene web, marque **No** en esa misma pregunta y el botón deja de mostrarse. OpenNCCM no interviene en esa conexión: el navegador se conecta directamente al equipo.

:::note[Seguridad]
La consola usa la misma sesión que la página (no funciona desde otros sitios web), se cierra tras 15 minutos sin escribir (máximo 4 horas), y cada apertura, intento fallido, comando prohibido o peligroso, enlace compartido y cierre queda en **Auditoría**. Solo funciona con equipos configurados por SSH.
:::
