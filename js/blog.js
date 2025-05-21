document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/articles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(articles => {
            const articlesContainer = document.getElementById('articlesContainer');
            
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            articles.forEach(article => {
                const articleCard = createArticleCard(article);
                articlesContainer.appendChild(articleCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Failed to load articles');
        });
});

function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const formattedContent = article.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    card.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="article-image">
        <div class="article-content">
            <h2>${article.title}</h2>
            <div class="article-meta">
                <div class="article-author">
                    <span>By ${article.author}</span>
                </div>
                <div class="article-date">
                    <span>${formattedDate}</span>
                </div>
            </div>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-text">
                ${formattedContent.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

function showError(message) {
    const articlesContainer = document.getElementById('articlesContainer');
    articlesContainer.innerHTML = `
        <div class="error-message">
            <h2>Error</h2>
            <p>${message}</p>
            <a href="blog.html" class="back-to-blog">Refresh Page</a>
        </div>
    `;
} 