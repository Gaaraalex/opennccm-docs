---
title: "Upgrade and roll back"
description: "Move to a new version and, if something fails, go back to the previous one."
curso: ["9.2"]
---

New versions are published in the GitHub repository. When one is available, OpenNCCM tells administrators with a pop-up message. You can upgrade **from the web interface** (**Administration → System → Updates → Update now**, since 1.6.0) or with a command on the server; both do exactly the same:

```bash
sudo opennccm update
==> Buscando actualizaciones (stable)…

Actualización disponible: 1.2.0 → 1.3.0
## 1.3.0
- …novedades de la versión…

¿Actualizar ahora? [s/N] s
==> Creando copia previa
✓ Copia previa: /var/lib/opennccm/pre-update/AAAAMMDD-HHMMSS_v1.2.0
==> Instalando 1.3.0
==> Iniciando y verificando
✓ OpenNCCM actualizado: 1.2.0 → 1.3.0
```

## Options

| Command | Action |
| --- | --- |
| `sudo opennccm update --check` | Only shows whether there is a new version and what is new |
| `sudo opennccm update --yes` | Upgrades without asking (for automated tasks) |
| `sudo opennccm update --version v1.2.0` | Installs a specific version (also used to downgrade) |
| `opennccm status` | Says whether an update is available |

The installed version appears at the bottom of every page. The pre-update backups are kept in `/var/lib/opennccm/pre-update/` (the 5 most recent).

## Roll back to the previous version

```bash
sudo opennccm rollback
```

It shows a menu with the pre-update backups (newest first) and restores the code and database from that moment.

:::caution[Warning]
Rolling back also restores the database from that moment: backups and changes recorded after the upgrade are lost (the discarded database is kept with the suffix `.descartada-…`).
:::

## Good practices

-   Review what is new with `opennccm update --check` before upgrading.
-   If the server is a VM, take a snapshot before upgrading.
-   Upgrade outside the scheduled backup hours.
