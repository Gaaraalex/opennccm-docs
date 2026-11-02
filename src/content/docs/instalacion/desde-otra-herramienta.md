---
title: "Migrar desde otra herramienta"
description: "Cómo pasar a OpenNCCM desde Oxidized, RANCID o SolarWinds NCM: inventario, credenciales, primer respaldo y convivencia."
resumen:
  - "Pasar desde Oxidized, RANCID o SolarWinds NCM es, sobre todo, llevar el inventario a un archivo CSV e importarlo."
  - "Las credenciales, las políticas y las tareas se vuelven a crear; el historial anterior no se migra, así que conserve la herramienta vieja en solo lectura."
  - "Después de importar, lance el primer respaldo y revise los equipos que fallen."
---

<p class="captura-tema"><img class="tema-oscuro" src="/capturas/oscuro/dispositivos.png" alt="Lista de dispositivos después de importar el inventario" width="1600" height="1000" loading="lazy" /><img class="tema-claro" src="/capturas/claro/dispositivos.png" alt="Lista de dispositivos después de importar el inventario" width="1600" height="1000" loading="lazy" /></p>

Pasar a OpenNCCM desde otra herramienta de respaldos es, sobre todo, **llevar el inventario**: qué equipos hay, su dirección, su plataforma y con qué usuario se entra. OpenNCCM lo importa desde un archivo CSV y, a partir del primer respaldo, empieza su propio historial.

:::note[Qué se migra y qué no]
- **Se migra:** los equipos (nombre, dirección, plataforma, grupo, puerto, protocolo y ubicación).
- **Se vuelven a crear a mano:** las credenciales (una por cada combinación de usuario y contraseña), las políticas de cumplimiento y las tareas programadas.
- **No se migra:** el historial de configuraciones de la herramienta anterior. OpenNCCM guarda sus versiones desde el primer respaldo. Conserve la herramienta anterior (o su repositorio Git) en modo solo lectura mientras necesite consultar ese historial.
:::

## El plan en cinco pasos

1. **Instale OpenNCCM** en su servidor (ver [Instalar en Ubuntu](/instalacion/instalar/)).
2. **Cree las credenciales** en el menú **Credenciales**: una por cada usuario/contraseña que usen sus equipos, con nombres cortos como `red-admin` o `firewalls` (ver [Credenciales y grupos](/primeros-pasos/credenciales/)).
3. **Arme el CSV** a partir de su herramienta actual (más abajo, cómo sacarlo de cada una).
4. **Impórtelo** en **Dispositivos → + Agregar → Importar CSV**. La vista previa marca cada fila con error antes de importar.
5. **Lance el primer respaldo** con **Respaldar todos** (o `sudo opennccm backup-all`) y revise los equipos que fallen.

## El archivo CSV

La primera fila lleva los nombres de las columnas. Solo `name`, `host` y `device_type` son obligatorias:

```text
name,host,device_type,credential,group,port,protocol,location
core-sw01,10.0.0.1,cisco_ios,red-admin,Core,22,ssh,CPD principal
fw-borde,10.0.0.254,fortinet,firewalls,Seguridad,,,
```

| Columna | Qué poner |
| --- | --- |
| `name` | Nombre del equipo (no se puede repetir). |
| `host` | IP o nombre DNS. |
| `device_type` | Clave de la plataforma (tabla de abajo; la lista completa está en el menú **Fabricantes**). |
| `credential` | Nombre exacto de una credencial que ya exista en OpenNCCM. |
| `group` | Grupo; si no existe, se crea. |
| `port` / `protocol` | Vacíos = `22` y `ssh`. Para telnet ponga `telnet` (puerto 23 por defecto). |
| `location` | Texto libre: sitio, sala, rack… |

El panel de importación ofrece una **plantilla para descargar** y muestra, antes de importar, las filas válidas y las que tienen error: plataforma desconocida, credencial inexistente, puerto o protocolo no válidos, o nombre repetido. Las filas con error se omiten.

### Equivalencias de plataformas más comunes

