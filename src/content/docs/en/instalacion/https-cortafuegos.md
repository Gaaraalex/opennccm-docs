---
title: "HTTPS and firewall"
description: "Your own or a Let's Encrypt certificate, and the ports to open."
---

## Your own HTTPS certificate

The installer creates **OpenNCCM's own certificate authority** ("OpenNCCM CA") and, with it, the server's HTTPS certificate. The authority is **restricted to this server** (its IP and name): even if someone obtained its key, it could not be used to impersonate other sites. Install it once on every PC you use OpenNCCM from:

1.  On the sign-in screen click **"Does the browser say 'Not secure' or not offer to save the password?"** (or go to `https://SERVER_IP/certificado`) and download **OpenNCCM-CA.crt**.
2.  **Windows:** open the file → Install certificate → Local machine → "Place all certificates in the following store" → **Trusted Root Certification Authorities** → Finish. Close and reopen the browser.
3.  The page also explains macOS, Linux, Firefox, Android and iPhone.

After that, when you open the same address the padlock appears without warnings and the browser offers to save the password (Chrome and Edge do not do this on sites with a certificate error). Installations older than 1.6.0 switch to this certificate when they upgrade (you will need to install the authority once). If you prefer not to install anything on the PCs, replace the certificate with one from your company's CA or from Let's Encrypt:

### Certificate from your internal CA

```bash
sudo cp server.crt /etc/ssl/certs/opennccm.crt       # include the intermediate chain
sudo cp server.key /etc/ssl/private/opennccm.key
sudo chmod 600 /etc/ssl/private/opennccm.key
sudo nginx -t && sudo systemctl reload nginx
```

### Let's Encrypt (only if the server has a public DNS name reachable on port 80)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d opennccm.YOUR-DOMAIN.com
```

## Firewall

If you use `ufw`, the installer opens the required ports when it is already active. To turn it on from scratch **without losing your SSH session**:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 514/udp comment 'OpenNCCM syslog'
sudo ufw enable
sudo ufw status
```

:::tip[More secure]
Limit syslog and the web interface to your management networks, for example: `sudo ufw allow from 10.0.0.0/8 to any port 514 proto udp`.
:::
