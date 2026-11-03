---
title: "Plataformas soportadas"
---

**Administración → Plataformas**. Muestra las 131 plataformas en fichas (las comprobadas en su red llevan una marca) y, en **Comandos de cada plataforma**, su `device_type` y los comandos que se ejecutan en cada una: **respaldo**, **arranque** (startup, para detectar cambios sin guardar) e **inventario** (modelo, serie y versión); además el tipo de reversión y si admite actualización de firmware.

-   **Buscador** y **filtro por fabricante**; la casilla **Solo las de mi red** muestra únicamente las plataformas que usted usa.
-   **Comprobado en su red**: se marca solo cuando un equipo de esa plataforma hace su primer respaldo correcto, con la cantidad de equipos y la fecha (y si usa un comando personalizado).
-   **por verificar**: comando tomado de la documentación del fabricante, aún sin probar en un equipo real.

La configuración se obtiene mostrando el resultado del comando dentro de la misma sesión SSH: no se crean archivos en el equipo ni se necesita FTP/TFTP. **WatchGuard Fireware** se respalda con `export config to console` (la configuración completa en XML) y, una sola vez, guarda su *feature key* (`show feature-key`), cifrada, que se descarga desde la ficha del equipo; basta un usuario de solo lectura (Device Monitor). Para recuperar ese mismo Firebox también puede guardar su [imagen completa cifrada (.fxi)](/equipos/dispositivos/#watchguard-configuración-xml-e-imagen-completa-fxi), con una credencial de administrador. Si un comando no sirve para su versión, defina un **comando de respaldo personalizado** en el dispositivo. Para equipos sin perfil propio (SonicWall, Riverbed, Infoblox…) use **Genérico SSH** con un comando personalizado.

**pfSense y OPNsense** tienen perfil propio: OpenNCCM atraviesa el menú de consola (opción «8) Shell») y respalda el archivo `config.xml` completo, el mismo que exporta la web. Use el usuario `admin`/`root` (el archivo solo lo lee root); el inventario trae versión, modelo y número de serie. Los cambios se siguen haciendo desde la web del cortafuegos. **Alpine Linux** respalda red, DNS, paquetes instalados (`apk world`), servicios, SSH y reglas del cortafuegos.

**Ubuntu Server / Debian** (Ubuntu 26.04, 24.04 y 22.04 LTS; Debian 12 y 13) respalda solo configuración en texto: nombre, red (netplan o `/etc/network/interfaces`), DNS, SSH, cuentas y grupos, sudo, repositorios, paquetes instalados a mano (no la versión de cada uno, que cambia a diario), servicios activados, tareas de cron, hora (chrony o timesyncd) y cortafuegos (ufw, iptables y nftables, sin contadores de paquetes). **Nunca** copia contraseñas (`/etc/shadow`), claves privadas, certificados ni datos, y las contraseñas de wifi de netplan salen como `***`. Un respaldo típico ocupa unos 20–60 KB. Algunos archivos (netplan, crontab de root) y el cortafuegos solo se leen como root: dé al usuario de OpenNCCM `sudo` sin contraseña, mejor solo para esos comandos de lectura; sin `sudo` se respalda el resto. El inventario lee la versión de `/etc/os-release`, y **Actualizaciones disponibles** avisa de la nueva LTS y de la fecha de fin de soporte.

**Ubiquiti airMAX, airFiber y UniFi.** airMAX M (M2, M5 con airOS 6), airMAX AC (airOS 8), airFiber (AF5XHD, AF60, AF24HD, AF5X) y los AP UniFi guardan toda su configuración en `/tmp/system.cfg`, que es lo que se respalda; la versión y el modelo salen de `/etc/version` y `/etc/board.info` (o de `info` en UniFi). El USG se respalda con `show configuration commands`. Los switches, AP y USG de UniFi los configura el controlador UniFi Network: los cambios y su reversión se hacen allí. Para volver a una versión de airOS: *System › Configuration Management › Upload Configuration*.

**MikroTik SwitchOS** (SwOS y SwOS Lite) no tiene SSH: OpenNCCM descarga por HTTP (puerto 80) el mismo respaldo `backup.swb` que su interfaz web, y lee de él el modelo, la versión y la serie. No admite cambios por comandos ni consola; para restaurar, *Restore Backup* en SwitchOS con el archivo descargado.

![Plataformas soportadas con buscador y la columna «Comprobado en su red».](../../../assets/manual/30-plataformas.png)
