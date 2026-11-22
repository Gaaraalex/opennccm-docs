---
title: "Site collectors"
description: "Pro module: back up the devices of remote sites without opening the network, with a collector on Linux or Windows."
---

A **collector** at each site backs up the devices on its network and sends the copies to this server (the **central** server), even when the central server cannot reach those devices. It is an [OpenNCCM Pro](/en/pro/licencia/) module: the license says how many sites you can have.

## How it works

-   The collector **is OpenNCCM** installed in collector mode: it uses the same profiles and connections as the central server, but has no web interface. It updates itself when the central server is updated.
-   The site always opens the connection, over **HTTPS to the central server**. No port is opened at the site. The site only needs to reach the central server's address.
-   Credentials live on the central server. They reach the collector encrypted for it alone, and at the site they are stored encrypted as in any OpenNCCM.
-   The central server decides when to back up: the same [scheduled tasks](/en/cambios/tareas/), **Back up now**, the syslog notice and the backup after a change. What arrives is stored just like a backup made from the central server: versions, inventory, neighbors, ports, compliance and alerts.
-   If the link drops, the collector keeps the results in a **queue** (up to 30 days or 2 GB) and sends them when it comes back.

## Add a site

1.  Go to **Administration › Site collectors** and click **Add site**.
2.  Type the **Site name** and choose **Which devices it backs up**:
    -   **By location:** the devices with that location, including those added later.
    -   **Choose devices by hand.** A device chosen by hand wins over its location.
3.  Click **Create site**. The window shows the **Enrollment key** and the installation command. Keep it: it is not shown again, it is valid for 7 days and only once. If it is lost, use **New enrollment key**.
4.  Check **This server's address from the site**: the site must be able to reach it over HTTPS. The collector saves the certificate fingerprint of that address and only connects back to it.
5.  Copy the command to the site machine (below). The window says "Waiting for the first connection…" and changes by itself to **Connected**.

### On Linux

Ubuntu 22.04 or 24.04, with sudo. The command carries the key, there is no need to type it:

```bash
curl -fsSL https://raw.githubusercontent.com/Gaaraalex/opennccm/main/install.sh | sudo bash -s -- --recolector https://CENTRAL --clave ra_…
```

It installs OpenNCCM in collector mode: no web interface, no nginx and no questions, just the service. Running it again with a new key on a machine that is already a collector reinstalls it and keeps the data.

### On Windows

In PowerShell as administrator, with the command the window gives: it downloads the installer (`opennccm-recolector-<versión>.exe`) from the central server, checks its SHA-256 and runs it. There is also **Download the installer (.exe)**.

-   It is installed in `C:\Program Files\OpenNCCM Recolector` and the data in `C:\ProgramData\OpenNCCM Recolector` (only for SYSTEM and Administrators).
-   It creates the "OpenNCCM Recolector" scheduled task, which starts with Windows and restarts if it fails.
-   The installer is not signed with a commercial certificate: if Windows warns that the publisher is unknown, check that the SHA-256 matches the one the central server shows and choose **More info › Run anyway**.
-   Commands: `opennccm-recolector.exe estado` and `opennccm-recolector.exe desinstalar` (`/todo` also deletes the data).

## Which devices each collector backs up

1.  If the device is **assigned by hand** to a collector, that one.
2.  If not, the collector whose site matches the device's **Location** (not case-sensitive).
3.  If not, the central server, as always.

In **Devices**, tick devices and use **Assign to a site…** to assign them by hand or go back to "By its location". Each device's page says **Backed up from** and lets you **Change** it.

:::caution[What is not done on a site's devices]
The central server cannot reach those devices: they do not get console, command push or configlets, firmware or automatic rollback. They are backed up from the site. The screens say so.
:::

## Each site's screen

The list shows each site with its status (**Online**, **Not reporting for N min**, **Never connected**, **Paused**, **Revoked**), its devices, the last backup and the queue. When you open a site:

-   **Last heartbeat**, **Last good backup**, the queue ("N pending · X% of the limit"), the machine and the collector version.
-   **Connections:** where it connected from (and whether it changed address).
-   **Devices:** each one with how it got there (by hand or by location), its last backup and its status.
-   **Actions:** **Pause** / **Resume**, **Revoke** (the collector can no longer connect), **New enrollment key** and **Remove site** (its devices go back to being backed up from the central server). None of them deletes backups.

A paused or revoked collector gets no tasks, and its devices are **not** backed up from the central server (it cannot reach them).

## Alerts

**Alert if a site doesn't report within** N minutes (15 by default, from 5 to 60). Alerts reach the bell and email, with the usual [alert rules](/en/observar/alarmas/):

-   "Sucursal Norte hasn't reported for 15 min" (only once until it comes back) and "is reporting again".
-   A site's queue almost full (80 %).
-   A site's collector has a different version from the central server.

The Dashboard shows how many sites are online and how many are not reporting.

## At the site

`sudo opennccm recolector estado` shows the site, the central server and the queue. `opennccm status` says it is a collector. `sudo opennccm recolector alta URL CLAVE` enrolls it with another key. `sudo opennccm update` updates the collector.

## License

The license says how many sites you can have. When you reach the limit, **Add site** is disabled ("Your license allows 5 sites · Expand"). Once the license has expired and the grace period has passed, the collectors are paused until you renew. Nothing is deleted.
