/**
 * PodcastHub - Main JavaScript
 * Podcast Discovery Platform
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initEmptyLinks();
        initPlayButtons();
        initMiniPlayer();
        initSearch();
        initCategoryHover();
    });

    // Handle empty href="#" links
    function initEmptyLinks() {
        document.querySelectorAll('a[href="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('功能开发中，敬请期待');
            });
        });
    }

    // Show notification toast
    function showNotification(message) {
        var existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:25px;font-size:14px;z-index:10000;animation:fadeInUp 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2500);
    }

    // Initialize play buttons
    function initPlayButtons() {
        document.querySelectorAll('.play-btn, .episode-play').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                var title = this.closest('[data-title]')?.dataset.title ||
                           this.closest('.episode-item')?.querySelector('.episode-title')?.textContent ||
                           '播客节目';

                updateMiniPlayer(title);
                showNotification('正在播放: ' + title);
            });
        });
    }

    // Mini player functionality
    function initMiniPlayer() {
        var miniPlayer = document.querySelector('.mini-player');
        if (!miniPlayer) return;

        var playPauseBtn = miniPlayer.querySelector('.mini-play-pause');
        var progressBar = miniPlayer.querySelector('.mini-progress-bar');
        var isPlaying = false;

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                isPlaying = !isPlaying;
                this.textContent = isPlaying ? '⏸️' : '▶️';

                if (isPlaying) {
                    simulateProgress(progressBar);
                }
            });
        }

        // Skip buttons
        miniPlayer.querySelectorAll('.mini-skip').forEach(function(btn) {
            btn.addEventListener('click', function() {
                showNotification(this.textContent.includes('⏪') ? '后退15秒' : '前进30秒');
            });
        });
    }

    // Simulate progress bar
    function simulateProgress(progressBar) {
        if (!progressBar) return;

        var fill = progressBar.querySelector('.mini-progress-fill');
        if (!fill) return;

        var width = parseInt(fill.style.width) || 35;

        var interval = setInterval(function() {
            width += 0.1;
            if (width >= 100) {
                width = 0;
            }
            fill.style.width = width + '%';
        }, 500);

        // Store interval for potential cleanup
        progressBar.dataset.interval = interval;
    }

    // Update mini player with current track
    function updateMiniPlayer(title) {
        var miniTitle = document.querySelector('.mini-info .mini-title');
        var miniPlay = document.querySelector('.mini-play-pause');

        if (miniTitle) {
            miniTitle.textContent = title;
        }
        if (miniPlay) {
            miniPlay.textContent = '⏸️';
        }
    }

    // Search functionality
    function initSearch() {
        var searchInput = document.querySelector('.search-box input');
        if (!searchInput) return;

        var debounceTimer;
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            var query = this.value.trim();

            debounceTimer = setTimeout(function() {
                if (query.length >= 2) {
                    showNotification('搜索: ' + query);
                }
            }, 500);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (this.value.trim()) {
                    showNotification('搜索功能即将上线');
                }
            }
        });
    }

    // Category card hover effects
    function initCategoryHover() {
        document.querySelectorAll('.category-card').forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Lazy load images (placeholder for future implementation)
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // Export for potential external use
    window.PodcastHub = {
        showNotification: showNotification
    };

})();

// Add CSS animation
(function() {
    var style = document.createElement('style');
    style.textContent = '@keyframes fadeInUp{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}';
    document.head.appendChild(style);
})();