| Equipo | Oxidized (`model`) | RANCID (`type`) | OpenNCCM (`device_type`) |
| --- | --- | --- | --- |
| Cisco IOS | `ios` | `cisco` | `cisco_ios` |
| Cisco IOS-XE | `ios` | `cisco` | `cisco_xe` |
| Cisco NX-OS | `nxos` | `cisco-nx` | `cisco_nxos` |
| Cisco IOS-XR | `iosxr` | `cisco-xr` | `cisco_xr` |
| Cisco ASA | `asa` | `cisco` | `cisco_asa` |
| Juniper Junos | `junos` | `juniper` | `juniper_junos` |
| Arista EOS | `eos` | `arista` | `arista_eos` |
| HPE ProCurve / Aruba OS-Switch | `procurve` | `hp` | `hp_procurve` |
| HPE Comware / H3C | `comware` | `h3c` | `hp_comware` |
| Aruba CX | `aoscx` | — | `aruba_aoscx` |
| Huawei VRP | `vrp` | — | `huawei` |
| Fortinet FortiGate | `fortios` | `fortigate` | `fortinet` |
| Palo Alto PAN-OS | `panos` | — | `paloalto_panos` |
| MikroTik RouterOS | `routeros` | `mikrotik` | `mikrotik_routeros` |
| Dell OS10 | `os10` | — | `dell_os10` |
| Dell PowerConnect | `powerconnect` | — | `dell_powerconnect` |
| Extreme EXOS | `xos` | `extreme` | `extreme_exos` |
| Ruckus/Brocade ICX | `ironware` | `foundry` | `ruckus_fastiron` |
| Ubiquiti EdgeRouter | `edgeos` | `edgerouter` | `ubiquiti_edgerouter` |
| VyOS | `vyos` / `vyatta` | `vyatta` | `vyos` |
| pfSense / OPNsense | `pfsense` / `opnsense` | — | `pfsense` / `opnsense` |
| Linux | `linuxgeneric` | — | `linux` |

Los nombres de Oxidized y RANCID cambian algo entre versiones: tome los que aparecen en su `router.db`. OpenNCCM admite más de 90 plataformas; si la suya no está aquí, búsquela en **Fabricantes** y use su clave.

## Desde Oxidized

**Inventario.** Oxidized lee los equipos de la fuente que tenga configurada (`source:` en `~/.config/oxidized/config`):

- **Fuente CSV** (`router.db`, lo más habitual): cada línea es `nombre:modelo` (o con más campos, según el `map:` de su configuración, por ejemplo `nombre:ip:modelo:grupo`).
- **Fuente SQL o HTTP** (NetBox, LibreNMS…): exporte desde ese sistema la lista con nombre, IP, modelo y grupo.

Para un `router.db` con el formato `nombre:ip:modelo:grupo`, este comando genera el CSV de OpenNCCM. Cambie las equivalencias de modelos según la tabla de arriba y `red-admin` por el nombre de su credencial:

```bash
awk -F: 'BEGIN { print "name,host,device_type,credential,group,port,protocol,location"
  m["ios"]="cisco_ios"; m["nxos"]="cisco_nxos"; m["junos"]="juniper_junos";
  m["eos"]="arista_eos"; m["procurve"]="hp_procurve"; m["fortios"]="fortinet"; m["routeros"]="mikrotik_routeros" }
  !/^#/ && NF >= 3 { t = ($3 in m) ? m[$3] : $3; print $1 "," $2 "," t ",red-admin," $4 ",,," }' router.db > equipos.csv
```

**Credenciales.** Están en la sección `username:`/`password:` de la configuración (o por grupo en `groups:`, o por equipo en `vars_map`). Cree en OpenNCCM una credencial por cada combinación y use su nombre en la columna `credential`.

**Historial.** Las versiones viejas quedan en el repositorio Git de Oxidized (`output: git`). Guárdelo: se puede consultar con `git log` y `git show` aunque Oxidized ya no esté en marcha.

## Desde RANCID

