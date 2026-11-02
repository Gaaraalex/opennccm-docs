// Búsqueda: sugiere páginas según lo que se buscó («licencia» → Planes de soporte), o las de ayuda si no hubo resultados,
// y siempre ofrece preguntar en el foro de la comunidad. Mira el buscador de Starlight (Pagefind) y agrega un recuadro debajo de los resultados.
(function () {
	var caja = document.getElementById('starlight__search');
	if (!caja) return;
	var en = document.documentElement.lang.slice(0, 2) === 'en';
	var b = en ? '/en/' : '/';
	var cuenta = document.querySelector('[data-occ-cuenta]');
	var foro = (cuenta && cuenta.getAttribute('data-comunidad')) || 'https://comunidad.opennccm.com';
	var P = {
		planes: ['ayuda/planes/', 'Planes de soporte', 'Support plans'],
		instalar: ['instalacion/instalar/', 'Instalar en Ubuntu', 'Install on Ubuntu'],
		requisitos: ['instalacion/requisitos/', 'Requisitos', 'Requirements'],
		actualizar: ['instalacion/actualizar/', 'Actualizar y volver atrás', 'Upgrade and roll back'],
		migrar: ['instalacion/desde-otra-herramienta/', 'Migrar desde otra herramienta', 'Migrate from another tool'],
		mover: ['instalacion/mover-servidor/', 'Mover a otro servidor', 'Move to another server'],
		plataformas: ['referencia/plataformas/', 'Plataformas soportadas', 'Supported platforms'],
		syslog: ['primeros-pasos/syslog/', 'Enviar syslog desde los equipos', 'Send syslog from devices'],
		asistente: ['consola/asistente/', 'Asistente IA', 'AI assistant'],
		reversion: ['cambios/reversion/', 'Reversión', 'Rollback'],
		preguntas: ['ayuda/preguntas/', 'Preguntas frecuentes', 'FAQ'],
		problemas: ['instalacion/problemas/', 'Solución de problemas', 'Troubleshooting'],
	};
	var REGLAS = [
		[/licen|precio|price|pago|pay|plan|contrat|soporte|support|factur|invoice|empresa|enterprise|sla/, ['planes', 'preguntas']],
		[/instal|ubuntu|setup|debian|docker/, ['instalar', 'requisitos']],
		[/requis|ram|cpu|disco|disk|hardware/, ['requisitos']],
		[/actualiz|update|upgrade|versi/, ['actualizar']],
		[/oxidized|rancid|solarwinds|migra|importar|import|csv/, ['migrar', 'mover']],
		[/mover|move|servidor nuevo|new server|restor|restaur|copia|backup/, ['mover']],
		[/fabricante|vendor|cisco|mikrotik|huawei|juniper|fortinet|aruba|plataforma|platform|modelo|model/, ['plataformas']],
		[/syslog|tiempo real|real time/, ['syslog']],
		[/\bia\b|\bai\b|asistente|assistant|gpt|claude|gemini|openai/, ['asistente']],
		[/revert|rollback|reversi|deshacer|undo/, ['reversion']],
		[/clave|key|secret|cifra|encrypt/, ['preguntas', 'mover']],
	];
	function sugerencias(q) {
		var s = (q || '').toLowerCase();
		var out = [];
		REGLAS.forEach(function (r) { if (r[0].test(s)) r[1].forEach(function (k) { if (out.indexOf(k) < 0) out.push(k); }); });
		return out.slice(0, 3);
	}
	function pintar() {
		var input = caja.querySelector('input');
		var q = input ? input.value.trim() : '';
		var viejo = caja.querySelector('.occ-sin-resultados');
		var hayResultados = caja.querySelectorAll('.pagefind-ui__result').length > 0;
		var mensaje = caja.querySelector('.pagefind-ui__message');
		var listo = q && mensaje && mensaje.textContent.trim();
		if (!listo) { if (viejo) viejo.remove(); return; }
		var sug = sugerencias(q);
		if (!sug.length && !hayResultados) sug = ['preguntas', 'problemas'];
		if (viejo && viejo.dataset.q === q) return;
		if (viejo) viejo.remove();
		var d = document.createElement('div');
		d.className = 'occ-sin-resultados';
		d.dataset.q = q;
		var t = document.createElement('p');
		t.className = 'occ-sr-tit';
		t.textContent = en ? 'Maybe you were looking for' : 'Quizás buscabas';
		var ul = document.createElement('ul');
		if (sug.length) { d.appendChild(t); d.appendChild(ul); }
		sug.forEach(function (k) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.href = b + P[k][0];
			a.textContent = en ? P[k][2] : P[k][1];
			li.appendChild(a);
			ul.appendChild(li);
		});
		var f = document.createElement('p');
		f.className = 'occ-sr-foro';
		f.appendChild(document.createTextNode(en ? 'Didn’t find it? ' : '¿No lo encontraste? '));
		var af = document.createElement('a');
		af.href = foro.replace(/\/$/, '') + '/foro/nuevo' + (en ? '?lang=en' : '');
		af.textContent = en ? 'Ask in the forum' : 'Preguntar en el foro';
		f.appendChild(af);
		d.appendChild(f);
		caja.appendChild(d);
	}
	var pendiente;
	new MutationObserver(function () { clearTimeout(pendiente); pendiente = setTimeout(pintar, 150); }).observe(caja, { childList: true, subtree: true, characterData: true });
})();
