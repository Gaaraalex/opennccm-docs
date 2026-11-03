---
title: "HTTPS y cortafuegos"
description: "Certificado propio o de Let's Encrypt y los puertos que hay que abrir."
---

## Certificado HTTPS propio

El instalador crea una **autoridad certificadora propia de OpenNCCM** («OpenNCCM CA») y, con ella, el certificado HTTPS del servidor. La autoridad está **restringida a este servidor** (su IP y su nombre): aunque alguien obtuviera su clave, no serviría para suplantar otros sitios. Instálela una vez en cada PC desde el que use OpenNCCM:

1.  En la pantalla de ingreso pulse **«¿El navegador dice «No es seguro» o no ofrece guardar la contraseña?»** (o vaya a `https://IP_DEL_SERVIDOR/certificado`) y descargue **OpenNCCM-CA.crt**.
2.  **Windows:** abra el archivo → Instalar certificado → Equipo local → «Colocar todos los certificados en el siguiente almacén» → **Entidades de certificación raíz de confianza** → Finalizar. Cierre y abra el navegador.
3.  La página explica también macOS, Linux, Firefox, Android e iPhone.

Después, al entrar con la misma dirección, el candado aparece sin avisos y el navegador ofrece guardar la contraseña (Chrome y Edge no lo hacen en sitios con error de certificado). Las instalaciones anteriores a la 1.6.0 pasan a este certificado al actualizar (habrá que instalar la autoridad una vez). Si prefiere no instalar nada en los PC, reemplace el certificado por uno de la CA de su empresa o de Let's Encrypt:

### Certificado de su CA interna

```bash
sudo cp servidor.crt /etc/ssl/certs/opennccm.crt       # incluya la cadena intermedia
sudo cp servidor.key /etc/ssl/private/opennccm.key
sudo chmod 600 /etc/ssl/private/opennccm.key
sudo nginx -t && sudo systemctl reload nginx
```

### Let's Encrypt (solo si el servidor tiene un nombre DNS público accesible por el puerto 80)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d opennccm.SU-DOMINIO.com
```

## Cortafuegos

Si usa `ufw`, el instalador abre los puertos necesarios cuando ya está activo. Para activarlo desde cero **sin perder su sesión SSH**:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 514/udp comment 'OpenNCCM syslog'
sudo ufw enable
sudo ufw status
```

:::tip[Más seguro]
Limite el syslog y la web a sus redes de gestión, por ejemplo: `sudo ufw allow from 10.0.0.0/8 to any port 514 proto udp`.
:::

La [imagen completa de WatchGuard (.fxi)](/equipos/dispositivos/#watchguard-configuración-xml-e-imagen-completa-fxi) llega por un receptor FTP temporal (puerto 2121 y pasivos 50000–50010, TCP). Con `ufw`, OpenNCCM abre esos puertos solo para el Firebox mientras dura el respaldo y los cierra al terminar; si hay otro cortafuegos entre el Firebox y el servidor, permítalos desde el Firebox.
