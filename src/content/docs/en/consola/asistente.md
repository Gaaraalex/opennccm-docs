---
title: "AI assistant"
description: "An optional assistant using your organization's AI provider."
resumen:
  - "Optional: turn it on in Administration → Settings → AI assistant with your organization’s provider and API key."
  - "Passwords, SNMP communities and VPN and wifi keys are always hidden before sending; you choose which roles use it and how many questions per day."
  - "It helps in the console, when comparing configurations, in compliance and in a chat on every page; actions that change something ask for confirmation."
---

1.  In **Administration → Settings → AI assistant**, turn it on and choose the provider: **Anthropic (Claude)**, **OpenAI**, **Google (Gemini)**, **Mistral** or **OpenAI-compatible** (OpenRouter, Groq, DeepSeek, Azure…, with the service address).
2.  Enter the **API key** (stored encrypted, one per provider), click **Load from account** to see the models, choose one and click **Test connection** (it shows the response time).
3.  Review privacy: what you ask and the device context go to the provider. **Before sending, passwords, SNMP communities and VPN and Wi-Fi keys are always masked** (the preview shows how a backup is sent). You can include or leave out the device's backup and the last 200 lines of the console.
4.  Choose which roles can use it and the limit of questions per user per day. "Usage this month" shows questions and tokens; if you enter your model's price per million tokens, it also shows an estimated cost (billed by the provider).

| Where it appears | What it does |
| --- | --- |
| Console | **Network assistant** panel with the provider and model, the context (device, system, backup, console output, masked secrets) and suggested questions. Each command in the answer shows its risk (**read-only**, **changes the configuration**, **cuts service**) and the buttons **Copy**, **Insert** and, if it is a change, **Send as change request**. It states the source (the device's backup or the vendor reference). |
| Top bar | **Assistant** button (with the provider's logo) on every page: it opens the chat on the right, without leaving the page (see below). |
| Compare configurations | **✦ Explain this change**. |
| Compliance | **✦ How do I fix it?** on each rule with violations. |

Every question is recorded in the Audit log with the user, the device and the provider.

### Assistant chat across the whole system

The **Assistant** button in the top bar opens a chat on the right on any page. At the top it shows the provider and model, **+** (new conversation) and the line "Viewing: page · N devices · secrets masked". The conversation is saved so you can pick it up again. Below the text box there are suggested questions for the current page.

-   **Network data:** it queries OpenNCCM with read-only functions (devices, backups, alarms, changes and versions, compliance, lifecycle, configuration search), always with the user's role and groups and with secrets masked.
-   **How to use OpenNCCM:** it searches this manual ("How do I schedule a daily backup?").
-   **Simple answers:** one or two sentences, devices on one line each (colored dot, name and reason), at most 2 buttons with the rest under **More actions**, and the source in gray.
-   **Actions:** the buttons take you to the right page or prepare an action. If it changes something (back up, create a task, create a change request), a card appears with **Cancel** and **Confirm**; it only happens when you confirm and with the user's permissions. Change requests go through approval as usual.

Every question is recorded in the Audit log with the functions it used and the provider.
