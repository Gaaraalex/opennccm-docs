---
title: "Move OpenNCCM to another server"
description: "Step by step to take OpenNCCM to a new server with all its history: backup, encryption key, restore and checks."
---

Moving OpenNCCM to another server (new hardware, another virtual machine or a newer Ubuntu release) means **copying the database and the encryption key**. With both, the new server ends up exactly like the old one: devices, configuration history, users, policies and tasks.

:::caution[The key is everything]
Device configurations and passwords are stored encrypted with `/etc/opennccm/secret.key`. If the new server starts with a **different** key, the database restores but nothing can be decrypted. That's why the steps below copy the original key **before** restoring.
:::

## Before you start

- **Version:** install the **same version** of OpenNCCM on the new server as on the old one, or a newer one. On startup the database is upgraded to the installed version automatically. Never restore a backup on an older version.
- **Database:** check which one the old server uses, because SQLite and PostgreSQL are restored differently. Look at `/etc/opennccm/opennccm.env`: if it has `NCM_DATABASE_URL=postgresql…`, it's PostgreSQL.
- **Window:** no backups run during the move. Pick a quiet moment and let users know.
- **Network:** the new server must reach the same devices over SSH/Telnet. Check ACLs and firewalls that filter by source IP.

## 1. Back up the old server

```bash
sudo systemctl stop opennccm                       # nothing changes while copying
sudo opennccm backup                               # creates /var/lib/opennccm/system-backups/opennccm-YYYYMMDD-HHMMSS.tar.gz
sudo cp /etc/opennccm/secret.key /root/secret.key  # the key, separately
```

You can also create the backup from **System → Create backup now** and download it. If you choose to include the key (`sudo opennccm backup --with-key`), the file is encrypted (`.tar.gz.enc`) with a password of at least 12 characters that is asked for when restoring.

Take both files to the new server over a secure channel (`scp`, SFTP or an encrypted USB drive):

```bash
scp /var/lib/opennccm/system-backups/opennccm-*.tar.gz /root/secret.key admin@NEW-SERVER:/tmp/
```

## 2. Install OpenNCCM on the new server

Follow [Install on Ubuntu](/en/instalacion/instalar/) with the **same database** as the old server (SQLite or PostgreSQL). There's no need to create devices or users: the restore brings them.

## 3. Put the original key in place

The installer creates a new key. Replace it with the old server's key:

```bash
sudo systemctl stop opennccm
sudo mv /etc/opennccm/secret.key /etc/opennccm/secret.key.new-unused
sudo install -m 600 -o root -g root /tmp/secret.key /etc/opennccm/secret.key
```

:::note
Do this even if the backup includes the key (`--with-key`): the restore only writes it when the server has **no** key, and the installer already created one.
:::

## 4. Restore

**With SQLite** (the default):

```bash
sudo opennccm restore /tmp/opennccm-YYYYMMDD-HHMMSS.tar.gz
```

The command stops the service, sets the new server's empty database aside, restores the backup and starts the service again. If the backup is encrypted (`.enc`), it asks for its password.

**With PostgreSQL**, restore with `pg_restore`:

```bash
mkdir /tmp/backup && tar -xzf /tmp/opennccm-YYYYMMDD-HHMMSS.tar.gz -C /tmp/backup
sudo systemctl stop opennccm
sudo -u postgres pg_restore --clean --if-exists -d opennccm /tmp/backup/opennccm.pgdump
sudo systemctl start opennccm
```

## 5. Check

1. Sign in to the web interface with a user from the old server (passwords and two-step verification are kept).
2. Open a device and compare two versions: if you can see the configurations, the key is correct.
3. Run **Back up all** (or `sudo opennccm backup-all`) and check that devices back up.
4. Review **Settings**: email, Teams/Slack/Telegram, remote SFTP copy and Git copy are still configured, but check that the new server can reach those destinations.

## 6. Switch the address and turn off the old server

- If the IP or name changes, update DNS and the **HTTPS certificate**: with Let's Encrypt request it again for the name; with a company certificate, copy it over (see [HTTPS and firewall](/en/instalacion/https-cortafuegos/)).
- If devices or firewalls filter by source IP (SSH ACLs, SNMP, syslog), change them to the new IP.
- Keep the old server **turned off but not deleted** for a few days. When everything is fine, delete it, along with the temporary copy of `secret.key` in `/root` and `/tmp`.

## If something goes wrong

| Symptom | Cause and fix |
| --- | --- |
| Configurations look garbled or fail to open | The server has a different key. Repeat step 3 with the original `secret.key` and restart: `sudo systemctl restart opennccm`. |
| "Automatic restore only supports SQLite" | The database is PostgreSQL: use the `pg_restore` procedure. |
| "This backup is encrypted: its password is required" | The backup is `.enc`: type the password used when it was created. |
| Devices don't back up from the new server | ACLs or firewalls that still allow only the old IP. |
| Something is off and you want to go back | The previous empty database is kept next to the restored one (`opennccm.db.antes-de-restaurar-…`), and the old server is untouched. |

For periodic backups and restoring on the same server, see [Backups and moving servers](/en/instalacion/migrar/).

:::tip[Want us to do it?]
The **migration** service of [professional support](/en/ayuda/planes/) includes moving OpenNCCM to another server in a remote session.
:::
