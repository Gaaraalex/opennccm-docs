---
title: "Alta disponibilidad"
description: "Módulo Pro: un segundo servidor en espera que copia los datos cada minuto y toma el control si el activo cae."
---

Dos servidores OpenNCCM: uno **activo** y otro **en espera** que copia sus datos cada minuto y toma el control si el activo cae. Es un módulo de [OpenNCCM Pro](/pro/licencia/); la licencia cuenta **pares** (un activo con su servidor en espera, con la misma clave).

## Agregar el servidor en espera

Necesitas una instalación nueva de Ubuntu 22.04 o 24.04 para el segundo servidor.

1.  En el servidor activo, entra a **Administración › Alta disponibilidad** y pulsa **Agregar servidor en espera**.
2.  Revisa la **Dirección de este servidor desde el otro** y pulsa **Crear la clave de alta**. Guárdala: no se vuelve a mostrar, vale 7 días y una sola vez.
3.  Copia el comando en el otro servidor:

    ```bash
    curl -fsSL https://raw.githubusercontent.com/Gaaraalex/opennccm/main/install.sh | sudo bash -s -- --espera https://ACTIVO --clave ha_…
    ```

    Instala OpenNCCM en espera y copia todo del activo: usuarios, equipos y configuraciones. También activa la licencia en el de espera.
4.  La ventana dice «Esperando al otro servidor…» y cambia sola a **Conectado**.

:::caution[Listas de acceso de los equipos]
Agrega la IP del servidor en espera a las listas de acceso de tus equipos. Si un equipo solo acepta SSH desde la IP del activo, el otro no podrá respaldarlo cuando sea el activo.
:::

## Qué se copia

Cada 60 segundos el de espera baja solo lo que cambió de la base de datos (con PostgreSQL, una copia completa con `pg_dump`). El retraso se ve en **Réplica** («Al día · retraso …»); a los 10 minutos pasa a ámbar y avisa.

No se copian: la licencia de cada servidor, las grabaciones de consola, el repositorio Git de exportación ni las [copias de recuperación](/administracion/sistema/). Cada servidor baja sus módulos Pro con su licencia.

## El servidor en espera

Es un OpenNCCM completo, pero no respalda ni corre tareas. Al entrar, muestra «Este servidor está en espera» con **Ir a** (el activo). Solo los administradores pueden **Entrar a este servidor**, para revisar el par o forzar el cambio si el activo no responde.

## Conmutación

| Cuándo | Qué pasa |
| --- | --- |
| **Automática** | Si el de espera lleva 90 segundos (3 latidos) sin llegar al activo **y** sí llega al **testigo**, pasa a activo y avisa. Necesita la licencia vigente o en gracia |
| **Conmutar a …** (manual) | El activo deja de respaldar, el otro copia lo último y toma el control. No se pierde nada. OpenNCCM queda sin responder unos segundos. Se confirma escribiendo el nombre del servidor |
| **Forzar en …** | Cuando el activo no responde. Se pueden perder los cambios hechos en el activo después de la última copia (hasta 60 s). Se confirma con el nombre y una casilla |

Solo el [administrador maestro](/administracion/usuarios/) puede conmutar.

-   **El que cae nunca vuelve solo a activo:** vuelve en espera y copia lo nuevo. Para que vuelva a ser el activo, usa **Conmutar**.
-   **Nunca quedan dos activos:** cada conmutación sube un número del par (la época). Cuando los dos vuelven a verse, el que tiene el número menor pasa a espera.
-   **Aislado:** si el activo pierde a la vez al otro servidor y al testigo durante 90 s, deja de respaldar («Este servidor se aisló de la red») para no duplicar el trabajo. Vuelve solo al recuperar la red.

### Testigo

Por defecto es el gateway de cada servidor; se puede cambiar. Tiene que ser una dirección que los dos servidores alcancen siempre, pero que no esté en ninguno de los dos. El de espera solo toma el control si no llega al activo pero sí al testigo: así no conmuta cuando el aislado es él.

### Al pasar a activo (avanzado)

Puedes correr un comando en el servidor que pasa a activo, por ejemplo para mover una IP virtual. Por seguridad no se escribe desde la web: créalo en cada servidor, como root, en `/etc/opennccm/al-pasar-a-activo.sh`. Tiene que ser de root y no lo puede cambiar otro usuario. Si no existe, no se corre nada.

Sin IP virtual, los usuarios pueden entrar a cualquiera de los dos: el que está en espera los manda al activo.

## Pantalla, avisos e historial

-   Estado del par: **Protegido**, **Sin protección** (el otro no responde), **Conmutado** (con **Revisar**) o **Aislado**.
-   **Servidores:** cada uno con su rol, dirección, versión, último latido, réplica y espacio libre.
-   **Historial:** cada conmutación y cambio, con **Revisado**.
-   Los avisos van a la campana y por correo: el otro no responde, el par conmutó, servidor aislado. El Panel muestra el estado del par.
-   **Quitar el par:** este servidor queda solo y activo, y deja de copiar o recibir copias. No se borra ningún dato. En el otro servidor hay que quitarlo también.

## Con recolectores por sede

El activo manda a los [recolectores](/pro/recolectores/) las dos direcciones. Si un recolector no llega a uno, prueba con el otro.

## Licencia

Sin licencia o vencida, pasada la gracia, la réplica y la conmutación manual siguen funcionando, pero **la automática se apaga** y la pantalla lo dice.
