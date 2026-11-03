---
title: "Informes"
curso: ["8.3"]
---

Cada informe es una tarjeta con **Ver** (en pantalla, con el periodo de 7, 30, 90 días o un año cuando aplica) y **CSV** (UTF-8, se abre directamente en Excel). Los administradores pueden **enviarlos por correo ahora** o **programar el envío**.

| Informe | Contenido |
| --- | --- |
| Inventario | Nombre, IP, fabricante, modelo, serie, versión, grupo, estado, conflictos y línea base |
| Cambios de configuración | Cada versión nueva con fecha, origen, usuario y líneas |
| Cumplimiento | Resultado por equipo, política y regla |
| Conflictos startup ≠ running | Equipos con cambios sin guardar |
| Fuera de línea base | Equipos con línea base y si se desviaron |
| Fin de vida (EOL/EOS) | Fechas y estado de cada equipo |
| Vulnerabilidades | CVE por equipo |
| Licencias por vencer | Servicios de la licencia de cada equipo (hoy, la feature key de WatchGuard) que vencen en los próximos 90 días o ya vencieron, lo más urgente primero |
| Solicitudes de cambio | Quién pidió, quién aprobó y el resultado |
| Auditoría de usuarios | Inicios de sesión y acciones (solo administradores) |

![Lista de informes.](../../../assets/manual/23-informes.png)

![Informe de inventario en pantalla.](../../../assets/manual/24-informe-inventario.png)
