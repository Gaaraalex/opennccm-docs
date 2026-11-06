---
title: "Reference configuration by model"
description: "Compare devices of the same model with the one that is configured correctly, section by section, and bring them in line with a change request."
---

**Devices › Reference configuration** compares devices of the same type (same model and system) with the one that is configured correctly. The reference is chosen on the page or from the device page (**⋯ › Use as reference**).

-   On the left, each device type with its reference; on the right, each device with the number of differences, the sections they are in (AAA, SNMP, NTP, VLAN…) and the date of its backup. Each device's latest backup is compared.
-   The device name, management IP, interface descriptions, encrypted passwords and keys, certificates and ignored lines are not compared.
-   **View** shows the differences by section, side by side or only the changes: in red what the reference has and is missing, in green what is there and not in the reference. Each block can be ignored on that device or on all of them.
-   **Prepare request** builds a [change request](/en/cambios/solicitudes/) with the missing and the extra commands. It is never applied on its own: it goes through approval and its impact analysis. Differences involving keys or the management IP are left to be done by hand.

The [baseline](/en/equipos/linea-base/) compares each device with its own approved configuration; the reference configuration compares different devices of the same model with each other.
