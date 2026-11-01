---
title: "Configlets"
description: "Reusable command templates to make bulk changes or run diagnostics on many devices at once."
curso: ["5.1"]
---

| Type | What it does | Approval |
| --- | --- | --- |
| **config** | Enters configuration mode, applies the commands and saves the configuration (or *commits* on Junos, IOS-XR, PAN-OS, VyOS…). | Yes: it creates a change request. |
| **exec** | Runs query commands (`show`, `display`…) and shows each device's output. | No: it is immediate. |

![Configlet list (examples are included for changing passwords, VLANs, NTP, syslog and diagnostics).](../../../../assets/manual/10-configlets.png)

## Variables

Commands are Jinja2 templates. You can use device data and your own variables, which are asked for when it runs:

```bash
vlan {{ vlan_id }}
 name {{ vlan_name }}
{% if device.group == "Core" %}
spanning-tree vlan {{ vlan_id }} priority 4096
{% endif %}
! applied on {{ device.name }} ({{ device.host }})
```

Device variables: `device.name`, `device.host`, `device.model`, `device.os_version`, `device.serial`, `device.location`, `device.device_type`, `device.group`.

![Editing a configlet. "Applies to" limits the compatible devices (an expression on the device_type).](../../../../assets/manual/32-configlet-form.png)

## Run

1.  Click **Run** on the configlet's card: a side panel opens.
2.  Fill in the detected variables: there is one field for each, and the **command preview** updates as you type.
3.  Choose the compatible devices: one by one, all, none or a whole group.
4.  For **config**: click **Create change request** and wait for approval. For **exec**: you see the output right away.

![Running: variables and device selection.](../../../../assets/manual/11-configlet-ejecutar.png)

![Result of a diagnostic configlet.](../../../../assets/manual/12-configlet-exec-resultado.png)
