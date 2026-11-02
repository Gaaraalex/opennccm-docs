---
title: "Base de conocimiento"
description: "Cada caso que se resuelve en la red queda escrito: síntoma, causa, pasos con sus comandos, comprobación y prevención."
---

Desde la versión 2.18, la **base de conocimiento** guarda cada caso que se resuelve en la red: el síntoma, la causa, la solución paso a paso con sus comandos, cómo comprobar que quedó y qué hacer para que no vuelva a pasar. Está en el menú, en la sección **Equipo › Base de conocimiento**; la insignia ámbar cuenta lo que falta documentar.

## Quién la ve

| Rol | Qué puede hacer |
| --- | --- |
| **Administrador** | Todo: lee, documenta, aprueba o pide cambios, archiva y restaura, decide «No hace falta» y configura **Acceso y reglas**. No se le puede quitar el acceso. |
| **Operador** | Lee, documenta y comenta. Envía sus casos a revisión (o los publica, si el administrador eligió «Admin y operadores» en **Quién publica sin revisión**). Edita sus casos; en los ajenos, **Proponer cambio**. |
| **Solo lectura** | Apagado por omisión. Si entra por un enlace ve un aviso con **Pedir acceso a un admin**, que deja una alarma informativa para el administrador. Si el administrador lo activa, lee los casos publicados. |

Los permisos se comprueban en el servidor, no solo en la pantalla, y cada lectura y cada edición queda en [Auditoría](/administracion/auditoria/).

## Pestañas

- **Casos:** indicadores (publicados, falta documentar, porcentaje de alarmas críticas con caso en los últimos 30 días con meta del 95 % y resueltas con un caso este mes), filtros por categoría y estado, y la tabla con el ID `KB-0000`, los equipos, el autor, el estado y los votos «Me sirvió». El buscador (Ctrl K) busca en el título, el síntoma, la causa, los pasos y los nombres o direcciones de los equipos.
- **Falta documentar:** lo que se cerró sin caso, asignado a quien lo resolvió, con **Documentar**, **Ya existe** (lo enlaza a un caso publicado) y **No hace falta** (solo el administrador; queda quién lo decidió). A los 5 días la fecha se pone en rojo y el administrador recibe una alarma.
- **En revisión:** los casos nuevos y los cambios propuestos, con lo que trae cada uno (pasos, contraseñas ocultadas, a qué está enlazado). El administrador usa **Pedir cambios** (vuelve a borrador con un comentario) o **Aprobar y publicar**.
- **Acceso y reglas** (solo el administrador): quién la ve, quién publica sin revisión y cuándo se pide un caso.

## Reglas que generan pendientes

| Regla | Por omisión | Qué hace |
| --- | --- | --- |
| Al cerrar una alarma crítica | Encendida | La alarma no se cierra sin un caso nuevo o un enlace a uno existente (ver [Alarmas](/observar/alarmas/)). |
| Al revertir un cambio | Encendida | Al terminar una [reversión](/cambios/reversion/) queda el pendiente con sus comandos y equipos. |
| Sesiones de consola de más de 15 min | Apagada | Pendiente con la grabación, para traer sus comandos. |
| Resumen de pendientes los lunes | Encendida | Correo a cada persona con lo suyo (si su cuenta tiene correo). |
| Ocultar contraseñas, claves y comunidades SNMP | Siempre | Se detectan al guardar y se reemplazan por `••••••`. |

## Ficha del caso

La ficha muestra el estado, la categoría, el fabricante, la versión y la fecha; el síntoma, la causa, los pasos, la comprobación y la prevención; los comentarios del equipo; y a un lado **Me sirvió**, **Editar** o **Proponer cambio**, **Archivar** (se puede restaurar), los equipos afectados, de dónde salió (alarma, cambio o grabación) y las versiones (v1, v2…).

Cada comando tiene **Copiar** (la clave oculta no se copia) y **Abrir en consola**, que deja el comando escrito en la [consola](/consola/consola/) del equipo sin ejecutarlo. **Convertir en configlet** crea un [configlet](/cambios/configlets/) con los comandos para revisarlo antes de usarlo.

## Documentar un caso

El editor, abierto desde un pendiente, ya trae enlazados la alarma o el cambio, el equipo y la grabación de consola. Para enviar hacen falta el título y el equipo, el síntoma, la causa, al menos un paso y la comprobación; la lista y la barra de avance muestran lo que falta. Se guarda solo cada pocos segundos (y con **Guardar borrador**).

- **Traer comandos de la grabación** agrega los comandos de la sesión de consola como pasos.
- Si el [asistente IA](/consola/asistente/) está activo, **Proponer lo que falta** sugiere la causa y la comprobación, marcadas para revisarlas.
- **Casos parecidos** avisa si ya hay uno igual.

Los cambios en un caso publicado van como propuesta: el caso no cambia hasta que un administrador la aprueba.
