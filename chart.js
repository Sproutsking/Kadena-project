// ============================================
// ADVANCED CRYPTO CHART SYSTEM
// ============================================

class CryptoChartSystem {
    constructor() {
        this.currentAsset = 'BTC/USDT';
        this.currentPrice = 67234.50;
        this.currentTimeframe = '15m';
        this.currentChartType = 'candlestick';
        this.chartData = [];
        this.volumeData = [];
        this.canvas = null;
        this.ctx = null;
        this.animationFrame = null;
        this.hoveredCandle = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        // Chart configuration
        this.config = {
            padding: 60,
            candleGap: 4,
            minCandleWidth: 3,
            maxCandleWidth: 20,
            gridLines: 8,
            priceLabels: 6,
            volumeHeight: 0.2, // 20% of chart height
            colors: {
                background: 'rgba(20, 20, 35, 0.9)',
                grid: 'rgba(255, 255, 255, 0.05)',
                text: 'rgba(255, 255, 255, 0.6)',
                bullish: '#10b981',
                bearish: '#ef4444',
                line: '#8b5cf6',
                volume: {
                    buy: 'rgba(16, 185, 129, 0.3)',
                    sell: 'rgba(239, 68, 68, 0.3)'
                }
            }
        };

        // Timeframe configurations (in minutes)
        this.timeframes = {
            '1m': { minutes: 1, candles: 60 },
            '5m': { minutes: 5, candles: 60 },
            '15m': { minutes: 15, candles: 50 },
            '1h': { minutes: 60, candles: 48 },
            '4h': { minutes: 240, candles: 42 },
            '1D': { minutes: 1440, candles: 30 }
        };

        this.init();
    }

    init() {
        this.generateChartData();
        this.setupCanvas();
        this.bindEvents();
        this.startRenderLoop();
        this.startLiveUpdates();
    }

