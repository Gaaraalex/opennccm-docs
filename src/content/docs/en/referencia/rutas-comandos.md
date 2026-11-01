---
title: "Paths, variables and commands"
description: "Where everything lives on the server and the opennccm commands."
---

## Paths

| Path | Contents |
| --- | --- |
| `/opt/opennccm` | Application code and Python environment (`.venv`) |
| `/var/lib/opennccm/opennccm.db` | SQLite database |
| `/var/lib/opennccm/firmware` | Uploaded firmware images |
| `/var/lib/opennccm/system-backups` | Recovery backups |
| `/var/lib/opennccm/pre-update` | Pre-update backups |
| `/etc/opennccm/secret.key` | AES-256 key |
| `/etc/opennccm/opennccm.env` | Service variables |
| `/etc/systemd/system/opennccm.service` | systemd service |
| `/etc/nginx/sites-available/opennccm` | nginx configuration |

## Variables in `/etc/opennccm/opennccm.env`

| Variable | Default | Use |
| --- | --- | --- |
| `NCM_DATABASE_URL` | SQLite | Connection string (PostgreSQL) |
| `NCM_SYSLOG_PORT` | 514 | UDP port of the syslog receiver |
| `NCM_SYSLOG_ENABLED` | 1 | 0 to turn the receiver off |
| `NCM_WORKERS` | 16 | Devices processed in parallel |
| `NCM_NVD_API_KEY` | (empty) | Free NVD key: speeds up the CVE scan |

After editing the file: `sudo systemctl restart opennccm`.

## Commands

| Command | Action |
| --- | --- |
| `opennccm status` | Status, version, address, disk space and updates |
| `sudo opennccm update [--check|--yes|--version vX.Y.Z]` | Upgrade |
| `sudo opennccm rollback` | Roll back to the previous version |
| `sudo opennccm backup [--with-key]` | Recovery backup |
| `sudo opennccm restore FILE` | Restore a backup |
| `sudo opennccm users` | List users, role, status and allowed devices |
| `sudo opennccm reset-password USER 'PASSWORD'` | Change a password / create an administrator |
| `sudo opennccm backup-all` | Back up all devices now |
| `sudo opennccm seed` | Reload the sample policies and configlets |
| `opennccm logs [-f]` | Service log |
| `sudo opennccm start|stop|restart` | Control the service |
| `sudo opennccm uninstall [--purge]` | Uninstall |

Installation log: `/var/log/opennccm-install.log`. Options chosen at installation: `/etc/opennccm/install.conf` (reused by upgrades).

:::note[How each version is validated]
Before a version is published, GitHub automatically runs on Ubuntu 22.04 and 24.04 servers: the application tests against a simulated Cisco router, an unattended installation, an installation with the menu wizard, an upgrade, a rollback and automatic recovery from a broken version. Even so, validate the installation on a test server before moving to production.
:::
