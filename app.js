/* =========================================================
   GFI — Unified JavaScript
========================================================= */

// ===== HEADER SCROLL =====
const header = document.getElementById('siteHeader');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('overlay');
const drawerClose = document.getElementById('drawerClose');

function openMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}
if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (drawerClose) drawerClose.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.drawer-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

// ===== ACCESSIBILITY =====
let fontSize = parseInt(localStorage.getItem('gfi-fontsize')) || 100;
let colorMode = localStorage.getItem('gfi-colormode') === 'true';

function applyA11y() {
    document.documentElement.style.fontSize = fontSize + '%';
    document.body.classList.toggle('colorblind-mode', colorMode);
    localStorage.setItem('gfi-fontsize', fontSize);
    localStorage.setItem('gfi-colormode', colorMode);
}

document.addEventListener('DOMContentLoaded', () => {
    applyA11y();
    const fd = document.getElementById('fontDecrease');
    const fr = document.getElementById('fontReset');
    const fi = document.getElementById('fontIncrease');
    const cm = document.getElementById('colorModeToggle');
    if (fd) fd.onclick = () => { fontSize = Math.max(80, fontSize - 10); applyA11y(); };
    if (fr) fr.onclick = () => { fontSize = 100; applyA11y(); };
    if (fi) fi.onclick = () => { fontSize = Math.min(140, fontSize + 10); applyA11y(); };
    if (cm) {
        cm.classList.toggle('active', colorMode);
        cm.onclick = () => {
            colorMode = !colorMode;
            cm.classList.toggle('active', colorMode);
            applyA11y();
        };
    }
});

// ===== LANGUAGE SWITCHER =====
const translations = {
    en: {
        'nav.home': 'Home', 'nav.research': 'Research', 'nav.people': 'People',
        'nav.projects': 'Projects', 'nav.about': 'About', 'nav.contact': 'Connect',
        'hero.title1': 'Biology is complex.', 'hero.title2': 'Intelligence',
        'hero.title3': ' helps us see it differently.',
        'hero.text': 'An independent research institute at the intersection of AI, genomics and systems biology.',
        'hero.cta1': 'Explore Research', 'hero.cta2': 'About GFI',
        'stats.programs': 'Research Programs', 'stats.leaders': 'Research Leaders',
        'stats.projects': 'Flagship Projects', 'stats.established': 'Established',
    },
    fa: {
        'nav.home': 'خانه', 'nav.research': 'پژوهش', 'nav.people': 'اعضا',
        'nav.projects': 'پروژه‌ها', 'nav.about': 'درباره', 'nav.contact': 'ارتباط',
        'hero.title1': 'زیست‌شناسی پیچیده است.', 'hero.title2': 'هوش',
        'hero.title3': ' به ما کمک می‌کند آن را متفاوت ببینیم.',
        'hero.text': 'یک موسسه پژوهشی مستقل در تلاقی هوش مصنوعی، ژنومیک و زیست‌شناسی سیستم‌ها.',
        'hero.cta1': 'کاوش پژوهش', 'hero.cta2': 'درباره GFI',
        'stats.programs': 'برنامه‌های پژوهشی', 'stats.leaders': 'رهبران پژوهشی',
        'stats.projects': 'پروژه‌های شاخص', 'stats.established': 'سال تاسیس',
    },
    ar: {
        'nav.home': 'الرئيسية', 'nav.research': 'البحث', 'nav.people': 'الأعضاء',
        'nav.projects': 'المشاريع', 'nav.about': 'حول', 'nav.contact': 'تواصل',
        'hero.title1': 'علم الأحياء معقد.', 'hero.title2': 'الذكاء',
        'hero.title3': ' يساعدنا على رؤيته بشكل مختلف.',
        'hero.text': 'معهد بحثي مستقل عند تقاطع الذكاء الاصطناعي وعلم الجينوم وعلم أحياء النظم.',
        'hero.cta1': 'استكشف الأبحاث', 'hero.cta2': 'حول GFI',
        'stats.programs': 'برامج البحث', 'stats.leaders': 'قادة البحث',
        'stats.projects': 'المشاريع الرائدة', 'stats.established': 'سنة التأسيس',
    },
    de: {
        'nav.home': 'Startseite', 'nav.research': 'Forschung', 'nav.people': 'Personen',
        'nav.projects': 'Projekte', 'nav.about': 'Über uns', 'nav.contact': 'Kontakt',
        'hero.title1': 'Biologie ist komplex.', 'hero.title2': 'Intelligenz',
        'hero.title3': ' hilft uns, sie anders zu sehen.',
        'hero.text': 'Ein unabhängiges Forschungsinstitut an der Schnittstelle von KI, Genomik und Systembiologie.',
        'hero.cta1': 'Forschung entdecken', 'hero.cta2': 'Über GFI',
        'stats.programs': 'Forschungsprogramme', 'stats.leaders': 'Forschungsleiter',
        'stats.projects': 'Flaggschiff-Projekte', 'stats.established': 'Gegründet',
    }
};

function switchLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'fa' || lang === 'ar') ? 'rtl' : 'ltr';
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    localStorage.setItem('gfi-lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
});
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('gfi-lang') || 'en';
    if (saved !== 'en') switchLanguage(saved);
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
}

// ===== LOAD RESEARCH (Home + Research pages) =====
fetch('data/research.json')
    .then(r => r.json())
    .then(data => {
        // Home research grid
        const grid = document.getElementById('researchGrid');
        if (grid) {
            grid.innerHTML = data.programs.map(p => `
                <a href="research.html#${p.id}" class="research-card reveal">
                    <div class="research-number">${p.number}</div>
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                </a>
            `).join('');
        }
        // Research page programs list
        const list = document.getElementById('programsList');
        if (list) {
            list.innerHTML = data.programs.map(p => `
                <article class="program-item" id="${p.id}">
                    <div class="program-header">
                        <div class="program-number">${p.number}</div>
                        <div>
                            <h2 class="program-title">${p.title}</h2>
                            <p class="program-desc">${p.description}</p>
                        </div>
                    </div>
                    <div class="program-body">
                        <div>
                            <div class="program-section-label">Research Leaders</div>
                            <div class="program-pis">
                                ${p.pis.map(pi => `<div class="program-pi">${pi}</div>`).join('')}
                            </div>
                        </div>
                        <div>
                            <div class="program-section-label">Flagship Project</div>
                            <a href="projects.html" class="program-project">
                                <span>${p.project}</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </article>
            `).join('');
        }
    })
    .catch(e => console.log('Research load:', e.message));

// ===== LOAD NEWS =====
fetch('data/news.json')
    .then(r => r.json())
    .then(data => {
        const grid = document.getElementById('newsGrid');
        if (!grid) return;
        grid.innerHTML = data.news.slice(0, 4).map(n => `
            <article class="news-card reveal">
                <div class="news-date">${n.date}</div>
                <h3>${n.title}</h3>
                <p>${n.excerpt}</p>
                <a href="#" class="news-link">Read more →</a>
            </article>
        `).join('');
    })
    .catch(e => console.log('News load:', e.message));

// ===== LOAD PEOPLE =====
fetch('data/people.json')
    .then(r => r.json())
    .then(data => {
        // Scientific Director
        const dirCard = document.getElementById('directorCard');
        if (dirCard && data.scientificDirector) {
            const d = data.scientificDirector;
            dirCard.innerHTML = `
                <div class="director-avatar">${d.avatar}</div>
                <div>
                    <div class="director-badge">${d.role}</div>
                    <h2 class="director-name">${d.name}</h2>
                    <p class="director-field">${d.field}</p>
                </div>
            `;
        }
        // Research Leaders
        const leadersGrid = document.getElementById('researchLeadersGrid');
        if (leadersGrid) {
            const leaders = data.researchLeaders.filter(l => l.id !== 'leila-farzan');
            leadersGrid.innerHTML = leaders.map(l => `
                <article class="person-card reveal">
                    <div class="person-avatar">${l.avatar}</div>
                    <h3>${l.name}</h3>
                    <div class="person-role">${l.role}</div>
                    <div class="person-program">${l.program}</div>
                    <div class="person-field">${l.field}</div>
                </article>
            `).join('');
        }
        // Fellows
        const fellowsGrid = document.getElementById('fellowsGrid');
        if (fellowsGrid && data.fellows) {
            fellowsGrid.innerHTML = data.fellows.map(f => `
                <article class="person-card reveal">
                    <div class="person-avatar">${f.avatar}</div>
                    <h3>${f.name}</h3>
                    <div class="person-role">${f.role}</div>
                    <div class="person-program">${f.program}</div>
                    <div class="person-field">${f.field}</div>
                </article>
            `).join('');
        }
    })
    .catch(e => console.log('People load:', e.message));

// ===== LOAD PROJECTS =====
fetch('data/projects.json')
    .then(r => r.json())
    .then(data => {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        grid.innerHTML = data.projects.map(p => `
            <article class="project-card reveal" id="${p.id}">
                <div class="project-tag">${p.program}</div>
                <h3 class="project-name">${p.name}</h3>
                <div class="project-tagline">${p.tagline}</div>
                <p class="project-desc">${p.description}</p>
                <div class="project-meta">
                    <div class="project-pi"><strong>Lead:</strong> ${p.pi}</div>
                </div>
            </article>
        `).join('');
    })
    .catch(e => console.log('Projects load:', e.message));
