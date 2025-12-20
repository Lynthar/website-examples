// VideoPortal - Video Portal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.header-tabs');
            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Banner dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            dots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Video card click
    const videoCards = document.querySelectorAll('.video-card, .anime-card, .video-card-horizontal');
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent;
            if (title) {
                showNotification(`正在加载: ${title}`);
            }
        });
    });

    // Ranking items
    const rankingItems = document.querySelectorAll('.ranking-list li');
    rankingItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.title')?.textContent;
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

    // Channel navigation
    const channelItems = document.querySelectorAll('.channel-item');
    channelItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const name = this.querySelector('span:last-child')?.textContent;
            if (name) {
                showNotification(`进入${name}频道`);
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.video-section, .ranking-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Auto banner rotation
    let currentSlide = 0;
    setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }, 5000);
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 20px;
        font-size: 0.9rem;
        z-index: 9999;
        animation: fadeInDown 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOutUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes fadeOutUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(style);