**Inventario.** Cada grupo de RANCID tiene su `router.db` en `/var/rancid/<grupo>/router.db` (o `/usr/local/rancid/var/<grupo>/`). Cada línea es `nombre;tipo;estado` (en RANCID 2, con `:`). Solo interesan los equipos con estado `up`.

Este comando recorre todos los grupos y genera el CSV. El grupo de RANCID pasa a ser el grupo de OpenNCCM y, como RANCID no guarda la IP, se usa el nombre (que debe resolver por DNS):

```bash
for f in /var/rancid/*/router.db; do g=$(basename "$(dirname "$f")"); \
  awk -F'[;:]' -v g="$g" '$3 == "up" { print $1 "," $1 "," $2 ",red-admin," g ",,," }' "$f"; done \
  | sed -e 's/,cisco-nx,/,cisco_nxos,/' -e 's/,cisco-xr,/,cisco_xr,/' -e 's/,cisco,/,cisco_ios,/' \
        -e 's/,juniper,/,juniper_junos,/' -e 's/,arista,/,arista_eos,/' -e 's/,foundry,/,ruckus_fastiron,/' \
  | sed '1i name,host,device_type,credential,group,port,protocol,location' > equipos.csv
```

**Credenciales.** Están en `~rancid/.cloginrc` (líneas `add user`, `add password` y `add method` por patrón de equipo). Cree una credencial por cada usuario/contraseña distinto. Si algún patrón usa `telnet`, ponga `telnet` en la columna `protocol` de esos equipos.

**Historial.** RANCID guarda las versiones en CVS, Subversion o Git (`RCSSYS` en `rancid.conf`). Conserve ese repositorio para consultas.

## Desde SolarWinds NCM

**Inventario.** Hay dos formas de sacarlo:

- **Desde la web de Orion:** *Settings → Manage Nodes*, filtre los nodos administrados por NCM y use **Export** a CSV (o un informe personalizado con *Caption*, *IP Address*, *Vendor*, *Machine Type* y el grupo o sitio).
- **Con SWQL Studio** (más limpio):

```sql
SELECT n.Caption, n.IPAddress, n.Vendor, n.MachineType, n.Location
FROM Orion.Nodes n
JOIN Cirrus.Nodes c ON c.CoreNodeID = n.NodeID
ORDER BY n.Caption
```

Abra el resultado en una hoja de cálculo y deje las columnas como pide OpenNCCM: *Caption* en `name`, *IPAddress* en `host`, el grupo o sitio en `group` y *Location* en `location`. En `device_type`, convierta *Vendor*/*MachineType* con la tabla de arriba; por ejemplo, «Cisco» con «Catalyst 9300» pasa a `cisco_xe` y «Fortinet» pasa a `fortinet`. Guárdelo como **CSV UTF-8**.

**Credenciales.** NCM usa *Connection Profiles* (Settings → NCM Settings → Connection Profiles) o credenciales por nodo. Cree en OpenNCCM una credencial por cada perfil, con el mismo usuario, contraseña y, si aplica, *enable*.

**Historial.** Exporte de NCM las configuraciones que quiera conservar (*Configuration Management → Export*) o deje NCM en solo lectura hasta que ya no las necesite.

## Después de importar

1. **Respaldar todos** en **Dispositivos** (o `sudo opennccm backup-all`).
2. Filtre los equipos con error. Lo habitual es una credencial equivocada, un `device_type` que no corresponde (por ejemplo, IOS-XE importado como IOS) o un cortafuegos que no deja entrar al servidor de OpenNCCM por SSH.
3. Cuando un equipo respalda bien, marque su **línea base** (ver [Línea base](/equipos/linea-base/)).
4. Programe el respaldo diario en **Tareas** y, si quiere, las políticas de cumplimiento.
5. **Convivencia:** deje funcionando las dos herramientas una o dos semanas y compare. Después apague la anterior y guarde su historial en solo lectura.

:::tip[¿Lo hacemos por usted?]
El [soporte profesional](/ayuda/planes/) incluye el servicio de **migración**: armamos el inventario, las credenciales y el primer respaldo con usted.
:::
