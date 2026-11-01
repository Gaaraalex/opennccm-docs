---
title: "Mover OpenNCCM a otro servidor"
description: "Paso a paso para llevar OpenNCCM a un servidor nuevo con todo su historial: copia, clave de cifrado, restauración y comprobación."
---

Mover OpenNCCM a otro servidor (otro hardware, otra máquina virtual o una versión nueva de Ubuntu) es **copiar la base de datos y la clave de cifrado**. Con las dos, el servidor nuevo queda igual que el viejo: equipos, historial de configuraciones, usuarios, políticas y tareas.

:::caution[La clave lo es todo]
Las configuraciones y las contraseñas de los equipos se guardan cifradas con `/etc/opennccm/secret.key`. Si el servidor nuevo arranca con **otra** clave, la base se restaura pero nada se puede descifrar. Por eso los pasos de abajo copian la clave original **antes** de restaurar.
:::

## Antes de empezar

- **Versión:** instale en el servidor nuevo la **misma versión** de OpenNCCM que el viejo, o una más nueva. Al arrancar, la base se actualiza sola a la versión instalada. Nunca restaure una copia en una versión más antigua.
- **Base de datos:** compruebe cuál usa el servidor viejo, porque SQLite y PostgreSQL se restauran distinto. Mire `/etc/opennccm/opennccm.env`: si existe `NCM_DATABASE_URL=postgresql…`, es PostgreSQL.
- **Ventana:** durante el cambio no se hacen respaldos. Elija un momento tranquilo y avise a los usuarios.
- **Red:** el servidor nuevo debe llegar por SSH/Telnet a los mismos equipos. Revise ACL y cortafuegos que filtren por la IP de origen.

## 1. Haga la copia en el servidor viejo

```bash
sudo systemctl stop opennccm                       # nada cambia mientras se copia
sudo opennccm backup                               # crea /var/lib/opennccm/system-backups/opennccm-AAAAMMDD-HHMMSS.tar.gz
sudo cp /etc/opennccm/secret.key /root/secret.key  # la clave, aparte
```

También puede crear la copia desde **Sistema → Crear copia ahora** y descargarla. Si elige incluir la clave (`sudo opennccm backup --with-key`), el archivo sale cifrado (`.tar.gz.enc`) con una contraseña de al menos 12 caracteres que se pedirá al restaurar.

Lleve los dos archivos al servidor nuevo por un canal seguro (`scp`, SFTP o una memoria USB cifrada):

```bash
scp /var/lib/opennccm/system-backups/opennccm-*.tar.gz /root/secret.key admin@SERVIDOR-NUEVO:/tmp/
```

## 2. Instale OpenNCCM en el servidor nuevo

Siga [Instalar en Ubuntu](/instalacion/instalar/) con la **misma base de datos** que el viejo (SQLite o PostgreSQL). No hace falta crear equipos ni usuarios: la restauración los trae.

## 3. Ponga la clave original

El instalador crea una clave nueva. Reemplácela por la del servidor viejo:

```bash
sudo systemctl stop opennccm
sudo mv /etc/opennccm/secret.key /etc/opennccm/secret.key.nueva-sin-usar
sudo install -m 600 -o root -g root /tmp/secret.key /etc/opennccm/secret.key
```

:::note
Hágalo también si la copia incluye la clave (`--with-key`): la restauración solo la escribe cuando el servidor **no tiene** ninguna, y el instalador ya creó una.
:::

## 4. Restaure

**Con SQLite** (la opción por defecto):

```bash
sudo opennccm restore /tmp/opennccm-AAAAMMDD-HHMMSS.tar.gz
```

El comando detiene el servicio, guarda aparte la base vacía del servidor nuevo, restaura la copia y vuelve a iniciarlo. Si la copia está cifrada (`.enc`), pide su contraseña.

**Con PostgreSQL**, la restauración se hace con `pg_restore`:

```bash
mkdir /tmp/copia && tar -xzf /tmp/opennccm-AAAAMMDD-HHMMSS.tar.gz -C /tmp/copia
sudo systemctl stop opennccm
sudo -u postgres pg_restore --clean --if-exists -d opennccm /tmp/copia/opennccm.pgdump
sudo systemctl start opennccm
```

## 5. Compruebe

1. Entre en la web con un usuario del servidor viejo (las contraseñas y la verificación en dos pasos se conservan).
2. Abra un equipo y compare dos versiones: si se ven las configuraciones, la clave es la correcta.
3. Lance **Respaldar todos** (o `sudo opennccm backup-all`) y revise que respalden los equipos.
4. Revise **Ajustes**: correo, Teams/Slack/Telegram, copia remota por SFTP y copia en Git siguen configurados, pero compruebe que el servidor nuevo llega a esos destinos.

## 6. Cambie la dirección y apague el viejo

- Si cambia la IP o el nombre, actualice el DNS y el **certificado HTTPS**: con Let's Encrypt vuelva a pedirlo para el nombre; con un certificado de la empresa, cópielo (ver [HTTPS y cortafuegos](/instalacion/https-cortafuegos/)).
- Si los equipos o los cortafuegos filtran por IP de origen (ACL de SSH, SNMP, syslog), cámbielas a la IP nueva.
- Deje el servidor viejo **apagado pero sin borrar** unos días. Cuando todo esté bien, bórrelo junto con la copia temporal de `secret.key` de `/root` y `/tmp`.

## Si algo sale mal

| Síntoma | Causa y solución |
| --- | --- |
| Las configuraciones salen ilegibles o con error al abrirlas | El servidor tiene otra clave. Repita el paso 3 con el `secret.key` original y reinicie: `sudo systemctl restart opennccm`. |
| «La restauración automática solo admite SQLite» | La base es PostgreSQL: use el procedimiento con `pg_restore`. |
| «Esta copia está cifrada: hace falta su contraseña» | La copia es `.enc`: escriba la contraseña que se usó al crearla. |
| Los equipos no respaldan desde el servidor nuevo | ACL o cortafuegos que aún permiten solo la IP vieja. |
| Algo no cuadra y quiere volver atrás | La base vacía anterior queda junto a la restaurada (`opennccm.db.antes-de-restaurar-…`), y el servidor viejo sigue intacto. |

Para copias periódicas y la restauración en el mismo servidor, vea [Copias y migrar a otro servidor](/instalacion/migrar/).

:::tip[¿Lo hacemos por usted?]
El servicio de **migración** del [soporte profesional](/ayuda/planes/) incluye mover OpenNCCM a otro servidor en una sesión remota.
:::
