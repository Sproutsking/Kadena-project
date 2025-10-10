// ============================================
// WALLET MANAGER - Complete Implementation
// ============================================

class WalletManager {
    constructor() {
        this.currentTab = 'send';
        this.currentP2PTab = 'buy';
        this.balances = {
            kda: 125.48,
            ngn: 45230,
            usd: 1483.64,
            escrow: 15000
        };
        this.exchangeRates = {
            kda: 1.18,
            btc: 45000,
            eth: 2500
        };
        this.transactions = [];
        this.p2pOffers = [];
        this.p2pOrders = [];
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.generateMockData();
        this.bindEvents();
        this.startLiveUpdates();
        this.showTab('send');
    }

    // ============================================
    // EVENT BINDINGS
    // ============================================
    bindEvents() {
        // Wallet tab switching
        document.querySelectorAll('.wallet-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = this.getTabName(e.currentTarget);
                this.switchWalletTab(e.currentTarget, tabName);
            });
        });

        // P2P navigation
        document.querySelectorAll('.p2p-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchP2PTab(e.currentTarget.textContent.toLowerCase().trim());
            });
        });

        // Send form
        const sendBtn = document.querySelector('#send .btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendTransaction());
        }

        // Copy address button
        const copyBtn = document.querySelector('#receive .btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyAddress());
        }

        // Convert button
        const convertBtn = document.querySelector('#convert .btn');
        if (convertBtn) {
            convertBtn.addEventListener('click', () => this.convertAssets());
        }

        // Modal close
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeTradeModal());
        }

        // Click outside modal to close
        const modal = document.getElementById('tradeModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeTradeModal();
                }
            });
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeTradeModal();
            }
        });
    }

    // ============================================
    // TAB SWITCHING
    // ============================================
    getTabName(element) {
        const icon = element.querySelector('i');
        if (!icon) return 'send';
        
        if (icon.classList.contains('bx-send')) return 'send';
        if (icon.classList.contains('bx-download')) return 'receive';
        if (icon.classList.contains('bx-transfer')) return 'convert';
        if (icon.classList.contains('bx-group')) return 'p2p';
        if (icon.classList.contains('bx-time-five')) return 'history';
        
        return 'send';
    }

    switchWalletTab(clickedTab, tabName) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Update active tab button
        document.querySelectorAll('.wallet-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        clickedTab.classList.add('active');

        // Hide all content sections with fade out
        document.querySelectorAll('.wallet .content').forEach(content => {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            setTimeout(() => {
                content.classList.remove('active');
                // Don't set display:none, let CSS handle it
            }, 300);
        });

        // Show selected content with fade in
        setTimeout(() => {
            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                // Don't force display:grid, let CSS handle responsive display
                setTimeout(() => {
                    targetContent.classList.add('active');
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                }, 50);
            }
            
            this.currentTab = tabName;
            
            // Initialize P2P if needed
            if (tabName === 'p2p') {
                this.initP2P();
            }
            
            this.isAnimating = false;
        }, 350);

        // Add ripple effect
        this.createRipple(clickedTab, event);
    }

    showTab(tabName) {
        document.querySelectorAll('.wallet .content').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
            // Remove inline display style to let CSS handle it
            content.style.removeProperty('display');
        });

        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            // Let CSS grid handle the display, just toggle active class
            targetContent.style.removeProperty('display');
            setTimeout(() => {
                targetContent.classList.add('active');
            }, 50);
        }
    }

    // ============================================
    // SEND TRANSACTION
    // ============================================
    sendTransaction() {
        const addressInput = document.querySelector('#send input[placeholder="k:recipient-address"]');
        const amountInput = document.querySelector('#send input[placeholder="0.00"]');
        const speedSelect = document.querySelector('#send select');

        const address = addressInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const speed = speedSelect.value;

        // Validation
        if (!address || address.length < 10) {
            this.showNotification('Please enter a valid recipient address', 'error');
            this.shakeElement(addressInput);
            return;
        }

        if (!amount || amount <= 0) {
            this.showNotification('Please enter a valid amount', 'error');
            this.shakeElement(amountInput);
            return;
        }

        if (amount > this.balances.kda) {
            this.showNotification('Insufficient balance', 'error');
            this.shakeElement(amountInput);
            return;
        }

        // Process transaction
        this.balances.kda -= amount;
        
        const transaction = {
            id: `TX${Date.now()}`,
            type: 'send',
            amount: amount,
            address: address,
            speed: speed,
            timestamp: new Date(),
            status: 'pending'
        };

        this.transactions.unshift(transaction);

        // Update UI
        this.updateBalances();
        this.updateRecentTransactions();

        // Clear form
        addressInput.value = '';
        amountInput.value = '';

        // Show success with animation
        this.showNotification(`Successfully sent ${amount} KDA!`, 'success');
        this.pulseElement(document.querySelector('#send .btn'));

        // Simulate transaction confirmation
        setTimeout(() => {
            transaction.status = 'confirmed';
            this.showNotification('Transaction confirmed!', 'success');
        }, 3000);
    }

    // ============================================
    // COPY ADDRESS
    // ============================================
    copyAddress() {
        const addressInput = document.querySelector('#receive input[readonly]');
        const address = addressInput.value;

        navigator.clipboard.writeText(address).then(() => {
            this.showNotification('Address copied to clipboard!', 'success');
            this.pulseElement(addressInput);
            
            // Visual feedback
            const originalBg = addressInput.style.background;
            addressInput.style.background = 'rgba(16, 185, 129, 0.1)';
            setTimeout(() => {
                addressInput.style.background = originalBg;
            }, 500);
        }).catch(() => {
            this.showNotification('Failed to copy address', 'error');
        });
    }

    // ============================================
    // CONVERT ASSETS
    // ============================================
    convertAssets() {
        const fromInput = document.querySelector('#convert input[placeholder="0.00"]:not([readonly])');
        const fromSelect = document.querySelectorAll('#convert select')[0];
        const toInput = document.querySelector('#convert input[readonly]');
        const toSelect = document.querySelectorAll('#convert select')[1];

        const fromAmount = parseFloat(fromInput.value);
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;

        if (!fromAmount || fromAmount <= 0) {
            this.showNotification('Please enter an amount to convert', 'error');
            this.shakeElement(fromInput);
            return;
        }

        // Calculate conversion
        const fromRate = this.exchangeRates[fromCurrency.toLowerCase()] || 1;
        const toRate = this.exchangeRates[toCurrency.toLowerCase()] || 1;
        const convertedAmount = (fromAmount * fromRate) / toRate;

        // Update balances
        if (fromCurrency === 'KDA') this.balances.kda -= fromAmount;
        if (toCurrency === 'KDA') this.balances.kda += convertedAmount;

        this.updateBalances();

        // Show result
        toInput.value = convertedAmount.toFixed(6);
        this.showNotification(`Converted ${fromAmount} ${fromCurrency} to ${convertedAmount.toFixed(6)} ${toCurrency}!`, 'success');
        this.pulseElement(toInput);

        // Add to transaction history
        this.transactions.unshift({
            id: `CV${Date.now()}`,
            type: 'convert',
            from: fromCurrency,
            to: toCurrency,
            amount: fromAmount,
            result: convertedAmount,
            timestamp: new Date(),
            status: 'confirmed'
        });

        this.updateRecentTransactions();
    }

    // ============================================
    // P2P MARKETPLACE
    // ============================================
    initP2P() {
        if (this.p2pOffers.length === 0) {
            this.generateP2POffers();
        }
        this.renderP2POffers();
    }

    switchP2PTab(tabName) {
        // Update active button
        document.querySelectorAll('.p2p-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase().trim() === tabName) {
                btn.classList.add('active');
            }
        });

        // Hide all P2P sections
        document.querySelectorAll('.p2p-section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Map tab names to section IDs
        const tabMap = {
            'buy': 'p2p-buy',
            'sell': 'p2p-sell',
            'my orders': 'p2p-orders',
            'create ad': 'p2p-create',
            'profile': 'p2p-profile'
        };

        const sectionId = tabMap[tabName];
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.style.display = 'block';
            setTimeout(() => {
                section.classList.add('active');
            }, 50);
        }

        this.currentP2PTab = tabName;
        
        if (tabName === 'buy' || tabName === 'sell') {
            this.renderP2POffers();
        }
    }

    generateP2POffers() {
        const traders = ['CryptoKing', 'BlockchainPro', 'KDATrader', 'BitMaster', 'CoinGuru'];
        
        for (let i = 0; i < 20; i++) {
            this.p2pOffers.push({
                id: i + 1,
                trader: traders[Math.floor(Math.random() * traders.length)],
                trades: Math.floor(Math.random() * 2000) + 100,
                rate: 1150 + Math.random() * 100,
                available: Math.floor(Math.random() * 1000) + 100,
                minLimit: 25000 + Math.floor(Math.random() * 25000),
                maxLimit: 200000 + Math.floor(Math.random() * 300000),
                payment: ['Bank Transfer', 'Mobile Money', 'Bank, PayPal'][Math.floor(Math.random() * 3)],
                timeLimit: [15, 20, 30][Math.floor(Math.random() * 3)],
                type: Math.random() > 0.5 ? 'buy' : 'sell'
            });
        }
    }

    renderP2POffers() {
        const buyContainer = document.querySelector('#p2p-buy .offer-container');
        const sellContainer = document.querySelector('#p2p-sell .offer-container');

        if (!buyContainer || !sellContainer) return;

        const buyOffers = this.p2pOffers.filter(o => o.type === 'buy').slice(0, 6);
        const sellOffers = this.p2pOffers.filter(o => o.type === 'sell').slice(0, 6);

        // Clear existing offers (keep first 4 as templates)
        while (buyContainer.children.length > 4) {
            buyContainer.removeChild(buyContainer.lastChild);
        }
        while (sellContainer.children.length > 6) {
            sellContainer.removeChild(sellContainer.lastChild);
        }

        // Update existing offers with live data
        this.updateOfferCards(buyContainer, buyOffers.slice(0, 4));
        this.updateOfferCards(sellContainer, sellOffers.slice(0, 6));
    }

    updateOfferCards(container, offers) {
        const cards = container.querySelectorAll('.offer');
        offers.forEach((offer, index) => {
            if (cards[index]) {
                const rateValue = cards[index].querySelector('.rate-value');
                const availableValue = cards[index].querySelectorAll('.detail-value')[0];
                
                if (rateValue) {
                    rateValue.textContent = `₦${Math.floor(offer.rate).toLocaleString()}`;
                }
                if (availableValue) {
                    availableValue.textContent = `${offer.available} KDA`;
                }
            }
        });
    }

    // ============================================
    // TRADE MODAL
    // ============================================
    openTradeModal(type, trader) {
        const modal = document.getElementById('tradeModal');
        const title = document.getElementById('modalTitle');
        
        if (!modal || !title) return;

        title.textContent = `${type.toUpperCase()} KDA from ${trader}`;
        modal.style.display = 'flex';
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Bind confirm button
        const confirmBtn = modal.querySelector('.btn');
        if (confirmBtn) {
            confirmBtn.onclick = () => this.confirmTrade(type, trader);
        }
    }

    confirmTrade(type, trader) {
        const amountInput = document.querySelector('#tradeModal input[type="number"]');
        const amount = parseFloat(amountInput.value);

        if (!amount || amount <= 0) {
            this.showNotification('Please enter a valid amount', 'error');
            return;
        }

        // Create order
        const order = {
            id: `ORD${Date.now()}`,
            type: type,
            trader: trader,
            amount: amount,
            status: 'pending',
            timestamp: new Date()
        };

        this.p2pOrders.unshift(order);
        this.closeTradeModal();
        this.showNotification(`${type.toUpperCase()} order created successfully!`, 'success');
    }

    closeTradeModal() {
        const modal = document.getElementById('tradeModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    // ============================================
    // UI UPDATES
    // ============================================
    updateBalances() {
        // Update all balance displays
        document.querySelectorAll('.balance-value').forEach(el => {
            const label = el.previousElementSibling.textContent;
            
            if (label === 'KDA') {
                el.textContent = this.balances.kda.toFixed(2);
                this.animateNumber(el, this.balances.kda);
            } else if (label === 'NGN') {
                el.textContent = `₦${this.balances.ngn.toLocaleString()}`;
                this.animateNumber(el, this.balances.ngn, '₦');
            } else if (label === 'Escrow') {
                el.textContent = `₦${this.balances.escrow.toLocaleString()}`;
            } else if (label === 'Available') {
                const available = this.balances.ngn - this.balances.escrow;
                el.textContent = `₦${available.toLocaleString()}`;
            }
        });
    }

    updateRecentTransactions() {
        const recent = this.transactions.slice(0, 2);
        const containers = document.querySelectorAll('#send .card:last-child, #history .card:first-child');
        
        containers.forEach(container => {
            const txElements = container.querySelectorAll('.transaction');
            recent.forEach((tx, index) => {
                if (txElements[index]) {
                    const icon = txElements[index].querySelector('.tx-icon');
                    const title = txElements[index].querySelector('.tx-title');
                    const amount = txElements[index].querySelector('.tx-amount');
                    
                    if (icon) {
                        icon.textContent = tx.type === 'send' ? '↑' : '↓';
                        icon.className = `tx-icon ${tx.type}`;
                    }
                    if (title) {
                        title.textContent = tx.type === 'send' ? 'Sent' : 'Received';
                    }
                    if (amount) {
                        const sign = tx.type === 'send' ? '-' : '+';
                        amount.textContent = `${sign}${tx.amount}`;
                        amount.style.color = tx.type === 'send' ? 'var(--danger)' : 'var(--success)';
                    }
                }
            });
        });
    }

    // ============================================
    // ANIMATIONS
    // ============================================
    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    shakeElement(element) {
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    pulseElement(element) {
        element.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    animateNumber(element, target, prefix = '') {
        const current = parseFloat(element.textContent.replace(/[^0-9.]/g, '')) || 0;
        const duration = 500;
        const steps = 20;
        const increment = (target - current) / steps;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            const value = current + (increment * step);
            
            if (prefix) {
                element.textContent = `${prefix}${Math.floor(value).toLocaleString()}`;
            } else {
                element.textContent = value.toFixed(2);
            }

            if (step >= steps) {
                clearInterval(interval);
                if (prefix) {
                    element.textContent = `${prefix}${Math.floor(target).toLocaleString()}`;
                } else {
                    element.textContent = target.toFixed(2);
                }
            }
        }, duration / steps);
    }

    // ============================================
    // NOTIFICATIONS
    // ============================================
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `wallet-notification ${type}`;
        notification.textContent = message;
        
        const icon = type === 'success' ? '✓' : '✕';
        notification.innerHTML = `<span>${icon}</span> ${message}`;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ============================================
    // LIVE UPDATES
    // ============================================
    startLiveUpdates() {
        // Update exchange rates
        setInterval(() => {
            Object.keys(this.exchangeRates).forEach(currency => {
                const change = (Math.random() - 0.5) * 0.02;
                this.exchangeRates[currency] *= (1 + change);
            });

            // Update exchange rate display in convert tab
            const rateDisplay = document.querySelector('#convert .card:last-child div[style*="font-size: 2rem"]');
            if (rateDisplay) {
                rateDisplay.textContent = `$${this.exchangeRates.kda.toFixed(2)}`;
            }
        }, 5000);

        // Update P2P offers
        setInterval(() => {
            if (this.currentTab === 'p2p') {
                this.p2pOffers.forEach(offer => {
                    offer.rate += (Math.random() - 0.5) * 5;
                    offer.rate = Math.max(1100, Math.min(1250, offer.rate));
                });
                this.renderP2POffers();
            }
        }, 10000);

        // Random notification
        setInterval(() => {
            if (Math.random() > 0.7) {
                const messages = [
                    'New P2P offer available!',
                    'Price alert: KDA price changed',
                    'Transaction confirmed'
                ];
                this.showNotification(messages[Math.floor(Math.random() * messages.length)], 'info');
            }
        }, 30000);
    }

    // ============================================
    // MOCK DATA GENERATION
    // ============================================
    generateMockData() {
        // Generate initial transactions
        for (let i = 0; i < 10; i++) {
            this.transactions.push({
                id: `TX${1000 + i}`,
                type: Math.random() > 0.5 ? 'send' : 'receive',
                amount: Math.random() * 100 + 10,
                timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
                status: 'confirmed'
            });
        }
    }
}

// ============================================
// GLOBAL FUNCTIONS (for HTML onclick handlers)
// ============================================
function switchTab(element, tabName) {
    if (window.walletManager) {
        window.walletManager.switchWalletTab(element, tabName);
    }
}

function switchP2P(tabName) {
    if (window.walletManager) {
        window.walletManager.switchP2PTab(tabName);
    }
}

function openTrade(type, trader) {
    if (window.walletManager) {
        window.walletManager.openTradeModal(type, trader);
    }
}

function closeModal() {
    if (window.walletManager) {
        window.walletManager.closeTradeModal();
    }
}

// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Wallet Manager...');
    window.walletManager = new WalletManager();
    console.log('✅ Wallet Manager Ready!');

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .wallet .content {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .wallet .content:not(.active) {
            display: none !important;
        }

        .wallet-tab {
            transition: all 0.3s ease;
        }

        .wallet-tab:hover {
            transform: translateY(-2px);
        }

        .wallet-tab.active {
            transform: translateY(0);
        }

        .btn {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .btn:active {
            transform: translateY(0);
        }

        .modal {
            transition: opacity 0.3s ease;
        }

        .modal.show {
            opacity: 1;
        }

        .modal-content {
            animation: slideInUp 0.3s ease-out;
        }

        @keyframes slideInUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .offer {
            transition: all 0.3s ease;
        }

        .offer:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .p2p-btn {
            transition: all 0.3s ease;
        }

        .p2p-btn:hover {
            transform: translateY(-2px);
        }

        .transaction {
            transition: all 0.3s ease;
        }

        .transaction:hover {
            background: rgba(255,255,255,0.05);
            transform: translateX(5px);
        }

        .input:focus, .select:focus {
            transform: scale(1.02);
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
    `;
    document.head.appendChild(style);
});

console.log('💎 Wallet Script Loaded Successfully!');
