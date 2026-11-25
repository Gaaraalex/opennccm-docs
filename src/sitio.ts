// Datos del sitio: versión documentada, textos de la interfaz en los dos idiomas y el curso en video.

export const VERSION = '2.45';
export const VERSIONES = [{ v: '2.45', actual: true }];
export const FECHA = { es: '24 nov 2026', en: 'Nov 24, 2026' };

export const WEB = 'https://opennccm.com';
export const REPO = 'https://github.com/Gaaraalex/opennccm';
// Comunidad: foro, cuentas y soporte de pago. En inglés se pide la interfaz en inglés con ?lang=en.
export const COMUNIDAD = 'https://comunidad.opennccm.com';
// En local (vista previa con la comunidad en http://localhost:8787) se cambia con PUBLIC_COMUNIDAD.
export const COMUNIDAD_URL: string = import.meta.env.PUBLIC_COMUNIDAD || COMUNIDAD;
export const comunidad = (l: 'es' | 'en', ruta: string) => COMUNIDAD_URL + ruta + (l === 'en' ? '?lang=en' : '');
// Curso completo «OpenNCCM desde cero» en Udemy (enlace de referido del instructor).
export const UDEMY = 'https://www.udemy.com/course/opennccm-desde-cero-gestiona-la-configuracion-de-tu-red/?referralCode=567991769F6CEE72F25D';
// Lista «OpenNCCM desde cero · Curso completo» en YouTube (las lecciones gratis).
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
		curso: 'Curso en video · OpenNCCM desde cero', leccion: 'Lección', reproducir: 'Reproducir la lección', verCurso: 'Ver el curso completo en Udemy',
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
		curso: 'Video course · OpenNCCM from scratch · in Spanish', leccion: 'Lesson', reproducir: 'Play lesson', verCurso: 'See the full course on Udemy',
		actualizado: (v: string, f: string) => `Updated for version ${v} · ${f}`,
	},
};

// Curso «OpenNCCM desde cero» (en español): número → [título, id de YouTube].
export const LECCIONES: Record<string, [string, string]> = {
	'0.1': ['Qué es OpenNCCM', 'PZf_yC8gOO4'],
	'0.2': ['Qué vas a necesitar', '4AORG7quHKk'],
	'1.1': ['Prepara la máquina virtual', 'QxIIrrU4oL8'],
	'1.2': ['Instala Ubuntu Server 24.04', 'LPyAwuD8QXs'],
	'1.3': ['Instala OpenNCCM', 'nGSL59dPGS8'],
	'1.4': ['Primer acceso', 'DNvs2Q30iuU'],
	'2.1': ['La interfaz de OpenNCCM', '66gbS43WTTc'],
	'2.2': ['Tu cuenta', 'pbTprqsiUvU'],
	'3.1': ['Credenciales, grupos y nodos', 'iLxOwsS5e80'],
	'3.2': ['Tu primer equipo', 'MUb5Q6kpjJo'],
	'3.3': ['Importa con CSV y desde Zabbix', 'g4-2PP9_QDs'],
	'3.4': ['Organiza la lista', 'HaeRZYF0Kio'],
	'4.1': ['Respaldar todos', 'gdB5zO9friA'],
	'4.2': ['Versiones', 'gjrH7w1aOb4'],
	'4.4': ['Línea base y referencia', 'qXtC1wGU_xw'],
	'4.5': ['Buscar', 'ii4hgUcxzMU'],
	'5.3': ['Revertir', 'G4p5NQsAGBY'],
	'6.1': ['La consola del equipo', 'JXkvYCxaJpE'],
	'7.1': ['Configlets y scripts', 'pf1zgyZkEGQ'],
	'7.2': ['Tareas programadas', 'W0XNpNLrKnk'],
	'8.1': ['Políticas de cumplimiento', 'eqwFda1RZzY'],
	'8.2': ['Corrige lo que no cumple', '23np9OYiBvI'],
	'9.1': ['Vulnerabilidades y clave NVD', 'KLzlTEMaoOk'],
	'9.2': ['Firmware y ciclo de vida', 'zyOQZUr3uOw'],
	'10.1': ['Alarmas, notificaciones y vecinos nuevos', 'Odwbtch4Jio'],
	'10.3': ['Análisis y Zabbix', '4ntxgGtJyL8'],
	'10.5': ['Informes', 'GfZ80EwFsBs'],
	'11.1': ['Usuarios y permisos', 'PyIctPLzXjI'],
	'11.2': ['Seguridad y acceso', 'sd6Zo4TmKr8'],
	'11.3': ['Copias de recuperación y opennccm restore', 'wFqne4VITvc'],
};

export const MODULOS: { m: string; es: string; en: string; n: string[] }[] = [
	{ m: '0', es: 'Bienvenida', en: 'Welcome', n: ['0.1', '0.2'] },
	{ m: '1', es: 'Instalación', en: 'Installation', n: ['1.1', '1.2', '1.3', '1.4'] },
	{ m: '2', es: 'Primer recorrido', en: 'First tour', n: ['2.1', '2.2'] },
	{ m: '3', es: 'Tus equipos', en: 'Your devices', n: ['3.1', '3.2', '3.3', '3.4'] },
	{ m: '4', es: 'Respaldos y versiones', en: 'Backups and versions', n: ['4.1', '4.2', '4.4', '4.5'] },
	{ m: '5', es: 'Cambios seguros', en: 'Safe changes', n: ['5.3'] },
	{ m: '6', es: 'Consola', en: 'Console', n: ['6.1'] },
	{ m: '7', es: 'Automatizar', en: 'Automate', n: ['7.1', '7.2'] },
	{ m: '8', es: 'Cumplimiento', en: 'Compliance', n: ['8.1', '8.2'] },
	{ m: '9', es: 'Seguridad del parque', en: 'Fleet security', n: ['9.1', '9.2'] },
	{ m: '10', es: 'Observar', en: 'Monitor', n: ['10.1', '10.3', '10.5'] },
	{ m: '11', es: 'Administración', en: 'Administration', n: ['11.1', '11.2', '11.3'] },
];
export const moduloDe = (n: string) => MODULOS.find((m) => m.n.includes(n))!;
