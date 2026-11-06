---
title: "Alarmas y notificaciones"
curso: ["8.1"]
---

Todo lo relevante genera un **evento** con severidad por color:

| Severidad | Ejemplos |
| --- | --- |
| **critical** | Reversión automática, vulnerabilidad crítica, fallo de copia de recuperación |
| **major** | Respaldo fallido, infracción de cumplimiento crítica, solicitud fallida |
| **warning** | Cambio de configuración, conflicto startup/running, desviación de línea base, infracciones |
| **info** | Syslog recibido, solicitud pendiente o ejecutada, copias creadas |

**Alarmas** se abre en **Sin reconocer** (o **Todas**), con chips por severidad y su recuento. Cada alarma muestra el equipo y hace cuánto ocurrió (el detalle completo aparece al pasar el ratón), con **Abrir equipo** y **Reconocer**; también se pueden reconocer todas (con **Deshacer** en el aviso). Las de severidad igual o mayor a la configurada en Ajustes se envían por correo, webhook (Teams, Slack…) y/o Telegram.

Si la regla «Al cerrar una alarma crítica» de la [base de conocimiento](/observar/base-de-conocimiento/) está activa (lo está por omisión), una alarma **crítica** no se cierra con **Reconocer**: se abre **Cerrar alarma crítica**, donde se elige **Cerrar y documentar** o **Cerrar y enlazar** (a un caso que ya existe). Con el [aviso de vecino nuevo o perdido](/observar/analisis/#aviso-de-vecino-nuevo-o-perdido) activado, el filtro **Vecinos** muestra solo esas alarmas.

«Reconocer todas» deja abiertas las críticas. Las alarmas críticas de CVE («Vulnerabilidad de firmware») son la excepción: son un estado que se resuelve al actualizar el firmware y su registro está en [Vulnerabilidades](/proteger/vulnerabilidades/), así que se reconocen sin caso, también con «Reconocer todas». «Reconocer todas» responde enseguida aunque haya cientos de alarmas, y **Deshacer** funciona con miles.

![Alarmas y eventos.](../../../assets/manual/21-alarmas.png)

## Configurar las notificaciones

Menú **Ajustes → Notificaciones**. Configure uno o varios canales y pulse **Enviar notificación de prueba**.

| Canal | Qué completar |
| --- | --- |
| Correo | Servidor SMTP, puerto (587 con STARTTLS o 465 con SSL), usuario, contraseña, remitente y destinatarios separados por coma. |
| Microsoft Teams / Slack / Mattermost / Google Chat | URL del *incoming webhook* del canal. |
| Telegram | Token del bot (de @BotFather) y el ID del chat o grupo. |

La «severidad mínima» define qué se notifica: `warning` envía cambios de configuración, infracciones y fallos; `critical` solo reversiones automáticas y vulnerabilidades críticas.

![Ajustes: flujo de cambios, notificaciones, API Cisco y recuperación.](../../../assets/manual/29-ajustes.png)
