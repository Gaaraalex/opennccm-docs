---
title: "Rutas, variables y comandos"
description: "Dónde está cada cosa en el servidor y los comandos de opennccm."
---

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/opt/opennccm` | Código de la aplicación y entorno Python (`.venv`) |
| `/var/lib/opennccm/opennccm.db` | Base de datos SQLite |
| `/var/lib/opennccm/firmware` | Imágenes de firmware cargadas |
| `/var/lib/opennccm/system-backups` | Copias de recuperación |
| `/var/lib/opennccm/pre-update` | Copias previas a cada actualización |
| `/etc/opennccm/secret.key` | Clave AES-256 |
| `/etc/opennccm/opennccm.env` | Variables del servicio |
| `/etc/systemd/system/opennccm.service` | Servicio systemd |
| `/etc/nginx/sites-available/opennccm` | Configuración de nginx |

## Variables de `/etc/opennccm/opennccm.env`

| Variable | Por defecto | Uso |
| --- | --- | --- |
| `NCM_DATABASE_URL` | SQLite | Cadena de conexión (PostgreSQL) |
| `NCM_SYSLOG_PORT` | 514 | Puerto UDP del receptor syslog |
| `NCM_SYSLOG_ENABLED` | 1 | 0 para desactivar el receptor |
| `NCM_WORKERS` | 16 | Equipos procesados en paralelo |
| `NCM_NVD_API_KEY` | (vacío) | Clave gratuita de NVD: acelera el escaneo de CVE |

Tras editar el archivo: `sudo systemctl restart opennccm`.

## Comandos

| Comando | Acción |
| --- | --- |
| `opennccm status` | Estado, versión, dirección, espacio y actualizaciones |
| `sudo opennccm update [--check|--yes|--version vX.Y.Z]` | Actualizar |
| `sudo opennccm rollback` | Volver a la versión anterior |
| `sudo opennccm backup [--with-key]` | Copia de recuperación |
| `sudo opennccm restore ARCHIVO` | Restaurar una copia |
| `sudo opennccm users` | Listar usuarios, rol, estado y equipos permitidos |
| `sudo opennccm reset-password USUARIO 'CLAVE'` | Cambiar contraseña / crear administrador |
| `sudo opennccm backup-all` | Respaldar ahora todos los equipos |
| `sudo opennccm seed` | Recargar políticas y configlets de ejemplo |
| `opennccm logs [-f]` | Registro del servicio |
| `sudo opennccm start|stop|restart` | Controlar el servicio |
| `sudo opennccm uninstall [--purge]` | Desinstalar |

Registro de la instalación: `/var/log/opennccm-install.log`. Opciones elegidas al instalar: `/etc/opennccm/install.conf` (las reutilizan las actualizaciones).

:::note[Cómo se valida cada versión]
Antes de publicar una versión, GitHub ejecuta automáticamente en servidores Ubuntu 22.04 y 24.04: las pruebas de la aplicación contra un router Cisco simulado, una instalación desatendida, una instalación con el asistente de menús, una actualización, una vuelta atrás y la recuperación automática ante una versión rota. Aun así, valide la instalación en un servidor de pruebas antes de pasar a producción.
:::
