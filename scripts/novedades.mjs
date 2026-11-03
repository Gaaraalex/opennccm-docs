// Genera «Novedades de la versión» (es y en) desde el CHANGELOG del repositorio del sistema: las últimas versiones.
import fs from 'node:fs';

// Solo lo publicado: el CHANGELOG de la última versión liberada, no el de main.
const API = 'https://api.github.com/repos/Gaaraalex/opennccm/releases/latest';
const N = 6;

let md;
try {
	const cab = { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
	const tag = (await (await fetch(API, { headers: cab })).json()).tag_name;
	if (!tag) throw new Error('sin versión publicada');
	const r = await fetch(`https://raw.githubusercontent.com/Gaaraalex/opennccm/${tag}/CHANGELOG.md`);
	if (!r.ok) throw new Error(r.status);
	md = await r.text();
} catch (e) {
	const previo = 'src/content/docs/introduccion/novedades.md';
	if (fs.existsSync(previo)) { console.warn('novedades: sin conexión, se deja la página anterior'); process.exit(0); }
	throw e;
}

const versiones = md.split(/^## /m).slice(1).slice(0, N).map((b) => '## ' + b.trim());
const ultima = versiones[0].match(/^## ([\d.]+)/)[1];
// Las etiquetas de tipo del CHANGELOG ([nuevo], [mejora]…) no se muestran en el manual.
const cuerpo = versiones.join('\n\n').replace(/^## ([\d.]+)/gm, '## Versión $1').replace(/^- \[(nuevo|mejora|arreglo|seguridad)\] /gm, '- ');

// El «En resumen» se escribe a mano en cada página: se conserva el que ya tiene.
const resumen = (f) => {
	const m = fs.existsSync(f) && fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n').match(/^resumen:\n(?: {2}- .*\n)+/m);
	return m ? m[0] : '';
};

const pagina = (titulo, desc, intro, f) => `---
title: ${JSON.stringify(titulo)}
description: ${JSON.stringify(desc)}
${resumen(f)}---

${intro}

${cuerpo}
`;

fs.mkdirSync('src/content/docs/introduccion', { recursive: true });
fs.mkdirSync('src/content/docs/en/introduccion', { recursive: true });
fs.writeFileSync('src/content/docs/introduccion/novedades.md', pagina('Novedades de la versión', `Lo nuevo de OpenNCCM ${ultima} y las versiones anteriores.`,
	`Las ${N} últimas versiones. El historial completo está en [opennccm.com/novedades](https://opennccm.com/novedades.html) y cada versión se descarga desde [GitHub](https://github.com/Gaaraalex/opennccm/releases).`, 'src/content/docs/introduccion/novedades.md'));
fs.writeFileSync('src/content/docs/en/introduccion/novedades.md', pagina("What's new", `What's new in OpenNCCM ${ultima} and earlier versions.`,
	`The latest ${N} versions. The release notes are written in Spanish; the full history is at [opennccm.com/en/changelog](https://opennccm.com/en/changelog.html) and every version can be downloaded from [GitHub](https://github.com/Gaaraalex/opennccm/releases).\n\n<div lang="es">`, 'src/content/docs/en/introduccion/novedades.md').replace(/\n$/, '\n\n</div>\n'));
console.log('novedades: hasta la versión', ultima);
