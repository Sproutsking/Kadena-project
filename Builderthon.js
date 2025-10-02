// Main tab functionality
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.main-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Competition detail view
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('.competitions-grid').style.display = 'none';
                document.querySelector('.stats').style.display = 'none';
                document.getElementById('competition-detail').style.display = 'block';
                
                // Load submissions for detail view
                loadSubmissions();
            });
        });

        // Back to competitions
        document.querySelector('.back-btn').addEventListener('click', () => {
            document.querySelector('.competitions-grid').style.display = 'grid';
            document.querySelector('.stats').style.display = 'grid';
            document.getElementById('competition-detail').style.display = 'none';
        });

        // Detail tabs
        document.querySelectorAll('.detail-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.detail-section').forEach(s => s.classList.remove('active'));
                
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-detail-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Submit project modal
        document.querySelectorAll('.submit-project-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('submit-modal').classList.add('active');
            });
        });

        // Create competition modal
        document.querySelectorAll('.create-competition-btn, .create-comp-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('create-competition-modal').classList.add('active');
            });
        });

        // Close modals
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.form-modal').forEach(modal => {
                    modal.classList.remove('active');
                });
            });
        });

        // Close modal on outside click
        document.querySelectorAll('.form-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Form submissions
        document.getElementById('submit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Project submitted successfully! 🎉');
            document.getElementById('submit-modal').classList.remove('active');
        });

        document.getElementById('create-competition-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Competition created successfully! 🚀');
            document.getElementById('create-competition-modal').classList.remove('active');
        });

        // Join competition
        document.querySelectorAll('.join-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                alert('Welcome to the competition! 🚀');
            });
        });

        // Vote functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('vote-btn')) {
                const currentVotes = parseInt(e.target.textContent.match(/\d+/)[0]);
                e.target.textContent = `👍 Vote (${currentVotes + 1})`;
                e.target.style.background = 'var(--accent)';
                e.target.disabled = true;
                
                setTimeout(() => {
                    e.target.style.background = 'var(--success)';
                }, 300);
            }
        });

        // Load submissions function
        function loadSubmissions() {
            const submissionsContainer = document.getElementById('submissions');
            submissionsContainer.innerHTML = `
                <div class="submissions-list">
                    <div class="submission-card">
                        <div class="submission-header">
                            <div class="builder-info">
                                <div class="builder-avatar">AK</div>
                                <div>
                                    <div class="project-name">KadenaSwap Pro</div>
                                    <div class="builder-name">@alexkadena</div>
                                </div>
                            </div>
                            <button class="vote-btn">👍 Vote (42)</button>
                        </div>
                        <p style="color: var(--text-dim); margin-bottom: 1rem;">
                            Advanced DEX with cross-chain capabilities and yield farming features.
                        </p>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <span style="background: var(--primary); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">#DeFi</span>
                            <span style="background: var(--secondary); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">#DEX</span>
                        </div>
                    </div>

                    <div class="submission-card">
                        <div class="submission-header">
                            <div class="builder-info">
                                <div class="builder-avatar">MR</div>
                                <div>
                                    <div class="project-name">Yield Optimizer</div>
                                    <div class="builder-name">@maria_dev</div>
                                </div>
                            </div>
                            <button class="vote-btn">👍 Vote (38)</button>
                        </div>
                        <p style="color: var(--text-dim); margin-bottom: 1rem;">
                            Automated yield farming strategy optimizer with risk management.
                        </p>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <span style="background: var(--accent); color: black; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">#Yield</span>
                            <span style="background: var(--warning); color: black; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">#Automation</span>
                        </div>
                    </div>

                    <div class="submission-card">
                        <div class="submission-header">
                            <div class="builder-info">
                                <div class="builder-avatar">JD</div>
                                <div>
                                    <div class="project-name">Cross-Chain Bridge</div>
                                    <div class="builder-name">@john_dev</div>
                                </div>
                            </div>
                            <button class="vote-btn">👍 Vote (51)</button>
                        </div>
                        <p style="color: var(--text-dim); margin-bottom: 1rem;">
                            Secure cross-chain bridge enabling seamless asset transfers.
                        </p>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <span style="background: var(--secondary); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">#Bridge</span>
                            <span style="background: var(--primary); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">#CrossChain</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Animate stats on load
        document.addEventListener('DOMContentLoaded', () => {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = stat.textContent.includes('K') ? `${target}K` : target;
                        clearInterval(timer);
                    } else {
                        const display = Math.floor(current);
                        stat.textContent = stat.textContent.includes('K') ? `${display}K` : display;
                    }
                }, 30);
            });
        });
