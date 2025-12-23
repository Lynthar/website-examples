// MusicFlow - Music Streaming JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle empty anchor links
    document.querySelectorAll('a[href="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            if (linkText) {
                showNotification(`「${linkText}」功能即将上线`);
            }
        });
    });

    // Play button click handlers
    const playButtons = document.querySelectorAll('.play-btn, .btn-play, .btn-play-large');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification('正在播放...');
            // Toggle play/pause icon simulation
            const icon = this.textContent;
            if (icon === '▶') {
                this.textContent = '⏸';
            } else {
                this.textContent = '▶';
            }
        });
    });

    // Music card click
    const musicCards = document.querySelectorAll('.music-card, .artist-card');
    musicCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent;
            if (title) {
                showNotification(`正在加载: ${title}`);
            }
        });
    });

    // Track item click
    const trackItems = document.querySelectorAll('.track-item');
    trackItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4')?.textContent;
            if (title) {
                showNotification(`正在播放: ${title}`);
            }
        });
    });

    // Like button
    const likeButtons = document.querySelectorAll('.btn-icon-large, .player-track .btn-icon');
    likeButtons.forEach(btn => {
        if (btn.textContent.includes('♡')) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (this.textContent === '♡') {
                    this.textContent = '❤️';
                    showNotification('已添加到喜欢的音乐');
                } else {
                    this.textContent = '♡';
                    showNotification('已从喜欢的音乐中移除');
                }
            });
        }
    });

    // Progress bar click simulation
    const progressTrack = document.querySelector('.progress-track');
    if (progressTrack) {
        progressTrack.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            this.querySelector('.progress-fill').style.width = percent + '%';
        });
    }

    // Volume bar click simulation
    const volumeBar = document.querySelector('.volume-bar');
    if (volumeBar) {
        volumeBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            this.querySelector('.volume-fill').style.width = percent + '%';
        });
    }

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

    document.querySelectorAll('.music-card, .artist-card, .track-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background: #282828;
        color: white;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(20px); opacity: 0; }
    }
`;
document.head.appendChild(style);
