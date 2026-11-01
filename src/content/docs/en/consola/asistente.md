---
title: "AI assistant"
description: "An optional assistant using your organization's AI provider."
---

1.  In **Administration → Settings → AI assistant**, turn it on and choose the provider: **Anthropic (Claude)**, **OpenAI**, **Google (Gemini)**, **Mistral** or **OpenAI-compatible** (OpenRouter, Groq, DeepSeek, Azure…, with the service address).
2.  Enter the **API key** (stored encrypted, one per provider), click **Load from account** to see the models, choose one and click **Test connection** (it shows the response time).
3.  Review privacy: what you ask and the device context go to the provider. **Before sending, passwords, SNMP communities and VPN and Wi-Fi keys are always masked** (the preview shows how a backup is sent). You can include or leave out the device's backup and the last 200 lines of the console.
4.  Choose which roles can use it and the limit of questions per user per day. "Usage this month" shows questions and tokens; if you enter your model's price per million tokens, it also shows an estimated cost (billed by the provider).

| Where it appears | What it does |
| --- | --- |
| Console | **Network assistant** panel with the provider and model, the context (device, system, backup, console output, masked secrets) and suggested questions. Each command in the answer shows its risk (**read-only**, **changes the configuration**, **cuts service**) and the buttons **Copy**, **Insert** and, if it is a change, **Send as change request**. It states the source (the device's backup or the vendor reference). |
| Top bar | **✦ Assistant** button on every page. |
| Compare configurations | **✦ Explain this change**. |
| Compliance | **✦ How do I fix it?** on each rule with violations. |

Every question is recorded in the Audit log with the user, the device and the provider.
