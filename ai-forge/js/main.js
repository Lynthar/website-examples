/**
 * AIForge - Main JavaScript
 * AI Model Aggregation Platform
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initEmptyLinks();
        initCodeTabs();
        initCopyButton();
        initChatDemo();
        initModelCards();
        initMobileMenu();
        initSmoothScroll();
    });

    // Handle empty href="#" links
    function initEmptyLinks() {
        document.querySelectorAll('a[href="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('功能开发中，敬请期待');
            });
        });
    }

    // Show toast notification
    function showToast(message, type) {
        var existing = document.querySelector('.toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast';
        if (type) toast.classList.add('toast-' + type);
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2500);
    }

    // Code tabs switching
    function initCodeTabs() {
        var tabs = document.querySelectorAll('.code-tab');
        var blocks = document.querySelectorAll('.code-block');

        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                var lang = this.dataset.lang;

                // Update active tab
                tabs.forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');

                // Show corresponding code block
                blocks.forEach(function(block) {
                    block.style.display = block.dataset.lang === lang ? 'block' : 'none';
                });
            });
        });
    }

    // Copy code button
    function initCopyButton() {
        var copyBtn = document.querySelector('.copy-btn');
        if (!copyBtn) return;

        copyBtn.addEventListener('click', function() {
            var activeBlock = document.querySelector('.code-block[style*="block"]') ||
                             document.querySelector('.code-block');
            if (!activeBlock) return;

            var code = activeBlock.textContent;

            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(function() {
                    showToast('代码已复制到剪贴板');
                    copyBtn.textContent = '✓ 已复制';
                    setTimeout(function() {
                        copyBtn.textContent = '📋 复制代码';
                    }, 2000);
                }).catch(function() {
                    showToast('复制失败，请手动复制');
                });
            } else {
                // Fallback
                var textArea = document.createElement('textarea');
                textArea.value = code;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('代码已复制到剪贴板');
                } catch (e) {
                    showToast('复制失败');
                }
                document.body.removeChild(textArea);
            }
        });
    }

    // Chat demo interaction
    function initChatDemo() {
        var chatInput = document.querySelector('.chat-input input');
        var sendBtn = document.querySelector('.send-btn');
        var modelSelect = document.getElementById('modelSelect');

        if (sendBtn) {
            sendBtn.addEventListener('click', function() {
                var message = chatInput ? chatInput.value.trim() : '';
                if (message) {
                    showToast('请登录后使用对话功能');
                    chatInput.value = '';
                } else {
                    showToast('请登录后使用对话功能');
                }
            });
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendBtn.click();
                }
            });
        }

        if (modelSelect) {
            modelSelect.addEventListener('change', function() {
                var modelName = this.options[this.selectedIndex].text;
                showToast('已切换到 ' + modelName);
            });
        }

        // Chat action buttons
        document.querySelectorAll('.chat-actions .icon-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var title = this.getAttribute('title');
                showToast(title + '功能需登录使用');
            });
        });
    }

    // Model cards click
    function initModelCards() {
        document.querySelectorAll('.model-card').forEach(function(card) {
            if (card.classList.contains('more-models')) return;

            card.addEventListener('click', function() {
                var modelName = this.querySelector('h3').textContent;
                showToast('查看 ' + modelName + ' 详情');
            });
        });

        // Download cards
        document.querySelectorAll('.download-card .btn-download').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showToast('下载功能需要登录账号');
            });
        });

        document.querySelectorAll('.download-card .btn-secondary').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var modelName = this.closest('.download-card').querySelector('h3').textContent;
                showToast('查看 ' + modelName + ' 详情');
            });
        });

        // Community cards
        document.querySelectorAll('.community-card').forEach(function(card) {
            card.addEventListener('click', function() {
                var title = this.querySelector('h3').textContent;
                showToast('阅读: ' + title);
            });
        });
    }

    // Mobile menu toggle
    function initMobileMenu() {
        var menuBtn = document.querySelector('.mobile-menu-btn');
        if (!menuBtn) return;

        menuBtn.addEventListener('click', function() {
            showToast('移动端菜单开发中');
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href').substring(1);
                var target = document.getElementById(targetId);

                if (target) {
                    e.preventDefault();
                    var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar scroll effect
    var navbar = document.querySelector('.navbar');
    var lastScroll = 0;

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        }

        lastScroll = currentScroll;
    });

    // Lazy load animation on scroll
    function initScrollAnimations() {
        var observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.model-card, .download-card, .community-card, .pricing-card, .feature-item').forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    // Initialize animations after a short delay
    setTimeout(initScrollAnimations, 100);

    // Export for potential external use
    window.AIForge = {
        showToast: showToast
    };

})();
