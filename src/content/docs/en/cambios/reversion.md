---
title: "Rollback"
description: "Return a device to an earlier configuration that worked."
curso: ["4.5"]
---

## How it works

OpenNCCM compares the current configuration with the target version and generates the commands needed in the vendor's syntax:

| Family | Examples | Generated commands |
| --- | --- | --- |
| IOS | Cisco, Arista, Dell, Ruckus, Allied… | Prefixes `no` to what is extra and adds what is missing, respecting blocks (interfaces, lines…). Single-value settings (description, IP, access or allowed VLANs, hostname, user) are **rewritten** without negating them first, so a management IP is never left unconfigured even for an instant. New VLANs are created first and extra ones are deleted at the end. |
| Huawei | Huawei VRP, H3C/Comware | The same, with `undo`. `vlan batch` is compared as a set: only the VLANs that change are created or deleted. |
| FastPath | Ubiquiti EdgeSwitch, and any device in that style (Dell N-series, Netgear, Broadcom ICOS, UniFi Switch), detected automatically | Respects its three scopes: privileged mode, `vlan database` and `configure` (blocks closed with `exit`). It rewrites single-value settings (description, name, user) instead of deleting them, uses `vlan participation auto` to remove a port from a VLAN and **never changes the management IP** (`network parms`) so as not to cut the connection. Order: first it creates the missing VLANs, then adjusts the ports and finally deletes the extra VLANs. Commands are sent one at a time: if the switch rejects one ("Failed to…"), it stops there, does not save the configuration and backs up the device to record its real state. |
| Set | Junos, VyOS, EdgeRouter | `delete …` for what is extra and `set …` for what is missing. On Junos it is applied with `commit confirmed 5`: OpenNCCM reconnects and confirms; if the change cut off access, the device goes back to the previous configuration by itself within 5 minutes. |
| MikroTik RouterOS | RouterOS 6 and 7 | Compares the exports item by item: `set` for what changed (with its selector, e.g. `[ find default-name=ether1 ]`), `add` for what is missing (firewall rules go back to their position with `place-before`) and `remove [ find … ]` for what is extra, in reverse order (a VLAN's IP before the VLAN). It is applied in **safe mode**: if a command fails or the connection drops, RouterOS undoes everything applied. Tested on real RouterOS 7.25, 7.23.8 and 6.49.23. |
| Extreme EXOS | ExtremeXOS | `delete vlan`, `configure vlan … delete ports`, `unconfigure vlan … ipaddress`, `configure iproute delete`, `enable`/`disable`. It deletes the extra VLANs before moving their ports (an untagged port can only be in one VLAN). |
| Extreme VOSS / Fabric Engine | VSP, Fabric Engine | `vlan delete`, `vlan members remove`, `no vlan i-sid`, `no ip route` and `interface … exit` blocks; ports are not deleted, they go back to their value. |
| No command-based rollback | WatchGuard, FortiGate, PAN-OS, Check Point, airOS, UniFi, SwitchOS… | No commands are generated: applying the whole configuration again does not remove what was added and stops at the first line that already exists, leaving the device half-done. OpenNCCM explains how to restore the version with the vendor's tool (for example, Fireware Web UI or WatchGuard System Manager, or the UniFi Network controller). Automatic rollback cannot be turned on for them. |

In every family: **the address OpenNCCM manages the device through is never touched** (changing it would cut the connection midway); anything that cannot be undone safely appears in the request as **Review by hand**, and that request does not run by itself even if approval is turned off.

## Manual rollback

1.  Open the version you want to return to and click **Roll the device back to this version…**
2.  A change request marked "rollback" is created with the generated commands. **Review them** before approving.

:::caution[Incomplete versions]
If the target version is less than half the size of the current one, it is almost always a truncated backup: rolling back to it would delete from the device everything that is missing. That version's page warns about it and the normal rollback button disappears; it can only be created with "I understand the risk: roll back anyway…". Since version 1.4.0 truncated or paged backups ("--More--") are rejected and not saved.
:::

## Restore a backup on another device

**What it is for:** move a device's configuration to another one **of the same model**, for example when replacing a failed device. The source device and its versions are neither deleted nor changed. Administrators only.

1.  Open the version (or, on the device page, **⋯ → Restore on another device…** menu, which uses the latest one) and click **Restore on another device…**
2.  Choose the target:
    -   **Another OpenNCCM device**: its credential is used; devices of another model cannot be chosen.
    -   **New device by IP (SSH)**: its management IP, port, user and password. The device must have **SSH enabled** and be reachable from the server. The password is only used for that restore: it is not stored.
    -   **Console cable (serial port)**: with the cable plugged into the administrator's PC, in Chrome or Edge (the page over HTTPS). The browser opens the serial port, you sign in to the device in the page itself and OpenNCCM reads the inventory and configuration over the console. Available for MikroTik and the platforms with Cisco, Huawei and Junos syntax.
3.  OpenNCCM reads the target's model and compares it with the source's. If they do not match, nothing is sent. If they match, it shows the **commands** that will bring the target to the backup's configuration (deleting what is extra and adding what is missing).
4.  Click **Restore**. Over SSH it is applied with the device's safety net (safe mode on MikroTik, commit confirmed on Junos) and stops at the first rejected command; over the console, the browser writes the lines and stops at the first one the device rejects.

:::caution[Duplicate addresses]
The backup carries the source device's name and IP addresses. If both are connected to the same network there will be duplicate addresses. The address OpenNCCM manages the target through is kept.
:::

## Automatic rollback

If the device has **"Automatically revert unauthorized changes"** turned on, when a change is detected through syslog or a scheduled backup and does not come from an approved request, OpenNCCM immediately applies the inverse commands, backs up again and raises a **critical** "Automatic rollback" alarm.

:::caution[Use automatic rollback with care]
Turn it on for devices where every change must go through OpenNCCM. A technician who changes the device directly will see their change undone.
:::
