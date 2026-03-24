

// Page view tracking
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

// Article read tracking
function trackArticleRead() {
    const articleId = new URLSearchParams(window.location.search).get('id');
    if (articleId && typeof gtag !== 'undefined') {
        gtag('event', 'article_read', {
            article_id: articleId,
            article_title: document.getElementById('article-title')?.textContent
        });
    }
}

// Track on load
document.addEventListener('DOMContentLoaded', () => {
    trackPageView();
    trackArticleRead();
});
