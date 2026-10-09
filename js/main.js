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
   so moving the slider reads as the colony growing rather than photos swapping.
   The photo itself can be grabbed and dragged, which is what most people try first. */
(function () {
  document.querySelectorAll('[data-growth]').forEach(function (box) {
    var range = box.querySelector('.growth__range');
    var stage = box.querySelector('.growth__stage');
    var frames = box.querySelectorAll('.growth__stage img');
    var ticks = box.querySelectorAll('.growth__ticks span');
    if (!range || !frames.length) return;

    var max = frames.length - 1;

    // Position is continuous while dragging, so neighbouring years blend rather than cut.
    function show() {
      var pos = parseFloat(range.value);
      frames.forEach(function (img, n) {
        img.style.opacity = Math.max(0, Math.min(1, 1 - Math.abs(pos - n)));
      });
      var near = Math.round(pos);
      ticks.forEach(function (t, n) { t.classList.toggle('is-on', n === near); });
    }

    range.addEventListener('input', show);

    // Arrow keys should step a whole year, not a hundredth of one.
    range.addEventListener('keydown', function (e) {
      var step = (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? -1
               : (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? 1 : 0;
      if (!step) return;
      e.preventDefault();
      range.value = Math.max(0, Math.min(max, Math.round(parseFloat(range.value)) + step));
      show();
    });

    function setFromX(clientX) {
      var r = stage.getBoundingClientRect();
      var ratio = (clientX - r.left) / r.width;
      range.value = Math.max(0, Math.min(max, ratio * max));
      show();
    }

    var dragging = false;
    stage.addEventListener('pointerdown', function (e) {
      dragging = true;
      stage.setPointerCapture(e.pointerId);
      box.classList.add('is-dragging');
      setFromX(e.clientX);
      e.preventDefault();
    });
    stage.addEventListener('pointermove', function (e) {
      if (dragging) { setFromX(e.clientX); }
    });
    function stop(e) {
      if (!dragging) return;
      dragging = false;
      box.classList.remove('is-dragging');
      // settle on the nearest year so the slider never rests between two photos
      range.value = Math.round(parseFloat(range.value));
      show();
    }
    stage.addEventListener('pointerup', stop);
    stage.addEventListener('pointercancel', stop);

    show();
  });
})();
