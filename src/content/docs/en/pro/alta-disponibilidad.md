---
title: "High availability"
description: "Pro module: a second standby server that copies the data every minute and takes over if the active one goes down."
---

Two OpenNCCM servers: one **active** and one on **standby** that copies its data every minute and takes over if the active one goes down. It is an [OpenNCCM Pro](/en/pro/licencia/) module; the license counts **pairs** (an active server with its standby server, with the same key).

## Add the standby server

You need a fresh installation of Ubuntu 22.04 or 24.04 for the second server.

1.  On the active server, go to **Administration › High availability** and click **Add standby server**.
2.  Check **This server's address from the other one** and click **Create the enrollment key**. Keep it: it is not shown again, it is valid for 7 days and only once.
3.  Copy the command to the other server:

    ```bash
    curl -fsSL https://raw.githubusercontent.com/Gaaraalex/opennccm/main/install.sh | sudo bash -s -- --espera https://ACTIVO --clave ha_…
    ```

    It installs OpenNCCM on standby and copies everything from the active server: users, devices and configurations. It also activates the license on the standby server.
4.  The window says "Waiting for the other server…" and changes by itself to **Connected**.

:::caution[Device access lists]
Add the standby server's IP to your devices' access lists. If a device only accepts SSH from the active server's IP, the other one will not be able to back it up when it becomes the active one.
:::

## What is copied

Every 60 seconds the standby server downloads only what changed in the database (with PostgreSQL, a full copy with `pg_dump`). The delay is shown in **Replication** ("Up to date · … behind"); after 10 minutes it turns amber and sends an alert.

Not copied: each server's license, console recordings, the Git export repository and the [recovery backups](/en/administracion/sistema/). Each server downloads its Pro modules with its own license.

## The standby server

It is a complete OpenNCCM, but it does not back up or run tasks. When you open it, it shows "This server is on standby" with **Go to** (the active one). Only administrators can **Sign in to this server**, to check the pair or force the switchover if the active one does not answer.

## Switchover

| When | What happens |
| --- | --- |
| **Automatic** | If the standby server has gone 90 seconds (3 heartbeats) without reaching the active one **and** it does reach the **witness**, it becomes active and sends an alert. It needs the license valid or in its grace period |
| **Switch over to …** (manual) | The active server stops backing up, the other one copies the latest data and takes over. Nothing is lost. OpenNCCM stops answering for a few seconds. You confirm by typing the server's name |
| **Force on …** | When the active server does not answer. Changes made on the active server after the last copy (up to 60 s) may be lost. You confirm with the name and a checkbox |

Only the [master administrator](/en/administracion/usuarios/) can switch over.

-   **The one that goes down never becomes active again by itself:** it comes back on standby and copies what is new. To make it the active one again, use **Switch over**.
-   **There are never two active servers:** each switchover increases a number for the pair (the epoch). When both see each other again, the one with the lower number goes to standby.
-   **Isolated:** if the active server loses both the other server and the witness for 90 s, it stops backing up ("This server got isolated from the network") so as not to duplicate the work. It comes back by itself when the network returns.

### Witness

By default it is each server's gateway; it can be changed. It must be an address that both servers can always reach, but that is not on either of them. The standby server only takes over if it cannot reach the active one but can reach the witness: that way it does not switch over when it is the one that is isolated.

### On becoming active (advanced)

You can run a command on the server that becomes active, for example to move a virtual IP. For security it is not written from the web interface: create it on each server, as root, in `/etc/opennccm/al-pasar-a-activo.sh`. It must be owned by root and no other user may be able to change it. If it does not exist, nothing is run.

Without a virtual IP, users can sign in to either server: the one on standby sends them to the active one.

## Screen, alerts and history

-   Pair status: **Protected**, **Unprotected** (the other one does not answer), **Failed over** (with **Review**) or **Isolated**.
-   **Servers:** each one with its role, address, version, last heartbeat, replication and free space.
-   **History:** each switchover and change, with **Reviewed**.
-   Alerts go to the bell and by email: the other server does not answer, the pair switched over, server isolated. The Dashboard shows the pair's status.
-   **Remove the pair:** this server is left alone and active, and stops copying or receiving copies. No data is deleted. It has to be removed on the other server too.

## With site collectors

The active server sends both addresses to the [collectors](/en/pro/recolectores/). If a collector cannot reach one, it tries the other.

## License

Without a license, or with it expired once the grace period has passed, replication and manual switchover keep working, but **automatic failover is turned off** and the screen says so.
