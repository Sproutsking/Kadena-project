// Tab switching functionality
        document.addEventListener('DOMContentLoaded', function() {
            const tabs = document.querySelectorAll('.nav-tab');
            const subsections = document.querySelectorAll('.subsection');

                                tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and subsections
                    tabs.forEach(t => t.classList.remove('active'));
                    subsections.forEach(s => s.classList.remove('active'));

                    // Add active class to clicked tab and corresponding subsection
                    tab.classList.add('active');
                    const sectionId = tab.getAttribute('data-section');
                    document.getElementById(sectionId).classList.add('active');
                });
            });
        });

        // Payment processing simulation
        function processPayment() {
            const billType = document.getElementById('billType').value;
            const amountInput = document.querySelector('.amount-input');
            
            if (billType === 'Select Bill Type' || !amountInput.value) {
                alert('Please select bill type and enter amount');
                return;
            }

            // Simulate payment processing
            const btn = event.target;
            const originalText = btn.textContent;
            
            btn.textContent = 'Processing...';
            btn.style.background = 'var(--warning-color)';
            
            setTimeout(() => {
                btn.textContent = '✓ Payment Successful!';
                btn.style.background = 'var(--success-color)';
                
                // Add to recent transactions
                addRecentTransaction(billType, amountInput.value);
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'var(--button-gradient)';
                    amountInput.value = '';
                }, 2000);
            }, 2000);
        }

        function addRecentTransaction(billType, amount) {
            const recentBills = document.querySelector('.recent-bills');
            const billItem = document.createElement('div');
            billItem.className = 'bill-item';
            billItem.style.animation = 'slideInLeft 0.5s ease';
            
            billItem.innerHTML = `
                <div class="bill-info">
                    <div class="bill-name">${billType}</div>
                    <div class="bill-date">Just now</div>
                </div>
                <div class="bill-amount">${amount}</div>
            `;
            
            recentBills.insertBefore(billItem, recentBills.children[1]);
        }

        // Staking animations
        function animateCounters() {
            const counters = document.querySelectorAll('.info-value');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                if (target) {
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = counter.textContent.replace(/[0-9,]+/, Math.floor(current).toLocaleString());
                    }, 50);
                }
            });
        }

        // Savings goal progress animation
        function animateProgress() {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }


        // Particle animation
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            
            document.querySelector('.floating-particles').appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 6000);
        }

        // Create particles periodically
        setInterval(createParticle, 2000);

        // Initialize animations when sections become active
        document.addEventListener('DOMContentLoaded', function() {
            // Initial animation for active section
            setTimeout(animateCounters, 1000);
            setTimeout(animateProgress, 1500);
        });

        // Re-animate when switching tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                setTimeout(() => {
                    if (tab.getAttribute('data-section') === 'staking') {
                        animateCounters();
                    }
                    if (tab.getAttribute('data-section') === 'savings') {
                        animateProgress();
                    }
                }, 200);
            });
        });

        // Add CSS animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInLeft {
                from { transform: translateX(-100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 5px var(--accent-color); }
                50% { box-shadow: 0 0 20px var(--accent-color), 0 0 30px var(--accent-color); }
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);

        // Enhanced staking functionality
        function joinStakingPool(poolType) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 1000;
                animation: slideInRight 0.5s ease;
            `;
            notification.textContent = `Successfully joined ${poolType} pool!`;
            document.body.appendChild(notification);
            
            setTimeout(() => notification.remove(), 3000);
        }

        // Real-time savings calculator
        function calculateSavings(principal, rate, time) {
            const compoundInterest = principal * Math.pow((1 + rate/100/365), 365 * time);
            return compoundInterest - principal;
        }

        // Dynamic APY updates
        function updateAPYRates() {
            const apyElements = document.querySelectorAll('.pool-apy');
            apyElements.forEach(el => {
                const currentRate = parseFloat(el.textContent);
                const fluctuation = (Math.random() - 0.5) * 2; // ±1% fluctuation
                const newRate = Math.max(0, currentRate + fluctuation);
                el.textContent = newRate.toFixed(1) + '%';
                
                if (fluctuation > 0) {
                    el.style.color = 'var(--success-color)';
                } else {
                    el.style.color = 'var(--error-color)';
                }
                
                setTimeout(() => {
                    el.style.color = '';
                }, 2000);
            });
        }

        // Update rates every 30 seconds
        setInterval(updateAPYRates, 30000);

        // Enhanced goal progress tracking
        function updateGoalProgress() {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const currentWidth = parseInt(bar.style.width);
                if (currentWidth < 100) {
                    const increment = Math.random() * 2;
                    const newWidth = Math.min(100, currentWidth + increment);
                    bar.style.width = newWidth + '%';
                    bar.style.setProperty('--progress', newWidth + '%');
                }
            });
        }

        // Auto-save simulation
        function simulateAutoSave() {
            const savings = document.querySelector('.stat-card .info-value');
            if (savings) {
                const currentAmount = parseFloat(savings.textContent.replace(/[₦,]/g, ''));
                const autoSaveAmount = Math.random() * 1000 + 100;
                const newAmount = currentAmount + autoSaveAmount;
                
                savings.textContent = '₦' + newAmount.toLocaleString() + 'K';
                savings.style.animation = 'bounce 1s ease';
                
                setTimeout(() => {
                    savings.style.animation = '';
                }, 1000);
            }
        }

        // Simulate auto-save every 2 minutes
        setInterval(simulateAutoSave, 120000);

        // Smart contract interaction simulation
        function interactWithContract(action, amount) {
            console.log(`Interacting with smart contract: ${action} - ${amount}`);
            
            const loadingOverlay = document.createElement('div');
            loadingOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                color: white;
                font-size: 1.5rem;
            `;
            loadingOverlay.innerHTML = `
                <div style="text-align: center;">
                    <div style="animation: rotate 2s linear infinite;">⚡</div>
                    <div>Processing on Kadena blockchain...</div>
                </div>
            `;
            
            document.body.appendChild(loadingOverlay);
            
            setTimeout(() => {
                loadingOverlay.remove();
                showSuccessMessage(`${action} completed successfully!`);
            }, 3000);
        }

        function showSuccessMessage(message) {
            const successDiv = document.createElement('div');
            successDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--success-color);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                z-index: 10001;
                animation: bounce 0.5s ease;
                text-align: center;
                font-size: 1.2rem;
            `;
            successDiv.innerHTML = `
                <div>✅ ${message}</div>
                <div style="margin-top: 1rem; font-size: 0.9rem;">Transaction hash: 0xabc...def</div>
            `;
            
            document.body.appendChild(successDiv);
            setTimeout(() => successDiv.remove(), 4000);
        }
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        // Add event listeners to all buttons
        document.addEventListener('DOMContentLoaded', function() {
            // Staking buttons
            document.querySelectorAll('.staking-pool .btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const poolType = this.closest('.staking-pool').querySelector('.card-title').textContent;
                    interactWithContract('Stake', '1000 KDA');
                });
            });

            // Savings buttons
            document.querySelectorAll('.savings-plan .btn-primary').forEach(btn => {
                btn.addEventListener('click', function() {
                    const planType = this.closest('.savings-plan').querySelector('.plan-title').textContent;
                    interactWithContract('Create Savings Plan', planType);
                });
            });

            // Quick action buttons in savings tracker
            document.querySelectorAll('.savings-tracker .btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.textContent;
                    interactWithContract(action, '50K');
                });
            });
        });

        // Real-time data updates
        function startRealTimeUpdates() {
            setInterval(() => {
                updateGoalProgress();
                
                // Update random stats
                const statValues = document.querySelectorAll('.info-value');
                statValues.forEach(stat => {
                    if (Math.random() > 0.7) { // 30% chance to update
                        const isKDA = stat.textContent.includes('KDA');
                        const isPercent = stat.textContent.includes('%');
                        
                        if (isPercent) {
                            const current = parseFloat(stat.textContent);
                            const change = (Math.random() - 0.5) * 2;
                            stat.textContent = (current + change).toFixed(1) + '%';
                        }
                    }
                });
            }, 10000);
        }

        startRealTimeUpdates();

        console.log('🚀 African Finance Hub Enhanced - Fully Loaded!');
