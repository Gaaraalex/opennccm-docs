---
title: "Knowledge base"
description: "Every case solved on the network is written down: symptom, cause, steps with their commands, check and prevention."
---

Since version 2.18, the **knowledge base** keeps every case solved on the network: the symptom, the cause, the step-by-step fix with its commands, how to check it worked and what to do so it doesn't happen again. It's in the side menu as **Knowledge base**; the amber badge counts what's still to document.

## Who can see it

| Role | What they can do |
| --- | --- |
| **Administrator** | Everything: reads, documents, approves or requests changes, archives and restores, decides "Not needed" and sets up **Access and rules**. Their access can't be removed. |
| **Operator** | Reads, documents and comments. Sends their cases to review (or publishes them, if the administrator chose "Admins and operators" under **Who publishes without review**). Edits their own cases; on other people's cases, **Propose change**. |
| **Read-only** | Off by default. Following a link shows a notice with **Ask an admin for access**, which leaves an informational alarm for the administrator. If the administrator turns it on, they read published cases. |

Permissions are checked on the server, not only on screen, and every read and edit is recorded in the [Audit log](/en/administracion/auditoria/).

## Tabs

- **Cases:** indicators (published, to document, percentage of critical alarms with a case in the last 30 days with a 95% goal, and solved with a case this month), filters by category and status, and the table with the `KB-0000` ID, devices, author, status and "Helpful" votes. Search (Ctrl K) looks in the title, symptom, cause, steps and device names or addresses.
- **To document:** what was closed without a case, assigned to whoever solved it, with **Document**, **Already exists** (links it to a published case) and **Not needed** (administrator only; who decided is recorded). After 5 days the date turns red and the administrator gets an alarm.
- **In review:** new cases and proposed changes, with what each one brings (steps, hidden passwords, what it's linked to). The administrator uses **Request changes** (back to draft with a comment) or **Approve and publish**.
- **Access and rules** (administrator only): who can see it, who publishes without review and when a case is required.

## Rules that create pending items

| Rule | Default | What it does |
| --- | --- | --- |
| When closing a critical alarm | On | The alarm can't be closed without a new case or a link to an existing one (see [Alarms](/en/observar/alarmas/)). |
| When a change is rolled back | On | When a [rollback](/en/cambios/reversion/) finishes, a pending item is left with its commands and devices. |
| Console sessions longer than 15 min | Off | A pending item with the recording, to bring its commands. |
| Monday summary of pending items | On | An email to each person with their items (if their account has an email). |
| Hide passwords, keys and SNMP communities | Always | They're detected on save and replaced with `••••••`. |

## Case page

The case page shows the status, category, vendor, version and date; the symptom, cause, steps, check and prevention; the team's comments; and on the side **Helpful**, **Edit** or **Propose change**, **Archive** (it can be restored), the affected devices, where it came from (alarm, change or recording) and the versions (v1, v2…).

Every command has **Copy** (the hidden key isn't copied) and **Open in console**, which types the command into the device's [console](/en/consola/consola/) without running it. **Convert to configlet** creates a [configlet](/en/cambios/configlets/) with the commands so you can review it before using it.

## Documenting a case

Opened from a pending item, the editor already links the alarm or change, the device and the console recording. To send it you need the title and device, symptom, cause, at least one step and the check; the list and progress bar show what's missing. It saves itself every few seconds (and with **Save draft**).

- **Bring commands from the recording** adds the console session's commands as steps.
- If the [AI assistant](/en/consola/asistente/) is on, **Propose what's missing** suggests the cause and the check, marked for review.
- **Similar cases** warns you if there's already one like it.

Changes to a published case go in as a proposal: the case doesn't change until an administrator approves it.
