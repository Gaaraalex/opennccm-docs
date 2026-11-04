---
title: "Solicitudes y aprobación"
description: "Garantizar que ningún cambio llegue a la red sin revisión, y dejar constancia de quién lo pidió, quién lo aprobó, qué se aplicó y con qué resultado."
---

## Cómo usarlo

1.  Las solicitudes se crean desde configlets, correcciones de cumplimiento, reversiones y actualizaciones de firmware.
2.  El administrador abre la solicitud (menú **Cambios**, que se abre en «Por aprobar» si hay pendientes), revisa en el panel lateral la **vista previa de los comandos por equipo** y pulsa **Aprobar y ejecutar** o **Rechazar**. El comentario es opcional al aprobar y obligatorio al rechazar, para que quien la pidió sepa qué cambiar.
3.  Al ejecutarse, la sección **Resultado** muestra la salida de cada equipo. Los comandos se envían **de uno en uno**: si el equipo rechaza uno, OpenNCCM se detiene ahí, **no guarda** la configuración (ni hace commit; en Junos, IOS-XR, VyOS y similares descarta los cambios pendientes), indica qué comando falló y cuáles ya se aplicaron, y respalda el equipo para registrar su estado real. La solicitud queda como fallida para ese equipo.

:::note[Mensajes de error que se reconocen]
«% Invalid input» y similares (Cisco, Arista, Dell, Allied, Extreme), «% Unrecognized command» (HP Comware, Mellanox, A10), «Error:» (Huawei), «syntax error» y «unknown command» (Juniper), «bad command name», «expected end of command» y «failure:» (MikroTik), «Command fail» y «Unknown action» (FortiGate), «Invalid syntax» (Palo Alto), «MINOR:/MAJOR:» (Nokia), «!!%» (IOS-XR), «Set failed» (VyOS), «CLINFR» (Check Point) y «Failed to…» (EdgeSwitch, Netgear, Dell N-series). Si un comando pide confirmación («\[confirm\]», «(y/n)»), OpenNCCM no la responde: se detiene y lo informa.
:::

## Análisis de impacto: «¿Qué se cae si toco este equipo?»

Cuando una solicitud reinicia equipos (comandos como `reload`, `reboot`, `/system reboot` o un firmware con «Reiniciar al terminar») o apaga puertos, OpenNCCM calcula con el [mapa de la red](/observar/analisis/#mapa-de-la-red) (vecinos LLDP/CDP del último respaldo) qué queda sin servicio mientras dure el corte, y lo muestra en la solicitud:

-   Una tarjeta **Impacto alto / medio / sin impacto** con una frase («Si reinicias CORE-01 quedan aislados 3 equipos y se cortan 2 enlaces a routers o sucursales») y un mini-mapa: en **rojo** lo que queda aislado (sin camino alternativo), en **ámbar** los routers, firewalls y equipos de otra ubicación que se cortan, en **verde** los vecinos que siguen por otro camino. Al lado, las listas con de quién cuelga cada uno.
-   Lo que no se sabe se dice: los equipos que no informan vecinos «no se pudieron evaluar», el cálculo lleva la hora del respaldo del que salen los datos y no se estima cuánto dura el corte (depende del equipo).
-   Con impacto alto o medio, **Aprobar** queda desactivado hasta marcar **Leí el impacto**. Al aprobar, el impacto que se mostró queda en Auditoría junto con la aprobación.
-   **Ejecutar a esta hora:** la solicitud aprobada puede quedar programada para la ventana de mantenimiento (por omisión, hoy a las 23:00); se ejecuta sola a esa hora.
-   Si en Ajustes se desactivó «Exigir aprobación», una solicitud que deja equipos aislados (o cuyo impacto no se puede calcular) igual espera aprobación.

El mismo cálculo aparece al marcar **Reiniciar al terminar** en «Actualizar firmware» de la ficha, en las tareas programadas con un configlet que reinicia y en el mapa de la red: el botón **¿Qué se cae?** del panel de cada equipo pinta el mapa con los mismos colores.

:::tip[Para que sea preciso]
Active LLDP o CDP en los equipos (y en sus vecinos) y respáldelos: el cálculo usa los vecinos que se leen en cada respaldo. Un equipo con dos uplinks aparece en verde; si tiene uno solo, en rojo.
:::

![Solicitud pendiente con vista previa y formulario de revisión.](../../../assets/manual/14-solicitud-pendiente.png)

![Historial de solicitudes con su estado.](../../../assets/manual/13-solicitudes.png)

:::note[Opciones en Ajustes]
«Exigir aprobación» (activado por defecto) y «Permitir que un administrador apruebe sus propias solicitudes» (activado por defecto desde la versión 1.4.0; desactívelo si quiere que siempre revise otro administrador). Las actualizaciones de firmware siempre requieren aprobación.
:::
