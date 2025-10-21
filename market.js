// Market Section - Tab Navigation (Isolated)
document.addEventListener('DOMContentLoaded', function() {
    initializeMarketSection();
});

function initializeMarketSection() {
    // Main navigation
    const mainNavBtns = document.querySelectorAll('.crypto-main-nav-btn');
    const mobileNavBtns = document.querySelectorAll('.crypto-mobile-nav-btn');
    const mainViews = document.querySelectorAll('.crypto-main-view');

    function switchMainTab(tabName) {
        mainNavBtns.forEach(btn => btn.classList.remove('active'));
        mobileNavBtns.forEach(btn => btn.classList.remove('active'));
        mainViews.forEach(view => view.classList.remove('active'));

        document.querySelectorAll(`[data-crypto-tab="${tabName}"]`).forEach(btn => {
            btn.classList.add('active');
        });

        const targetView = document.querySelector(`[data-crypto-view="${tabName}"]`);
        if (targetView) targetView.classList.add('active');
    }

    mainNavBtns.forEach(btn => {
        btn.addEventListener('click', () => switchMainTab(btn.dataset.cryptoTab));
    });

    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => switchMainTab(btn.dataset.cryptoTab));
    });

    // Discovery sub-navigation
    const subNavBtns = document.querySelectorAll('.crypto-sub-nav-btn');
    const subViews = document.querySelectorAll('.crypto-sub-view');

    subNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.cryptoDiscovery;

            subNavBtns.forEach(b => b.classList.remove('active'));
            subViews.forEach(v => v.classList.remove('active'));

            btn.classList.add('active');
            const targetView = document.querySelector(`[data-crypto-discovery-view="${target}"]`);
            if (targetView) targetView.classList.add('active');
        });
    });

    // Asset selector dropdown
    const assetBtn = document.getElementById('cryptoAssetBtn');
    const assetDropdown = document.getElementById('cryptoAssetDropdown');
    const assetOptions = document.querySelectorAll('.crypto-asset-option');

    if (assetBtn && assetDropdown) {
        assetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            assetBtn.classList.toggle('open');
            assetDropdown.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!assetBtn.contains(e.target) && !assetDropdown.contains(e.target)) {
                assetBtn.classList.remove('open');
                assetDropdown.classList.remove('open');
            }
        });

        assetOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const symbol = option.dataset.symbol;
                const icon = option.dataset.icon;
                const price = option.dataset.price;

                assetBtn.querySelector('.crypto-asset-btn-left').innerHTML = `
                    <div class="crypto-asset-icon-small">${icon}</div>
                    <span>${symbol}</span>
                    <span class="crypto-asset-price-mini">${parseFloat(price).toLocaleString()}</span>
                `;

                document.getElementById('cryptoPriceInput').value = price;

                assetBtn.classList.remove('open');
                assetDropdown.classList.remove('open');
            });
        });
    }

    // Trade type switching
    const tradeTypeBtns = document.querySelectorAll('.crypto-trade-type-btn');
    const tradeBtn = document.getElementById('cryptoTradeBtn');

    tradeTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tradeTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const type = btn.dataset.cryptoType;
            if (tradeBtn) {
                if (type === 'long') {
                    tradeBtn.classList.remove('sell');
                    tradeBtn.classList.add('buy');
                    tradeBtn.textContent = 'LONG';
                } else {
                    tradeBtn.classList.remove('buy');
                    tradeBtn.classList.add('sell');
                    tradeBtn.textContent = 'SHORT';
                }
            }
        });
    });

    // Leverage selection
    const leverageBtns = document.querySelectorAll('.crypto-leverage-btn');
    leverageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            leverageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Stop Loss & Take Profit Toggle
    const slTpToggle = document.getElementById('cryptoSlTpToggle');
    const slTpInputs = document.getElementById('cryptoSlTpInputs');

    if (slTpToggle && slTpInputs) {
        slTpToggle.addEventListener('click', () => {
            slTpToggle.classList.toggle('active');
            slTpInputs.classList.toggle('active');
        });
    }

    // Trading calculations
    const priceInput = document.getElementById('cryptoPriceInput');
    const amountInput = document.getElementById('cryptoAmountInput');
    const totalInput = document.getElementById('cryptoTotalInput');

    if (amountInput && priceInput && totalInput) {
        amountInput.addEventListener('input', () => {
            const price = parseFloat(priceInput.value) || 0;
            const amount = parseFloat(amountInput.value) || 0;
            totalInput.value = (price * amount).toFixed(2);
        });

        totalInput.addEventListener('input', () => {
            const price = parseFloat(priceInput.value) || 0;
            const total = parseFloat(totalInput.value) || 0;
            if (price > 0) {
                amountInput.value = (total / price).toFixed(8);
            }
        });
    }

    if (tradeBtn) {
        tradeBtn.addEventListener('click', () => {
            const activeTypeBtn = document.querySelector('.crypto-trade-type-btn.active');
            if (!activeTypeBtn) return;
            
            const type = activeTypeBtn.dataset.cryptoType;
            const amount = amountInput ? amountInput.value : '';
            const price = priceInput ? priceInput.value : '';

            if (!amount || !price) {
                alert('Please enter amount and price');
                return;
            }

            alert(`${type === 'long' ? 'Long' : 'Short'} position opened!\nAmount: ${amount} BTC\nPrice: ${price}`);
        });
    }

    // Trade mode switching (Futures vs Spot)
    const tradeModeBtns = document.querySelectorAll('.crypto-trade-mode-btn');
    tradeModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tradeModeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.dataset.mode;
            const leverageGroup = document.getElementById('cryptoLeverageGroup');
            const slTpSection = document.getElementById('cryptoSlTpSection');

            if (mode === 'spot') {
                if (leverageGroup) leverageGroup.style.display = 'none';
                if (slTpSection) slTpSection.style.display = 'none';
            } else {
                if (leverageGroup) leverageGroup.style.display = 'block';
                if (slTpSection) slTpSection.style.display = 'block';
            }
        });
    });

    // Timeframe selection
    const timeframeBtns = document.querySelectorAll('.crypto-timeframe-btn');
    timeframeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timeframeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Chart tools
    const chartToolBtns = document.querySelectorAll('.crypto-chart-tool-btn');
    chartToolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chartToolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Generate Order Book
    function generateOrderBook() {
        const orderbook = document.getElementById('cryptoOrderbookContent');
        if (!orderbook) return;
        
        const basePrice = 67234.50;
        let orders = '';

        for (let i = 10; i > 0; i--) {
            const price = (basePrice + (i * 50)).toFixed(2);
            const amount = (Math.random() * 0.5 + 0.1).toFixed(4);
            const total = (price * amount).toFixed(2);

            orders += `
                <div class="crypto-order-row sell">
                    <div class="crypto-order-price sell">${parseFloat(price).toLocaleString()}</div>
                    <div class="crypto-order-amount">${amount}</div>
                    <div class="crypto-order-total">${parseFloat(total).toLocaleString()}</div>
                </div>
            `;
        }

        for (let i = 1; i <= 10; i++) {
            const price = (basePrice - (i * 50)).toFixed(2);
            const amount = (Math.random() * 0.5 + 0.1).toFixed(4);
            const total = (price * amount).toFixed(2);

            orders += `
                <div class="crypto-order-row">
                    <div class="crypto-order-price buy">${parseFloat(price).toLocaleString()}</div>
                    <div class="crypto-order-amount">${amount}</div>
                    <div class="crypto-order-total">${parseFloat(total).toLocaleString()}</div>
                </div>
            `;
        }

        orderbook.innerHTML = orders;
    }

    // Generate Volume Bars
    function generateVolumeBars() {
        const volumeBars = document.getElementById('cryptoVolumeBars');
        if (!volumeBars) return;
        
        let bars = '';

        for (let i = 0; i < 24; i++) {
            const height = Math.random() * 80 + 20;
            bars += `<div class="crypto-volume-bar" style="height: ${height}%"></div>`;
        }

        volumeBars.innerHTML = bars;
    }

    // Generate Discovery data
    function generateCoins() {
        const grid = document.getElementById('cryptoCoinsGrid');
        if (!grid) return;

        const coins = [
            { name: 'Bitcoin', symbol: 'BTC', icon: '₿', price: 67234.50, change: 2.45, volume: '28.5B', marketCap: '1.32T' },
            { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', price: 3845.30, change: -1.23, volume: '15.2B', marketCap: '462B' },
            { name: 'Solana', symbol: 'SOL', icon: '◎', price: 145.67, change: 5.67, volume: '3.8B', marketCap: '65B' },
            { name: 'Cardano', symbol: 'ADA', icon: '₳', price: 0.45, change: 3.21, volume: '892M', marketCap: '16B' },
            { name: 'Polkadot', symbol: 'DOT', icon: '●', price: 7.89, change: -2.15, volume: '456M', marketCap: '9.8B' },
            { name: 'Avalanche', symbol: 'AVAX', icon: '▲', price: 34.56, change: 8.92, volume: '678M', marketCap: '13B' }
        ];

        grid.innerHTML = coins.map(coin => `
            <div class="crypto-asset-card">
                <div class="crypto-asset-card-top">
                    <div class="crypto-asset-card-left">
                        <div class="crypto-asset-card-icon">${coin.icon}</div>
                        <div class="crypto-asset-card-info">
                            <h3>${coin.name}</h3>
                            <div class="crypto-asset-card-symbol">${coin.symbol}</div>
                        </div>
                    </div>
                    <div class="crypto-asset-card-trend ${coin.change >= 0 ? 'up' : 'down'}">
                        <span class="crypto-trend-arrow">${coin.change >= 0 ? '↑' : '↓'}</span>
                        ${Math.abs(coin.change).toFixed(2)}%
                    </div>
                </div>
                <div class="crypto-asset-card-price" style="color: ${coin.change >= 0 ? 'var(--success)' : 'var(--danger)'}">
                    ${coin.price.toLocaleString()}
                </div>
                <div class="crypto-asset-card-stats">
                    <div class="crypto-asset-stat">
                        <div class="crypto-asset-stat-label">24h Volume</div>
                        <div class="crypto-asset-stat-value">${coin.volume}</div>
                    </div>
                    <div class="crypto-asset-stat">
                        <div class="crypto-asset-stat-label">Market Cap</div>
                        <div class="crypto-asset-stat-value">${coin.marketCap}</div>
                    </div>
                </div>
                <div class="crypto-asset-actions">
                    <button class="crypto-asset-action-btn primary">Trade</button>
                    <button class="crypto-asset-action-btn">Details</button>
                </div>
            </div>
        `).join('');
    }

    function generateNFTs() {
        const grid = document.getElementById('cryptoNFTsGrid');
        if (!grid) return;

        const nfts = [
            { name: 'CryptoPunks', symbol: 'PUNK', icon: '🎭', floor: 45.5, change: 12.3, holders: 3289, volume: '2.4M' },
            { name: 'Bored Ape', symbol: 'BAYC', icon: '🐵', floor: 32.8, change: -5.2, holders: 6402, volume: '1.8M' },
            { name: 'Azuki', symbol: 'AZUKI', icon: '🎨', floor: 8.9, change: 18.7, holders: 5234, volume: '890K' },
            { name: 'Doodles', symbol: 'DOODLE', icon: '✏️', floor: 4.2, change: 6.4, holders: 7891, volume: '456K' },
            { name: 'Moonbirds', symbol: 'MOONBIRD', icon: '🦉', floor: 5.6, change: -3.1, holders: 4567, volume: '567K' },
            { name: 'CloneX', symbol: 'CLONEX', icon: '👾', floor: 3.8, change: 9.2, holders: 8901, volume: '678K' }
        ];

        grid.innerHTML = nfts.map(nft => `
            <div class="crypto-asset-card">
                <div class="crypto-nft-preview">${nft.icon}</div>
                <div class="crypto-asset-card-top">
                    <div class="crypto-asset-card-left">
                        <div class="crypto-asset-card-info">
                            <h3>${nft.name}</h3>
                            <div class="crypto-asset-card-symbol">${nft.symbol}</div>
                        </div>
                    </div>
                    <div class="crypto-asset-card-trend ${nft.change >= 0 ? 'up' : 'down'}">
                        <span class="crypto-trend-arrow">${nft.change >= 0 ? '↑' : '↓'}</span>
                        ${Math.abs(nft.change).toFixed(1)}%
                    </div>
                </div>
                <div class="crypto-asset-card-price" style="color: ${nft.change >= 0 ? 'var(--success)' : 'var(--danger)'}">
                    Ξ${nft.floor}
                </div>
                <div class="crypto-asset-card-stats">
                    <div class="crypto-asset-stat">
                        <div class="crypto-asset-stat-label">Holders</div>
                        <div class="crypto-asset-stat-value">${nft.holders.toLocaleString()}</div>
                    </div>
                    <div class="crypto-asset-stat">
                        <div class="crypto-asset-stat-label">24h Volume</div>
                        <div class="crypto-asset-stat-value">${nft.volume}</div>
                    </div>
                </div>
                <div class="crypto-asset-actions">
                    <button class="crypto-asset-action-btn primary">Buy</button>
                    <button class="crypto-asset-action-btn">View</button>
                </div>
            </div>
        `).join('');
    }

    function generateMemeCoins() {
        const grid = document.getElementById('cryptoMemeGrid');
        if (!grid) return;

        const memeCoins = [
            { name: 'Dogecoin', symbol: 'DOGE', icon: '🐕', price: 0.085, change: 15.4, volume: '1.2B', marketCap: '12B' },
            { name: 'Shiba Inu', symbol: 'SHIB', icon: '🐶', price: 0.000012, change: -8.3, volume: '456M', marketCap: '6.8B' },
            { name: 'Pepe', symbol: 'PEPE', icon: '🐸', price: 0.0000018, change: 45.7, volume: '234M', marketCap: '890M' },
            { name: 'Floki', symbol: 'FLOKI', icon: '🐕‍🦺', price: 0.000034, change: 23.1, volume: '89M', marketCap: '345M' },
            { name: 'Baby Doge', symbol: 'BABYDOGE', icon: '👶', price: 0.0000000025, change: -12.5, volume: '45M', marketCap: '178M' },
            { name: 'Dogelon Mars', symbol: 'ELON', icon: '🚀', price: 0.00000015, change: 34.8, volume: '67M', marketCap: '234M' }
        ];

        grid.innerHTML = memeCoins.map(coin => `
            <div class="crypto-asset-card">
                <div class="crypto-asset-card-top">
                    <div class="crypto-asset-card-left">
                        <div class="crypto-asset-card-icon">${coin.icon}</div>
                        <div class="crypto-asset-card-info">
                            <h3>${coin.name}</h3>
                            <div class="crypto-asset-card-symbol">${coin.symbol}</div>
                        </div>
                    </div>
                    <div class="crypto-asset-card-trend ${coin.change >= 0 ? 'up' : 'down'}">
                        <span class="crypto-trend-arrow">${coin.change >= 0 ? '↑' : '↓'}</span>
                        ${Math.abs(coin.change).toFixed(1)}%
                    </div>
                </div>
                <div class="crypto-asset-card-price" style="color: ${coin.change >= 0 ? 'var(--success)' : 'var(--danger)'}">
                    ${coin.price.toFixed(coin.price < 0.01 ? 8 : 2)}
                </div>
                <div class="crypto-asset-card-stats">
                    <div class="crypto-asset-stat">
                        <div class="crypto-asset-stat-label">24h Volume</div>
                        <div class="crypto-asset-stat-value">${coin.volume}</div>
                    </div>
                    <div class="crypto-asset-stat">
                        <div class="crypto-asset-stat-label">Market Cap</div>
                        <div class="crypto-asset-stat-value">${coin.marketCap}</div>
                    </div>
                </div>
                <div class="crypto-asset-actions">
                    <button class="crypto-asset-action-btn primary">Trade</button>
                    <button class="crypto-asset-action-btn">Chart</button>
                </div>
            </div>
        `).join('');
    }

    // Initialize
    generateOrderBook();
    generateVolumeBars();
    generateCoins();
    generateNFTs();
    generateMemeCoins();

    // Update order book periodically
    setInterval(() => {
        generateOrderBook();
    }, 5000);

    // Add click handlers for action buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('crypto-asset-action-btn')) {
            const action = e.target.textContent.toLowerCase();
            const card = e.target.closest('.crypto-asset-card');
            if (card) {
                const assetName = card.querySelector('h3').textContent;
                alert(`${action.charAt(0).toUpperCase() + action.slice(1)} ${assetName}`);
            }
        }
    });
}
