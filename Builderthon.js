(function () {
    // Navigation - Desktop & Mobile
    function bthSwitchView(viewName) {
        document.querySelectorAll('.bth-nav-item, .bth-bottom-nav-item').forEach(item => {
            item.classList.remove('bth-active');
        });
        document.querySelectorAll('.bth-view').forEach(view => {
            view.classList.remove('bth-active');
        });

        document.querySelectorAll(`[data-view="${viewName}"]`).forEach(item => {
            item.classList.add('bth-active');
        });

        document.getElementById(`bth-${viewName}`).classList.add('bth-active');
    }

    // Desktop navigation
    document.querySelectorAll('.bth-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.getAttribute('data-view');
            bthSwitchView(view);
        });
    });

    // Mobile bottom navigation
    document.querySelectorAll('.bth-bottom-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.getAttribute('data-view');
            bthSwitchView(view);
        });
    });

    // Profile navigation
    window.bthOpenProfile = function () {
        bthSwitchView('profile');
    };

    // Profile tabs
    document.querySelectorAll('.bth-profile-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const section = tab.getAttribute('data-profile-section');

            document.querySelectorAll('.bth-profile-tab').forEach(t => t.classList.remove('bth-active'));
            document.querySelectorAll('.bth-profile-section').forEach(s => s.classList.remove('bth-active'));

            tab.classList.add('bth-active');
            document.getElementById(`bth-${section}`).classList.add('bth-active');
        });
    });

    // Toggle switches
    document.querySelectorAll('.bth-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('bth-active');
        });
    });

    // Filter functionality
    document.querySelectorAll('.bth-filter-item').forEach(filter => {
        filter.addEventListener('click', () => {
            const filterValue = filter.getAttribute('data-filter');

            document.querySelectorAll('.bth-filter-item').forEach(f => f.classList.remove('bth-active'));
            filter.classList.add('bth-active');

            document.querySelectorAll('.bth-comp-card').forEach(card => {
                const category = card.getAttribute('data-category');
                const status = card.getAttribute('data-status');

                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (filterValue === 'live' && status === 'live') {
                    card.style.display = 'block';
                } else if (filterValue === 'upcoming' && status === 'upcoming') {
                    card.style.display = 'block';
                } else if (filterValue === 'ended' && status === 'ended') {
                    card.style.display = 'block';
                } else if (filterValue === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal functions
    window.bthOpenModal = function (modalId) {
        document.getElementById(modalId).classList.add('bth-active');
    };

    window.bthCloseModal = function (modalId) {
        document.getElementById(modalId).classList.remove('bth-active');
    };

    // Close modal on backdrop click
    document.querySelectorAll('.bth-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('bth-active');
            }
        });
    });

    // Form submissions
    document.getElementById('submit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Project submitted successfully!');
        bthCloseModal('submit-modal');
        e.target.reset();
    });

    document.getElementById('create-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Competition created successfully!');
        bthCloseModal('create-modal');
        e.target.reset();
    });

    // Search functionality
    const searchInput = document.querySelector('.bth-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.bth-comp-card').forEach(card => {
                const title = card.querySelector('.bth-comp-title').textContent.toLowerCase();
                const desc = card.querySelector('.bth-comp-desc').textContent.toLowerCase();
                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Animate stats on load
    document.querySelectorAll('.bth-stat-value').forEach(stat => {
        const text = stat.textContent;
        const hasK = text.includes('K');
        const hasDollar = text.includes('$');
        const target = parseInt(text.replace(/\D/g, ''));
        let current = 0;
        const increment = target / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                let display = target;
                if (hasDollar) display = '$' + display + (hasK ? 'K' : '');
                else if (hasK) display = display + 'K';
                stat.textContent = display;
                clearInterval(timer);
            } else {
                let display = Math.floor(current);
                if (hasDollar) display = '$' + display + (hasK ? 'K' : '');
                else if (hasK) display = display + 'K';
                stat.textContent = display;
            }
        }, 30);
    });

    // Join/Register button handlers
    document.querySelectorAll('.bth-btn-primary').forEach(btn => {
        if (btn.textContent.includes('Join') || btn.textContent.includes('Register')) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.bth-comp-card');
                if (card) {
                    const compTitle = card.querySelector('.bth-comp-title').textContent;
                    alert(`Successfully joined: ${compTitle}`);
                }
            });
        }
    });

    // Details button handlers
    document.querySelectorAll('.bth-btn-secondary').forEach(btn => {
        if (btn.textContent.includes('Details') || btn.textContent.includes('Learn More')) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                bthOpenModal('submit-modal');
            });
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.bth-modal').forEach(modal => {
                modal.classList.remove('bth-active');
            });
        }
    });

    // Auto-hide header on scroll (desktop only)
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const currentScroll = window.pageYOffset;
            const header = document.querySelector('.bth-header');
            const nav = document.querySelector('.bth-nav-wrapper');

            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
                nav.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
                nav.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }
    });

    // Clear validation on input
    document.querySelectorAll('.bth-form-input, .bth-form-textarea, .bth-form-select').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--bth-border)';
        });
    });

    // Lazy load cards
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bth-comp-card, .bth-project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    console.log('Builderthon Platform Initialized');
})();
