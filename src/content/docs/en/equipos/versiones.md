---
title: "Versions and diff"
description: "See exactly what changed between two versions, of the same device or of different devices (for example, to compare two switches that should be identical)."
curso: ["4.2","4.1"]
---

## How it works

1.  OpenNCCM connects to the device with its credential and runs the profile's backup command (e.g. `show running-config`, `display current-configuration`, `show configuration | display set`).
2.  It removes volatile lines (timestamps, checksums) so it does not record false changes.
3.  If the content changed since the last version, it saves a new encrypted version, with its SHA-256 fingerprint and the lines added and removed.
4.  If the profile supports it, it also backs up the startup configuration and compares both (startup/running conflict).
5.  It updates the inventory (model, serial, version), compares with the baseline and runs the compliance audit.

**Device replaced.** If the serial number the backup reads is not the stored one, it is another unit at the same address (an RMA or a device swap). OpenNCCM raises "Device replaced" with both serials, records it in Audit and takes the new serial. If the configuration changed, the new version is tagged "new device · serial …" and the change notice explains that the difference is against the previous unit. [Automatic rollback](/en/cambios/reversion/) is not applied to the new device on its own: check whether it needs the previous unit's configuration restored.

Each version records its **source**: `manual` (button), `scheduled` (task), `syslog` (detected in real time) or `push` (applied by OpenNCCM).

## View a version

On the device page, **Versions** tab, the **›** arrow on each version opens it in a side panel. From there you can **download**, **compare with the previous one**, **tag** it (for example "before migration"), **mark it as baseline** or **roll the device back to that version**.

**Firmware of each backup.** Every backup stores the software version the device had when it was made, read in the same backup (from the inventory, or from the configuration itself: "! System Version" on an EdgeSwitch, the RouterOS header, "version …" on Cisco and Junos). It shows as a tag on each version in the timeline, in the inventory (latest backup and baseline) and in the open version, where the line it comes from is highlighted: **blue** if it is the same one the device has today, **amber** if it is another and **"not recorded"** on backups from before 2.36.0 (if a backup finds the configuration unchanged, the latest "not recorded" backup gets the version read in that backup). When the device changed firmware between two backups, the timeline marks it ("Firmware upgraded: v1.10.0 → v1.11.1 · between v2 and v3"). A version from another firmware warns before you roll back to it, and when comparing two backups from different firmware the differences the upgrade brought show in amber with "due to firmware". The downloaded file carries the version in its name ("SW-Miramar_v4_EdgeSwitch-1.11.1.txt"). Each backup's version does not change even if the device is upgraded later.

To find something inside the version, type in **Search in this version** (text or an IP): the lines that contain it are highlighted and **Enter** / **Shift+Enter** (or the arrows) jump between them. The **Tag** field does not search: it gives the version a name. To search the backups of every device, use **Search configs** in the menu.

**Copy all** copies the whole version to the clipboard, without line numbers. Very large backups (a C300 OLT goes over 40,000 lines) open instantly: the page only draws the part in view.

On a **MikroTik RouterOS** device, the page's **…** menu also offers **Download .rsc (latest backup)**, the saved `/export` ready for `/import`, and **Download the device's .backup…**. The router creates the latter on the spot (`/system backup save`), OpenNCCM fetches it over SFTP and deletes it from the device. You can set a password to encrypt it. The .backup includes users and passwords and can only be restored on the same model; to move the configuration to another device, use the .rsc. The credential's user needs the *ftp* policy (SFTP).

![A version with its actions.](../../../../assets/manual/06-version.png)

:::tip[Retention]
In Settings you can limit how many versions are kept per device. Tagged versions (including the baseline) are never deleted.
:::

## Changes and problems in Zabbix

If the network is monitored with Zabbix, each device's **Versions** tab shows, in a single time strip, its configuration changes (vN lines), the Zabbix problems (bars by severity: disaster, high, average, warning, information) and a metric (ping latency and loss, CPU or memory, whichever the host has). That way you can see at a glance whether a problem started right after someone changed something.

-   Choose the period: **24 h**, **7 days** or **30 days**. Hovering over the metric shows the value and the problems open at that moment; clicking a vN line opens that version.
-   Below, the problems table: severity, name (opens the event in Zabbix), when it started, how long it lasted (or "Still open") and the **change just before**: the latest version with differences saved up to 2 hours before the problem started, with a link that compares that version with the previous one.
-   In the version timeline, the versions that had problems shortly after carry the tag "N problems in Zabbix".
-   The device is looked up in Zabbix by its address (an interface with that IP or DNS name) and, failing that, by its name. If it is not there, the card says so along with what it searched for. If Zabbix does not respond, the page opens anyway and only that card warns.

It is enabled in **Administration › Settings › Zabbix** with the web interface address and an **API token** (a read-only user that sees the hosts is enough; the token is stored encrypted). **Test connection** shows the Zabbix version and how many hosts the token sees. It works with Zabbix 6.0 to 7.4 and only reads: OpenNCCM changes nothing in Zabbix.

![Changes and problems in Zabbix: the "Link down" problem started 15 minutes after change v4.](../../../../assets/manual/05d-zabbix-cambios.png)

## Configuration comparison

### How to use it

1.  In the device's **Versions** tab, click two versions on the timeline (the older one becomes A and the other B): the comparison appears beside it, in **side-by-side** or **unified** view. With huge configurations it draws at most 2,000 rows and offers the full `.diff` for download.
2.  **Compare configurations** (from Search configs or the device's ⋯ menu) compares versions of different devices and lets you change the context (0, 3, 10 lines or the whole file) and swap A and B.

At the top, **What changed** sums up the differences in words (for example "in 'interface Gi0/1', 'shutdown' was added"). The **side-by-side** view shows version A on the left and B on the right, with line numbers: in red what was removed or modified, in green what was added or modified. The **unified** view shows the classic diff format. The **n** and **p** keys jump to the next or previous change, and the thin bar on the right marks where all of them are.

![Version timeline with A and B selected.](../../../../assets/manual/05b-dispositivo-versiones.png)

![Side-by-side comparison.](../../../../assets/manual/07-diff-lado-a-lado.png)

![Unified comparison.](../../../../assets/manual/08-diff-unificada.png)
