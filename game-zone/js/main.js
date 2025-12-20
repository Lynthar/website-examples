// GameZone - Gaming Portal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle empty anchor links with coming soon notification
    document.querySelectorAll('a[href="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            if (linkText) {
                showNotification(`「${linkText}」功能开发中，敬请期待`);
            }
        });
    });

    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance carousel
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);

    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Countdown timer
    function updateCountdown() {
        const timeBoxes = document.querySelectorAll('.time-box');
        if (timeBoxes.length === 3) {
            let hours = parseInt(timeBoxes[0].textContent);
            let minutes = parseInt(timeBoxes[1].textContent);
            let seconds = parseInt(timeBoxes[2].textContent);

            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }
            if (minutes < 0) {
                minutes = 59;
                hours--;
            }
            if (hours < 0) {
                hours = 23;
            }

            timeBoxes[0].textContent = hours.toString().padStart(2, '0');
            timeBoxes[1].textContent = minutes.toString().padStart(2, '0');
            timeBoxes[2].textContent = seconds.toString().padStart(2, '0');
        }
    }

    setInterval(updateCountdown, 1000);

    // Game card hover effects
    const gameCards = document.querySelectorAll('.game-card, .offer-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showNotification(`正在搜索: ${query}`);
                }
            }
        });
    }

    // Add to cart animation
    const buyButtons = document.querySelectorAll('.btn-primary');
    buyButtons.forEach(btn => {
        if (btn.textContent.includes('购买') || btn.textContent.includes('领取')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const cart = document.querySelector('.cart-count');
                if (cart) {
                    const count = parseInt(cart.textContent) + 1;
                    cart.textContent = count;
                    cart.style.animation = 'bounce 0.3s ease';
                    setTimeout(() => cart.style.animation = '', 300);
                }
                showNotification('已添加到购物车！');
            });
        }
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

    document.querySelectorAll('.game-card, .offer-card, .category-card, .seller-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
        color: white;
        border-radius: 10px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(108, 92, 231, 0.4);
        z-index: 9999;
        animation: slideIn 0.4s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add animation styles
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
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`;
document.head.appendChild(style);
