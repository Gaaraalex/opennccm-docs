---
title: "Configlets"
description: "Plantillas de comandos reutilizables para hacer cambios masivos o diagnósticos en muchos equipos a la vez."
curso: ["5.1"]
---

| Tipo | Qué hace | Aprobación |
| --- | --- | --- |
| **config** | Entra en modo configuración, aplica los comandos y guarda la configuración (o hace *commit* en Junos, IOS-XR, PAN-OS, VyOS…). | Sí: crea una solicitud de cambio. |
| **exec** | Ejecuta comandos de consulta (`show`, `display`…) y muestra la salida de cada equipo. | No: es inmediato. |

![Lista de configlets (se incluyen ejemplos para cambiar contraseñas, VLAN, NTP, syslog y diagnósticos).](../../../assets/manual/10-configlets.png)

## Variables

Los comandos son plantillas Jinja2. Puede usar datos del equipo y variables propias que se piden al ejecutar:

```bash
vlan {{ vlan_id }}
 name {{ vlan_nombre }}
{% if device.group == "Core" %}
spanning-tree vlan {{ vlan_id }} priority 4096
{% endif %}
! aplicado en {{ device.name }} ({{ device.host }})
```

Variables del equipo: `device.name`, `device.host`, `device.model`, `device.os_version`, `device.serial`, `device.location`, `device.device_type`, `device.group`.

![Edición de un configlet. «Aplica a» limita los equipos compatibles (expresión sobre el device_type).](../../../assets/manual/32-configlet-form.png)

## Ejecutar

1.  Pulse **Ejecutar** en la tarjeta del configlet: se abre un panel lateral.
2.  Complete las variables detectadas: hay un campo por cada una, y la **vista previa de comandos** se actualiza al escribir.
3.  Elija los equipos compatibles: uno a uno, todos, ninguno o un grupo completo.
4.  Para **config**: pulse **Crear solicitud de cambio** y espere la aprobación. Para **exec**: verá la salida al instante.

![Ejecución: variables y selección de equipos.](../../../assets/manual/11-configlet-ejecutar.png)

![Resultado de un configlet de diagnóstico.](../../../assets/manual/12-configlet-exec-resultado.png)
