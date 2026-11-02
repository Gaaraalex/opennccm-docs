---
title: "Move OpenNCCM to another server"
description: "Step by step to take OpenNCCM to a new server with all its history: backup, encryption key, restore and checks."
resumen:
  - "Moving OpenNCCM means copying the database and the encryption key: with both, the new server ends up the same as the old one."
  - "Install the same version or a newer one on the new server, put the original key in place if the backup does not include it, and restore."
  - "Check devices, backups and passwords before changing the address and shutting down the old server."
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

## 3. Put the original key in place (only if the backup doesn't include it)

**Since version 2.18**, if the backup includes the key (`--with-key`) you can skip this step: the restore replaces the key the installer created and keeps the previous one as `/etc/opennccm/secret.key.antes-de-restaurar-DATE`. Go to step 4.

If the backup does **not** include the key (or the server runs a version older than 2.18), replace the key the installer created with the old server's key:

```bash
sudo systemctl stop opennccm
sudo mv /etc/opennccm/secret.key /etc/opennccm/secret.key.new-unused
sudo install -m 600 -o root -g root /tmp/secret.key /etc/opennccm/secret.key
```

Copying the key before restoring still works with a `--with-key` backup too.

## 4. Restore

The same command works **with SQLite and with PostgreSQL** (with PostgreSQL it uses `pg_restore` since version 2.18):

```bash
sudo opennccm restore /tmp/opennccm-YYYYMMDD-HHMMSS.tar.gz
```

The command stops the service, sets the new server's empty database aside, restores the backup and starts the service again. If the backup is encrypted (`.enc`), it asks for its password. If the backup has no key and the server's key can't decrypt the restored data, it says so, tells you to copy the original `secret.key`, and ends with an error instead of "Restored.".

The backup must come from the **same database** as the server: a SQLite backup on a PostgreSQL server (or the other way round) is rejected with the reason.

:::note[Versions older than 2.18]
With PostgreSQL, restore by hand with `pg_restore`:

```bash
mkdir /tmp/backup && tar -xzf /tmp/opennccm-YYYYMMDD-HHMMSS.tar.gz -C /tmp/backup
sudo systemctl stop opennccm
sudo -u postgres pg_restore --clean --if-exists -d opennccm /tmp/backup/opennccm.pgdump
sudo systemctl start opennccm
```
:::

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
| The restore warns that the key doesn't decrypt the data, or configurations look garbled | The server has a different key. Repeat step 3 with the original `secret.key` and restore again (or restart: `sudo systemctl restart opennccm`). |
| The restore rejects the backup because it's from another database | The backup is SQLite and the server uses PostgreSQL (or the other way round): install the new server with the same database as the old one. |
| "Automatic restore only supports SQLite" | A version older than 2.18 with PostgreSQL: upgrade to 2.18 or use the manual `pg_restore` procedure. |
| "This backup is encrypted: its password is required" | The backup is `.enc`: type the password used when it was created. |
| Devices don't back up from the new server | ACLs or firewalls that still allow only the old IP. |
| Something is off and you want to go back | The previous empty database is kept next to the restored one (`opennccm.db.antes-de-restaurar-…`), and the old server is untouched. |

For periodic backups and restoring on the same server, see [Backups and moving servers](/en/instalacion/migrar/).

:::tip[Want us to do it?]
The **migration** service of [professional support](/en/ayuda/planes/) includes moving OpenNCCM to another server in a remote session.
:::
