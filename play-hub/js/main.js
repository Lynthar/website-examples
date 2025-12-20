// PlayHub - Casual Gaming JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle empty anchor links with coming soon notification
    document.querySelectorAll('a[href="#"]').forEach(anchor => {
        if (!anchor.classList.contains('category-pill')) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const linkText = this.textContent.trim();
                if (linkText) {
                    showNotification(`「${linkText}」即将上线`);
                }
            });
        }
    });

    // Category pills
    const categoryPills = document.querySelectorAll('.category-pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Game card hover effects
    const gameCards = document.querySelectorAll('.game-card, .featured-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent;
            if (title) {
                showNotification(`正在加载: ${title}`);
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showNotification(`搜索: ${query}`);
                }
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.game-card, .featured-card, .category-card, .rank-item, .player-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Floating animation enhancement
    const floatGames = document.querySelectorAll('.float-game');
    floatGames.forEach(game => {
        game.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        game.addEventListener('mouseleave', function() {
            this.style.animation = '';
            this.style.transform = '';
        });
    });

    // Stats counter animation
    const statValues = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => statsObserver.observe(stat));
});

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[0]);
    const suffix = text.replace(/\d+/, '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 28px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 30px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        z-index: 9999;
        animation: slideIn 0.4s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 2500);
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
