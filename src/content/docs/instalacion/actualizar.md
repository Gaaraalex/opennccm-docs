---
title: "Actualizar y volver atrás"
description: "Pasar a una versión nueva y, si algo falla, volver a la anterior."
curso: ["11.3"]
---

Las versiones nuevas se publican en el repositorio de GitHub. Cuando hay una, OpenNCCM avisa a los administradores con un mensaje emergente. Se puede actualizar **desde la web** (**Administración → Sistema → Actualizaciones → Actualizar ahora**, desde la 1.6.0) o con un comando en el servidor; ambos hacen exactamente lo mismo y ofrecen siempre la última versión publicada (nunca una sin publicar):

```bash
sudo opennccm update
==> Buscando actualizaciones (stable)…

Actualización disponible: 2.45.4 → 2.45.5
## 2.45.5
- …novedades de la versión…

¿Actualizar ahora? [s/N] s
==> Creando copia previa
✓ Copia previa: /var/lib/opennccm/pre-update/AAAAMMDD-HHMMSS_v2.45.4
==> Instalando 2.45.5
==> Iniciando y verificando
✓ OpenNCCM actualizado: 2.45.4 → 2.45.5
```

Los módulos [Pro](/pro/licencia/) instalados se actualizan solos, aparte.

## Opciones

| Comando | Acción |
| --- | --- |
| `sudo opennccm update --check` | Solo muestra si hay versión nueva y sus novedades |
| `sudo opennccm update --yes` | Actualiza sin preguntar (para tareas automáticas) |
| `sudo opennccm update --version v2.45.4` | Instala una versión concreta (también sirve para bajar de versión) |
| `opennccm status` | Indica si hay una actualización disponible |

La versión instalada aparece al pie de todas las páginas. Las copias previas se guardan en `/var/lib/opennccm/pre-update/` (las 5 más recientes).

## Volver a la versión anterior

```bash
sudo opennccm rollback
```

Muestra un menú con las copias previas (la más reciente arriba) y restaura el código y la base de datos de ese momento.

:::caution[Atención]
Volver atrás restaura también la base de datos de ese momento: se pierden los respaldos y cambios registrados después de actualizar (la base descartada se conserva con el sufijo `.descartada-…`).
:::

## Buenas prácticas

-   Revise las novedades con `opennccm update --check` antes de actualizar.
-   Si el servidor es una VM, tome una instantánea antes de actualizar.
-   Actualice fuera del horario de respaldos programados.
