// Datos del sitio: versión documentada, textos de la interfaz en los dos idiomas y el curso en video.

export const VERSION = '2.41';
export const VERSIONES = [{ v: '2.41', actual: true }];
export const FECHA = { es: '13 nov 2026', en: 'Nov 13, 2026' };

export const WEB = 'https://opennccm.com';
export const REPO = 'https://github.com/Gaaraalex/opennccm';
// Comunidad: foro, cuentas y soporte de pago. En inglés se pide la interfaz en inglés con ?lang=en.
export const COMUNIDAD = 'https://comunidad.opennccm.com';
// En local (vista previa con la comunidad en http://localhost:8787) se cambia con PUBLIC_COMUNIDAD.
export const COMUNIDAD_URL: string = import.meta.env.PUBLIC_COMUNIDAD || COMUNIDAD;
export const comunidad = (l: 'es' | 'en', ruta: string) => COMUNIDAD_URL + ruta + (l === 'en' ? '?lang=en' : '');
// Lista «OpenNCCM desde cero · Curso completo» en YouTube.
export const LISTA_YT = 'https://www.youtube.com/playlist?list=PLLnVlyYEYVqI';

type Lang = 'es' | 'en';
export const lang = (l: string | undefined): Lang => (l === 'en' ? 'en' : 'es');
export const base = (l: Lang) => (l === 'en' ? '/en/' : '/');

export const T = {
	es: {
		docs: 'Docs', web: 'opennccm.com', documentacion: 'Documentación', soporte: 'Comunidad y soporte', novedades: 'Novedades',
		buscar: 'Buscar en la documentación', actual: 'actual', tema: 'Cambiar tema', otroIdioma: 'EN', otroIdiomaNombre: 'English',
		copiar: 'Copiar página', copiarSub: 'En Markdown, para pegarla en un chat de IA', verMd: 'Ver como Markdown', verMdSub: 'El texto plano de la página',
		asistente: 'Preguntar al asistente de OpenNCCM', asistenteSub: 'Copia la página para pegarla en el asistente de su servidor',
		copiada: 'Página copiada en Markdown.', copiadaAsistente: 'Página copiada. Péguela en el asistente IA de su servidor (✦ en la barra superior).',
		masOpciones: 'Más opciones', migas: 'Ruta',
		enResumen: 'En resumen',
		soporteProf: 'Soporte profesional', entrar: 'Entrar', crear: 'Crear cuenta', apoya: 'Apoya OpenNCCM', kofi: 'Invitar un café (Ko-fi)',
		apoyaTexto: 'OpenNCCM es libre y gratis. Tu aporte paga horas de desarrollo y pruebas con equipos reales.',
		curso: 'Curso en video · OpenNCCM desde cero', leccion: 'Lección', de30: 'de 30', reproducir: 'Reproducir la lección', verCurso: 'Ver el curso completo',
		actualizado: (v: string, f: string) => `Actualizado con la versión ${v} · ${f}`,
	},
	en: {
		docs: 'Docs', web: 'opennccm.com', documentacion: 'Documentation', soporte: 'Community and support', novedades: "What's new",
		buscar: 'Search the docs', actual: 'current', tema: 'Switch theme', otroIdioma: 'ES', otroIdiomaNombre: 'Español',
		copiar: 'Copy page', copiarSub: 'As Markdown, to paste into an AI chat', verMd: 'View as Markdown', verMdSub: 'The plain text of the page',
		asistente: 'Ask the OpenNCCM assistant', asistenteSub: 'Copies the page to paste into your server’s assistant',
		copiada: 'Page copied as Markdown.', copiadaAsistente: 'Page copied. Paste it into your server’s AI assistant (✦ in the top bar).',
		masOpciones: 'More options', migas: 'Breadcrumbs',
		enResumen: 'In short',
		soporteProf: 'Professional support', entrar: 'Sign in', crear: 'Create account', apoya: 'Support OpenNCCM', kofi: 'Buy a coffee (Ko-fi)',
		apoyaTexto: 'OpenNCCM is free software. Your support pays for development hours and testing with real devices.',
		curso: 'Video course · OpenNCCM from scratch · in Spanish', leccion: 'Lesson', de30: 'of 30', reproducir: 'Play lesson', verCurso: 'See the full course',
		actualizado: (v: string, f: string) => `Updated for version ${v} · ${f}`,
	},
};

