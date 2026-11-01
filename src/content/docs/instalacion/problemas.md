---
title: "Solución de problemas"
description: "Lista de verificación y problemas frecuentes."
---

## Lista de verificación

| Comprobación | Cómo | Resultado esperado |
| --- | --- | --- |
| Servicio activo | `systemctl status opennccm` | active (running) |
| Web responde | `curl -k https://localhost/healthz` | `{"status":"ok"}` |
| Syslog escuchando | `sudo ss -ulpn | grep 514` | proceso python en 0.0.0.0:514 |
| Llega a un equipo | `ssh USUARIO@IP_EQUIPO` desde el servidor | pide contraseña |
| Primer respaldo | Ficha del dispositivo | estado ok + versión #1 |
| Alertas | Ajustes → Enviar notificación de prueba | llega el mensaje |

## Problemas frecuentes

| Síntoma | Causa probable y solución |
| --- | --- |
| La web no abre | Ver logs: `journalctl -u opennccm -n 100` y `sudo nginx -t`. Revise el cortafuegos (puerto 443). |
| «No se pudo abrir syslog UDP/514» en el log | Otro servicio usa el puerto (p. ej. rsyslog con recepción UDP activada). Desactive esa recepción o cambie `NCM_SYSLOG_PORT` en `/etc/opennccm/opennccm.env`. |
| Respaldo: «TCP connection to device failed» o timeout | Sin conectividad o SSH cerrado. Pruebe `ssh` desde el servidor; revise ACL de VTY en el equipo. |
| Equipo antiguo: «no matching host key type found. Their offer: ssh-rsa» o «Incompatible ssh peer» | El equipo (p. ej. Ubiquiti EdgeSwitch, Cisco IOS 12.x, HP ProCurve antiguos) solo admite algoritmos SHA-1. Desde la versión 1.3.1 OpenNCCM los acepta automáticamente **solo como última opción**, así que actualice con `sudo opennccm update`. Los equipos modernos siguen usando algoritmos modernos. Lo recomendable a largo plazo es actualizar el firmware del equipo. |
| «El equipo pide contraseña para el modo privilegiado (enable)…» o «Failed to enter enable mode» | El equipo exige una contraseña de *enable* distinta de la de ingreso (OpenNCCM ya prueba sin contraseña y con la de ingreso). Escríbala en **Credenciales → Enable / secret** de la credencial asignada al equipo y vuelva a respaldar. |
| El botón «Actualizar» de la web muestra «fatal: $HOME not set» | Error de la versión 1.6.0/1.6.1, corregido en la 1.6.2. Actualice una vez desde la consola con `sudo opennccm update`; a partir de ahí el botón funciona. |
| El navegador no ofrece guardar el usuario y la contraseña | El sitio tiene un aviso de certificado. Instale la autoridad «OpenNCCM CA» en el PC (ver [HTTPS y cortafuegos](/instalacion/https-cortafuegos/)) y entre siempre con la misma dirección. |
| Perdí el teléfono de la verificación en dos pasos | Otro administrador la quita en Usuarios → Editar, o en el servidor: `sudo opennccm reset-2fa USUARIO`. |
| «La cuenta está bloqueada temporalmente» | 5 contraseñas incorrectas seguidas: espere 15 minutos o pida a un administrador que le fije una contraseña nueva (eso la desbloquea). |
| La consola SSH web se desconecta al abrirla | Solo funciona con equipos por SSH y para quien tenga permiso (Ajustes → Seguridad y acceso). Detrás de otro proxy, éste debe permitir WebSocket. |
| Respaldo: «Authentication failed» | Usuario/contraseña incorrectos en la credencial asignada. |
| Respaldo: «Pattern not detected» | El prompt o el modo privilegiado no son los esperados: falta la contraseña de *enable*, o el `device_type` no corresponde al equipo. |
| Respaldo: «salida inválida» | El comando de respaldo no existe en esa versión. Defina un **comando de respaldo personalizado** en el dispositivo. |
| Los cambios no se detectan en tiempo real | El equipo no envía syslog, lo envía desde otra IP, o un cortafuegos bloquea UDP 514. Verifique con `sudo tcpdump -ni any udp port 514`. |
| Telnet «no soportado» | Esa plataforma no tiene variante Telnet en Netmiko: use SSH. |
| Olvidó la contraseña o no puede ingresar | `sudo opennccm users` para ver los usuarios y `sudo opennccm reset-password USUARIO 'NuevaClave123'`. Tras 10 intentos fallidos el ingreso se bloquea 15 minutos: `sudo opennccm restart` lo desbloquea. |
| Firmware: «MD5 no verificado» | Imagen dañada o espacio insuficiente; en Cisco habilite `ip scp server enable`. |
