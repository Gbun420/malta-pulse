// MaltaPulse functionality

// Search
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const resultsDiv = document.getElementById('search-results');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 3) { resultsDiv.innerHTML = ''; return; }
        
        const articles = document.querySelectorAll('.article');
        const results = [];
        
        articles.forEach(article => {
            const title = article.querySelector('.article-title')?.textContent.toLowerCase() || '';
            const excerpt = article.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';
            if (title.includes(query) || excerpt.includes(query)) {
                results.push(article);
            }
        });
        
        resultsDiv.innerHTML = results.length 
            ? results.map(r => r.outerHTML).join('')
            : '<p style="padding:20px;color:#999;">No results found</p>';
    });
}

// Dark mode
function initDarkMode() {
    const toggle = document.getElementById('dark-toggle');
    if (!toggle) return;
    
    const isDark = localStorage.getItem('malta-dark') === 'true';
    if (isDark) document.body.classList.add('dark');
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('malta-dark', document.body.classList.contains('dark'));
    });
}

// Newsletter
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        if (!email) return;
        
        // Store locally (we'll add proper backend later)
        let subs = JSON.parse(localStorage.getItem('malta-subs') || '[]');
        if (!subs.includes(email)) {
            subs.push(email);
            localStorage.setItem('malta-subs', JSON.stringify(subs));
        }
        
        form.innerHTML = '<p style="color:#4ade80;font-size:0.9rem;">✓ Subscribed! Welcome aboard.</p>';
    });
}

// Reading time
function calcReadingTime() {
    document.querySelectorAll('.article-excerpt, .hero-excerpt').forEach(el => {
        const text = el.textContent;
        const words = text.split(/\s+/).length;
        const mins = Math.max(1, Math.ceil(words / 200));
        const meta = el.closest('.article-body, .hero-content')?.querySelector('.article-meta, .meta');
        if (meta) {
            const readSpan = meta.querySelector('span:last-child');
            if (readSpan && readSpan.textContent.includes('read')) {
                readSpan.textContent = `${mins} min read`;
            }
        }
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initDarkMode();
    initNewsletter();
    calcReadingTime();
});