// Curso «OpenNCCM desde cero» (en español): número → [título, id de YouTube].
export const LECCIONES: Record<string, [string, string]> = {
	'0.1': ['Qué es OpenNCCM', 'ZekScxhMQlg'],
	'0.2': ['Qué vas a necesitar', '3i2E9V9z3cM'],
	'1.1': ['Prepara la máquina virtual', 'zMukBqCvzic'],
	'1.2': ['Instala Ubuntu Server 24.04', '_ghDxCJ6t08'],
	'1.3': ['Instala OpenNCCM con install.sh', 'r8yDwPgc2kg'],
	'1.4': ['Primer acceso desde el navegador', 'nws4HH3w1iI'],
	'2.1': ['La interfaz: menú, búsqueda y panel', '2h2sDgUj6BE'],
	'2.2': ['Tu cuenta', 'm9MBctD4zbE'],
	'3.1': ['Prepara tus equipos', '6AvhGeMX-fs'],
	'3.2': ['Agrega tu primer equipo', 'gM6OUjTSczw'],
	'3.3': ['Importa muchos equipos con CSV', 'g4-2PP9_QDs'],
	'3.4': ['Organiza tus equipos', 'HaeRZYF0Kio'],
	'4.1': ['Respaldos manuales y automáticos', 'gdB5zO9friA'],
	'4.2': ['Versiones y comparación', 'gjrH7w1aOb4'],
	'4.3': ['La línea base', 'qXtC1wGU_xw'],
	'4.4': ['Buscar en todas las configuraciones', 'ii4hgUcxzMU'],
	'4.5': ['Revertir un cambio', 'G4p5NQsAGBY'],
	'5.1': ['Configlets', 'pf1zgyZkEGQ'],
	'5.2': ['Scripts y consola', 'JXkvYCxaJpE'],
	'5.3': ['Tareas programadas', 'W0XNpNLrKnk'],
	'6.1': ['Políticas y reglas', 'eqwFda1RZzY'],
	'6.2': ['Revisa y corrige', '23np9OYiBvI'],
	'7.1': ['Vulnerabilidades', 'KLzlTEMaoOk'],
	'7.2': ['Firmware y ciclo de vida', 'zyOQZUr3uOw'],
	'8.1': ['Alarmas y notificaciones', 'Odwbtch4Jio'],
	'8.2': ['Análisis', '4ntxgGtJyL8'],
	'8.3': ['Informes', 'GfZ80EwFsBs'],
	'9.1': ['Usuarios y permisos', 'PyIctPLzXjI'],
	'9.2': ['Copias y actualizaciones', 'wFqne4VITvc'],
	'9.3': ['Ajustes de seguridad (y cierre)', 'sd6Zo4TmKr8'],
};

export const MODULOS: { m: string; es: string; en: string; n: string[] }[] = [
	{ m: '0', es: 'Bienvenida', en: 'Welcome', n: ['0.1', '0.2'] },
	{ m: '1', es: 'Instalación', en: 'Installation', n: ['1.1', '1.2', '1.3', '1.4'] },
	{ m: '2', es: 'Primer recorrido', en: 'First tour', n: ['2.1', '2.2'] },
	{ m: '3', es: 'Tus equipos', en: 'Your devices', n: ['3.1', '3.2', '3.3', '3.4'] },
	{ m: '4', es: 'Respaldos y cambios', en: 'Backups and changes', n: ['4.1', '4.2', '4.3', '4.4', '4.5'] },
	{ m: '5', es: 'Automatizar', en: 'Automate', n: ['5.1', '5.2', '5.3'] },
	{ m: '6', es: 'Cumplimiento', en: 'Compliance', n: ['6.1', '6.2'] },
	{ m: '7', es: 'Seguridad del parque', en: 'Fleet security', n: ['7.1', '7.2'] },
	{ m: '8', es: 'Observar', en: 'Monitor', n: ['8.1', '8.2', '8.3'] },
	{ m: '9', es: 'Administración', en: 'Administration', n: ['9.1', '9.2', '9.3'] },
];
export const moduloDe = (n: string) => MODULOS.find((m) => m.n.includes(n))!;
