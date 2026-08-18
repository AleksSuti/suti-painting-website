(function () {
  const LANGS = {
    en: { label: "EN", htmlLang: "en" },
    nl: { label: "NL", htmlLang: "nl" },
    de: { label: "DE", htmlLang: "de" },
    fr: { label: "FR", htmlLang: "fr" }
  };
  const STORAGE_KEY = "suti-lang";
  const DEFAULT_LANG = "en";

  function getSavedLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS[saved]) return saved;
    } catch (e) {}
    return null;
  }

  function detectBrowserLang() {
    const nav = (navigator.language || navigator.userLanguage || "en").slice(0, 2).toLowerCase();
    return LANGS[nav] ? nav : DEFAULT_LANG;
  }

  function currentLang() {
    return getSavedLang() || detectBrowserLang();
  }

  function t(dict, key) {
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
  }

  function applyTranslations(lang) {
    const dict = (typeof SUTI_TRANSLATIONS !== "undefined" && SUTI_TRANSLATIONS[lang]) || {};

    document.documentElement.setAttribute("lang", LANGS[lang] ? LANGS[lang].htmlLang : "en");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const val = t(dict, key);
      if (val !== null) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = t(dict, key);
      if (val !== null) el.setAttribute("placeholder", val);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-title");
      const val = t(dict, key);
      if (val !== null) document.title = val;
    });

    document.querySelectorAll("[data-i18n-meta-desc]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-meta-desc");
      const val = t(dict, key);
      if (val !== null) el.setAttribute("content", val);
    });

    document.querySelectorAll(".lang-switcher [data-lang]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function setLang(lang) {
    if (!LANGS[lang]) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations(lang);
  }

  function buildSwitcher() {
    const holders = document.querySelectorAll(".lang-switcher");
    holders.forEach(function (holder) {
      holder.innerHTML = "";
      Object.keys(LANGS).forEach(function (code) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "lang-btn";
        btn.setAttribute("data-lang", code);
        btn.textContent = LANGS[code].label;
        btn.addEventListener("click", function () { setLang(code); });
        holder.appendChild(btn);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildSwitcher();
    applyTranslations(currentLang());
  });
})();
