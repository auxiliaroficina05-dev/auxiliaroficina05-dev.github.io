/* OFICINA DIGITAL – carrega a tela do sistema. Não precisa mexer. */
(function () {
  var P = window.PAGINA || '';
  var ROOT = location.origin + '/';
  var prm = new URLSearchParams(location.search);
  if (P === 'adm') {
    var k = prm.get('k');
    try { if (k) localStorage.setItem('oficina_adm_k', k); else k = localStorage.getItem('oficina_adm_k'); } catch (e) { }
    if (k) prm.set('k', k);
  }
  if (P) prm.set('p', P);
  function msg(t) { var m = document.getElementById('m'); if (m) m.innerHTML = t; }
  function abrir(n) {
    if (!window.API || /COLE_AQUI/.test(window.API)) { msg('Falta colocar o link do sistema no arquivo config.js'); return; }
    fetch(window.API + '?api=page&site=' + encodeURIComponent(ROOT) + '&' + prm.toString())
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (h) {
        h = h.replace('<head>', '<head>' + (window.CABECA || ''));
        document.open(); document.write(h); document.close();
      })
      .catch(function () {
        if (n < 2) return setTimeout(function () { abrir(n + 1); }, 1500);
        msg('Sem conexão com o sistema.<br><br><a href="">Tentar de novo</a>');
      });
  }
  abrir(0);
})();
