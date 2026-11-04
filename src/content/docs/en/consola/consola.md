---
title: "Console"
description: "The SSH console in the browser and the console center."
curso: ["5.2"]
resumen:
  - "SSH console in the browser from Devices, the device page or Operate → Console, with suggestions, history and meaningful colors."
  - "It protects service: it warns before commands that cut it, respects read-only mode and forbidden commands, and backs up the device when it detects a change."
  - "The Console center gathers parallel sessions, commands on several devices, step-by-step recipes, recordings and tools (ping, traceroute, TCP, DNS)."
---

<p class="captura-tema"><img class="tema-oscuro" src="/capturas/oscuro/consola.png" alt="Console on a Cisco device with colored output and frequent commands" width="1600" height="1000" loading="lazy" /><img class="tema-claro" src="/capturas/claro/consola.png" alt="Console on a Cisco device with colored output and frequent commands" width="1600" height="1000" loading="lazy" /></p>

## Device console

1.  In **Devices**, click the console icon on the device's row, or the **Console** button on its page; also from **Operate → Console**. At the top you see "Console · name" with the IP, model and system.
2.  Type in the fixed **command line** at the bottom. As you type, the rest of the most likely command for that system appears in gray along with a suggestions menu: **Tab** completes, **↑ ↓** choose and, with the menu closed, **↑** goes through the history. **Frequent** runs the most used ones with one click (those that reboot the device are in red). The suggestions and frequent commands are that device's own: those of its type (starting with the ones OpenNCCM uses to back it up and inventory it), adjusted to its model and firmware version. For example, a WatchGuard suggests `show interface`, `show ip route` or `show feature-key` and, from 12.4, `show sd-wan`; a MikroTik with RouterOS 7 suggests `/routing bgp session print` and with RouterOS 6, `/routing bgp peer print`; PoE, Wi-Fi or stack commands only appear on models that have them. The history is kept per device type, so commands from another vendor do not mix in, and the queries on that list can be used in read-only mode even if they do not start with `show` (for example `porterrshow` on Brocade or `pfctl -sr` on pfSense).
3.  The output looks like a classic terminal, all in one stream, with colors by meaning: the prompt in lime, paths and commands in blue, verbs in violet, "key=value" in teal and salmon, IP addresses in cyan, what is up in green, what is down or has errors in red and what is disabled in amber. Colors depend on the system (RouterOS, IOS, VRP, Junos, EXOS, EdgeSwitch, Linux…).
4.  Top bar: search the output (highlights matches), smaller or larger font, copy all, download the log, theme (**Control room**, **Graphite** or **High contrast**), share, **Reconnect**, **Assistant** and full screen. In **Operate → Console** each session has the same: A−/A+, **Expand**, open in a separate window and full screen, and the **Assistant** button with the provider's logo.

| Protection | What it does |
| --- | --- |
| Commands that cut service | reload, reboot, erasing the configuration (write erase, reset-configuration…): before sending them, "This command may cut service" appears, with **Cancel** or **Run anyway**. |
| Read-only | The switch at the bottom blocks commands that change the configuration and says so in the output. If the user's role only allows reading, it is locked; the server enforces it even if the browser does not ask. |
| Group's forbidden commands | Whatever the administrator forbade in the device's group is not sent. |
| Change detected | If a command changes the configuration, "# OpenNCCM: change detected · backup vN queued · can be reverted" appears in green and 20 seconds later the device is backed up (with source "Console"). |

The footer shows the status, how it signed in (with the device's credential or with a user name and password), the system, the 15-minute idle timeout and that the session is recorded in the Audit log (**● REC**). On MikroTik the console uses line mode (without the device's own colors) and on other systems it turns paging off on connect; if a device pages anyway, the console carries on by itself.

| Setting | Effect |
| --- | --- |
| Sign in automatically (Settings → Security and access) | Signs in with the credential assigned to the device, without asking for a user or password; on Cisco, EdgeSwitch and similar it also enters privileged mode. Off by default. |
| Who can open it and how (Operate → Console → Access) | See "Console center". |

## Console center (Operate → Console)

| Section | What it does |
| --- | --- |
| Sessions | On the left, the launcher with **favorites** (★), **recent** and devices **by group**, with search (**Ctrl K**). Each device opens a session tab (● REC); you can view **1**, **2** side by side or **4** in a grid. In each panel: **Share** copies a read-only link (whoever opens it needs an OpenNCCM user; the owner sees "name is watching") and **Files** opens the device's files over SFTP to download them or upload one (with the device's credential; it is recorded in the Audit log). |
| Multi-device | Choose a group or individual devices, type the command once and run it on all of them. Answers are grouped into **Same** and **Different**, with the differing lines highlighted. Only queries run: if the command changes something, **Create change request** is offered (with approval, backup and rollback). With the assistant on, **✦ Analyze differences** explains what is different and how to make them match. |
| Recipes | Step-by-step guides ("What do you want to do?"), filtered by category (Security, Interfaces and VLANs, Services, Diagnostics) and vendor. Each recipe has an introduction, **variables** substituted in the commands, numbered steps with **Copy** and **Insert** (into the active console), "Watch out" steps in amber and a final "Check" step. At the bottom: **Apply as change request** (or **Run in the active console** if it only queries), **Use in multi-device** and **Duplicate and adapt**; **\+ New** creates your own. It includes at least 10 recipes for the most common tasks on Cisco IOS, MikroTik RouterOS, Extreme EXOS and Extreme VOSS / Fabric Engine (device name, users and passwords, SSH, web access over HTTPS, SNMP, syslog to OpenNCCM, RADIUS, NTP, VLANs, saving the configuration, diagnostics…), with a link to the vendor's official documentation when there is one. |
| Recordings | Every session: user, device, time, duration and commands, with a red mark if a command that cuts service was run. Searches what was typed and what was shown (for example "reload"). The player has a timeline with those marks, 1×, 2× or 4× speed and **Export** (text). They are kept for 180 days (configurable). |
| Tools | Ping, Traceroute, TCP port and DNS from the OpenNCCM server, with colored output as it arrives, a summary (loss, time, hops…) and **Open console** if the target is an OpenNCCM device. After the IP or name you can add the usual Windows or Linux options (the ones for each tool are listed below the box): `8.8.8.8 -t` (continuous ping, until you click **Stop** or for 10 minutes), `-n 10`, `-l 1400 -f` (size without fragmenting), `-i 0.2`, `--ttl 5`, `-I ether1`; traceroute `-h 30 -q 3 -w 2`, `-I` (ICMP) or `-T -p 443` (TCP); TCP port `10.0.0.1:443 -c 5` or `-t`; DNS `example.com MX @1.1.1.1` or `-x 8.8.8.8`. Only those options are accepted and the text is never passed as-is to the system. Ping and traceroute need permission to send ICMP: the installer and `sudo opennccm update` grant it to the service (and also install `dig` for DNS record types). |
| Access (administrators) | By role: **No console**, **Read-only** or **Read and write**. General: record every session, enforce forbidden commands, idle timeout and how many days recordings are kept. By group: **Normal access** or **Requires approval** and its list of forbidden commands (anything starting like that, or a regular expression between slashes). **Access requests** arrive with a reason and a time limit; **Approve for N h** or **Reject**. The tab shows how many are pending. |
