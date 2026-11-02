---
title: "Requisitos"
description: "Qué necesita antes de instalar OpenNCCM."
curso: ["0.2"]
---

<p class="captura-tema"><img class="tema-oscuro" src="/capturas/oscuro/panel.png" alt="Panel de OpenNCCM con 13 equipos de ejemplo" width="1600" height="1000" loading="lazy" /><img class="tema-claro" src="/capturas/claro/panel.png" alt="Panel de OpenNCCM con 13 equipos de ejemplo" width="1600" height="1000" loading="lazy" /></p>

## Servidor

| Tamaño de la red | CPU | RAM | Disco | Base de datos |
| --- | --- | --- | --- | --- |
| Hasta 300 equipos | 2 vCPU | 4 GB | 40 GB | SQLite (por defecto) |
| 300 – 2 000 equipos | 4 vCPU | 8 GB | 100 GB | SQLite o PostgreSQL |
| Más de 2 000 equipos | 8 vCPU | 16 GB | 200 GB+ | PostgreSQL (ver [PostgreSQL](/instalacion/postgresql/)) |

Valores orientativos. El disco crece con la cantidad de versiones guardadas y con las imágenes de firmware; puede limitar las versiones por equipo en **Administración → Ajustes → Flujo de cambios**.

-   Ubuntu Server **22.04 LTS** o **24.04 LTS**, 64 bits, recién instalado (físico o máquina virtual).
-   Acceso con un usuario que tenga `sudo`.
-   Acceso a internet durante la instalación (descarga de paquetes de Ubuntu y de Python).
-   IP fija y nombre DNS recomendados.

## Red

| Origen | Destino | Puerto | Para qué |
| --- | --- | --- | --- |
| Navegadores de los administradores | Servidor | TCP 443 (y 80) | Interfaz web |
| Servidor | Equipos de red | TCP 22 (SSH) o 23 (Telnet) | Respaldos, cambios, firmware (SCP sobre SSH) |
| Equipos de red | Servidor | UDP 514 | Syslog: detección de cambios en tiempo real |
| Servidor | Internet | TCP 443 | Opcional: NVD (CVE), API Cisco EoX, Telegram, webhooks |
| Servidor | Servidor de correo | TCP 587 / 465 / 25 | Opcional: alertas e informes por correo |

## En los equipos de red

-   SSH habilitado y un usuario para OpenNCCM (idealmente uno dedicado, con privilegio para ver y cambiar la configuración).
-   Para la actualización de firmware en Cisco: `ip scp server enable`.

## Preparar el servidor

Conéctese al servidor por SSH (desde Windows puede usar PowerShell, PuTTY o Windows Terminal):

```bash
ssh USUARIO@IP_DEL_SERVIDOR
```

No necesita preparar nada más: el instalador actualiza Ubuntu, instala las dependencias y le pregunta la zona horaria. La zona horaria y la hora también se pueden cambiar después desde **Sistema → Fecha y hora**. Solo compruebe que el servidor tenga la hora correcta sincronizada (`timedatectl` debe mostrar «NTP service: active») y, si quiere, cambie el nombre del equipo:

```bash
timedatectl
sudo hostnamectl set-hostname opennccm     # opcional
```

:::tip[Recomendación]
Si el servidor es una máquina virtual, tome una instantánea (snapshot) ahora. Permite volver a este punto si algo sale mal durante la instalación.
:::
