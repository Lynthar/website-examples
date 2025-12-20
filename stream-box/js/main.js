// StreamBox - Streaming Platform JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle empty anchor links with coming soon notification
    document.querySelectorAll('a[href="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            if (linkText) {
                showNotification(`「${linkText}」即将上线`);
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Content card hover effects
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent;
            if (title) {
                showNotification(`正在加载: ${title}`);
            }
        });
    });

    // Play button click
    const playButtons = document.querySelectorAll('.play-btn, .btn-play');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification('正在准备播放...');
        });
    });

    // Slider navigation
    const sliders = document.querySelectorAll('.content-slider');
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
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

    document.querySelectorAll('.content-row').forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(30px)';
        row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(row);
    });

    // Search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showSearchModal();
        });
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        padding: 16px 32px;
        background: rgba(40, 40, 40, 0.95);
        color: white;
        border-radius: 4px;
        font-size: 0.95rem;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

function showSearchModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: flex-start; justify-content: center; padding-top: 100px;">
            <div style="width: 100%; max-width: 600px; padding: 0 20px;">
                <input type="text" placeholder="搜索电影、剧集、动漫..." style="width: 100%; padding: 20px; background: #333; border: none; border-radius: 4px; color: white; font-size: 1.2rem; outline: none;" autofocus>
                <p style="color: #808080; margin-top: 16px; font-size: 0.9rem;">按 ESC 键关闭</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = modal.querySelector('input');
    input.focus();

    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeModal);
        }
    });

    modal.querySelector('div').addEventListener('click', function(e) {
        if (e.target === this) {
            modal.remove();
        }
    });
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
`;
document.head.appendChild(style);
