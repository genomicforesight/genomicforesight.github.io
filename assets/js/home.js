// =========================================================
// GFI — Homepage Renderer
// =========================================================

// Load research programs (summary)
fetch('data/research.json')
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById('researchGrid');
        if (!grid) return;

        grid.innerHTML = data.programs.map(program => `
            <a href="research.html#${program.id}" class="research-card">
                <div class="research-number">${program.number}</div>
                <h3>${program.title}</h3>
                <p>${program.description}</p>
            </a>
        `).join('');
    })
    .catch(err => console.error('Failed to load research:', err));

// Load news
fetch('data/news.json')
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById('newsGrid');
        if (!grid) return;

        grid.innerHTML = data.news.slice(0, 4).map(item => `
            <article class="news-card">
                <div class="news-date">${item.date}</div>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <a href="#" class="news-link">Read more →</a>
            </article>
        `).join('');
    })
    .catch(err => console.error('Failed to load news:', err));
