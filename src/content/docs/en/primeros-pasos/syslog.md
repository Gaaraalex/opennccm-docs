---
title: "Send syslog from devices"
description: "Real-time change detection."
curso: ["4.1"]
---

-   It recognizes change messages from Cisco IOS/IOS-XE/NX-OS/ASA, Juniper, Huawei, H3C, FortiGate, Palo Alto, MikroTik, Aruba/HPE and generic "configuration changed" messages.
-   Several notices from the same device within 60 seconds trigger a single backup.
-   Changes applied by OpenNCCM (approved requests) open a **maintenance window**: they are not treated as intrusions. The window closes as soon as the following backup finishes; any notice received meanwhile is reviewed when it closes.
-   Set up syslog on the devices as described below (see [how to configure each vendor](/en/primeros-pasos/syslog/#configure-each-vendor)).

## Configure each vendor

For OpenNCCM to detect changes **the moment** someone makes them, each device must send its syslog messages to the server (UDP 514). When a change notice arrives, OpenNCCM waits 20 seconds, backs up the device, compares, alerts and, if enabled, reverts the unauthorized change.

:::tip[Shortcut]
There are ready-made configlets for Cisco IOS, Junos and Huawei in **Configlets → "Configurar syslog hacia OpenNCCM"**: choose the devices, type the server IP in the `servidor_ncm` variable and approve.
:::

### Cisco IOS / IOS-XE

```bash
logging host SERVER_IP
logging trap notifications
archive
 log config
  logging enable
  notify syslog contenttype plaintext
```

### Juniper Junos

```bash
set system syslog host SERVER_IP interactive-commands notice
set system syslog host SERVER_IP change-log info
commit
```

### Huawei VRP / H3C

```bash
info-center loghost SERVER_IP
```

### Fortinet FortiGate

```bash
config log syslogd setting
    set status enable
    set server "SERVER_IP"
end
```

### MikroTik RouterOS

```bash
/system logging action add name=ncm target=remote remote=SERVER_IP
/system logging add topics=system,info action=ncm
```

### Aruba / HPE / Arista

```bash
logging SERVER_IP
```

The device must be registered in OpenNCCM with the **same IP** it sends syslog from (or with a DNS name that resolves to it). You can check that messages arrive in **Alarms**: a "Change syslog" event appears.
