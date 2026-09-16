// =========================================================
// GFI — Accessibility Controls
// =========================================================

const A11Y_KEY = 'gfi-a11y';
let a11yState = {
    fontSize: 100,   // percentage
    colorMode: false,
    lineHeight: 'normal'
};

// Load saved state
try {
    const saved = localStorage.getItem(A11Y_KEY);
    if (saved) a11yState = { ...a11yState, ...JSON.parse(saved) };
} catch (e) {}

// Apply state
function applyA11y() {
    document.documentElement.style.fontSize = a11yState.fontSize + '%';

    if (a11yState.colorMode) {
        document.body.classList.add('colorblind-mode');
    } else {
        document.body.classList.remove('colorblind-mode');
    }

    document.body.style.lineHeight = a11yState.lineHeight;

    localStorage.setItem(A11Y_KEY, JSON.stringify(a11yState));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    applyA11y();

    const fontDecrease = document.getElementById('fontDecrease');
    const fontReset = document.getElementById('fontReset');
    const fontIncrease = document.getElementById('fontIncrease');
    const colorToggle = document.getElementById('colorModeToggle');

    if (fontDecrease) {
        fontDecrease.addEventListener('click', () => {
            a11yState.fontSize = Math.max(80, a11yState.fontSize - 10);
            applyA11y();
        });
    }

    if (fontReset) {
        fontReset.addEventListener('click', () => {
            a11yState.fontSize = 100;
            applyA11y();
        });
    }

    if (fontIncrease) {
        fontIncrease.addEventListener('click', () => {
            a11yState.fontSize = Math.min(140, a11yState.fontSize + 10);
            applyA11y();
        });
    }

    if (colorToggle) {
        colorToggle.addEventListener('click', () => {
            a11yState.colorMode = !a11yState.colorMode;
            colorToggle.classList.toggle('active', a11yState.colorMode);
            applyA11y();
        });
        colorToggle.classList.toggle('active', a11yState.colorMode);
    }
});