    // ============================================
    // CANVAS SETUP
    // ============================================
    setupCanvas() {
        const placeholder = document.querySelector('.crypto-chart-placeholder');
        
        if (!placeholder) {
            console.error('❌ Chart placeholder not found! Make sure .crypto-chart-placeholder exists in your HTML.');
            return;
        }

        console.log('✅ Chart placeholder found:', placeholder);

        // Remove existing canvas
        const existingCanvas = placeholder.querySelector('canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }

        // Remove any placeholder content
        placeholder.innerHTML = '';

        // Create new canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        const rect = placeholder.getBoundingClientRect();
        console.log('📏 Canvas dimensions:', rect.width, 'x', rect.height);
        
        if (rect.width === 0 || rect.height === 0) {
            console.error('❌ Chart container has zero dimensions!');
            setTimeout(() => this.setupCanvas(), 500);
            return;
        }

        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Scale context for high DPI displays
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        placeholder.appendChild(this.canvas);
        
        console.log('✅ Canvas created and appended');
    }

    handleResize() {
        const placeholder = document.querySelector('.crypto-chart-placeholder');
        if (!placeholder || !this.canvas) return;

        const rect = placeholder.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.render();
    }

    // ============================================
    // EVENT BINDINGS
    // ============================================
    bindEvents() {
        // Timeframe switching
        document.querySelectorAll('.crypto-timeframe-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTimeframe(e.target);
            });
        });

        // Chart type switching
        document.querySelectorAll('.crypto-chart-tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchChartType(e.target);
            });
        });

        // Canvas mouse events
        if (this.canvas) {
            this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.handleResize(), 100);
        });
    }

    switchTimeframe(btn) {
        const timeframe = btn.textContent.trim();
        
        document.querySelectorAll('.crypto-timeframe-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        this.currentTimeframe = timeframe;
        this.generateChartData();
        this.render();
    }

    switchChartType(btn) {
        const types = {
            'Line': 'line',
            'Candle': 'candlestick',
            'Trend': 'trend',
            'Fib': 'fibonacci',
            'Indicator': 'indicators'
        };

        const type = types[btn.textContent.trim()];
        if (!type) return;

        document.querySelectorAll('.crypto-chart-tool-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        this.currentChartType = type;
        this.render();
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;

        // Find hovered candle
        const width = this.canvas.width / window.devicePixelRatio;
        const chartWidth = width - this.config.padding * 2;
        const candleWidth = chartWidth / this.chartData.length;
        const hoveredIndex = Math.floor((this.mouseX - this.config.padding) / candleWidth);

        if (hoveredIndex >= 0 && hoveredIndex < this.chartData.length) {
            this.hoveredCandle = this.chartData[hoveredIndex];
        } else {
            this.hoveredCandle = null;
        }
    }

    handleMouseLeave() {
        this.hoveredCandle = null;
    }

    // ============================================
    // DATA GENERATION
    // ============================================
    generateChartData() {
        const timeframeConfig = this.timeframes[this.currentTimeframe];
        const numCandles = timeframeConfig.candles;
        
        this.chartData = [];
        this.volumeData = [];
        
        let basePrice = this.currentPrice;
        const volatilityFactor = timeframeConfig.minutes / 60; // Higher volatility for longer timeframes

        for (let i = 0; i < numCandles; i++) {
            const volatility = basePrice * 0.015 * volatilityFactor;
            const trend = (Math.random() - 0.48) * volatility; // Slight upward bias
            
            const open = basePrice;
            const close = open + trend + (Math.random() - 0.5) * volatility;
            const high = Math.max(open, close) + Math.random() * volatility * 0.5;
            const low = Math.min(open, close) - Math.random() * volatility * 0.5;
            
            const volume = Math.random() * 1000000 + 500000;
            const isBuy = close >= open;

            this.chartData.push({
                open,
                high,
                low,
                close,
                volume,
                timestamp: Date.now() - (numCandles - i) * timeframeConfig.minutes * 60 * 1000
            });

            this.volumeData.push({
                volume,
                type: isBuy ? 'buy' : 'sell'
            });

            basePrice = close;
        }
    }

    // ============================================
    // RENDERING
    // ============================================
    startRenderLoop() {
        const animate = () => {
            this.render();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    render() {
        if (!this.ctx || !this.canvas) return;

        const width = this.canvas.width / window.devicePixelRatio;
        const height = this.canvas.height / window.devicePixelRatio;

        // Clear canvas
        this.ctx.fillStyle = this.config.colors.background;
        this.ctx.fillRect(0, 0, width, height);

        // Draw grid
        this.drawGrid(width, height);

        // Draw based on chart type
        switch (this.currentChartType) {
            case 'candlestick':
                this.drawCandlesticks(width, height);
                break;
            case 'line':
                this.drawLineChart(width, height);
                break;
            case 'trend':
                this.drawTrendLines(width, height);
                break;
            case 'fibonacci':
                this.drawFibonacci(width, height);
                break;
            case 'indicators':
                this.drawWithIndicators(width, height);
                break;
        }

        // Draw volume
        this.drawVolume(width, height);

        // Draw price labels
        this.drawPriceLabels(width, height);

        // Draw crosshair and info
        if (this.hoveredCandle) {
            this.drawCrosshair(width, height);
            this.drawCandleInfo();
        }
    }

    drawGrid(width, height) {
        const { padding, gridLines } = this.config;
        const chartHeight = height - padding * 2;
        const chartWidth = width - padding * 2;

        this.ctx.strokeStyle = this.config.colors.grid;
        this.ctx.lineWidth = 1;

        // Horizontal lines
        for (let i = 0; i <= gridLines; i++) {
            const y = padding + (chartHeight / gridLines) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(width - padding, y);
            this.ctx.stroke();
        }

        // Vertical lines
        const verticalLines = Math.min(20, this.chartData.length);
        for (let i = 0; i <= verticalLines; i++) {
            const x = padding + (chartWidth / verticalLines) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(x, padding);
            this.ctx.lineTo(x, height - padding);
            this.ctx.stroke();
        }
    }

    drawCandlesticks(width, height) {
        const { padding } = this.config;
        const chartHeight = height - padding * 2 - (height * this.config.volumeHeight);
        const chartWidth = width - padding * 2;
        
        const candleWidth = Math.max(
            this.config.minCandleWidth,
            Math.min(this.config.maxCandleWidth, (chartWidth / this.chartData.length) - this.config.candleGap)
        );

        const prices = this.chartData.flatMap(d => [d.high, d.low]);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;

        this.chartData.forEach((candle, i) => {
            const x = padding + (chartWidth / this.chartData.length) * i + (chartWidth / this.chartData.length - candleWidth) / 2;
            
            const openY = padding + ((maxPrice - candle.open) / priceRange) * chartHeight;
            const closeY = padding + ((maxPrice - candle.close) / priceRange) * chartHeight;
            const highY = padding + ((maxPrice - candle.high) / priceRange) * chartHeight;
            const lowY = padding + ((maxPrice - candle.low) / priceRange) * chartHeight;

            const isGreen = candle.close >= candle.open;
            const color = isGreen ? this.config.colors.bullish : this.config.colors.bearish;

            // Draw wick
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(x + candleWidth / 2, highY);
            this.ctx.lineTo(x + candleWidth / 2, lowY);
            this.ctx.stroke();

            // Draw body
            this.ctx.fillStyle = color;
            const bodyHeight = Math.abs(closeY - openY);
            this.ctx.fillRect(x, Math.min(openY, closeY), candleWidth, Math.max(bodyHeight, 1));
        });
    }

    drawLineChart(width, height) {
        const { padding } = this.config;
        const chartHeight = height - padding * 2 - (height * this.config.volumeHeight);
        const chartWidth = width - padding * 2;

        const prices = this.chartData.map(d => (d.open + d.close) / 2);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;

        // Draw line
        this.ctx.strokeStyle = this.config.colors.line;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        this.chartData.forEach((candle, i) => {
            const x = padding + (chartWidth / this.chartData.length) * i + (chartWidth / this.chartData.length) / 2;
            const avgPrice = (candle.open + candle.close) / 2;
            const y = padding + ((maxPrice - avgPrice) / priceRange) * chartHeight;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        this.ctx.stroke();

        // Draw gradient fill
        const gradient = this.ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.lineTo(width - padding, height - padding - (height * this.config.volumeHeight));
        this.ctx.lineTo(padding, height - padding - (height * this.config.volumeHeight));
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawTrendLines(width, height) {
        // Draw candlesticks first
        this.drawCandlesticks(width, height);

        const { padding } = this.config;
        const chartHeight = height - padding * 2 - (height * this.config.volumeHeight);
        const chartWidth = width - padding * 2;

        const prices = this.chartData.flatMap(d => [d.high, d.low]);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;

        // Draw support line (lows trend)
        const lows = this.chartData.map((d, i) => ({
            x: padding + (chartWidth / this.chartData.length) * i + (chartWidth / this.chartData.length) / 2,
            y: padding + ((maxPrice - d.low) / priceRange) * chartHeight
        }));

        this.ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.drawTrendLine(lows);

        // Draw resistance line (highs trend)
        const highs = this.chartData.map((d, i) => ({
            x: padding + (chartWidth / this.chartData.length) * i + (chartWidth / this.chartData.length) / 2,
            y: padding + ((maxPrice - d.high) / priceRange) * chartHeight
        }));

        this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
        this.drawTrendLine(highs);
        this.ctx.setLineDash([]);
    }

    drawTrendLine(points) {
        if (points.length < 2) return;

        // Simple linear regression
        const n = points.length;
        const sumX = points.reduce((sum, p) => sum + p.x, 0);
        const sumY = points.reduce((sum, p) => sum + p.y, 0);
        const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
        const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, slope * points[0].x + intercept);
        this.ctx.lineTo(points[points.length - 1].x, slope * points[points.length - 1].x + intercept);
        this.ctx.stroke();
    }

    drawFibonacci(width, height) {
        // Draw candlesticks first
        this.drawCandlesticks(width, height);

        const { padding } = this.config;
        const chartHeight = height - padding * 2 - (height * this.config.volumeHeight);

        const prices = this.chartData.flatMap(d => [d.high, d.low]);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;

        // Fibonacci levels
        const fibLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        const fibColors = [
            'rgba(239, 68, 68, 0.3)',
            'rgba(249, 115, 22, 0.3)',
            'rgba(234, 179, 8, 0.3)',
            'rgba(139, 92, 246, 0.3)',
            'rgba(59, 130, 246, 0.3)',
            'rgba(34, 197, 94, 0.3)',
            'rgba(16, 185, 129, 0.3)'
        ];

        this.ctx.setLineDash([5, 5]);
        this.ctx.lineWidth = 1;

        fibLevels.forEach((level, i) => {
            const y = padding + chartHeight * level;
            const price = maxPrice - (priceRange * level);

            this.ctx.strokeStyle = fibColors[i];
            this.ctx.fillStyle = fibColors[i];
            
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(width - padding, y);
            this.ctx.stroke();

            // Draw label
            this.ctx.font = '11px Inter, sans-serif';
            this.ctx.fillText(`${(level * 100).toFixed(1)}% - ${price.toFixed(2)}`, padding + 5, y - 5);
        });

        this.ctx.setLineDash([]);
    }

    drawWithIndicators(width, height) {
        // Draw candlesticks first
        this.drawCandlesticks(width, height);

        const { padding } = this.config;
        const chartHeight = height - padding * 2 - (height * this.config.volumeHeight);
        const chartWidth = width - padding * 2;

        const prices = this.chartData.flatMap(d => [d.high, d.low]);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;

        // Calculate moving averages
        const ma20 = this.calculateMA(20);
        const ma50 = this.calculateMA(50);

        // Draw MA20
        this.drawMA(ma20, maxPrice, priceRange, chartWidth, chartHeight, 'rgba(139, 92, 246, 0.8)', 2);

        // Draw MA50
        this.drawMA(ma50, maxPrice, priceRange, chartWidth, chartHeight, 'rgba(59, 130, 246, 0.8)', 2);

        // Draw legend
        this.ctx.font = 'bold 11px Inter, sans-serif';
        this.ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
        this.ctx.fillText('MA20', padding + 10, padding + 20);
        
        this.ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        this.ctx.fillText('MA50', padding + 60, padding + 20);
    }

    calculateMA(period) {
        const ma = [];
        for (let i = 0; i < this.chartData.length; i++) {
            if (i < period - 1) {
                ma.push(null);
                continue;
            }
            let sum = 0;
            for (let j = 0; j < period; j++) {
                sum += (this.chartData[i - j].open + this.chartData[i - j].close) / 2;
            }
            ma.push(sum / period);
        }
        return ma;
    }

    drawMA(ma, maxPrice, priceRange, chartWidth, chartHeight, color, lineWidth) {
        const { padding } = this.config;

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();

        let started = false;
        ma.forEach((value, i) => {
            if (value === null) return;

            const x = padding + (chartWidth / this.chartData.length) * i + (chartWidth / this.chartData.length) / 2;
            const y = padding + ((maxPrice - value) / priceRange) * chartHeight;

            if (!started) {
                this.ctx.moveTo(x, y);
                started = true;
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        this.ctx.stroke();
    }

    drawVolume(width, height) {
        const { padding } = this.config;
        const volumeHeight = height * this.config.volumeHeight;
        const volumeY = height - padding - volumeHeight;
        const chartWidth = width - padding * 2;
        
        const maxVolume = Math.max(...this.volumeData.map(v => v.volume));
        
        this.volumeData.forEach((vol, i) => {
            const x = padding + (chartWidth / this.volumeData.length) * i;
            const barWidth = (chartWidth / this.volumeData.length) - 2;
            const barHeight = (vol.volume / maxVolume) * volumeHeight;
            
            this.ctx.fillStyle = vol.type === 'buy' ? this.config.colors.volume.buy : this.config.colors.volume.sell;
            this.ctx.fillRect(x, volumeY + volumeHeight - barHeight, barWidth, barHeight);
        });
    }

    drawPriceLabels(width, height) {
        const { padding, priceLabels } = this.config;
        const chartHeight = height - padding * 2 - (height * this.config.volumeHeight);

        const prices = this.chartData.flatMap(d => [d.high, d.low]);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;

        this.ctx.fillStyle = this.config.colors.text;
        this.ctx.font = '11px Inter, sans-serif';
        this.ctx.textAlign = 'right';

        for (let i = 0; i <= priceLabels; i++) {
            const price = maxPrice - (priceRange / priceLabels) * i;
            const y = padding + (chartHeight / priceLabels) * i;
            
            // Background for label
            const text = `${price.toFixed(2)}`;
            const metrics = this.ctx.measureText(text);
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(width - padding - metrics.width - 10, y - 8, metrics.width + 8, 16);
            
            // Label text
            this.ctx.fillStyle = this.config.colors.text;
            this.ctx.fillText(text, width - padding - 5, y + 4);
        }

        this.ctx.textAlign = 'left';
    }

    drawCrosshair(width, height) {
        if (!this.hoveredCandle) return;

        const { padding } = this.config;

        // Draw crosshair lines
        this.ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);

        // Vertical line
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouseX, padding);
        this.ctx.lineTo(this.mouseX, height - padding);
        this.ctx.stroke();

        // Horizontal line
        this.ctx.beginPath();
        this.ctx.moveTo(padding, this.mouseY);
        this.ctx.lineTo(width - padding, this.mouseY);
        this.ctx.stroke();

        this.ctx.setLineDash([]);
    }

    drawCandleInfo() {
        if (!this.hoveredCandle) return;

        const info = document.querySelector('.crypto-chart-info');
        if (!info) {
            // Create info box
            const infoBox = document.createElement('div');
            infoBox.className = 'crypto-chart-info';
            infoBox.style.cssText = `
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                padding: 0.75rem 1rem;
                border-radius: 8px;
                font-size: 0.85rem;
                z-index: 10;
                pointer-events: none;
                border: 1px solid rgba(255, 255, 255, 0.1);
            `;
            document.querySelector('.crypto-chart-display').appendChild(infoBox);
        }

        const infoBox = document.querySelector('.crypto-chart-info');
        const isGreen = this.hoveredCandle.close >= this.hoveredCandle.open;
        const change = this.hoveredCandle.close - this.hoveredCandle.open;
        const changePercent = (change / this.hoveredCandle.open) * 100;

        infoBox.innerHTML = `
            <div style="display: grid; grid-template-columns: auto auto; gap: 0.5rem 1.5rem; font-family: 'Inter', sans-serif;">
                <div style="color: rgba(255, 255, 255, 0.5);">Open:</div>
                <div style="color: white; font-weight: 600;">${this.hoveredCandle.open.toFixed(2)}</div>
                
                <div style="color: rgba(255, 255, 255, 0.5);">High:</div>
                <div style="color: #10b981; font-weight: 600;">${this.hoveredCandle.high.toFixed(2)}</div>
                
                <div style="color: rgba(255, 255, 255, 0.5);">Low:</div>
                <div style="color: #ef4444; font-weight: 600;">${this.hoveredCandle.low.toFixed(2)}</div>
                
                <div style="color: rgba(255, 255, 255, 0.5);">Close:</div>
                <div style="color: white; font-weight: 600;">${this.hoveredCandle.close.toFixed(2)}</div>
                
                <div style="color: rgba(255, 255, 255, 0.5);">Change:</div>
                <div style="color: ${isGreen ? '#10b981' : '#ef4444'}; font-weight: 600;">
                    ${change >= 0 ? '+' : ''}${change.toFixed(2)} (${changePercent.toFixed(2)}%)
                </div>
                
                <div style="color: rgba(255, 255, 255, 0.5);">Volume:</div>
                <div style="color: rgba(139, 92, 246, 0.8); font-weight: 600;">
                    ${(this.hoveredCandle.volume / 1000000).toFixed(2)}M
                </div>
            </div>
        `;
    }

    // ============================================
    // LIVE UPDATES
    // ============================================
    startLiveUpdates() {
        // Update last candle every 2 seconds
        setInterval(() => {
            if (this.chartData.length === 0) return;

            const lastCandle = this.chartData[this.chartData.length - 1];
            const volatility = lastCandle.close * 0.005;
            const change = (Math.random() - 0.5) * volatility;

            lastCandle.close += change;
            lastCandle.high = Math.max(lastCandle.high, lastCandle.close);
            lastCandle.low = Math.min(lastCandle.low, lastCandle.close);

            this.currentPrice = lastCandle.close;
            this.updatePriceDisplay();
        }, 2000);

        // Add new candle based on timeframe
        const timeframeConfig = this.timeframes[this.currentTimeframe];
        const updateInterval = timeframeConfig.minutes * 60 * 1000;

        setInterval(() => {
            const lastCandle = this.chartData[this.chartData.length - 1];
            const volatility = lastCandle.close * 0.015;

            const newCandle = {
                open: lastCandle.close,
                close: lastCandle.close + (Math.random() - 0.5) * volatility,
                high: 0,
                low: 0,
                volume: Math.random() * 1000000 + 500000,
                timestamp: Date.now()
            };

            newCandle.high = Math.max(newCandle.open, newCandle.close) + Math.random() * volatility * 0.5;
            newCandle.low = Math.min(newCandle.open, newCandle.close) - Math.random() * volatility * 0.5;

            this.chartData.push(newCandle);
            this.chartData.shift();

            this.volumeData.push({
                volume: newCandle.volume,
                type: newCandle.close >= newCandle.open ? 'buy' : 'sell'
            });
            this.volumeData.shift();
        }, updateInterval);
    }

    updatePriceDisplay() {
        // Update chart header price
        const priceDisplay = document.querySelector('.crypto-chart-price');
        if (priceDisplay) {
            priceDisplay.textContent = `${this.currentPrice.toFixed(2)}`;
            
            // Add color based on trend
            const prevCandle = this.chartData[this.chartData.length - 2];
            if (prevCandle) {
                const isUp = this.currentPrice >= prevCandle.close;
                priceDisplay.style.color = isUp ? '#10b981' : '#ef4444';
            }
        }
    }

    // ============================================
    // PUBLIC METHODS
    // ============================================
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    refresh() {
        this.generateChartData();
        this.render();
    }

    setAsset(symbol, price) {
        this.currentAsset = symbol;
        this.currentPrice = price;
        this.generateChartData();
        this.render();
    }
}

// ============================================
// INTEGRATION WITH MAIN CRYPTO SYSTEM
// ============================================

// Make CryptoChartSystem globally available
window.CryptoChartSystem = CryptoChartSystem;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Crypto Chart System Ready - Waiting for activation...');
    
    // Initialize chart when charts view becomes active
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const chartsView = document.querySelector('[data-crypto-view="charts"]');
                if (chartsView && chartsView.classList.contains('active')) {
                    if (!window.activeChartSystem) {
                        console.log('🚀 Initializing Chart System...');
                        setTimeout(() => {
                            window.activeChartSystem = new CryptoChartSystem();
                            console.log('✅ Chart System Active!');
                        }, 100);
                    }
                }
            }
        });
    });

    // Observe the charts view for activation
    const chartsView = document.querySelector('[data-crypto-view="charts"]');
    if (chartsView) {
        observer.observe(chartsView, { attributes: true });
        
        // If charts view is already active, initialize immediately
        if (chartsView.classList.contains('active')) {
            console.log('🚀 Initializing Chart System (Already Active)...');
            setTimeout(() => {
                window.activeChartSystem = new CryptoChartSystem();
                console.log('✅ Chart System Active!');
            }, 100);
        }
    }
});

// Also add chart system methods to CryptoTradingSystem if it exists
if (typeof window !== 'undefined') {
    window.initCryptoCharts = function() {
        console.log('🎯 Manual Chart Initialization Called');
        if (window.activeChartSystem) {
            window.activeChartSystem.destroy();
        }
        window.activeChartSystem = new CryptoChartSystem();
    };
}

console.log('📊 Advanced Crypto Chart System Loaded!');
