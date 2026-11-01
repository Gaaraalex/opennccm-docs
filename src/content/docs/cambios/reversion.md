---
title: "Reversión"
description: "Devolver un equipo a una configuración anterior que funcionaba."
curso: ["4.5"]
---

## Cómo funciona

OpenNCCM compara la configuración actual con la versión destino y genera los comandos necesarios según la sintaxis del fabricante:

| Familia | Ejemplos | Comandos generados |
| --- | --- | --- |
| IOS | Cisco, Arista, Dell, Ruckus, Allied… | Antepone `no` a lo que sobra y agrega lo que falta, respetando bloques (interfaces, líneas…). Los ajustes de un solo valor (descripción, IP, VLAN de acceso o permitidas, hostname, usuario) se **reescriben** sin negarlos antes, así una IP de gestión no queda un instante sin configurar. Las VLAN nuevas se crean primero y las que sobran se borran al final. |
| Huawei | Huawei VRP, H3C/Comware | Igual, con `undo`. `vlan batch` se compara como conjunto: solo se crean o borran las VLAN que cambian. |
| FastPath | Ubiquiti EdgeSwitch, y cualquier equipo con ese estilo (Dell N-series, Netgear, Broadcom ICOS, UniFi Switch), que se detecta automáticamente | Respeta sus tres ámbitos: modo privilegiado, `vlan database` y `configure` (bloques cerrados con `exit`). Reescribe los ajustes de un solo valor (descripción, nombre, usuario) en lugar de borrarlos, usa `vlan participation auto` para quitar un puerto de una VLAN y **nunca cambia la IP de gestión** (`network parms`) para no cortar la conexión. Orden: primero crea las VLAN que faltan, luego ajusta los puertos y al final borra las VLAN que sobran. Los comandos se envían de uno en uno: si el switch rechaza uno («Failed to…»), se detiene ahí, no guarda la configuración y respalda el equipo para registrar su estado real. |
| Set | Junos, VyOS, EdgeRouter | `delete …` para lo que sobra y `set …` para lo que falta. En Junos se aplica con `commit confirmed 5`: OpenNCCM vuelve a conectar y confirma; si el cambio cortó el acceso, el equipo vuelve solo a la configuración anterior en 5 minutos. |
| MikroTik RouterOS | RouterOS 6 y 7 | Compara las exportaciones elemento a elemento: `set` para lo que cambió (con su selector, p. ej. `[ find default-name=ether1 ]`), `add` para lo que falta (las reglas de firewall vuelven a su posición con `place-before`) y `remove [ find … ]` para lo que sobra, en orden inverso (la IP de una VLAN antes que la VLAN). Se aplica en **modo seguro**: si un comando falla o la conexión se corta, RouterOS deshace todo lo aplicado. Probado en RouterOS 7.25, 7.23.8 y 6.49.23 reales. |
| Extreme EXOS | ExtremeXOS | `delete vlan`, `configure vlan … delete ports`, `unconfigure vlan … ipaddress`, `configure iproute delete`, `enable`/`disable`. Borra las VLAN que sobran antes de mover sus puertos (un puerto sin etiqueta solo puede estar en una VLAN). |
| Extreme VOSS / Fabric Engine | VSP, Fabric Engine | `vlan delete`, `vlan members remove`, `no vlan i-sid`, `no ip route` y bloques `interface … exit`; los puertos no se borran, vuelven a su valor. |
| Sin reversión por comandos | WatchGuard, FortiGate, PAN-OS, Check Point, airOS, UniFi, SwitchOS… | No se genera ningún comando: volver a aplicar la configuración entera no borra lo añadido y se detiene en la primera línea que ya existe, dejando el equipo a medias. OpenNCCM explica cómo restaurar la versión con la herramienta del fabricante (por ejemplo, Fireware Web UI o WatchGuard System Manager, o el controlador UniFi Network). La reversión automática no se puede activar en ellas. |

En todas las familias: **nunca se toca la dirección por la que OpenNCCM gestiona el equipo** (cambiarla cortaría la conexión a mitad); lo que no se puede deshacer con seguridad aparece en la solicitud como **Revisar a mano**, y esa solicitud no se ejecuta sola aunque la aprobación esté desactivada.

## Reversión manual

1.  Abra la versión a la que quiere volver y pulse **Revertir el equipo a esta versión…**
2.  Se crea una solicitud de cambio marcada «reversión» con los comandos generados. **Revíselos** antes de aprobar.

:::caution[Versiones incompletas]
Si la versión destino es menos de la mitad de la actual, casi siempre es un respaldo cortado: revertir a ella borraría del equipo todo lo que falta. La página de esa versión lo advierte y el botón normal de reversión desaparece; solo se puede crear con «Entiendo el riesgo: revertir de todas formas…». Desde la versión 1.4.0 los respaldos cortados o paginados («--More--») se rechazan y no se guardan.
:::

## Restaurar una copia en otro equipo

**Para qué sirve:** pasar la configuración de un equipo a otro **del mismo modelo**, por ejemplo al reemplazar un equipo averiado. El equipo de origen y sus versiones no se eliminan ni se modifican. Solo administradores.

1.  Abra la versión (o, en la ficha, menú **⋯ → Restaurar en otro equipo…**, que usa la última) y pulse **Restaurar en otro equipo…**
2.  Elija el destino:
    -   **Otro equipo de OpenNCCM**: se usa su credencial; los de otro modelo no se pueden elegir.
    -   **Equipo nuevo por IP (SSH)**: su IP de administración, puerto, usuario y contraseña. El equipo debe tener **SSH habilitado** y ser accesible desde el servidor. La contraseña solo se usa para esa restauración: no se guarda.
    -   **Cable de consola (puerto serie)**: con el cable conectado al PC del administrador, en Chrome o Edge (la página por HTTPS). El navegador abre el puerto serie, usted inicia sesión en el equipo en la propia página y OpenNCCM lee el inventario y la configuración por la consola. Disponible para MikroTik y las plataformas de sintaxis Cisco, Huawei y Junos.
3.  OpenNCCM lee el modelo del destino y lo compara con el del origen. Si no coincide, no se envía nada. Si coincide, muestra los **comandos** que llevarán el destino a la configuración de la copia (borra lo que sobra y añade lo que falta).
4.  Pulse **Restaurar**. Por SSH se aplica con la red de seguridad del equipo (modo seguro en MikroTik, commit confirmed en Junos) y se detiene en el primer comando rechazado; por consola, el navegador escribe las líneas y se detiene en la primera que el equipo rechace.

:::caution[Direcciones repetidas]
La copia lleva el nombre y las direcciones IP del equipo de origen. Si los dos quedan conectados a la misma red habrá direcciones repetidas. La dirección por la que OpenNCCM gestiona el destino se conserva.
:::

## Reversión automática

Si el dispositivo tiene activada **«Revertir automáticamente cambios no autorizados»**, cuando un cambio se detecta por syslog o por un respaldo programado, y no proviene de una solicitud aprobada, OpenNCCM aplica de inmediato los comandos inversos, vuelve a respaldar y genera una alarma **critical** «Reversión automática».

:::caution[Use la reversión automática con criterio]
Actívela en equipos donde todo cambio deba pasar por OpenNCCM. Un técnico que cambie el equipo directamente verá su cambio deshecho.
:::
