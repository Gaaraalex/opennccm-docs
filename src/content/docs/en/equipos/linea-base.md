---
title: "Baseline"
description: "Set each device's approved configuration as the reference, detect any drift and be able to return to it in one step (for example, after an incident)."
curso: ["4.3"]
---

## How it works

-   Each device can have one version marked as baseline (running configurations only).
-   On every backup, OpenNCCM compares the fingerprint of the current configuration with the baseline's.
-   If they stop matching, the device shows "Differs from baseline", appears on the dashboard and the **"Baseline drift"** alarm is raised. When they match again, the mark goes away by itself.

## How to use it

1.  Open the approved version and click **Mark as baseline**.
2.  If the device drifts, its page shows a notice with **See differences** (side-by-side comparison baseline ↔ current) and, in the **⋯** menu, **Return to baseline…**, which creates a rollback request to approve.
3.  Use **Devices → "off baseline" status** or **Reports → Off baseline** to see all the devices affected.
