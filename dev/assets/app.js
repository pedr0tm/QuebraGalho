/* Quebra Galho · protótipo mobile
   Motor mínimo de estado para as telas (sem frameworks):
   - <body data-state='{"chave": valor}'> define o estado inicial; ?chave=valor na URL sobrescreve.
   - data-set="k=v&k2=v2"   ao tocar, grava valores.
   - data-toggle="k"        alterna verdadeiro/falso; data-toggle="k:item" põe/tira item de uma lista.
   - data-add="k:1"         soma (use data-min / data-max).
   - data-show="expr"       mostra só quando a expressão vale.  expr: k, !k, k=v, k!=v, k~item ; "&" = e, "|" = ou
   - data-on="expr"         marca aria-pressed / aria-checked / aria-selected.
   - data-enable="expr"     tira aria-disabled quando vale.
   - data-text="k"          escreve o valor.
   - data-back              volta no histórico quando veio de outra tela do app.
   - <i data-i="nome">      vira ícone do sprite abaixo.
   Cada tela pode definir App.computed(s) (valores derivados) e App.after(ctx) (ajustes extras). */
(function () {
  var P = {
    voltar: '<path d="M15 5l-7 7 7 7"/>',
    busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    sino: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
    casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    pedidos: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/>',
    pin: '<path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    raio: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    calendario: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    'escudo-alerta': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 8v5M12 16.5v.5"/>',
    estrela: '<path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/>',
    gota: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
    tomada: '<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>',
    rolo: '<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3"/><rect x="10.5" y="14" width="3" height="7" rx="1"/>',
    tijolo: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 10h18M3 14h18M9 5v5M15 10v4M9 14v5"/>',
    folha: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
    martelo: '<path d="M13 5l6 6-2.5 2.5-6-6z"/><path d="M12 10l-8 8 2 2 8-8"/>',
    reforma: '<path d="M4 20h16"/><path d="M6 20V9l6-5 6 5v11"/><path d="M10 20v-6h4v6"/>',
    chave: '<path d="M14.5 4.5a4 4 0 0 0-4.8 5.3L4 15.5 6.5 18l5.7-5.7a4 4 0 0 0 4.8-4.8l-2.4 2.4-2.6-.4-.4-2.6z"/>',
    mais: '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    camera: '<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h4"/>',
    'doc-ok': '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 14l2 2 4-4"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    chev: '<path d="M9 5l7 7-7 7"/>',
    ordenar: '<path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/>',
    olho: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    coracao: '<path d="M12 20s-7.5-4.6-9-9.3C2 7.4 4.2 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.7 1.1-1.6 2.7-2.7 4.7-2.7 3.1 0 5.3 2.9 4.3 6.2-1.5 4.7-9 9.3-9 9.3z"/>',
    bandeira: '<path d="M5 21V4h11l-1.5 4L16 12H5"/>',
    pix: '<path d="M12 3l9 9-9 9-9-9z"/><path d="M8 12h8"/>',
    cartao: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
    dinheiro: '<rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/><path d="M6 9.5v.5M18 15v.5"/>',
    grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    lapis: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    enviar: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
    sair: '<path d="M10 4H5v16h5"/><path d="M14 8l4 4-4 4M18 12H9"/>',
    alerta: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/>',
    copiar: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    recarregar: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
    ajuda: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17v.5"/>',
    cadeado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    recibo: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>'
  };
  var FILL = { raio: 1, estrela: 1, mais: 1 };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">';
  for (var k in P) sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + P[k] + '</symbol>';
  sprite += '</svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);

  function icons(root) {
    (root || document).querySelectorAll('i[data-i]').forEach(function (el) {
      var n = el.getAttribute('data-i');
      var cls = 'i ' + (el.className || '') + (FILL[n] ? ' fill' : '');
      var lab = el.getAttribute('aria-label');
      var a = lab ? ' role="img" aria-label="' + lab + '"' : ' aria-hidden="true"';
      el.outerHTML = '<svg class="' + cls.trim() + '"' + a + '><use href="#i-' + n + '"/></svg>';
    });
  }
  icons();

  function parse(v) {
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (v === 'null') return null;
    if (v !== '' && !isNaN(v)) return Number(v);
    return v;
  }
  var body = document.body;
  var S = {};
  try { S = JSON.parse(body.getAttribute('data-state') || '{}'); } catch (e) { S = {}; }
  new URLSearchParams(location.search).forEach(function (v, k) { if (k !== 'lado') S[k] = parse(v); });

  function truthy(v) { return Array.isArray(v) ? v.length > 0 : !!v; }
  function test(expr, c) {
    if (expr.indexOf('|') >= 0) return expr.split('|').some(function (part) { return test(part, c); });
    return expr.split('&').every(function (e) {
      e = e.trim();
      if (e.charAt(0) === '!') return !test(e.slice(1), c);
      var m;
      if ((m = e.match(/^(\w+)~(.+)$/))) return Array.isArray(c[m[1]]) && c[m[1]].map(String).indexOf(m[2]) >= 0;
      if ((m = e.match(/^(\w+)!=(.*)$/))) return String(c[m[1]]) !== m[2];
      if ((m = e.match(/^(\w+)=(.*)$/))) return String(c[m[1]]) === m[2];
      if (e.charAt(0) === '!') return !truthy(c[e.slice(1)]);
      return truthy(c[e]);
    });
  }
  function ctx() {
    var c = {};
    for (var k in S) c[k] = S[k];
    if (App.computed) { var x = App.computed(S); for (var j in x) c[j] = x[j]; }
    return c;
  }
  function render() {
    var c = ctx();
    document.querySelectorAll('[data-show]').forEach(function (el) { el.hidden = !test(el.getAttribute('data-show'), c); });
    document.querySelectorAll('[data-text]').forEach(function (el) { var v = c[el.getAttribute('data-text')]; el.textContent = v == null ? '' : v; });
    document.querySelectorAll('[data-on]').forEach(function (el) {
      var on = test(el.getAttribute('data-on'), c);
      var role = el.getAttribute('role');
      var attr = role === 'radio' || role === 'switch' || role === 'checkbox' ? 'aria-checked' : role === 'tab' ? 'aria-selected' : 'aria-pressed';
      el.setAttribute(attr, on ? 'true' : 'false');
    });
    document.querySelectorAll('[data-enable]').forEach(function (el) { el.setAttribute('aria-disabled', test(el.getAttribute('data-enable'), c) ? 'false' : 'true'); });
    document.querySelectorAll('[data-width]').forEach(function (el) { el.style.width = c[el.getAttribute('data-width')] + '%'; });
    if (App.after) App.after(c);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[aria-disabled="true"]')) { e.preventDefault(); return; }
    var back = e.target.closest('[data-back]');
    if (back && history.length > 1 && document.referrer) {
      try { if (new URL(document.referrer).origin === location.origin) { e.preventDefault(); history.back(); return; } } catch (err) {}
    }
    var el = e.target.closest('[data-set],[data-toggle],[data-add]');
    if (!el) return;
    if (el.hasAttribute('data-set')) el.getAttribute('data-set').split('&').forEach(function (p) {
      var i = p.indexOf('='); S[p.slice(0, i).trim()] = parse(p.slice(i + 1).trim());
    });
    if (el.hasAttribute('data-toggle')) {
      var t = el.getAttribute('data-toggle').split(':');
      if (t.length > 1) {
        var arr = (S[t[0]] || []).slice(), ix = arr.map(String).indexOf(t[1]);
        if (ix >= 0) arr.splice(ix, 1); else arr.push(parse(t[1]));
        S[t[0]] = arr;
      } else S[t[0]] = !S[t[0]];
    }
    if (el.hasAttribute('data-add')) {
      var a = el.getAttribute('data-add').split(':'), n = (S[a[0]] || 0) + Number(a[1]);
      var mn = el.getAttribute('data-min'), mx = el.getAttribute('data-max');
      if (mn != null) n = Math.max(Number(mn), n);
      if (mx != null) n = Math.min(Number(mx), n);
      S[a[0]] = n;
    }
    render();
  });

  var App = window.App = {
    s: S,
    icons: icons,
    set: function (k, v) { S[k] = v; render(); },
    patch: function (o) { for (var k in o) S[k] = o[k]; render(); },
    lado: new URLSearchParams(location.search).get('lado'),
    computed: null,
    after: null,
    render: render
  };
  document.addEventListener('DOMContentLoaded', render);
  if (document.readyState !== 'loading') setTimeout(render, 0);
})();
