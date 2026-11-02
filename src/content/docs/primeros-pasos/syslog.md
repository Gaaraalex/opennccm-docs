---
title: "Enviar syslog desde los equipos"
description: "Detección de cambios en tiempo real."
curso: ["4.1"]
---

<p class="captura-tema"><img class="tema-oscuro" src="/capturas/oscuro/alarmas.png" alt="Alarmas con un cambio de configuración detectado por syslog" width="1600" height="1000" loading="lazy" /><img class="tema-claro" src="/capturas/claro/alarmas.png" alt="Alarmas con un cambio de configuración detectado por syslog" width="1600" height="1000" loading="lazy" /></p>

-   Reconoce los mensajes de cambio de Cisco IOS/IOS-XE/NX-OS/ASA, Juniper, Huawei, H3C, FortiGate, Palo Alto, MikroTik, Aruba/HPE y mensajes genéricos «configuration changed».
-   Varios avisos del mismo equipo en menos de 60 segundos generan un solo respaldo.
-   Los cambios aplicados por OpenNCCM (solicitudes aprobadas) abren una **ventana de mantenimiento**: no se consideran intrusiones. La ventana se cierra en cuanto termina el respaldo posterior; cualquier aviso recibido mientras tanto se revisa en cuanto se cierra.
-   Configure el envío de syslog en los equipos (ver [cómo configurarlo en cada fabricante](/primeros-pasos/syslog/#configurar-cada-fabricante)).

## Configurar cada fabricante

Para que OpenNCCM detecte los cambios **en el momento** en que alguien los hace, cada equipo debe enviar sus mensajes syslog al servidor (UDP 514). Al recibir un aviso de cambio, OpenNCCM espera 20 segundos, respalda el equipo, compara, alerta y, si está activada, revierte el cambio no autorizado.

:::tip[Atajo]
Hay configlets listos para Cisco IOS, Junos y Huawei en **Configlets → «Configurar syslog hacia OpenNCCM»**: elija los equipos, escriba la IP del servidor en la variable `servidor_ncm` y apruebe.
:::

### Cisco IOS / IOS-XE

```bash
logging host IP_DEL_SERVIDOR
logging trap notifications
archive
 log config
  logging enable
  notify syslog contenttype plaintext
```

### Juniper Junos

```bash
set system syslog host IP_DEL_SERVIDOR interactive-commands notice
set system syslog host IP_DEL_SERVIDOR change-log info
commit
```

### Huawei VRP / H3C

```bash
info-center loghost IP_DEL_SERVIDOR
```

### Fortinet FortiGate

```bash
config log syslogd setting
    set status enable
    set server "IP_DEL_SERVIDOR"
end
```

### MikroTik RouterOS

```bash
/system logging action add name=ncm target=remote remote=IP_DEL_SERVIDOR
/system logging add topics=system,info action=ncm
```

### Aruba / HPE / Arista

```bash
logging IP_DEL_SERVIDOR
```

El equipo debe estar dado de alta en OpenNCCM con la **misma IP** desde la que envía el syslog (o con un nombre DNS que resuelva a ella). Puede comprobar la recepción en **Alarmas**: aparece un evento «Syslog de cambio».
