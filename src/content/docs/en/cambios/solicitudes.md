---
title: "Requests and approval"
description: "Make sure no change reaches the network without review, and keep a record of who asked for it, who approved it, what was applied and with what result."
---

## How to use it

1.  Requests are created from configlets, compliance fixes, rollbacks and firmware upgrades.
2.  The administrator opens the request (**Changes** menu, which opens on "To approve" if any are pending), reviews the **per-device command preview** in the side panel and clicks **Approve and run** or **Reject**. The comment is optional when approving and required when rejecting, so whoever asked knows what to change.
3.  When it runs, the **Result** section shows each device's output. Commands are sent **one at a time**: if the device rejects one, OpenNCCM stops there, **does not save** the configuration (nor commit; on Junos, IOS-XR, VyOS and similar it discards the pending changes), says which command failed and which had already been applied, and backs up the device to record its real state. The request is marked as failed for that device.

:::note[Error messages that are recognized]
"% Invalid input" and similar (Cisco, Arista, Dell, Allied, Extreme), "% Unrecognized command" (HP Comware, Mellanox, A10), "Error:" (Huawei), "syntax error" and "unknown command" (Juniper), "bad command name", "expected end of command" and "failure:" (MikroTik), "Command fail" and "Unknown action" (FortiGate), "Invalid syntax" (Palo Alto), "MINOR:/MAJOR:" (Nokia), "!!%" (IOS-XR), "Set failed" (VyOS), "CLINFR" (Check Point) and "Failed to…" (EdgeSwitch, Netgear, Dell N-series). If a command asks for confirmation ("\[confirm\]", "(y/n)"), OpenNCCM does not answer it: it stops and reports it.
:::

![Pending request with preview and review form.](../../../../assets/manual/14-solicitud-pendiente.png)

![Request history with their status.](../../../../assets/manual/13-solicitudes.png)

:::note[Options in Settings]
"Require approval" (on by default) and "Allow an administrator to approve their own requests" (on by default since version 1.4.0; turn it off if you always want another administrator to review). Firmware upgrades always require approval.
:::
