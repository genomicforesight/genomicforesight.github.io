// =========================================================
// GFI — Research Page Renderer
// =========================================================

fetch('data/research.json')
    .then(res => res.json())
    .then(data => {
        renderPrograms(data.programs);
    })
    .catch(err => console.error('Failed to load research:', err));

// ---------- Render Programs ----------
function renderPrograms(programs) {
    const container = document.getElementById('programsList');
    if (!container) return;

    container.innerHTML = programs.map(program => `
        <article class="program-item" id="${program.id}">
            <div class="program-header">
                <div class="program-number">${program.number}</div>
                <div class="program-header-text">
                    <h2 class="program-title">${program.title}</h2>
                    <p class="program-desc">${program.description}</p>
                </div>
            </div>

            <div class="program-body">
                <div class="program-section">
                    <div class="program-section-label">Research Leaders</div>
                    <div class="program-pis">
                        ${program.pis.map(pi => `
                            <div class="program-pi">
                                <span class="pi-name">${pi}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="program-section">
                    <div class="program-section-label">Flagship Project</div>
                    <a href="projects.html#${program.project.toLowerCase().replace(/\s+/g, '-')}" class="program-project">
                        <span class="project-name">${program.project}</span>
                        <span class="project-arrow">→</span>
                    </a>
                </div>
            </div>
        </article>
    `).join('');
}
