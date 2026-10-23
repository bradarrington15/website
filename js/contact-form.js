/* Contact form submission.

   GitHub Pages serves static files and cannot process a POST, so the form is
   sent to a third-party form endpoint set in `data-endpoint` on the <form>.
   Both Formspree and Web3Forms accept a plain FormData POST and answer with
   JSON, so either works without changing this file.

   With no endpoint configured the form falls back to composing a mailto: to
   reefresponse@uvi.edu, so a visitor's message is never silently dropped. */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');
  var endpoint = (form.getAttribute('data-endpoint') || '').trim();
  var configured = /^https:\/\//.test(endpoint);

  function say(message, kind) {
    status.textContent = message;
    status.className = 'form__status is-' + kind;
  }

  function mailto() {
    var get = function (n) { return (form.elements[n] && form.elements[n].value) || ''; };
    var body = 'Name: ' + get('name') + '\nEmail: ' + get('email') +
               '\nAbout: ' + get('topic') + '\n\n' + get('message');
    window.location.href = 'mailto:reefresponse@uvi.edu' +
      '?subject=' + encodeURIComponent('Website enquiry: ' + get('topic')) +
      '&body=' + encodeURIComponent(body);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    if (!configured) { mailto(); return; }

    button.disabled = true;
    say('Sending…', 'working');

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      form.reset();
      say('Thank you. Your message is with us, and we will reply by email.', 'ok');
    }).catch(function () {
      say('That did not send. Please email us directly at reefresponse@uvi.edu.', 'bad');
    }).then(function () {
      button.disabled = false;
    });
  });
})();
