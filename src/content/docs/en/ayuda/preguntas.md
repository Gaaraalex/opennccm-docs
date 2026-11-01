---
title: Frequently asked questions
description: Quick answers about OpenNCCM.
---

## Is it free?

Yes. OpenNCCM is free software under the GPL-3.0 license: you can use, study, modify and share it without paying. [Professional support](/en/ayuda/soporte/), when available, will be a separate service that does not limit any feature.

## Where do my configurations live?

On your own server. OpenNCCM is installed on your Ubuntu machine and stores configurations encrypted with AES-256 in its database. Only what you turn on goes out to the internet: CVE lookups to NVD, alerts by email, Teams, Slack or Telegram, the [AI assistant](/en/consola/asistente/) provider or the [Git copy](/en/administracion/sistema/).

## What system do I need?

Ubuntu Server 22.04 or 24.04 LTS, 64-bit, freshly installed. 2 vCPUs and 4 GB of RAM are enough for about 300 devices. Details are in [Requirements](/en/instalacion/requisitos/).

## Which devices can it manage?

131 platforms from about 70 vendors, over SSH or Telnet. Any other device with SSH can be managed with the generic profile. Full list in [Supported platforms](/en/referencia/plataformas/).

## Do I need to install anything on the devices?

No. OpenNCCM signs in over SSH with a device user. It is only worth setting up [syslog](/en/primeros-pasos/syslog/) so changes are detected the moment they happen.

## What happens if I lose the encryption key?

Without `/etc/opennccm/secret.key` the backups and stored credentials cannot be read. Keep it separately along with the [recovery backups](/en/instalacion/migrar/).

## How do I upgrade?

From **System → Update** or the new-version notice. A backup is taken first and, if the new version does not respond, it goes back to the previous one by itself. See [Upgrade and roll back](/en/instalacion/actualizar/).

## Where can I get help?

In [Community and support](/en/ayuda/soporte/).
