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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Message ready \u2014 opening email\u2026';
      var name = encodeURIComponent(form.name.value || '');
      var email = encodeURIComponent(form.email.value || '');
      var phone = encodeURIComponent(form.phone.value || '');
      var service = encodeURIComponent(form.service.value || '');
      var message = encodeURIComponent(form.message.value || '');
      var body = 'Name: ' + name + '%0D%0APhone: ' + phone + '%0D%0AEmail: ' + email + '%0D%0AService: ' + service + '%0D%0A%0D%0A' + message;
      window.location.href = 'mailto:info@sutipainting.example?subject=Free%20Estimate%20Request&body=' + body;
      setTimeout(function () { btn.textContent = original; }, 3000);
    });
  }
});
