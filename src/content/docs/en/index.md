---
title: "What is OpenNCCM?"
description: "Backups, changes and compliance for your network, on your own server."
curso: ["0.1"]
---

OpenNCCM backs up, versions, compares and audits the configuration of switches, routers and firewalls from about 70 vendors (133 platforms). It detects changes in real time, controls who changes what and rolls back when something goes wrong.

It is free and open-source software (GPL-3.0 license): you install it on your own server and configurations never leave your network.

## What it can do

- **Back up and compare:** a new version on every change, with side-by-side comparison between versions or between devices.
- **Change with control:** configlets with templates, requests with approval and safe per-platform rollback.
- **Meet standards:** PCI DSS, HIPAA, SOX and per-vendor hardening, with one-click fixes.
- **Protect the fleet:** firmware vulnerabilities (CVE), upgrades and end of life for each device.
- **Console and assistant:** an SSH console in the browser and an optional AI assistant that never runs anything.

## Where to start

1. Check the [requirements](/en/instalacion/requisitos/) and [install OpenNCCM](/en/instalacion/instalar/) with a single command.
2. Add a [credential](/en/primeros-pasos/credenciales/) and [your first device](/en/primeros-pasos/primer-equipo/).
3. Set up [syslog](/en/primeros-pasos/syslog/) to detect changes the moment they happen.

If you would rather see it first, the [video course](/en/ayuda/curso/) covers everything in 30 short lessons (in Spanish).

## How it works

OpenNCCM is a web application installed on a single Ubuntu server. It connects to your switches, routers and firewalls over SSH (or Telnet) to back up their configuration, compare it, audit it and apply changes. Devices report changes in real time by sending syslog messages.

| Component | Role |
| --- | --- |
| nginx | Receives HTTPS connections (port 443) and passes them to the application. Redirects HTTP (80) to HTTPS. |
| `opennccm` service | Web application (FastAPI + Uvicorn) listening only on the server itself (127.0.0.1:8000). It includes the task scheduler and the syslog receiver. |
| Netmiko | Library that talks to each vendor over SSH/Telnet and SCP. |
| Database | SQLite in `/var/lib/opennccm` by default. Configurations and passwords are encrypted. |
| Encryption key | `/etc/opennccm/secret.key`. Without it the data cannot be read. |
