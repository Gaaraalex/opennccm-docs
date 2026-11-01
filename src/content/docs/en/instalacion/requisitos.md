---
title: "Requirements"
description: "What you need before installing OpenNCCM."
curso: ["0.2"]
---

## Server

| Network size | CPU | RAM | Disk | Database |
| --- | --- | --- | --- | --- |
| Up to 300 devices | 2 vCPU | 4 GB | 40 GB | SQLite (default) |
| 300 – 2,000 devices | 4 vCPU | 8 GB | 100 GB | SQLite or PostgreSQL |
| More than 2,000 devices | 8 vCPU | 16 GB | 200 GB+ | PostgreSQL (see [PostgreSQL](/en/instalacion/postgresql/)) |

Approximate values. Disk usage grows with the number of saved versions and firmware images; you can limit the versions kept per device in **Administration → Settings → Change workflow**.

-   Ubuntu Server **22.04 LTS** or **24.04 LTS**, 64-bit, freshly installed (physical or virtual machine).
-   A user account with `sudo`.
-   Internet access during installation (Ubuntu and Python packages are downloaded).
-   A fixed IP and a DNS name are recommended.

## Network

| From | To | Port | Purpose |
| --- | --- | --- | --- |
| Administrators' browsers | Server | TCP 443 (and 80) | Web interface |
| Server | Network devices | TCP 22 (SSH) or 23 (Telnet) | Backups, changes, firmware (SCP over SSH) |
| Network devices | Server | UDP 514 | Syslog: real-time change detection |
| Server | Internet | TCP 443 | Optional: NVD (CVE), Cisco EoX API, Telegram, webhooks |
| Server | Mail server | TCP 587 / 465 / 25 | Optional: alerts and reports by email |

## On the network devices

-   SSH enabled and a user for OpenNCCM (ideally a dedicated one, with privileges to view and change the configuration).
-   For firmware upgrades on Cisco: `ip scp server enable`.

## Prepare the server

Connect to the server over SSH (from Windows you can use PowerShell, PuTTY or Windows Terminal):

```bash
ssh USER@SERVER_IP
```

There is nothing else to prepare: the installer updates Ubuntu, installs the dependencies and asks for the time zone. The time zone and clock can also be changed later in **System → Date and time**. Just check that the server clock is synchronized (`timedatectl` should show "NTP service: active") and, if you like, change the host name:

```bash
timedatectl
sudo hostnamectl set-hostname opennccm     # optional
```

:::tip[Recommendation]
If the server is a virtual machine, take a snapshot now. It lets you return to this point if something goes wrong during the installation.
:::
