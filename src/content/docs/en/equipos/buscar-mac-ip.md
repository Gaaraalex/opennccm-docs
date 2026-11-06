---
title: "Find a MAC or an IP"
description: "Find which switch and port a device is connected to from its MAC or its IP, with the VLAN, the path and when it was last seen."
---

In the top bar search box (**Ctrl K**) you can type a MAC (`aa:bb:cc:dd:ee:ff`, `aabb.ccdd.eeff` or `AA-BB-CC-DD-EE-FF`) or an IP: OpenNCCM says where it is connected, on which switch and port, with its VLAN, the port description, when it was seen and the path (for example "CORE-01 (ARP table) → DIST-NORTE Gi1/1/2 → ACC-S-P2 Gi1/0/17"). With an IP it gets the MAC from the ARP tables. The MAC also shows up on uplinks and trunks: the access port is shown.

-   The MAC and ARP tables are read on each backup (Cisco, NX-OS, Arista, Huawei, Juniper, EXOS, VOSS, EdgeSwitch, MikroTik and Linux) and a 90-day MAC → port history is kept, to show **Last seen**.
-   If it appears on several access ports, all of them are shown (most recent first) with an explanation of why that can happen.
-   If it is not connected now, **Read the tables now** (operators and administrators) reads them again on the devices that provide them, 8 at a time. The devices that do not provide tables, and why, are shown too.
-   The MAC vendor comes from the IEEE database installed by the `ieee-data` package (the [installer](/en/instalacion/instalar/) adds it).

To search for text inside the configurations, see [Search configurations](/en/equipos/buscar/).
