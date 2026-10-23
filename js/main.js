document.documentElement.classList.add('js');

// Revela elementos ao entrar na tela
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -8% 0px' });

// Abertura: a logo se monta (caveira na navalha, faixa, nome) e as cortinas abrem
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
    setTimeout(function () {
      document.querySelectorAll('.hero .reveal').forEach(function (el, i) {
        setTimeout(function () { el.classList.add('is-in'); }, i * 90);
      });
      document.querySelectorAll('main > :not(.hero) .reveal').forEach(function (el) { io.observe(el); });
    }, 300);
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

// Vídeos mudos tocam só quando visíveis
(function () {
  var vids = document.querySelectorAll('video[data-auto]');
  var vo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.play().catch(function () {}); } else { e.target.pause(); }
    });
  }, { threshold: .25 });
  vids.forEach(function (v) { vo.observe(v); });
})();

// Tour com som: play no botão, clique no vídeo pausa
(function () {
  var v = document.getElementById('tour');
  var btn = document.getElementById('tourPlay');
  var fig = v.parentElement;
  btn.addEventListener('click', function () { v.play(); });
  v.addEventListener('click', function () { v.paused ? v.play() : v.pause(); });
  v.addEventListener('play', function () { fig.classList.add('is-playing'); });
  v.addEventListener('pause', function () { fig.classList.remove('is-playing'); });
  v.addEventListener('ended', function () { fig.classList.remove('is-playing'); });
})();

// Marca o dia de hoje na tabela de horários
(function () {
  var d = String(new Date().getDay());
  document.querySelectorAll('.hours tr').forEach(function (tr) {
    if (tr.dataset.d.split(',').indexOf(d) > -1) tr.classList.add('is-today');
  });
})();
