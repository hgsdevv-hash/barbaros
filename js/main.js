// Abertura: a logo se monta (postes, caveira na navalha, faixa) e as cortinas abrem
(function () {
  var intro = document.getElementById('intro');
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var done = false;

  function finish() {
    if (done) return;
    done = true;
    intro.classList.add('is-out');
    body.classList.remove('is-loading');
    setTimeout(function () { body.classList.add('is-ready'); }, 350);
    setTimeout(function () { intro.remove(); }, 1300);
  }

  setTimeout(finish, reduce ? 200 : 3300);
  intro.addEventListener('click', finish);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter') finish(); });
})();

// Nav sólida depois do topo
(function () {
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('is-solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
