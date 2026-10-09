/* Mobile navigation toggle */
(function () {
  var btn = document.querySelector('.navtoggle');
  var nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
  });

  // Close the menu when a link is chosen or the viewport grows past the breakpoint
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Menu';
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1079) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Menu';
    }
  });
})();

/* Before/after compare sliders: the transparent range input drives --pos, so
   mouse, touch and keyboard all work natively. */
(function () {
  document.querySelectorAll('.compare').forEach(function (el) {
    var range = el.querySelector('.compare__range');
    if (!range) return;
    var set = function () { el.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', set);
    set();
  });
})();

/* Growth scrubber: one coral, several years. The frames are stacked and cross-faded,
   so moving the slider reads as the colony growing rather than photos swapping. */
(function () {
  document.querySelectorAll('[data-growth]').forEach(function (box) {
    var range = box.querySelector('.growth__range');
    var frames = box.querySelectorAll('.growth__stage img');
    var ticks = box.querySelectorAll('.growth__ticks span');
    if (!range || !frames.length) return;

    function show() {
      var i = parseInt(range.value, 10);
      frames.forEach(function (img, n) { img.classList.toggle('is-on', n === i); });
      ticks.forEach(function (t, n) { t.classList.toggle('is-on', n === i); });
    }
    range.addEventListener('input', show);
    show();
  });
})();
