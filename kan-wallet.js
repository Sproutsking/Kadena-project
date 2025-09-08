// P2P Marketplace Class
class WalletP2PMarketplace {
    constructor() {
        this.currentTab = 'buy';
        this.offers = this.generateMockOffers();
        this.myOrders = this.generateMockOrders();
        this.balances = {
            kda: 125.48,
            ngn: 45230.00,
            escrow: 15000.00
        };
    }

    generateMockOffers() {
        const offers = [];
        const currencies = ['KDA', 'BTC', 'ETH', 'USDT'];
        const paymentMethods = ['Bank Transfer', 'Mobile Money', 'Cash'];
        const traderNames = ['CryptoKing', 'TraderPro', 'BitMaster', 'CoinGuru', 'BlockChamp'];

        for (let i = 0; i < 15; i++) {
            const currency = currencies[Math.floor(Math.random() * currencies.length)];
            const isBuy = Math.random() > 0.5;
            const baseRate = currency === 'KDA' ? 195 : currency === 'BTC' ? 45000000 : currency === 'ETH' ? 2500000 : 1600;
            const rate = baseRate + (Math.random() - 0.5) * baseRate * 0.05;

            offers.push({
                id: i + 1,
                type: isBuy ? 'buy' : 'sell',
                currency,
                rate: rate,
                minLimit: Math.floor(Math.random() * 50000) + 10000,
                maxLimit: Math.floor(Math.random() * 500000) + 100000,
                paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                trader: traderNames[Math.floor(Math.random() * traderNames.length)],
                rating: (Math.random() * 2 + 3).toFixed(1),
                completionRate: Math.floor(Math.random() * 20 + 80),
                available: Math.floor(Math.random() * 1000) + 100
            });
        }
        return offers;
    }

    generateMockOrders() {
        return [
            {
                id: 'ORD001',
                type: 'buy',
                currency: 'KDA',
                amount: 50,
                rate: 195.50,
                status: 'pending',
                trader: 'CryptoKing',
                progress: 25
            },
            {
                id: 'ORD002',
                type: 'sell',
                currency: 'KDA',
                amount: 25,
                rate: 198.20,
                status: 'escrow',
                trader: 'TraderPro',
                progress: 75
            },
            {
                id: 'ORD003',
                type: 'buy',
                currency: 'BTC',
                amount: 0.001,
                rate: 45000000,
                status: 'completed',
                trader: 'BitMaster',
                progress: 100
            }
        ];
    }

    init() {
        this.bindEvents();
        this.renderOffers();
        this.renderRecentOrders();
        this.updateBalances();
    }

