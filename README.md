# Documentación de OpenNCCM

Código de [docs.opennccm.com](https://docs.opennccm.com): instalación, uso y referencia de [OpenNCCM](https://github.com/Gaaraalex/opennccm), en español e inglés.

Hecho con [Starlight](https://starlight.astro.build) y publicado en GitHub Pages con `.github/workflows/publicar.yml`.

```bash
npm ci
npm run dev       # vista previa en http://localhost:4321
npm run build     # trae las novedades de la última versión y genera dist/
```

- Páginas: `src/content/docs/` (español) y `src/content/docs/en/` (inglés).
- Versión documentada, textos de la interfaz y lecciones del curso: `src/sitio.ts`.
- «Novedades de la versión» se genera sola desde el CHANGELOG de la última versión publicada (`scripts/novedades.mjs`).

¿Ves un error? Usa «Editar esta página en GitHub» al pie de cada página o abre un aviso en [OpenNCCM](https://github.com/Gaaraalex/opennccm/issues).
