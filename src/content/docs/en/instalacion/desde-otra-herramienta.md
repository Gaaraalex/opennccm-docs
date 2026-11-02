---
title: "Migrate from another tool"
description: "How to move to OpenNCCM from Oxidized, RANCID or SolarWinds NCM: inventory, credentials, first backup and running both side by side."
resumen:
  - "Moving from Oxidized, RANCID or SolarWinds NCM is mostly about taking the inventory to a CSV file and importing it."
  - "Credentials, policies and tasks are created again; the old history is not migrated, so keep the old tool read-only."
  - "After importing, run the first backup and review the devices that fail."
---

<p class="captura-tema"><img class="tema-oscuro" src="/capturas/oscuro/dispositivos.png" alt="Device list after importing the inventory" width="1600" height="1000" loading="lazy" /><img class="tema-claro" src="/capturas/claro/dispositivos.png" alt="Device list after importing the inventory" width="1600" height="1000" loading="lazy" /></p>

Moving to OpenNCCM from another backup tool is mostly about **bringing the inventory**: which devices you have, their address, their platform and which user logs in. OpenNCCM imports it from a CSV file and starts its own history with the first backup.

:::note[What moves and what doesn't]
- **Moves:** the devices (name, address, platform, group, port, protocol and location).
- **Recreated by hand:** credentials (one per username/password combination), compliance policies and scheduled tasks.
- **Doesn't move:** the configuration history of the old tool. OpenNCCM keeps versions from its first backup on. Keep the old tool (or its Git repository) read-only for as long as you need that history.
:::

## The plan in five steps

1. **Install OpenNCCM** on your server (see [Install on Ubuntu](/en/instalacion/instalar/)).
2. **Create the credentials** in the **Credentials** menu: one for each username/password your devices use, with short names such as `net-admin` or `firewalls` (see [Credentials and groups](/en/primeros-pasos/credenciales/)).
3. **Build the CSV** from your current tool (see below how to get it from each one).
4. **Import it** in **Devices → + Add → Import CSV**. The preview flags every row with an error before importing.
5. **Run the first backup** with **Back up all** (or `sudo opennccm backup-all`) and check the devices that fail.

## The CSV file

The first row holds the column names. Only `name`, `host` and `device_type` are required:

```text
name,host,device_type,credential,group,port,protocol,location
core-sw01,10.0.0.1,cisco_ios,net-admin,Core,22,ssh,Main data center
fw-edge,10.0.0.254,fortinet,firewalls,Security,,,
```

| Column | What to put |
| --- | --- |
| `name` | Device name (must be unique). |
| `host` | IP address or DNS name. |
| `device_type` | Platform key (table below; the full list is in the **Vendors** menu). |
| `credential` | Exact name of a credential that already exists in OpenNCCM. |
| `group` | Group; it is created if it doesn't exist. |
| `port` / `protocol` | Empty = `22` and `ssh`. For telnet put `telnet` (port 23 by default). |
| `location` | Free text: site, room, rack… |

The import panel offers a **template to download** and, before importing, shows the valid rows and those with errors: unknown platform, missing credential, invalid port or protocol, or duplicated name. Rows with errors are skipped.

### Most common platform equivalents

| Device | Oxidized (`model`) | RANCID (`type`) | OpenNCCM (`device_type`) |
| --- | --- | --- | --- |
| Cisco IOS | `ios` | `cisco` | `cisco_ios` |
| Cisco IOS-XE | `ios` | `cisco` | `cisco_xe` |
| Cisco NX-OS | `nxos` | `cisco-nx` | `cisco_nxos` |
| Cisco IOS-XR | `iosxr` | `cisco-xr` | `cisco_xr` |
| Cisco ASA | `asa` | `cisco` | `cisco_asa` |
| Juniper Junos | `junos` | `juniper` | `juniper_junos` |
| Arista EOS | `eos` | `arista` | `arista_eos` |
| HPE ProCurve / Aruba OS-Switch | `procurve` | `hp` | `hp_procurve` |
| HPE Comware / H3C | `comware` | `h3c` | `hp_comware` |
| Aruba CX | `aoscx` | — | `aruba_aoscx` |
| Huawei VRP | `vrp` | — | `huawei` |
| Fortinet FortiGate | `fortios` | `fortigate` | `fortinet` |
| Palo Alto PAN-OS | `panos` | — | `paloalto_panos` |
| MikroTik RouterOS | `routeros` | `mikrotik` | `mikrotik_routeros` |
| Dell OS10 | `os10` | — | `dell_os10` |
| Dell PowerConnect | `powerconnect` | — | `dell_powerconnect` |
| Extreme EXOS | `xos` | `extreme` | `extreme_exos` |
| Ruckus/Brocade ICX | `ironware` | `foundry` | `ruckus_fastiron` |
| Ubiquiti EdgeRouter | `edgeos` | `edgerouter` | `ubiquiti_edgerouter` |
| VyOS | `vyos` / `vyatta` | `vyatta` | `vyos` |
| pfSense / OPNsense | `pfsense` / `opnsense` | — | `pfsense` / `opnsense` |
| Linux | `linuxgeneric` | — | `linux` |

Oxidized and RANCID names vary a little between versions: use the ones in your `router.db`. OpenNCCM supports more than 90 platforms; if yours isn't here, look it up in **Vendors** and use its key.

## From Oxidized

**Inventory.** Oxidized reads devices from the source you configured (`source:` in `~/.config/oxidized/config`):

- **CSV source** (`router.db`, the most common): each line is `name:model` (or more fields, depending on the `map:` in your config, for example `name:ip:model:group`).
- **SQL or HTTP source** (NetBox, LibreNMS…): export the list with name, IP, model and group from that system.

For a `router.db` in the `name:ip:model:group` format, this command builds the OpenNCCM CSV. Adjust the model mapping using the table above and replace `net-admin` with your credential name:

```bash
awk -F: 'BEGIN { print "name,host,device_type,credential,group,port,protocol,location"
  m["ios"]="cisco_ios"; m["nxos"]="cisco_nxos"; m["junos"]="juniper_junos";
  m["eos"]="arista_eos"; m["procurve"]="hp_procurve"; m["fortios"]="fortinet"; m["routeros"]="mikrotik_routeros" }
  !/^#/ && NF >= 3 { t = ($3 in m) ? m[$3] : $3; print $1 "," $2 "," t ",net-admin," $4 ",,," }' router.db > devices.csv
```

**Credentials.** They are in the `username:`/`password:` section of the config (or per group in `groups:`, or per device in `vars_map`). Create one OpenNCCM credential for each combination and use its name in the `credential` column.

**History.** Old versions stay in the Oxidized Git repository (`output: git`). Keep it: you can still browse it with `git log` and `git show` after Oxidized is switched off.

## From RANCID

**Inventory.** Each RANCID group has its `router.db` in `/var/rancid/<group>/router.db` (or `/usr/local/rancid/var/<group>/`). Each line is `name;type;state` (with `:` in RANCID 2). Only devices in the `up` state matter.

This command walks every group and builds the CSV. The RANCID group becomes the OpenNCCM group and, since RANCID doesn't store the IP, the name is used as host (it must resolve in DNS):

```bash
for f in /var/rancid/*/router.db; do g=$(basename "$(dirname "$f")"); \
  awk -F'[;:]' -v g="$g" '$3 == "up" { print $1 "," $1 "," $2 ",net-admin," g ",,," }' "$f"; done \
  | sed -e 's/,cisco-nx,/,cisco_nxos,/' -e 's/,cisco-xr,/,cisco_xr,/' -e 's/,cisco,/,cisco_ios,/' \
        -e 's/,juniper,/,juniper_junos,/' -e 's/,arista,/,arista_eos,/' -e 's/,foundry,/,ruckus_fastiron,/' \
  | sed '1i name,host,device_type,credential,group,port,protocol,location' > devices.csv
```

**Credentials.** They are in `~rancid/.cloginrc` (`add user`, `add password` and `add method` lines per device pattern). Create one credential for each distinct username/password. If a pattern uses `telnet`, put `telnet` in the `protocol` column for those devices.

**History.** RANCID keeps versions in CVS, Subversion or Git (`RCSSYS` in `rancid.conf`). Keep that repository for reference.

## From SolarWinds NCM

**Inventory.** There are two ways to get it:

- **From the Orion web console:** *Settings → Manage Nodes*, filter the nodes managed by NCM and use **Export** to CSV (or a custom report with *Caption*, *IP Address*, *Vendor*, *Machine Type* and the group or site).
- **With SWQL Studio** (cleaner):

```sql
SELECT n.Caption, n.IPAddress, n.Vendor, n.MachineType, n.Location
FROM Orion.Nodes n
JOIN Cirrus.Nodes c ON c.CoreNodeID = n.NodeID
ORDER BY n.Caption
```

Open the result in a spreadsheet and arrange the columns the way OpenNCCM expects: *Caption* in `name`, *IPAddress* in `host`, the group or site in `group` and *Location* in `location`. For `device_type`, translate *Vendor*/*MachineType* with the table above; for example, "Cisco" with "Catalyst 9300" becomes `cisco_xe` and "Fortinet" becomes `fortinet`. Save it as **CSV UTF-8**.

**Credentials.** NCM uses *Connection Profiles* (Settings → NCM Settings → Connection Profiles) or per-node credentials. Create one OpenNCCM credential for each profile, with the same username, password and, if needed, *enable*.

**History.** Export the configurations you want to keep from NCM (*Configuration Management → Export*) or leave NCM read-only until you no longer need them.

## After importing

1. **Back up all** in **Devices** (or `sudo opennccm backup-all`).
2. Filter the devices with errors. The usual causes are a wrong credential, a `device_type` that doesn't match (for example IOS-XE imported as IOS) or a firewall that doesn't let the OpenNCCM server in over SSH.
3. Once a device backs up correctly, set its **baseline** (see [Baseline](/en/equipos/linea-base/)).
4. Schedule the daily backup in **Tasks** and, if you want, the compliance policies.
5. **Side by side:** keep both tools running for a week or two and compare. Then switch the old one off and keep its history read-only.

:::tip[Want us to do it?]
[Professional support](/en/ayuda/planes/) includes the **migration** service: we build the inventory, credentials and first backup with you.
:::