    bindEvents() {
        // P2P Tab switching
        document.querySelectorAll('.p2p-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.p2p-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentTab = e.target.dataset.p2pTab;
                this.renderOffers();
            });
        });

        // Filter events
        document.getElementById('p2p-currency-filter').addEventListener('change', () => this.renderOffers());
        document.getElementById('p2p-payment-filter').addEventListener('change', () => this.renderOffers());
        document.getElementById('p2p-min-amount').addEventListener('input', () => this.renderOffers());
    }

    renderOffers() {
        const container = document.getElementById('p2p-offers-container');
        
        if (this.currentTab === 'create') {
            container.innerHTML = this.renderCreateOrderForm();
            this.bindCreateOrderEvents();
            return;
        }

        if (this.currentTab === 'my-orders') {
            container.innerHTML = this.renderMyOrders();
            return;
        }

        let filteredOffers = this.offers.filter(offer => {
            const currencyFilter = document.getElementById('p2p-currency-filter').value;
            const paymentFilter = document.getElementById('p2p-payment-filter').value;
            const minAmount = parseFloat(document.getElementById('p2p-min-amount').value) || 0;

            if (this.currentTab === 'buy' && offer.type !== 'sell') return false;
            if (this.currentTab === 'sell' && offer.type !== 'buy') return false;
            if (currencyFilter !== 'all' && offer.currency !== currencyFilter) return false;
            if (paymentFilter !== 'all' && !offer.paymentMethod.toLowerCase().includes(paymentFilter)) return false;
            if (offer.minLimit < minAmount) return false;

            return true;
        });

        container.innerHTML = filteredOffers.map(offer => this.renderOfferCard(offer)).join('');
        
        // Bind click events to offer cards
        container.querySelectorAll('.p2p-offer').forEach(card => {
            card.addEventListener('click', () => {
                const offerId = parseInt(card.dataset.offerId);
                const offer = this.offers.find(o => o.id === offerId);
                this.openTradingModal(offer);
            });
        });
    }

    renderOfferCard(offer) {
    const actionType = this.currentTab === 'buy' ? 'Buy' : 'Sell';
    const isBuy = this.currentTab === 'buy';
    const traderInitial = offer.trader.charAt(0).toUpperCase();
    const paymentIcons = {
        'Bank Transfer': '🏦',
        'Mobile Money': '📱',
        'Cash': '💵'
    };
    const paymentIcon = paymentIcons[offer.paymentMethod] || '💳';

    return `
        <div class="p2p-offer card-animated" data-offer-id="${offer.id}" data-currency="${offer.currency}" title="Trader: ${offer.trader}\nRating: ${offer.rating} (${offer.completionRate}% completed)">
            <div class="offer-header">
                <div class="trader-avatar">
                    <span class="avatar-circle">${traderInitial}</span>
                    <div class="trader-info">
                        <span class="trader-name">${offer.trader}</span>
                        <div class="trader-rating">
                            <span class="rating-stars">★${offer.rating}</span>
                            <span class="completion-rate">(${offer.completionRate}%)</span>
                        </div>
                    </div>
                    <div class='online-indicator' title='Online'>online</div>
                </div>
                <div class="offer-details-grid">
                    <div class="detail-item">
                        <span class="label">Available</span>
                        <span class="value">${offer.available} ${offer.currency}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Limit</span>
                        <span class="value">₦${offer.minLimit.toLocaleString()} - ₦${offer.maxLimit.toLocaleString()}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Payment</span>
                        <span class="value payment-method">${paymentIcon} ${offer.paymentMethod}</span>
                    </div>
                </div>
            </div>
            <div class="offer-footer">
                <div class="offer-price">
                    <span class="label">Price</span>
                    <span class="value">₦${offer.rate.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <button class="btn btn-animated ${isBuy ? 'btn-buy' : 'btn-sell'}">${actionType} ${offer.currency}</button>
            </div>
        </div>
    `;
}

    renderMyOrders() {
        return `
            <div style="display: grid; gap: 1rem;">
                ${this.myOrders.map(order => `
                    <div class="p2p-order-item">
                        <div class="p2p-order-header">
                            <h4>Order #${order.id}</h4>
                            <span class="p2p-order-status status-${order.status}">${order.status.toUpperCase()}</span>
                        </div>
                        <p><strong>${order.type.toUpperCase()} ${order.amount} ${order.currency}</strong> @ ₦${order.rate.toLocaleString()}</p>
                        <p>Trader: ${order.trader}</p>
                        <div style="background: var(--bg-secondary); border-radius: 10px; height: 8px; margin: 1rem 0;">
                            <div style="height: 100%; background: var(--accent-color); border-radius: 10px; width: ${order.progress}%; transition: width 0.5s ease;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                            <span style="color: ${order.progress >= 25 ? 'var(--success-color)' : order.progress > 0 ? 'var(--accent-color)' : 'var(--text-secondary)'};">Created</span>
                            <span style="color: ${order.progress >= 50 ? 'var(--success-color)' : order.progress >= 25 ? 'var(--accent-color)' : 'var(--text-secondary)'};">Payment</span>
                            <span style="color: ${order.progress >= 75 ? 'var(--success-color)' : order.progress >= 50 ? 'var(--accent-color)' : 'var(--text-secondary)'};">Escrow</span>
                            <span style="color: ${order.progress >= 100 ? 'var(--success-color)' : order.progress >= 75 ? 'var(--accent-color)' : 'var(--text-secondary)'};">Complete</span>
                        </div>
                        ${order.status === 'pending' ? '<button class="btn" style="margin-top: 1rem;" onclick="walletP2P.confirmPayment(\'' + order.id + '\')">Confirm Payment</button>' : ''}
                        ${order.status === 'escrow' ? '<button class="btn" style="margin-top: 1rem; background: var(--success-color);" onclick="walletP2P.releaseEscrow(\'' + order.id + '\')">Release Escrow</button>' : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCreateOrderForm() {
        return `
            <div class="wallet-card">
                <h3>Create New Order</h3>
                <form id="p2p-create-order-form" style="display: grid; gap: 1.5rem; margin-top: 2rem;">
                    <div class="form-group">
                        <label class="form-label">Order Type</label>
                        <select id="p2p-order-type" class="form-input" required>
                            <option value="buy">Buy (I want to buy crypto)</option>
                            <option value="sell">Sell (I want to sell crypto)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Currency</label>
                        <select id="p2p-order-currency" class="form-input" required>
                            <option value="KDA">Kadena (KDA)</option>
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="USDT">Tether (USDT)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Price (NGN per unit)</label>
                        <input type="number" id="p2p-order-price" class="form-input" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Amount</label>
                        <input type="number" id="p2p-order-amount" class="form-input" step="0.001" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Min Limit (NGN)</label>
                        <input type="number" id="p2p-order-min-limit" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Max Limit (NGN)</label>
                        <input type="number" id="p2p-order-max-limit" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Payment Method</label>
                        <select id="p2p-order-payment" class="form-input" required>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Mobile Money">Mobile Money</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <button type="submit" class="btn">Create Order</button>
                </form>
            </div>
        `;
    }

    bindCreateOrderEvents() {
        document.getElementById('p2p-create-order-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createOrder();
        });
    }

    createOrder() {
        const formData = {
            type: document.getElementById('p2p-order-type').value,
            currency: document.getElementById('p2p-order-currency').value,
            rate: parseFloat(document.getElementById('p2p-order-price').value),
            amount: parseFloat(document.getElementById('p2p-order-amount').value),
            minLimit: parseFloat(document.getElementById('p2p-order-min-limit').value),
            maxLimit: parseFloat(document.getElementById('p2p-order-max-limit').value),
            paymentMethod: document.getElementById('p2p-order-payment').value
        };

        const newOffer = {
            id: this.offers.length + 1,
            ...formData,
            trader: 'You',
            rating: '5.0',
            completionRate: 100,
            available: formData.amount
        };

        this.offers.unshift(newOffer);
        this.showNotification(`${formData.type.toUpperCase()} order created successfully!`);
        
        // Switch to appropriate tab
        document.querySelector(`[data-p2p-tab="${formData.type}"]`).click();
    }

    openTradingModal(offer) {
        const modal = document.getElementById('p2p-trading-modal');
        const title = document.getElementById('p2p-modal-title');
        const body = document.getElementById('p2p-modal-body');

        title.textContent = `${offer.type === 'buy' ? 'Sell' : 'Buy'} ${offer.currency}`;
        
        body.innerHTML = `
            <div style="display: grid; gap: 1.5rem;">
                <div class="offer-details">
                    <div class="offer-detail">
                        <div class="offer-detail-label">Trader</div>
                        <div class="offer-detail-value">${offer.trader} ★${offer.rating}</div>
                    </div>
                    <div class="offer-detail">
                        <div class="offer-detail-label">Rate</div>
                        <div class="offer-detail-value offer-price">₦${offer.rate.toLocaleString()}</div>
                    </div>
                    <div class="offer-detail">
                        <div class="offer-detail-label">Available</div>
                        <div class="offer-detail-value">${offer.available} ${offer.currency}</div>
                    </div>
                    <div class="offer-detail">
                        <div class="offer-detail-label">Payment Method</div>
                        <div class="offer-detail-value">${offer.paymentMethod}</div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Amount (${offer.currency})</label>
                    <input type="number" id="p2p-trade-amount" class="form-input" step="0.001" max="${offer.available}" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Total (NGN)</label>
                    <input type="number" id="p2p-trade-total" class="form-input" readonly>
                </div>
                
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
                    <h4>Trade Process:</h4>
                    <ol style="margin: 0.5rem 0; padding-left: 1.5rem; color: var(--text-secondary); font-size: 0.875rem;">
                        <li>Funds will be held in escrow</li>
                        <li>Complete payment via ${offer.paymentMethod}</li>
                        <li>Confirm payment completion</li>
                        <li>Crypto released from escrow</li>
                    </ol>
                </div>
                
                <button class="btn" onclick="walletP2P.initiateTrade(${offer.id})">
                    ${offer.type === 'buy' ? 'Sell' : 'Buy'} ${offer.currency}
                </button>
            </div>
        `;

        // Bind amount calculation
        const amountInput = document.getElementById('p2p-trade-amount');
        const totalInput = document.getElementById('p2p-trade-total');
        
        amountInput.addEventListener('input', () => {
            const amount = parseFloat(amountInput.value) || 0;
            const total = amount * offer.rate;
            totalInput.value = total.toLocaleString();
        });

        modal.classList.add('show');
    }

    initiateTrade(offerId) {
        const offer = this.offers.find(o => o.id === offerId);
        const amount = parseFloat(document.getElementById('p2p-trade-amount').value);
        const total = amount * offer.rate;

        if (!amount || amount <= 0) {
            this.showNotification('Please enter a valid amount', 'error');
            return;
        }

        if (amount > offer.available) {
            this.showNotification('Amount exceeds available quantity', 'error');
            return;
        }

        const newOrder = {
            id: 'ORD' + String(this.myOrders.length + 1).padStart(3, '0'),
            type: offer.type === 'buy' ? 'sell' : 'buy',
            currency: offer.currency,
            amount: amount,
            rate: offer.rate,
            status: 'pending',
            trader: offer.trader,
            progress: 25,
            total: total
        };

        this.myOrders.unshift(newOrder);
        
        this.balances.escrow += total;
        this.balances.ngn -= total;
        this.updateBalances();

        this.closeModal();
        this.showNotification(`Trade initiated! Order #${newOrder.id} created`);
        
        document.querySelector('[data-p2p-tab="my-orders"]').click();
    }

    confirmPayment(orderId) {
        const order = this.myOrders.find(o => o.id === orderId);
        if (order) {
            order.status = 'escrow';
            order.progress = 75;
            this.renderOffers();
            this.showNotification('Payment confirmed. Crypto is now in escrow.');
        }
    }

    releaseEscrow(orderId) {
        const order = this.myOrders.find(o => o.id === orderId);
        if (order) {
            order.status = 'completed';
            order.progress = 100;
            
            this.balances.escrow -= order.total;
            if (order.type === 'buy') {
                this.balances.kda += order.amount;
            } else {
                this.balances.ngn += order.total;
            }
            
            this.updateBalances();
            this.renderOffers();
            this.renderRecentOrders();
            this.showNotification('Trade completed successfully!');
        }
    }

    renderRecentOrders() {
        const container = document.getElementById('p2p-recent-orders');
        const recentOrders = this.myOrders.slice(0, 3);
        
        container.innerHTML = recentOrders.map(order => `
            <div class="p2p-order-item">
                <div class="p2p-order-header">
                    <small>#${order.id}</small>
                    <span class="p2p-order-status status-${order.status}">${order.status}</span>
                </div>
                <p><strong>${order.type.toUpperCase()} ${order.amount} ${order.currency}</strong></p>
                <p style="font-size: 0.75rem; color: var(--text-secondary);">@ ₦${order.rate.toLocaleString()}</p>
            </div>
        `).join('');
    }

    updateBalances() {
        document.getElementById('p2p-kda-balance').textContent = `${this.balances.kda.toFixed(2)} KDA`;
        document.getElementById('p2p-ngn-balance').textContent = `₦${this.balances.ngn.toLocaleString()}`;
        document.getElementById('p2p-escrow-balance').textContent = `₦${this.balances.escrow.toLocaleString()}`;
        document.getElementById('p2p-available-balance').textContent = `₦${(this.balances.ngn - this.balances.escrow).toLocaleString()}`;
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('p2p-notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    closeModal() {
        document.getElementById('p2p-trading-modal').classList.remove('show');
    }

    startPriceUpdates() {
        setInterval(() => {
            this.offers.forEach(offer => {
                const change = (Math.random() - 0.5) * offer.rate * 0.001;
                offer.rate += change;
                offer.rate = Math.max(0, offer.rate);
            });
            
            if (this.currentTab === 'buy' || this.currentTab === 'sell') {
                this.renderOffers();
            }
        }, 10000);
    }
}

// Global P2P instance
let walletP2P;

// Function to initialize P2P when wallet tab is switched to P2P
function initializeWalletP2P() {
    if (!walletP2P) {
        walletP2P = new WalletP2PMarketplace();
        walletP2P.init();
        walletP2P.startPriceUpdates();
    }
}

// Function to close P2P modal (called from HTML)
function closep2pModal() {
    if (walletP2P) {
        walletP2P.closeModal();
    }
}

// Auto-initialize when P2P tab becomes visible
document.addEventListener('DOMContentLoaded', function() {
    // Watch for when the P2P tab becomes active
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'wallet-p2p' && 
                mutation.target.style.display !== 'none' && 
                !walletP2P) {
                initializeWalletP2P();
            }
        });
    });
    
    const p2pElement = document.getElementById('wallet-p2p');
    if (p2pElement) {
        observer.observe(p2pElement, { attributes: true, attributeFilter: ['style'] });
    }
    
    // Also initialize if P2P tab is already visible
    setTimeout(() => {
        const p2pTab = document.getElementById('wallet-p2p');
        if (p2pTab && p2pTab.style.display !== 'none') {
            initializeWalletP2P();
        }
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && walletP2P) {
        walletP2P.closeModal();
    }
});

// Demo notifications (only when P2P is active)
setInterval(() => {
    if (walletP2P && Math.random() > 0.85) {
        walletP2P.showNotification('New trade request received!', 'warning');
    }
}, 25000);