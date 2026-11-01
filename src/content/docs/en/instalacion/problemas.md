---
title: "Troubleshooting"
description: "Checklist and common problems."
---

## Checklist

| Check | How | Expected result |
| --- | --- | --- |
| Service running | `systemctl status opennccm` | active (running) |
| Web responds | `curl -k https://localhost/healthz` | `{"status":"ok"}` |
| Syslog listening | `sudo ss -ulpn | grep 514` | python process on 0.0.0.0:514 |
| Reaches a device | `ssh USER@DEVICE_IP` from the server | asks for a password |
| First backup | Device page | status ok + version #1 |
| Alerts | Settings → Send test notification | the message arrives |

## Common problems

| Symptom | Likely cause and fix |
| --- | --- |
| The web interface does not open | Check the logs: `journalctl -u opennccm -n 100` and `sudo nginx -t`. Check the firewall (port 443). |
| "Could not open syslog UDP/514" in the log | Another service is using the port (e.g. rsyslog with UDP reception enabled). Disable that reception or change `NCM_SYSLOG_PORT` in `/etc/opennccm/opennccm.env`. |
| Backup: "TCP connection to device failed" or timeout | No connectivity or SSH is closed. Try `ssh` from the server; check the device's VTY ACLs. |
| Old device: "no matching host key type found. Their offer: ssh-rsa" or "Incompatible ssh peer" | The device (e.g. Ubiquiti EdgeSwitch, Cisco IOS 12.x, old HP ProCurve) only supports SHA-1 algorithms. Since version 1.3.1 OpenNCCM accepts them automatically **only as a last resort**, so upgrade with `sudo opennccm update`. Modern devices keep using modern algorithms. In the long run, upgrading the device firmware is advisable. |
| "The device asks for a password for privileged mode (enable)…" or "Failed to enter enable mode" | The device requires an *enable* password different from the login one (OpenNCCM already tries with no password and with the login one). Enter it in **Credentials → Enable / secret** of the credential assigned to the device and back up again. |
| The web "Update" button shows "fatal: $HOME not set" | Bug in version 1.6.0/1.6.1, fixed in 1.6.2. Upgrade once from the console with `sudo opennccm update`; from then on the button works. |
| The browser does not offer to save the user name and password | The site has a certificate warning. Install the "OpenNCCM CA" authority on the PC (see [HTTPS and firewall](/en/instalacion/https-cortafuegos/)) and always use the same address. |
| I lost the phone with two-step verification | Another administrator removes it in Users → Edit, or on the server: `sudo opennccm reset-2fa USER`. |
| "The account is temporarily locked" | 5 wrong passwords in a row: wait 15 minutes or ask an administrator to set a new password (that unlocks it). |
| The web SSH console disconnects when opened | It only works with devices reached over SSH and for users who have permission (Settings → Security and access). Behind another proxy, that proxy must allow WebSocket. |
| Backup: "Authentication failed" | Wrong user/password in the assigned credential. |
| Backup: "Pattern not detected" | The prompt or privileged mode is not the expected one: the *enable* password is missing, or the `device_type` does not match the device. |
| Backup: "invalid output" | The backup command does not exist in that version. Set a **custom backup command** on the device. |
| Changes are not detected in real time | The device does not send syslog, sends it from another IP, or a firewall blocks UDP 514. Check with `sudo tcpdump -ni any udp port 514`. |
| Telnet "not supported" | That platform has no Telnet variant in Netmiko: use SSH. |
| Forgot the password or cannot sign in | `sudo opennccm users` to list users and `sudo opennccm reset-password USER 'NewPassword123'`. After 10 failed attempts sign-in is blocked for 15 minutes: `sudo opennccm restart` unblocks it. |
| Firmware: "MD5 not verified" | Damaged image or not enough space; on Cisco enable `ip scp server enable`. |
