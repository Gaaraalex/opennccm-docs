---
title: "Línea base"
description: "Fijar la configuración aprobada de cada equipo como referencia, detectar cualquier desviación y poder volver a ella en un paso (por ejemplo, tras un incidente)."
curso: ["4.3"]
---

## Cómo funciona

-   Cada equipo puede tener una versión marcada como línea base (solo configuraciones en ejecución).
-   En cada respaldo, OpenNCCM compara la huella de la configuración actual con la de la línea base.
-   Si dejan de coincidir, el equipo muestra «Difiere de la base», aparece en el panel y se genera la alarma **«Desviación de línea base»**. Cuando vuelven a coincidir, la marca desaparece sola.

## Cómo usarlo

1.  Abra la versión aprobada y pulse **Marcar como línea base**.
2.  Si el equipo se desvía, su ficha mostrará un aviso con **Ver diferencias** (comparación lado a lado línea base ↔ actual) y, en el menú **⋯**, **Volver a la línea base…**, que genera una solicitud de reversión para aprobar.
3.  Use **Dispositivos → estado «fuera de línea base»** o **Informes → Fuera de línea base** para ver todos los afectados.
