// Markdown de cada página, para «Copiar página» y «Ver como Markdown».
import { getCollection } from 'astro:content';
import { LECCIONES } from './sitio';

const SITIO = 'https://docs.opennccm.com';

export async function paginasMarkdown(en: boolean) {
	const docs = await getCollection('docs', (e) => (e.id === 'en' || e.id.startsWith('en/')) === en);
	return docs.map((e) => {
		const id = e.id.replace(/^en\/?/, '').replace(/^index$/, '');
		const url = `${SITIO}${en ? '/en' : ''}/${id ? id + '/' : ''}`;
		const { title, description, curso } = e.data as typeof e.data & { curso?: string[] };
		const partes = [`# ${title}`];
		if (description) partes.push(description);
		partes.push(`${en ? 'Source' : 'Fuente'}: ${url}`);
		if (curso) partes.push(`Video: ${curso.map((n) => `${n} ${LECCIONES[n][0]} (https://youtu.be/${LECCIONES[n][1]})`).join(' · ')}`);
		// Las imágenes del manual no sirven fuera del sitio: se dejan solo con su texto.
		const cuerpo = (e.body || '').replace(/!\[([^\]]*)\]\([^)]+\)/g, (m, alt) => (alt ? `*[${en ? 'Image' : 'Imagen'}: ${alt}]*` : ''));
		// Enlaces internos completos, para que sirvan pegados en otro sitio.
		partes.push(cuerpo.trim().replace(/\]\(\//g,`](${SITIO}/`));
		return { params: { slug: id || 'inicio' }, props: { texto: partes.join('\n\n') + '\n' } };
	});
}

export const respuesta = (texto: string) => new Response(texto, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
