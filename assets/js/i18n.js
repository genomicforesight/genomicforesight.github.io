// =========================================================
// GFI — Internationalization (i18n)
// =========================================================

const SUPPORTED_LANGS = ['en', 'fa', 'ar', 'de'];
const RTL_LANGS = ['fa', 'ar'];
const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'gfi-language';

let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
let translations = {};

// ---------- Load Translations ----------
async function loadTranslations(lang) {
    try {
        const res = await fetch(`data/i18n/${lang}.json`);
        if (!res.ok) throw new Error(`Failed to load ${lang}`);
        return await res.json();
    } catch (err) {
        console.error('i18n load error:', err);
        return {};
    }
}

// ---------- Apply Translations ----------
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });

    // Update HTML attributes
    document.documentElement.lang = currentLang;
    document.documentElement.dir = RTL_LANGS.includes(currentLang) ? 'rtl' : 'ltr';

    // Update active lang button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Trigger custom event for other scripts
    document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { lang: currentLang }
    }));
}

// ---------- Switch Language ----------
async function switchLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    if (lang === currentLang && Object.keys(translations).length > 0) return;

    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    translations = await loadTranslations(lang);
    applyTranslations();
}

// ---------- Init ----------
async function initI18n() {
    translations = await loadTranslations(currentLang);
    applyTranslations();
}

// ---------- Event Listeners ----------
document.addEventListener('DOMContentLoaded', () => {
    initI18n();

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
});

// Expose for other scripts
window.GFI = window.GFI || {};
window.GFI.currentLang = () => currentLang;
window.GFI.t = (key) => translations[key] || key;
