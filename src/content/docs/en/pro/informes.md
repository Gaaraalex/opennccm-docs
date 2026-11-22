---
title: "Professional reports"
description: "Pro module: executive report, signed audit, Network document, management inventory, scheduled deliveries and brand template."
---

**Reports › Professional** brings together the network reports to share with management, customers or auditors. It is an [OpenNCCM Pro](/en/pro/licencia/) module; the [usual reports](/en/observar/informes/) stay free.

| Report | What it has | When |
| --- | --- | --- |
| **Monthly executive** | Network health, changes, compliance, CVEs and unsupported devices, with their trend | Every month; **Compare with another month or two dates** |
| **Compliance audit** | A standard or policy, with the evidence for each control, and a signature | On demand |
| **Network document** | Inventory, map, VLANs and IPs, links, compliance and backups in a PDF or Word file to hand over | On demand |
| **Management inventory** | Devices by site, brand and end of support, with the estimated renewal cost | Quarterly |

Each card has its **Preview**, **Download PDF** and **Schedule delivery**.

![Professional reports: the report cards and the executive report preview.](../../../../assets/manual/pro-informes.png)

## Executive report

Choose the **Report month** and, if you like, **Compare with** another month or two dates. It shows the changes per week, compliance over the last 6 months, critical CVEs, unsupported devices and failed backups. If there is nothing urgent, it says so.

## Compliance audit

1.  Choose the standard or policy, the **Scope** (devices, group or site) and the **Audit date**. Each device is audited with the backup it had on that date; those without a backup are listed separately.
2.  Review the result: rules that pass, controls that fully pass, devices audited and, per control, the devices, the result and the evidence.
3.  Type the signer's **Name · Title** and click **Generate signed PDF**. It is added at the end with the date and the report fingerprint.

Signed audits stay in the list with their fingerprint and **Download**. **Were you given an audit PDF?** › **Check that it is authentic and unchanged** verifies a PDF someone sent you.

## Network document

It generates a PDF or a Word file (.docx) for a site, a group or the whole network, with the sections you choose: inventory (model, serial and firmware), network map, VLANs and IP addresses, links between devices, compliance and vulnerabilities, and each device's latest backup. It can have a cover with the customer's logo and name, and it can hide public IPs. Passwords, SNMP communities and keys never appear: the document contains no configurations.

Generated documents stay in the list with **View**, **Download** and, if the network changed since then, **Regenerate**. Every document generated and downloaded is recorded in the Audit log.

:::note[Since version 2.45]
The Network document was free up to 2.44. Documents you already generated can still be viewed and downloaded without a license, in **Reports › My documents**.
:::

## Management inventory

Devices by site, brand and end-of-support year, with the estimated renewal cost. It can be filtered by site and **Cut-off date**.

OpenNCCM has no prices built in: in **Replacement prices** enter, per model, the **Currency**, the **Suggested replacement** and the **Unit price**. A model marked **Not replaced** adds nothing and does not count as "no price". The screen warns "N models are missing prices".

## Scheduled deliveries

**Schedule delivery** emails a report by itself:

-   **Frequency** and **When**: day of the month or of the week, and server time.
-   Recipients, **Subject** (`{mes}` and `{año}` are replaced with the report's month and year) and **Format**.
-   The email carries a link that does not ask you to sign in and expires after 30 days. **Revoke sent links** makes sure nobody can open them again.
-   Optional: **Send only if there are critical CVEs or compliance below 80 %**.
-   **Send a test now** and **Stop sending**.

It needs the mail server (SMTP) set up in [Settings](/en/administracion/ajustes/). With the license expired or paused nothing is sent; what is scheduled is kept and comes back by itself when you renew.

## Brand template

The **Brand template** is used by every report: the executive report, the audit and the Network document, in PDF and Word, and also scheduled deliveries.

-   **Logo:** PNG or JPEG, up to 2 MB; best with a transparent background.
-   **Name** and **Color** (`#RRGGBB` code).
-   **Cover:** with or without a cover.
-   **Footer:** a text (for example "Confidential · internal use") shown on the left of each page's footer, next to the date.

The **Preview** shows the result before **Save template**.
