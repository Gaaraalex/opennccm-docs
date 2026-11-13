---
title: "Devices and device page"
description: "Inventory of every managed device, with its backup status, model, firmware version and group."
curso: ["3.2","3.3","3.4"]
---

![Device list with status filters. The "Unsaved" and "Differs from baseline" tags point out conflicts.](../../../../assets/manual/03-dispositivos.png)

## How to use it

-   **Search and filter:** by name, IP, model, serial, version or location; by group, [node](/en/observar/analisis/#nodes) and brand; and by status (ok, error, pending, startup ≠ running, off baseline). Each device carries its brand logo (also on the device page, the map, the console and Ctrl K); the **BRAND** row shows how many there are of each and filters with one tap. The **Brand** menu shows about 12 at a time, with a scroll bar and a search box at the top ("Search brand").
-   **Back up all:** backs up every device (or those of the filtered group, or the ticked ones), 4 at a time. You see the progress with its percentage: a panel with the bar, how many succeeded, failed, are being backed up and are queued, and which one is being backed up now; each row of the list shows its step ("Connecting…", "Reading the configuration…", "Saving…") and updates by itself when done. The backup runs on the server: you can leave the page (the pill with the percentage stays next to "Devices" in the menu) and it lets you know when it finishes. **Cancel** does not start the remaining ones; at the end, the failed ones are listed with their reason and **Retry** backs up only those. A backup that fails for something transient (the device cut the session while the port answers, OpenNCCM's database busy) is checked and retried by itself; if the device does not answer or rejects the password, you are told without a retry.
-   **Row actions:** hovering a row shows back up, console and the device's web interface.
-   **Bulk actions:** select several rows and use the bottom bar to back them up, audit them, move them to a group or assign them to a node (**Assign to node**, administrators).
-   **\+ Add** (admin): **Add a device** opens the form in a side panel; **Import CSV** opens the bulk import; **Import from Zabbix** brings in the Zabbix hosts.

## Import from CSV

The panel explains the columns (`name,host,device_type,credential,group,port,protocol,location`; only the first three are required) and offers a template to download. When you choose the file it shows a **preview** with each valid row or its error (unknown platform, missing credential, invalid port or protocol, duplicate name). Rows with errors are skipped and the valid ones are imported; groups that do not exist are created.

![CSV import with its help.](../../../../assets/manual/04b-importar-csv.png)

## Import from Zabbix

If the devices are already in Zabbix (6.0 or later), **\+ Add › Import from Zabbix** creates them without typing them one by one:

1.  **Connect:** the address of the Zabbix web interface and an **API token** (in Zabbix 7: Users › API tokens; in 6.0: Administration › General › API tokens), or a user and password. A read-only user that can see the hosts is enough. The token and password are not stored; the address is. If Zabbix uses a self-signed certificate, untick *Verify the certificate*.
2.  **Choose the groups:** the Zabbix groups appear with how many hosts each one has and how many are new. Tick the ones you want to migrate (or *Select all*); only devices in those groups are imported.
3.  **Remove devices:** the list shows the hosts in the ticked groups with their name, address (IP of the main interface, or its DNS name), description, Zabbix groups and the **platform** deduced from the Zabbix templates and inventory (for example "Mikrotik by SNMP" → MikroTik RouterOS). Those not recognized stay as "Generic" with a *review* mark; each one can be changed. Untick those you do not want to bring in; you can filter by text. Devices that already exist in OpenNCCM (same name or address), those without an address and those disabled in Zabbix are not ticked.
4.  **Import:** the name, address (SSH, port 22) and description (in *Notes*) are saved and, if Zabbix has inventory, the model, serial number and location. Optionally, one credential and one group for all of them.

SSH credentials are not in Zabbix. If you do not choose one for all, the devices are created **disabled** (they are not backed up and raise no errors) until you edit each one, assign its credential and group, and enable it. To enable several at once, tick them in the Devices list and click **Enable**. Importing again later only adds the new hosts.

## Adding a device

| Field | Description |
| --- | --- |
| Name | Unique identifier (for example the hostname). |
| IP / hostname | Management address. It must be the same one the device sends syslog from. |
| Vendor / operating system | Platform profile (133 options grouped by vendor). It defines the commands used. |
| Protocol and port | SSH (22) or Telnet (23). Telnet only on platforms that support it. |
| Credential and group | User/password profile and the device's group. You can create a new group right here with "…or create a new group". They are also managed in **Devices → Groups**. |
| Node | The device's place (tower, branch, data center). Pick it from the list or with "+ Create new node…". See [Nodes](/en/observar/analisis/#nodes). |
| Type on the map | (Administrators) Router, switch, antenna / AP or firewall, if the map puts it in the wrong column. **Automatic** works it out from the model; MikroTik antennas (RB911, SXT, LHG…) and a MikroTik with an active wlan or wifi count as wireless. |
| Does it have a web interface? | **Yes** (default) shows the device's **Web interface** button; you can give its address if it is not `https://IP/`. **No** hides the button for devices without an admin page (many access switches, Linux servers…). It can be changed later in **Edit**. |
| Custom backup command | Optional: replaces the profile's command (useful with the "Generic SSH" profile or versions with a different syntax). |
| Enabled | If unticked, the device is **isolated**: OpenNCCM does not connect to it in any way (backups, console, Multi-device, recipes, change requests, firmware, .fxi image or the API) until it is enabled again. Its backups and history are kept. |
| Revert automatically | Undoes unauthorized changes when they are detected (see [Rollback](/en/cambios/reversion/)). |

![Add device form.](../../../../assets/manual/04-dispositivo-nuevo.png)

## Device page

It brings together everything about a device in tabs: **Summary** (inventory, baseline, lifecycle and latest versions), **Versions**, **Compliance**, **Vulnerabilities**, **Firmware** and **Events**. At the top are **Console**, **Web interface** and **Back up now**; the **⋯** menu groups audit, look up CVEs, upgrade firmware, edit, compare with another device, see the differences with the baseline, go back to it (if the device has no baseline yet, it lets you mark the latest version) and delete. To delete a device you have to type its name, because it is removed with its whole history.

**Disabled device.** Instead of "Online" it says **Disabled** and does not offer Console, Web interface or Back up now: the device is isolated and OpenNCCM does not connect to it. An administrator enables it again with **Enable**, on the device page itself. In the Devices list, when you tick several devices, **Enable** and **Disable** act on all of them at once (administrators only; it is logged in Audit).

### Retired devices (damaged or replaced)

When a device is damaged, replaced by another that will do the same job or decommissioned, there is no need to delete it: on its page, **⋯ → Retire or replace…** menu (administrators only). You choose the reason (damaged, replaced, returned or other) and, if you like, a note.

-   The device is renamed with a sequence number per name: the first one retired from `SW-CORE-01` becomes `SW-CORE-01 (1)`, the next `SW-CORE-01 (2)`, and so on.
-   It is left **without an address**: the name and IP become free for the new device. The original name and IP are kept and you can search by them (in Devices, in Retired and with Ctrl K).
-   It is **disabled and isolated** (OpenNCCM does not connect to it) and out of everything active: dashboard, map, alarms, reports, tasks and the API. Its open alarms are closed and its versions are not purged.
-   It keeps **all its history** for auditing: versions and backups, compliance, vulnerabilities, events and ports.
-   With **Add the replacement device** (on by default), the new device is created in the same step with the retired one's name, IP, type, credential, group, node and location, and its first backup starts. Its page says which device it replaces and offers **Compare** its backup with the retired one's last, to check it was configured the same way.

Retired devices are listed in **Devices › Retired**, with their original name and IP, the reason, who retired them and when, and which device replaced them. A retired device cannot be edited: **Reinstate** brings it back into service with the name and IP you give (by default the original ones, if free) and, if ticked, enabled.

![Device page for R1, Summary tab.](../../../../assets/manual/05-dispositivo.png)

### Device ports

Between the header and the tabs, a **port strip** draws the front of the device with one icon per port in its physical order: RJ45 for copper and an SFP cage for fiber (empty if it has no module). On large devices they go in two rows, odd ones on top and even ones below. Tapping a port shows its status, type, description, speed, address and neighbor; "See all ports" opens the **Ports** tab, with the *Interfaces* table (filters All, Up, Down, Fiber and, on large devices, Disabled and Copper; **Export CSV**) and a port card with **What the backup says**: the configuration line and the status line that explain its color.

| Color | Meaning |
| --- | --- |
| Green | Up: it has link. |
| Gray | Enabled without link (or, if the platform does not report status, simply enabled). |
| Amber with a dashed border | Disabled in the configuration (`disabled=yes`, `shutdown`). |
| Empty cage | Fiber port without an SFP module. |

The front is drawn like the model's: one row on routers and small switches (hEX, RB4011 with its gap after port 5, US-8, desktop firewalls) and two rows on large ones, in blocks as on the device (CRS326 in groups of 4 with the SFP+ at the bottom right; 24/48-port UniFi and EdgeSwitch and Cisco in groups of 6 with the SFPs in pairs). Models OpenNCCM does not know are drawn according to how many ports they have.

The configuration only says whether a port is disabled; the link is read in the same connection as the backup ("read in the backup from … ago"), with each platform's command:

| Platform | Command |
| --- | --- |
| MikroTik RouterOS | `/interface ethernet print` and `monitor` (status, speed, SFP module) |
| Cisco IOS/IOS-XE, Arista, Dell, TP-Link, Ruckus and most switches with a Cisco-style CLI | `show interfaces status` (or `show interface status/brief`) |
| Ubiquiti EdgeSwitch and UniFi (FastPath) | `show interfaces status all` |
| Huawei, H3C, HPE Comware | `display interface brief` |
| HPE ProCurve / Aruba OS-Switch · Aruba AOS-CX | `show interfaces brief` · `show interface brief` |
| Cisco NX-OS · ASA/FTD · WLC | `show interface status` · `show interface ip brief` · `show port summary` |
| Juniper · Extreme EXOS · Nokia SR OS | `show interfaces terse` · `show ports no-refresh` · `show port` |
| ZTE ZXA10 OLT (C300, C320…) | PON: `show gpon onu state` (active if it has at least one ONU online; says "12 of 14 ONUs online" and how many are in LOS, DyingGasp or OffLine) · uplinks: `show interface gei_…/xgei_…`. Only the count per PON is stored, not customer data. |
| Extreme VOSS / Fabric Engine (VSP) | `show interfaces gigabitEthernet` (OPERATE column of STATUS) |
| EdgeRouter, USG, VyOS | `show interfaces` (S/L column) |
| FortiGate · Palo Alto · Check Point | `get system interface physical` · `show interface all` · `show interfaces all` |
| WatchGuard Fireware | `show status-report` (only the "Physical Interfaces Link Status" section; Device Monitor is enough) |
| Linux, Ubuntu, airOS, airFiber, UniFi AP · pfSense, OPNsense | `/sys/class/net` · `ifconfig -a` |

If the device answers none of them, the ports come from the configuration in gray (disabled or enabled) with the notice "no link status".

### Back view: power supplies and fans

The strip's **Back** button shows the device's **power supplies** and **fans**: in green those working (supply with power, fan spinning) and in red those failing or without power; with a dashed border, those not installed. So you can see at a glance whether a device with two supplies has both connected. If one fails, the strip also warns from the front ("No power or failed: PSU 2", "Fan stopped: Fan 3") and the Back button gets a red dot. It is read in the backup with each vendor's command: MikroTik `/system health print`, Cisco `show environment all`, Juniper `show chassis environment`, Huawei `display power` and `display fan`, HPE `show system fans/power-supply`, Aruba AOS-CX and Arista `show environment …`, FastPath `show environment`, Extreme EXOS `show fans/power`, Extreme VOSS / Fabric Engine `show sys-info` ("Power Supply Info" and "Fan Info" sections) and FortiGate `execute sensor list`. Devices that do not report it over SSH (for example small fanless routers) say so in the Back view.

On devices with their ports at the back, such as the **WatchGuard Firebox T40**, the device page opens on **Back** and shows the device as it is: serial console, the two USB ports, the ports with their labels (0/WAN, 1/LAN, 2, 3, 4-PoE), Reset, the power switch and the power input. **Front** shows its lights (Failover, each port's lights, Status, Mode, Attn and power); clicking a port's lights selects it. On WatchGuard the interface name, whether it is enabled and its IP or the VLANs that pass through the port come from the configuration; the link and speed come from `show status-report`. At the back, a port with link shows in green; at the front its speed light comes on: the 1000 one in yellow and the 10/100 one in green, as on the device. **Mode** shows green if any external interface has link and blinks if none does; **Status** stays off, because on the Firebox it only lights for 30 seconds when someone logs in through the Web UI or the CLI. Each light explains its state on hover.

![Compliance tab: rules grouped by policy, with "Fix N".](../../../../assets/manual/05c-dispositivo-cumplimiento.png)

## WatchGuard: configuration (XML) and full image (.fxi)

A Firebox's device page has the **Backups** tab with WatchGuard's two kinds of backup:

| | Configuration (XML) | Full image (.fxi) |
| --- | --- | --- |
| **What it stores** | Policies, interfaces, VLANs, NAT, VPN, aliases, users and settings | All of the above, plus the certificates with their private keys, the feature key, the passwords and that Firebox's own information. Not the operating system: since Fireware 12.2.1 the image does not include it, which is why it is about 1 MB; to restore it, the Firebox needs a compatible Fireware version |
| **What it does not store** | The feature key (OpenNCCM stores it separately), the certificates with their keys, the device's own passwords and Fireware OS | — |
| **When** | On every backup; it changes nothing on the Firebox | Weekly, daily (at 03:00) or manually only |
| **Credential** | A read-only one (Device Monitor) is enough | Administrator (Device Administrator) |
| **Use it to** | See what changed, audit compliance and move the configuration to another Firebox (a replacement or another model) with Policy Manager | Recover the same Firebox after a failure, a factory reset or an upgrade that went wrong. It does not work for another device: WatchGuard treats it as unique to each Firebox |

When setting up the image you choose the administrator credential, the **encryption key** (8 to 15 characters, the most Fireware accepts; **Generate** creates a 15-character one; without it the image cannot be restored), the address the Firebox uses to reach OpenNCCM (detected automatically) and how many images to keep; the latest ones are kept. **Test connection** asks the Firebox to upload its configuration to the receiver, without creating any image.

Fireware only delivers the image by uploading it over FTP. For that, OpenNCCM opens a **temporary FTP receiver** only while the backup runs (port 2121 and passive ports 50000–50010, configurable): it accepts only the Firebox's IP, with a one-time user and password, and closes when it receives the file or after 5 minutes. If the server uses `ufw`, it opens those ports for the Firebox only and closes them when done (if the service stopped, the rule removes itself after 6 minutes). On the Firebox it runs `backup image`, `export image … to ftp://…` and `delete backup`: no copy is left on the device.

:::caution[Another firewall in the way]
If there is a firewall between the Firebox and OpenNCCM, allow port 2121 and passive ports 50000–50010 (TCP) from the Firebox to the server.
:::

If the image fails, the screen shows the Firebox's exact message and what to check (firewall, address, Firebox policy or a credential without permission). If it fails twice in a row the **".fxi image not created"** alarm opens; the XML backup is not affected.

Each file downloads in its own format (`DEVICE_v48.xml`, `DEVICE_img-12.fxi`), never as a .zip; **Download .xml and .fxi** gets both. The key never goes inside a file: only administrators see it, in **How to restore**, and [Audit](/en/administracion/auditoria/) records who viewed it. To restore the image: Fireware Web UI › **System › Backup and Restore Image**, import the .fxi and enter its key.

## Device web interface

The globe icon (next to the console one) and the **Web interface** button on the device page open its admin page in a separate window. By default `https://device-IP/` is used; if the device uses another address or port (for example `http://10.0.0.1:8080`), enter it in **Edit → Does the device have a web interface? → Address**. If the device has no web interface, choose **No** in that same question and the button is no longer shown. OpenNCCM does not take part in that connection: the browser connects directly to the device.

:::note[Security]
The console uses the same session as the page (it does not work from other websites), closes after 15 minutes without typing (4 hours at most), and every opening, failed attempt, forbidden or dangerous command, shared link and closing is recorded in the **Audit log**. It only works with devices configured for SSH.
:::
