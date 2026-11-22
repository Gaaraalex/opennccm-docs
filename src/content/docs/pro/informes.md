---
title: "Informes profesionales"
description: "Módulo Pro: informe ejecutivo, auditoría firmada, Documento de la red, inventario para gerencia, envíos programados y plantilla de marca."
---

**Informes › Profesionales** reúne los informes de la red para compartir con gerencia, clientes o auditores. Es un módulo de [OpenNCCM Pro](/pro/licencia/); los [informes de siempre](/observar/informes/) siguen gratis.

| Informe | Qué trae | Cuándo |
| --- | --- | --- |
| **Ejecutivo mensual** | Salud de la red, cambios, cumplimiento, CVE y equipos sin soporte, con su tendencia | Cada mes; **Comparar con otro mes o dos fechas** |
| **Auditoría de cumplimiento** | Una norma o política, con la evidencia de cada control, y firma | Bajo demanda |
| **Documento de la red** | Inventario, mapa, VLAN e IP, enlaces, cumplimiento y respaldos en un PDF o un Word para entregar | Bajo demanda |
| **Inventario para gerencia** | Equipos por sede, marca y fin de soporte, con el costo estimado de renovación | Trimestral |

Cada tarjeta tiene su **Vista previa**, **Descargar PDF** y **Programar envío**.

## Informe ejecutivo

Elige el **Mes del informe** y, si quieres, **Comparar con** otro mes o dos fechas. Muestra los cambios por semana, el cumplimiento de los últimos 6 meses, los CVE críticos, los equipos sin soporte y los respaldos fallidos. Si no hay nada urgente, lo dice.

## Auditoría de cumplimiento

1.  Elige la norma o política, el **Alcance** (equipos, grupo o sitio) y la **Fecha de la auditoría**. Se audita con el respaldo que cada equipo tenía a esa fecha; los que no tenían respaldo se listan aparte.
2.  Revisa el resultado: reglas que se cumplen, controles que se cumplen del todo, equipos auditados y, por control, los equipos, el resultado y la evidencia.
3.  Escribe **Nombre · Cargo** de quien firma y pulsa **Generar PDF firmado**. Se agrega al final con la fecha y la huella del informe.

Las auditorías firmadas quedan en la lista con su huella y **Descargar**. **¿Le pasaron un PDF de auditoría?** › **Comprobar que es auténtico y no cambió** verifica un PDF que te mandaron.

## Documento de la red

Genera un PDF o un Word (.docx) de un sitio, un grupo o toda la red, con las secciones que se elijan: inventario (modelo, serie y firmware), mapa de la red, VLAN y direcciones IP, enlaces entre equipos, cumplimiento y vulnerabilidades y el último respaldo de cada equipo. Puede llevar portada con el logo y el nombre del cliente, y ocultar las IP públicas. Las contraseñas, comunidades SNMP y claves nunca salen: el documento no lleva configuraciones.

Los documentos generados quedan en la lista con **Ver**, **Descargar** y, si la red cambió desde entonces, **Regenerar**. Cada documento generado y descargado queda en Auditoría.

:::note[Desde la versión 2.45]
El Documento de la red era gratis hasta la 2.44. Los documentos que ya generaste se siguen viendo y descargando sin licencia, en **Informes › Mis documentos**.
:::

## Inventario para gerencia

Equipos por sede, marca y año de fin de soporte, con el costo estimado de renovación. Se filtra por sede y **Fecha de corte**.

OpenNCCM no trae precios: en **Precios de reemplazo** escribe, por modelo, la **Moneda**, el **Reemplazo sugerido** y el **Precio por unidad**. Un modelo marcado **No se reemplaza** no suma y no cuenta como «sin precio». La pantalla avisa «Faltan precios en N modelos».

## Envíos programados

**Programar envío** manda un informe por correo solo:

-   **Frecuencia** y **Cuándo**: día del mes o de la semana y hora del servidor.
-   Destinatarios, **Asunto** (`{mes}` y `{año}` se cambian por los del informe) y **Formato**.
-   El correo lleva un enlace que no pide iniciar sesión y vence a los 30 días. **Anular enlaces enviados** hace que nadie pueda volver a abrirlos.
-   Opcional: **Enviar solo si hay CVE críticos o cumplimiento bajo del 80 %**.
-   **Enviar una prueba ahora** y **Dejar de enviar**.

Necesita el servidor de correo (SMTP) configurado en [Ajustes](/administracion/ajustes/). Con la licencia vencida o en pausa no se envía nada; lo programado se guarda y vuelve solo al renovar.

## Plantilla de marca

**Plantilla de marca** la usan todos los informes: el ejecutivo, la auditoría y el Documento de la red, en PDF y en Word, y también los envíos programados.

-   **Logo:** PNG o JPEG, hasta 2 MB; mejor con fondo transparente.
-   **Nombre** y **Color** (código `#RRGGBB`).
-   **Portada:** con o sin portada.
-   **Pie:** un texto (por ejemplo «Confidencial · uso interno») que va a la izquierda del pie de cada página, junto a la fecha.

La **Vista previa** muestra el resultado antes de **Guardar plantilla**.
