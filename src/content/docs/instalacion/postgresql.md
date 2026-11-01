---
title: "PostgreSQL"
description: "Base de datos para instalaciones grandes."
---

SQLite es suficiente para la mayoría de las redes. Para miles de equipos o muchos administradores a la vez, elija **PostgreSQL** en el asistente (o use `--db postgresql`): el instalador instala PostgreSQL, crea la base `opennccm` y su usuario con una contraseña aleatoria y lo deja configurado. Decídalo al instalar: no hay migración automática de SQLite a PostgreSQL.

Con PostgreSQL, las copias previas a cada actualización usan `pg_dump`, y la vuelta atrás, `pg_restore`.
