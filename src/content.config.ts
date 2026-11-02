import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Lecciones del curso en video de este tema: la primera es la principal.
				curso: z.array(z.string()).optional(),
				// «En resumen»: tres puntos que se muestran debajo del video.
				resumen: z.array(z.string()).max(3).optional(),
			}),
		}),
	}),
};
