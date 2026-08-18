document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  var form = document.querySelector('.quote-form');
  if (form) {
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    function currentFormLang() {
      try {
        var saved = localStorage.getItem('suti-lang');
        if (saved && typeof SUTI_TRANSLATIONS !== 'undefined' && SUTI_TRANSLATIONS[saved]) return saved;
      } catch (e) {}
      return 'en';
    }

    function tr(key, fallback) {
      var lang = currentFormLang();
      if (typeof SUTI_TRANSLATIONS !== 'undefined' && SUTI_TRANSLATIONS[lang] && SUTI_TRANSLATIONS[lang][key]) {
        return SUTI_TRANSLATIONS[lang][key];
      }
      return fallback;
    }

    function showStatus(text, color) {
      statusEl.textContent = text;
      statusEl.style.color = color;
      statusEl.style.display = 'block';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = tr('contact.form.sending', 'Sending\u2026');
      showStatus('', '');
      statusEl.style.display = 'none';

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (response) {
          if (response.ok) {
            showStatus(tr('contact.form.success', 'Thanks \u2014 your request has been sent. We\u2019ll be in touch soon.'), '#245A64');
            form.reset();
          } else {
            throw new Error('Request failed');
          }
        })
        .catch(function () {
          showStatus(tr('contact.form.error', 'Something went wrong. Please call us directly at +32 491 10 74 28.'), '#D77666');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });
  }
});
