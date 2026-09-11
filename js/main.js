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
    if (window.innerWidth > 1279) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Menu';
    }
  });
})();
