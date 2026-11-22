---
title: "License and modules"
description: "How to activate OpenNCCM Pro, request a free trial and what happens when a module expires."
---

OpenNCCM is free and open source, with no limits on devices or time. **OpenNCCM Pro** adds three optional paid modules for those who need them; the free part is never taken away:

| Module | What for |
| --- | --- |
| [Professional reports](/en/pro/informes/) | Monthly executive report, signed compliance audit, Network document, management inventory with the renewal cost, scheduled email deliveries and your brand on the reports |
| [Site collectors](/en/pro/recolectores/) | A collector at each site backs up the devices on its network and sends the copies to this server, even if the site has no direct access |
| [High availability](/en/pro/alta-disponibilidad/) | A second standby server copies the data every minute and takes over by itself if the main one goes down |

Plans and prices: [comunidad.opennccm.com/pro](https://comunidad.opennccm.com/pro).

## Activate a key

1.  Buy the module (or request a trial) at [comunidad.opennccm.com/pro](https://comunidad.opennccm.com/pro). The key arrives by email and is shown in **My account › Licenses**.
2.  In OpenNCCM, go to **Administration › License and modules**, paste the key and click **Activate**.
3.  As soon as the license is valid, the modules it includes **are downloaded, installed and start working by themselves**, with no restart. Each module says "Module X.Y installed" and how long it is valid ("Active until …").

The card shows the masked key, **Change key**, **Update** (checks the license again now) and the last check. A key works on one server at a time (a [High availability](/en/pro/alta-disponibilidad/) pair uses the same key on both). If the key is already on another server, **Activate here** moves it to this one; you can also free an installation from **My account › Licenses** on the website.

**New versions of a module:** they are downloaded by themselves once a day. If the module is in use, they are applied when the service restarts or with **Restart now** ("New versions of the Pro modules are available").

## Free trial

**Request a free trial** (on the same screen, or in each module with **Try for free**) opens a form with the modules, your email, the organization and what you will use it for. It does not ask for a card.

-   Each server can try each module **only once**.
-   The email is the one of your account at comunidad.opennccm.com; if you do not have one, it is created when you confirm the email. Confirm the address so the request goes to review.
-   We review each request by hand, usually in less than one business day. Meanwhile the screen says "Trial request under review" (with **Cancel request**).
-   When it is approved, the screen says "Your trial was approved" and you activate it with **Activate trial**. The days count from when you activate it.
-   When it expires, the modules are paused: what you generated is kept and the free part stays the same. We let you know 3 days before.

## When a module expires

| Status | What it means |
| --- | --- |
| **Active until …** | Everything works |
| **In grace period until …** | The license expired recently (15 days of grace; trials have none): it keeps working so you have time to renew |
| **Expired on …** | The module is paused. **Nothing is deleted**: reports already generated can be viewed and downloaded; scheduled deliveries and creating new ones are paused. Collectors and High availability's automatic failover stop until you renew |
| **Paused** | The license could not be checked (for example, no internet for a long time). It comes back by itself once checked |

In **Preferences** you can choose **Show the Pro features I don't have, with their PRO label** and **Notify me 30 days before a module expires**.

## What is sent

OpenNCCM Pro needs an internet connection to `comunidad.opennccm.com` (HTTPS) to activate and check the license. Only the key, this installation's ID, the fingerprint and the server name you set are sent. The fingerprint is a code that does not identify your network. Configurations, devices, addresses and users are never sent.

When you request a trial, the email, the organization and the chosen modules are also sent.

:::note[Code license]
OpenNCCM stays under the GPL-3.0. An exception (the `LICENSE-EXCEPTION` file, under section 7 of the GPL) allows using non-free modules through the Module Interface, without changing the license of the rest of the code.
:::
