---
title: "Credenciales y grupos"
description: "Los usuarios con los que OpenNCCM entra a cada equipo, y cómo agruparlos."
curso: ["3.1"]
---

## Credenciales de los equipos

Menú **Credenciales**. Cree un perfil por cada combinación de usuario/contraseña que usen sus equipos (por ejemplo «red-admin» y «firewalls»). Si sus equipos Cisco requieren `enable`, complete también «Enable / secret». Las contraseñas se guardan cifradas y nunca se vuelven a mostrar.

En la misma página cree los **grupos** de dispositivos (sede, función o cliente). Los grupos sirven para tareas, políticas, filtros y para limitar qué equipos ve cada usuario.

![Credenciales y grupos.](../../../assets/manual/25-credenciales.png)

**Credenciales:** perfiles de usuario, contraseña y contraseña privilegiada (*enable*) para conectarse a los equipos. Si el equipo entra en modo usuario («>») y la credencial no tiene *enable*, OpenNCCM prueba la contraseña de ingreso; si no sirve, el error indica en qué credencial escribirla. Se guardan cifradas con AES-256-GCM y, salvo que Ajustes lo permita (ver abajo), nunca se muestran. Están en **Administración → Credenciales**: la tabla indica cuántos equipos usa cada una y su estado (funciona, falla en N equipos o sin usar). **Crear credencial** y **Actualizar** abren un panel lateral; al actualizar, deje en blanco lo que no quiera cambiar.

**Ver una credencial.** En **Administración → Ajustes → Seguridad y acceso → Quién puede ver las credenciales de los equipos** un administrador elige **Nadie** (lo de fábrica), **Solo administradores** o **Administradores y operadores**. Quien tenga permiso ve **Ver** junto a la credencial en la ficha del equipo (y los administradores también en esta lista). Para verla:

-   Su cuenta debe tener activa la verificación en dos pasos. Si no la tiene, se le avisa de que primero debe activarla en **Mi cuenta**.
-   Cada vez que pulsa **Ver** confirma con su usuario y su contraseña de OpenNCCM (las cuentas de Active Directory, con la del directorio; las de Microsoft, con el código de su app de verificación).
-   Se muestran el usuario, la contraseña y el *enable*, con botón **Copiar**, y se ocultan a los 60 segundos.
-   Cada vista y cada intento fallido quedan en [Auditoría](/administracion/auditoria/). Los intentos fallidos cuentan para el bloqueo de la cuenta igual que en el inicio de sesión, y al bloquearse se cierran sus sesiones. Un operador solo ve las de los equipos de sus grupos, y los lectores nunca. Con un token de API no se pueden ver.

**Grupos** (pestaña **Administración → Grupos**): agrupan equipos (sede, rol, cliente) para filtrar, programar tareas, aplicar políticas y restringir usuarios. La tabla muestra cuántos equipos tiene cada uno, con **Ver equipos**; se crean con **Crear grupo**, siempre arriba, que abre un panel a la derecha como en Credenciales; cada fila tiene **Editar** y **Borrar**. Se llega aquí también con el botón **Grupos** de la página Dispositivos, y un grupo se puede crear al editar un equipo. Para asignar un equipo a un grupo: ábralo y pulse **asignar grupo** (o **Editar**). Al eliminar un grupo, sus equipos quedan sin grupo.

![Credenciales con su estado.](../../../assets/manual/25-credenciales.png)

![Grupos de dispositivos.](../../../assets/manual/25b-grupos.png)
