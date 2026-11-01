// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const g = (label, en, items) => ({ label, translations: { en }, items });
const p = (slug, label, en) => ({ slug, label, translations: { en } });

export default defineConfig({
	site: 'https://docs.opennccm.com',
	integrations: [
		starlight({
			title: { es: 'OpenNCCM Docs', en: 'OpenNCCM Docs' },
			description: 'Documentación de OpenNCCM: instalación, uso y referencia.',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Español', lang: 'es' },
				en: { label: 'English', lang: 'en' },
			},
			favicon: '/favicon.svg',
			editLink: { baseUrl: 'https://github.com/Gaaraalex/opennccm-docs/edit/main/' },
			lastUpdated: true,
			customCss: ['./src/styles/opennccm.css'],
			expressiveCode: { defaultProps: { wrap: true } },
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap' } },
			],
			components: {
				Header: './src/components/Header.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				PageTitle: './src/components/PageTitle.astro',
				Footer: './src/components/Footer.astro',
				MobileMenuFooter: './src/components/MobileMenuFooter.astro',
			},
			sidebar: [
				g('Introducción', 'Introduction', [
					{ link: '/', label: '¿Qué es OpenNCCM?', translations: { en: 'What is OpenNCCM?' } },
					p('introduccion/novedades', 'Novedades de la versión', "What's new"),
				]),
				g('Instalación', 'Installation', [
					p('instalacion/requisitos', 'Requisitos', 'Requirements'),
					p('instalacion/instalar', 'Instalar en Ubuntu', 'Install on Ubuntu'),
					p('instalacion/actualizar', 'Actualizar y volver atrás', 'Upgrade and roll back'),
					p('instalacion/migrar', 'Copias y migrar a otro servidor', 'Backups and moving servers'),
					p('instalacion/postgresql', 'PostgreSQL', 'PostgreSQL'),
					p('instalacion/https-cortafuegos', 'HTTPS y cortafuegos', 'HTTPS and firewall'),
					p('instalacion/problemas', 'Solución de problemas', 'Troubleshooting'),
					p('instalacion/desinstalar', 'Desinstalar', 'Uninstall'),
				]),
				g('Primeros pasos', 'Getting started', [
					p('primeros-pasos/interfaz', 'La interfaz y el panel', 'The interface and dashboard'),
					p('primeros-pasos/credenciales', 'Credenciales y grupos', 'Credentials and groups'),
					p('primeros-pasos/primer-equipo', 'Agregar el primer equipo', 'Add your first device'),
					p('primeros-pasos/syslog', 'Enviar syslog desde los equipos', 'Send syslog from devices'),
					p('primeros-pasos/tareas-recomendadas', 'Tareas recomendadas', 'Recommended tasks'),
				]),
				g('Equipos y respaldos', 'Devices and backups', [
					p('equipos/dispositivos', 'Dispositivos y ficha', 'Devices and device page'),
					p('equipos/versiones', 'Versiones y comparación', 'Versions and diff'),
					p('equipos/linea-base', 'Línea base', 'Baseline'),
					p('equipos/buscar', 'Buscar en las configuraciones', 'Search configurations'),
				]),
				g('Cambios', 'Changes', [
					p('cambios/configlets', 'Configlets', 'Configlets'),
					p('cambios/solicitudes', 'Solicitudes y aprobación', 'Requests and approval'),
					p('cambios/reversion', 'Reversión', 'Rollback'),
					p('cambios/tareas', 'Tareas programadas', 'Scheduled tasks'),
				]),
				g('Proteger', 'Protect', [
					p('proteger/cumplimiento', 'Cumplimiento', 'Compliance'),
					p('proteger/vulnerabilidades', 'Vulnerabilidades', 'Vulnerabilities'),
					p('proteger/firmware', 'Firmware y fin de vida', 'Firmware and end of life'),
				]),
				g('Observar', 'Monitor', [
					p('observar/alarmas', 'Alarmas y notificaciones', 'Alarms and notifications'),
					p('observar/analisis', 'Análisis, IP y mapa de red', 'Analytics, IP and network map'),
					p('observar/informes', 'Informes', 'Reports'),
				]),
				g('Consola y asistente', 'Console and assistant', [
					p('consola/consola', 'Consola', 'Console'),
					p('consola/asistente', 'Asistente IA', 'AI assistant'),
				]),
				g('Administración', 'Administration', [
					p('administracion/usuarios', 'Usuarios y roles', 'Users and roles'),
					p('administracion/ajustes', 'Ajustes', 'Settings'),
					p('administracion/sistema', 'Sistema y copias de recuperación', 'System and recovery backups'),
					p('administracion/auditoria', 'Auditoría', 'Audit log'),
				]),
				g('Referencia', 'Reference', [
					p('referencia/api', 'API', 'API'),
					p('referencia/plataformas', 'Plataformas soportadas', 'Supported platforms'),
					p('referencia/rutas-comandos', 'Rutas, variables y comandos', 'Paths, variables and commands'),
					p('referencia/glosario', 'Glosario', 'Glossary'),
				]),
				g('Ayuda', 'Help', [
					p('ayuda/curso', 'Curso en video', 'Video course'),
					p('ayuda/soporte', 'Comunidad y soporte', 'Community and support'),
					p('ayuda/preguntas', 'Preguntas frecuentes', 'FAQ'),
				]),
			],
		}),
	],
});
