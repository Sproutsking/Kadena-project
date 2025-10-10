let chart;
    let currentTimeframe = '1D';
    let showMA = false;
    let showEMA = false;
    let showBollinger = false;
    let showRSI = false;
    let showVolume = false;
    let priceData = [];
    let currentDropdownSelection = 'More';

    const timeframeConfig = {
      '1m': { days: 0.0007, label: '1m' },
      '5m': { days: 0.003, label: '5m' },
      '15m': { days: 0.01, label: '15m' },
      '30m': { days: 0.02, label: '30m' },
      '1H': { days: 0.04, label: '1H' },
      '4H': { days: 0.17, label: '4H' },
      '1D': { days: 30, label: '1D' },
      '1W': { days: 90, label: '1W' },
      '1M': { days: 365, label: '1M' },
      '3M': { days: 1095, label: '3M' },
      '6M': { days: 2190, label: '6M' },
      '1Y': { days: 3650, label: '1Y' },
      'ALL': { days: 5000, label: 'ALL' }
    };

    function generateKDAData(days) {
      const data = [];
      const now = new Date();
      let basePrice = 0.85;
      const points = Math.max(30, Math.min(365, Math.floor(days * 24)));
      
      for (let i = points; i >= 0; i--) {
        const date = new Date(now - i * (days / points) * 24 * 60 * 60 * 1000);
        
        const trend = Math.sin(i / 10) * 0.05;
        const volatility = (Math.random() - 0.5) * 0.08;
        basePrice = Math.max(0.3, basePrice * (1 + trend + volatility));
        
        const open = basePrice;
        const close = basePrice * (1 + (Math.random() - 0.5) * 0.05);
        const high = Math.max(open, close) * (1 + Math.random() * 0.03);
        const low = Math.min(open, close) * (1 - Math.random() * 0.03);
        const volume = (Math.random() * 5000000 + 1000000);
        
        data.push({ date, open, high, low, close, volume });
        basePrice = close;
      }
      
      return data;
    }

    function calculateMA(data, period) {
      const ma = [];
      for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
          ma.push(null);
        } else {
          let sum = 0;
          for (let j = 0; j < period; j++) {
            sum += data[i - j].close;
          }
          ma.push(sum / period);
        }
      }
      return ma;
    }

    function calculateEMA(data, period) {
      const ema = [];
      const multiplier = 2 / (period + 1);
      ema[0] = data[0].close;
      
      for (let i = 1; i < data.length; i++) {
        ema[i] = (data[i].close - ema[i - 1]) * multiplier + ema[i - 1];
      }
      return ema;
    }

    function updatePriceInfo(data) {
      const latest = data[data.length - 1];
      const previous = data[data.length - 2];
      const change = ((latest.close - previous.close) / previous.close) * 100;
      
      let high24h = 0, low24h = Infinity, volume24h = 0;
      const last24h = data.slice(-Math.min(24, data.length));
      last24h.forEach(d => {
        high24h = Math.max(high24h, d.high);
        low24h = Math.min(low24h, d.low);
        volume24h += d.volume;
      });

      document.getElementById('currentPrice').textContent = `$${latest.close.toFixed(4)}`;
      
      const changeEl = document.getElementById('priceChange');
      changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
      changeEl.className = `price-change ${change >= 0 ? 'positive' : 'negative'}`;
      
      document.getElementById('high24h').textContent = `$${high24h.toFixed(4)}`;
      document.getElementById('low24h').textContent = `$${low24h.toFixed(4)}`;
      document.getElementById('volume24h').textContent = `$${(volume24h / 1000000).toFixed(2)}M`;
    }

    function createChart(data) {
      const ctx = document.getElementById('mainChart').getContext('2d');
      
      const labels = data.map(d => d.date.toLocaleString());
      const prices = data.map(d => d.close);
      
      const datasets = [{
        label: 'KDA Price',
        data: prices,
        borderColor: '#ff0080',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(255, 0, 128, 0.3)');
          gradient.addColorStop(0.5, 'rgba(121, 40, 202, 0.2)');
          gradient.addColorStop(1, 'rgba(121, 40, 202, 0)');
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#ff0080',
        pointHoverBorderColor: '#00ff88',
        pointHoverBorderWidth: 3
      }];

      if (showMA) {
        const ma20 = calculateMA(data, 20);
        datasets.push({
          label: 'MA(20)',
          data: ma20,
          borderColor: '#00ff88',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0
        });
      }

      if (showEMA) {
        const ema12 = calculateEMA(data, 12);
        datasets.push({
          label: 'EMA(12)',
          data: ema12,
          borderColor: '#fbbf24',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0
        });
      }

      if (chart) {
        chart.destroy();
      }

      chart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: 'white',
                font: { size: 12, weight: '600' },
                padding: 15,
                usePointStyle: true
              }
            },
            tooltip: {
              backgroundColor: 'rgba(10, 10, 10, 0.95)',
              titleColor: '#ff0080',
              bodyColor: 'white',
              borderColor: '#ff0080',
              borderWidth: 2,
              padding: 15,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) label += ': ';
                  if (context.parsed.y !== null) {
                    label += '$' + context.parsed.y.toFixed(4);
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
              ticks: {
                color: 'rgba(255, 255, 255, 0.7)',
                maxRotation: 0,
                autoSkipPadding: 20,
                font: { weight: '500' }
              }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
              ticks: {
                color: 'rgba(255, 255, 255, 0.7)',
                font: { weight: '500' },
                callback: function(value) {
                  return '$' + value.toFixed(4);
                }
              }
            }
          }
        }
      });

      document.getElementById('loading').style.display = 'none';
    }

    function changeTimeframe(timeframe, btn) {
      currentTimeframe = timeframe;
      document.querySelectorAll('.btn-group .btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const config = timeframeConfig[timeframe];
      priceData = generateKDAData(config.days);
      updatePriceInfo(priceData);
      createChart(priceData);
    }

    function toggleDropdown() {
      const menu = document.getElementById('dropdownMenu');
      menu.classList.toggle('show');
      
      document.addEventListener('click', function closeDropdown(e) {
        if (!e.target.closest('.dropdown')) {
          menu.classList.remove('show');
          document.removeEventListener('click', closeDropdown);
        }
      });
    }

    function selectTimeframe(timeframe, item) {
      currentTimeframe = timeframe;
      const config = timeframeConfig[timeframe];
      
      document.getElementById('dropdownLabel').textContent = config.label;
      document.getElementById('dropdownBtn').classList.add('active');
      document.querySelectorAll('#visibleTimeframes .btn').forEach(b => b.classList.remove('active'));
      
      document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      priceData = generateKDAData(config.days);
      updatePriceInfo(priceData);
      createChart(priceData);
      
      document.getElementById('dropdownMenu').classList.remove('show');
    }

    function toggleMA(btn) {
      showMA = !showMA;
      btn.classList.toggle('active');
      createChart(priceData);
    }

    function toggleEMA(btn) {
      showEMA = !showEMA;
      btn.classList.toggle('active');
      createChart(priceData);
    }

    function toggleBollinger(btn) {
      showBollinger = !showBollinger;
      btn.classList.toggle('active');
      alert('Bollinger Bands coming soon!');
    }

    function toggleRSI(btn) {
      showRSI = !showRSI;
      btn.classList.toggle('active');
      alert('RSI indicator coming soon!');
    }

    function toggleVolume(btn) {
      showVolume = !showVolume;
      btn.classList.toggle('active');
      alert('Volume overlay coming soon!');
    }

    function toggleFullscreen(btn) {
      const container = document.getElementById('chartContainer');
      if (!document.fullscreenElement) {
        container.requestFullscreen();
        btn.classList.add('active');
      } else {
        document.exitFullscreen();
        btn.classList.remove('active');
      }
    }

    // Initialize
    window.addEventListener('load', function() {
      priceData = generateKDAData(30);
      updatePriceInfo(priceData);
      createChart(priceData);
      document.querySelector('.btn-group .btn').classList.add('active');
      
      // Simulate real-time updates
      setInterval(() => {
        const latest = priceData[priceData.length - 1];
        const newPrice = latest.close * (1 + (Math.random() - 0.5) * 0.02);
        priceData.push({
          date: new Date(),
          open: latest.close,
          high: Math.max(latest.close, newPrice),
          low: Math.min(latest.close, newPrice),
          close: newPrice,
          volume: Math.random() * 5000000 + 1000000
        });
        priceData.shift();
        updatePriceInfo(priceData);
        createChart(priceData);
      }, 5000);
    });
