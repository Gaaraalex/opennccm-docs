---
title: "AI assistant"
description: "An optional assistant using your organization's AI provider."
resumen:
  - "Optional: turn it on in Administration → Settings → AI assistant with your organization’s provider and API key."
  - "Passwords, SNMP communities and VPN and wifi keys are always hidden before sending; you choose which roles use it and how many questions per day."
  - "It helps in the console, when comparing configurations, in compliance and in a chat on every page; actions that change something ask for confirmation."
---

<p class="captura-tema"><img class="tema-oscuro" src="/capturas/oscuro/asistente.png" alt="Assistant chat open next to the dashboard, with the question “Which devices need attention today?” and its answer" width="1600" height="1000" loading="lazy" /><img class="tema-claro" src="/capturas/claro/asistente.png" alt="Assistant chat open next to the dashboard, with the question “Which devices need attention today?” and its answer" width="1600" height="1000" loading="lazy" /><small class="captura-nota">Sample answer, from a simulated provider on a sample network.</small></p>

1.  In **Administration → Settings → AI assistant**, turn it on and choose the provider: **Anthropic (Claude)**, **OpenAI**, **Google (Gemini)**, **Mistral** or **OpenAI-compatible** (OpenRouter, Groq, DeepSeek, Azure…, with the service address).
2.  Enter the **API key** (stored encrypted, one per provider), click **Load from account** and choose the model from the drop-down with your account's models; click **Test connection** (it shows the response time). That is the default model: each user can pick another one from the same list in the chat or the console panel, without changing anyone else's.
3.  Review privacy: what you ask and the device context go to the provider. **Before sending, passwords, SNMP communities and VPN and Wi-Fi keys are always masked** (the preview shows how a backup is sent). You can include or leave out the device's backup and the last 200 lines of the console.
4.  Choose which roles can use it and the limit of questions per user per day. "Usage this month" shows questions and tokens; if you enter your model's price per million tokens, it also shows an estimated cost (billed by the provider).

| Where it appears | What it does |
| --- | --- |
| Console | **Network assistant** panel with the provider and model, the context (device, system, backup, console output, masked secrets) and suggested questions. The question is typed at the bottom of the panel; above it is a row with **✦ Suggested questions** (they fold away on their own when you ask and open again there), the model drop-down and **ⓘ**, which hides or shows the top part (provider, context and notice) to leave more room for answers; the browser remembers it. In **Operate → Console** each session has its own **✦ Assistant** button. Each command in the answer shows its risk (**read-only**, **changes the configuration**, **cuts service**) and the buttons **Copy**, **Insert** and, if it is a change, **Send as change request**. It states the source (the device's backup or the vendor reference). The assistant knows which device it is working with (platform, model, firmware version and that device's command list) and answers only with commands for that platform and version; the suggested questions also depend on the device (for example, VPN tunnels and policies on firewalls). |
| Top bar | **Assistant** button (with the provider's logo) on every page: it opens the chat on the right, without leaving the page (see below). |
| Compare configurations | **✦ Explain this change**. |
| Compliance | **✦ How do I fix it?** on each rule with violations. |

**Network topics only:** the assistant helps with networks and network security, with the devices OpenNCCM supports and manages and with using OpenNCCM. To an unrelated question (for example, a cooking recipe) it answers in one sentence that it only helps with the network and OpenNCCM.

Every question is recorded in the Audit log with the user, the device and the provider.

### Assistant chat across the whole system

The **Assistant** button in the top bar opens a chat on the right on any page. At the top it shows the provider and model (with several models in the account, a drop-down to change it), **+** (new conversation) and the line "Viewing: page · N devices · secrets masked". The conversation is saved so you can pick it up again. Below the text box there are suggested questions for the current page.

-   **Network data:** it queries OpenNCCM with read-only functions (devices, backups, alarms, changes and versions, compliance, lifecycle, vulnerabilities, knowledge base, configlets, scheduled tasks, supported device types and configuration search), always with the user's role and groups and with secrets masked.
-   **What it can prepare:** backups, scheduled tasks, change requests (for example, to fix a vulnerability or a violation with commands for that platform and version), [configlets and scripts](/en/cambios/configlets/) (created by the administrator; left for review before running them) and [knowledge base](/en/observar/base-de-conocimiento/) cases (left as a draft to review and submit).
-   **Migrations:** from another system (RANCID, Oxidized, a spreadsheet…) it translates the device types to OpenNCCM's and builds the CSV for [Devices → Import](/en/instalacion/desde-otra-herramienta/).
-   **How to use OpenNCCM:** it searches this manual ("How do I schedule a daily backup?").
-   **Simple answers:** one or two sentences, devices on one line each (colored dot, name and reason), at most 2 buttons with the rest under **More actions**, and the source in gray.
-   **Actions:** the buttons take you to the right page or prepare an action. If it changes something (back up, create a task, a change request, a configlet or a draft case), a card appears with **Cancel** and **Confirm**; it only happens when you confirm and with the user's permissions. Change requests go through approval as usual.

Every question is recorded in the Audit log with the functions it used and the provider.
