// Sample P2P offers data
        const sampleOffers = {
            buy: [
                {
                    id: 1,
                    trader: {
                        name: "CryptoKing",
                        avatar: "CK",
                        status: "online",
                        completedOrders: 1247
                    },
                    asset: "KDA",
                    amount: "1000",
                    rate: 1200,
                    currency: "NGN",
                    limits: { min: 50000, max: 500000 },
                    paymentMethods: ["Bank Transfer", "Mobile Money"]
                },
                {
                    id: 2,
                    trader: {
                        name: "BlockchainPro",
                        avatar: "BP",
                        status: "online",
                        completedOrders: 892
                    },
                    asset: "KDA",
                    amount: "750",
                    rate: 1180,
                    currency: "NGN",
                    limits: { min: 25000, max: 300000 },
                    paymentMethods: ["Bank Transfer", "PayPal"]
                },
                {
                    id: 3,
                    trader: {
                        name: "TradeMaster",
                        avatar: "TM",
                        status: "away",
                        completedOrders: 2156
                    },
                    asset: "KDA",
                    amount: "2000",
                    rate: 1220,
                    currency: "NGN",
                    limits: { min: 100000, max: 1000000 },
                    paymentMethods: ["Bank Transfer"]
                }
            ],
            sell: [
                {
                    id: 4,
                    trader: {
                        name: "KDATrader",
                        avatar: "KT",
                        status: "online",
                        completedOrders: 567
                    },
                    asset: "KDA",
                    amount: "500",
                    rate: 1150,
                    currency: "NGN",
                    limits: { min: 30000, max: 250000 },
                    paymentMethods: ["Mobile Money", "Bank Transfer"]
                },
                {
                    id: 5,
                    trader: {
                        name: "CryptoWhale",
                        avatar: "CW",
                        status: "online",
                        completedOrders: 3421
                    },
                    asset: "KDA",
                    amount: "1500",
                    rate: 1140,
                    currency: "NGN",
                    limits: { min: 75000, max: 750000 },
                    paymentMethods: ["Bank Transfer", "PayPal"]
                }
            ]
        };
        
        let currentTradeData = null;
        let currentStep = 1;
        let currentOrderType = 'buy';
        
        // Initialize the P2P offers
        function initializeP2P() {
            renderOffers('buy');
            renderOffers('sell');
        }
        
        // Render offers based on type
        function renderOffers(type) {
            const container = document.getElementById(type + '-offers');
            const offers = sampleOffers[type];
            
            container.innerHTML = offers.map(offer => `
                <div class="p2p-offer" onclick="startTrade(${offer.id}, '${type}')">
                    <div class="offer-header">
                        <div class="trader-avatar">
                            <div class="avatar-circle">${offer.trader.avatar}</div>
                            <div class="trader-info">
                                <div class="trader-name">@${offer.trader.name}</div>
                                <div class="online-indicator">
                                    <span class="status-dot ${offer.trader.status === 'online' ? '' : 'status-away'}"></span>
                                    <span>${offer.trader.status}</span>
                                </div>
                            </div>
                        </div>
                        <div class="completion-rate">
                            <div class="value">${offer.trader.completedOrders}</div>
                            <div class="label">Completed</div>
                        </div>
                    </div>
                    
                    <div class="offer-details-grid">
                        <div class="offer-details">
                            <div class="detail-item">
                                <div class="label">Amount</div>
                                <div class="value asset-amount">${offer.amount} ${offer.asset}</div>
                            </div>
                            <div class="detail-item">
                                <div class="label">Limits</div>
                                <div class="value">₦${offer.limits.min.toLocaleString()} - ₦${offer.limits.max.toLocaleString()}</div>
                            </div>
                            <div class="detail-item">
                                <div class="label">Payment Methods</div>
                                <div class="value">
                                    ${offer.paymentMethods.map(method => `<span class="payment-method">${method}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <div class="offer-footer">
                            <div class="offer-price">
                                <div class="value">₦${offer.rate.toLocaleString()}</div>
                                <div class="label">per ${offer.asset}</div>
                            </div>
                            <button class="btn-${type}" onclick="event.stopPropagation(); startTrade(${offer.id}, '${type}')">
                                ${type.toUpperCase()} NOW
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        // Wallet tab switching
        function switchWalletTab(tabName) {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.wallet-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.wallet-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            event.target.classList.add('active');
            
            // Show corresponding content
            document.getElementById('wallet-' + tabName).classList.add('active');
        }
        
        // P2P tab switching
        function switchP2PTab(tabName) {
            // Remove active class from all P2P tabs and contents
            document.querySelectorAll('.p2p-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.p2p-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            event.target.classList.add('active');
            
            // Show corresponding content
            document.getElementById('p2p-' + tabName).classList.add('active');
            
            currentOrderType = tabName;
        }
        
        // Start trading process
        function startTrade(offerId, type) {
            const offers = [...sampleOffers.buy, ...sampleOffers.sell];
            const offer = offers.find(o => o.id === offerId);
            
            if (!offer) return;
            
            currentTradeData = { ...offer, tradeType: type };
            
            // Update modal title
            document.getElementById('modal-title').textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} from @${offer.trader.name}`;
            
            // Update form with offer data
            document.getElementById('trade-rate').value = `₦${offer.rate}/KDA`;
            document.getElementById('trade-amount').addEventListener('input', updateTotalPrice);
            
            // Reset to first step
            resetToStep(1);
            
            // Show modal
            document.getElementById('trading-modal').classList.add('active');
        }
        
        // Update total price calculation
        function updateTotalPrice() {
            const amount = parseFloat(document.getElementById('trade-amount').value) || 0;
            const rate = currentTradeData?.rate || 0;
            const total = amount * rate;
            document.getElementById('total-price').value = total > 0 ? `₦${total.toLocaleString()}` : '';
        }
        
        // Navigate to next step
        function nextStep(step) {
            if (step === 2) {
                const amount = document.getElementById('trade-amount').value;
                if (!amount || amount <= 0) {
                    alert('Please enter a valid amount');
                    return;
                }
            }
            
            // Update step indicators
            for (let i = 1; i <= 4; i++) {
                const stepEl = document.getElementById(`step-${i}`);
                const panelEl = document.getElementById(`panel-${i}`);
                
                if (i < step) {
                    stepEl.classList.add('completed');
                    stepEl.classList.remove('active');
                } else if (i === step) {
                    stepEl.classList.add('active');
                    stepEl.classList.remove('completed');
                } else {
                    stepEl.classList.remove('active', 'completed');
                }
                
                panelEl.classList.toggle('active', i === step);
            }
            
            currentStep = step;
            
            // Update confirmation data
            if (step === 3) {
                const amount = document.getElementById('trade-amount').value;
                const rate = currentTradeData?.rate || 0;
                const total = amount * rate;
                
                document.getElementById('confirm-amount').textContent = `${amount} KDA`;
                document.getElementById('confirm-rate').textContent = `₦${rate}/KDA`;
                document.getElementById('confirm-total').textContent = `₦${total.toLocaleString()}`;
            }
        }
        
        // Reset to specific step
        function resetToStep(step) {
            currentStep = step;
            for (let i = 1; i <= 4; i++) {
                const stepEl = document.getElementById(`step-${i}`);
                const panelEl = document.getElementById(`panel-${i}`);
                
                stepEl.classList.toggle('active', i === step);
                stepEl.classList.remove('completed');
                panelEl.classList.toggle('active', i === step);
            }
        }
        
        // Close modal
        function closeModal() {
            document.getElementById('trading-modal').classList.remove('active');
            resetToStep(1);
            
            // Clear form data
            document.getElementById('trade-amount').value = '';
            document.getElementById('total-price').value = '';
            document.getElementById('message-input').value = '';
        }
        
        // Send chat message
        function sendMessage() {
            const input = document.getElementById('message-input');
            const message = input.value.trim();
            
            if (!message) return;
            
            const messagesContainer = document.getElementById('chat-messages');
            
            // Add sent message
            const messageEl = document.createElement('div');
            messageEl.className = 'message sent';
            messageEl.textContent = message;
            messagesContainer.appendChild(messageEl);
            
            // Simulate response
            setTimeout(() => {
                const responseEl = document.createElement('div');
                responseEl.className = 'message received';
                responseEl.textContent = getRandomResponse();
                messagesContainer.appendChild(responseEl);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
            
            input.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        // Get random chat response
        function getRandomResponse() {
            const responses = [
                "Sounds good! Let's proceed.",
                "Payment details confirmed.",
                "Please double-check the amount.",
                "Ready when you are!",
                "Thanks for trading with me.",
                "Let me verify the details.",
                "All looks correct to me."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Handle Enter key in chat
        document.addEventListener('DOMContentLoaded', function() {
            const messageInput = document.getElementById('message-input');
            if (messageInput) {
                messageInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            }
        });
        
        // Add away status style
        const style = document.createElement('style');
        style.textContent = `
            .status-away {
                background: #ffd93d !important;
                box-shadow: 0 0 10px #ffd93d !important;
            }
        `;
        document.head.appendChild(style);
        
        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeP2P();
            
            // Add some floating particles for effect
            function createParticle() {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 3px;
                    height: 3px;
                    background: rgba(139, 92, 246, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: -1;
                    box-shadow: 0 0 6px rgba(139, 92, 246, 0.8);
                `;
                
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + 'px';
                
                document.body.appendChild(particle);
                
                const animation = particle.animate([
                    { transform: 'translateY(0px)', opacity: 0.6 },
                    { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
                ], {
                    duration: 4000 + Math.random() * 2000,
                    easing: 'linear'
                });
                
                animation.onfinish = () => particle.remove();
            }
            
            // Create particles periodically (only on desktop)
            if (window.innerWidth > 768) {
                setInterval(createParticle, 300);
            }
        });
        
        // Close modal when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.id === 'trading-modal') {
                closeModal();
            }
        });
        
