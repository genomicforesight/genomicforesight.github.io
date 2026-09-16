/* =========================================================
   GFI — Unified JavaScript (v2.0)
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

// ===== LANGUAGE SWITCHER (فقط EN + FA) =====
const translations = {
    en: {
        'top.quickaccess': 'Quick Access',
        'nav.home': 'Home',
        'nav.research': 'Research',
        'nav.people': 'People',
        'nav.projects': 'Projects',
        'nav.about': 'About',
        'nav.contact': 'Connect',
        'hero.title1': 'Biology is complex.',
        'hero.title2': 'Intelligence',
        'hero.title3': ' helps us see it differently.',
        'hero.text': 'An independent research institute at the intersection of AI, genomics and systems biology.',
        'hero.cta1': 'Explore Research',
        'hero.cta2': 'About GFI',
        'stats.programs': 'Research Programs',
        'stats.leaders': 'Research Leaders',
        'stats.projects': 'Flagship Projects',
        'stats.established': 'Established',
        'quick.research': 'Research Programs',
        'quick.researchDesc': 'Six computational programs',
        'quick.people': 'People',
        'quick.peopleDesc': 'Research leaders & fellows',
        'quick.projects': 'Projects',
        'quick.projectsDesc': '12 flagship projects',
        'quick.openScience': 'Open Science',
        'quick.openScienceDesc': 'Code · Data · Models',
        'research.label': 'Research',
        'research.title': 'Six research programs.',
        'research.desc': 'GFI is organized around six interconnected computational programs.',
        'news.label': 'Newsroom',
        'news.title': 'Latest from GFI.',
        'os.label': 'Open Science',
        'os.title': 'Open by default.',
        'os.desc': 'Research code, models, and datasets published openly.',
        'os.code': 'Code',
        'os.codeDesc': 'Open-source research software',
        'os.data': 'Data',
        'os.dataDesc': 'Reusable datasets & benchmarks',
        'os.models': 'Models',
        'os.modelsDesc': 'Transparent AI models',
        'footer.desc': 'An independent research institute at the intersection of AI, genomics, and systems biology.',
        'footer.research': 'Research',
        'footer.institute': 'Institute',
        'footer.open': 'Open Science',
        'footer.github': 'GitHub',
        'footer.huggingface': 'Hugging Face',
        'footer.datasets': 'Datasets',
        'footer.models': 'Models',
    },
    fa: {
        'top.quickaccess': 'دسترسی سریع',
        'nav.home': 'خانه',
        'nav.research': 'پژوهش',
        'nav.people': 'اعضا',
        'nav.projects': 'پروژه‌ها',
        'nav.about': 'درباره',
        'nav.contact': 'ارتباط',
        'hero.title1': 'زیست‌شناسی پیچیده است.',
        'hero.title2': 'هوش',
        'hero.title3': ' به ما کمک می‌کند آن را متفاوت ببینیم.',
        'hero.text': 'یک موسسه پژوهشی مستقل در تلاقی هوش مصنوعی، ژنومیک و زیست‌شناسی سیستم‌ها.',
        'hero.cta1': 'کاوش پژوهش',
        'hero.cta2': 'درباره GFI',
        'stats.programs': 'برنامه‌های پژوهشی',
        'stats.leaders': 'رهبران پژوهشی',
        'stats.projects': 'پروژه‌های شاخص',
        'stats.established': 'سال تاسیس',
        'quick.research': 'برنامه‌های پژوهشی',
        'quick.researchDesc': 'شش برنامه محاسباتی',
        'quick.people': 'اعضا',
        'quick.peopleDesc': 'رهبران و همکاران پژوهشی',
        'quick.projects': 'پروژه‌ها',
        'quick.projectsDesc': '۱۲ پروژه شاخص',
        'quick.openScience': 'علم باز',
        'quick.openScienceDesc': 'کد · داده · مدل',
        'research.label': 'پژوهش',
        'research.title': 'شش برنامه پژوهشی.',
        'research.desc': 'GFI حول شش برنامه محاسباتی به هم پیوسته سازمان یافته است.',
        'news.label': 'اتاق خبر',
        'news.title': 'آخرین اخبار GFI.',
        'os.label': 'علم باز',
        'os.title': 'باز به صورت پیش‌فرض.',
        'os.desc': 'کد، مدل‌ها و داده‌های پژوهشی به صورت آزاد منتشر می‌شوند.',
        'os.code': 'کد',
        'os.codeDesc': 'نرم‌افزارهای پژوهشی متن‌باز',
        'os.data': 'داده',
        'os.dataDesc': 'داده‌ها و بنچمارک‌های قابل استفاده مجدد',
        'os.models': 'مدل‌ها',
        'os.modelsDesc': 'مدل‌های هوش مصنوعی شفاف',
        'footer.desc': 'یک موسسه پژوهشی مستقل در تلاقی هوش مصنوعی، ژنومیک و زیست‌شناسی سیستم‌ها.',
        'footer.research': 'پژوهش',
        'footer.institute': 'موسسه',
        'footer.open': 'علم باز',
        'footer.github': 'گیت‌هاب',
        'footer.huggingface': 'هاگینگ فیس',
        'footer.datasets': 'داده‌ها',
        'footer.models': 'مدل‌ها',
    }
};

function switchLanguage(lang) {
    if (!translations[lang]) return;
    localStorage.setItem('gfi-lang', lang);

    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'fa') ? 'rtl' : 'ltr';

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // زبان ذخیره‌شده
    const savedLang = localStorage.getItem('gfi-lang') || 'en';
    switchLanguage(savedLang);

    // اتصال دکمه‌های زبان
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
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

// ===== LOAD PEOPLE =====
fetch('data/people.json')
    .then(r => r.json())
    .then(data => {
        const leadersGrid = document.getElementById('leadersGrid');
        if (leadersGrid) {
            leadersGrid.innerHTML = data.researchLeaders.map(l => `
                <article class="person-card reveal">
                    <div class="person-avatar">${l.avatar}</div>
                    <h3>${l.name}</h3>
                    <div class="person-role">${l.role}</div>
                    <div class="person-program">${l.program}</div>
                    <div class="person-field">${l.field}</div>
                </article>
            `).join('');
        }
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

// ===== LOAD RESEARCH =====
fetch('data/research.json')
    .then(r => r.json())
    .then(data => {
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
