// ========================================
// GLOBAL VARIABLES & STATE MANAGEMENT
// ========================================

let currentSection = 'dashboard';
let currentWalletTab = 'overview';
let currentAccountTab = 'profile';
let joinedCommunities = new Set();
let mainChart = null;
let networkChart = null;
let defiChart = null;
let adoptionChart = null;

// ========================================
// NAVIGATION FUNCTIONS
// ========================================

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    currentSection = sectionId;
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    sidebar.classList.toggle('active');
    
    if (window.innerWidth > 768) {
        sidebar.classList.toggle('hidden');
        mainContent.classList.toggle('expanded');
    }
}

// ========================================
// TAB SWITCHING FUNCTIONS
// ========================================

function switchAccountTab(tabId) {
    // Hide all account content
    document.querySelectorAll('.account-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected content
    document.getElementById(`account-${tabId}`).style.display = 'block';
    
    // Update tab buttons
    document.querySelectorAll('.account-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    currentAccountTab = tabId;
}

// ========================================
// MESSAGING FUNCTIONS
// ========================================

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chatMessages');
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        messageDiv.innerHTML = `<div class="message-bubble">${message}</div>`;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        input.value = '';
        
        // Simulate response
        setTimeout(() => {
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message';
            responseDiv.innerHTML = `
                <div class="avatar">T</div>
                <div class="message-bubble">I understand. Let me help you with that right away.</div>
            `;
            messagesContainer.appendChild(responseDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }
}

// ========================================
// MARKET DATA & SIDEBAR
// ========================================

function initializeMarketData() {
    const marketData = [
        { symbol: 'BTC', price: 50000, change: 2.5 },
        { symbol: 'ETH', price: 3000, change: -1.2 },
        { symbol: 'ADA', price: 1.5, change: 0.8 },
    ];

    const marketContainer = document.querySelector('.sidebar-mini-market');
    if (!marketContainer) return;

    marketContainer.innerHTML = '<h4>Market Snapshot</h4>';

    marketData.slice(0, 3).forEach(coin => {
        const item = document.createElement('div');
        item.className = 'mini-market-item';
        item.innerHTML = `
            <span>${coin.symbol}</span>
            <span>$${coin.price.toLocaleString()}</span>
            <span class="${coin.change > 0 ? 'positive' : 'negative'}">${coin.change}%</span>
        `;
        marketContainer.appendChild(item);
    });
}

// ========================================
// CHART INITIALIZATION & MANAGEMENT
// ========================================

function initCharts() {
    Chart.defaults.color = '#888888';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)';

    const priceData = generatePriceData();
    const labels = generateTimeLabels();

    initMainChart(priceData, labels);
    initNetworkChart();
    initDefiChart();
    initAdoptionChart();
    
    startLiveUpdates();
}

function generatePriceData() {
    const priceData = [];
    const basePrice = 0.4285;
    
    for (let i = 48; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 0.06;
        const trend = Math.sin(i / 8) * 0.02;
        const volatility = Math.sin(i / 3) * 0.01;
        const price = Math.max(0.001, basePrice + variation + trend + volatility);
        priceData.push(price);
    }
    
    return priceData;
}

function generateTimeLabels() {
    const labels = [];
    const now = Date.now();
    
    for (let i = 48; i >= 0; i--) {
        const time = new Date(now - (i * 30 * 60 * 1000));
        labels.push(time.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        }));
    }
    
    return labels;
}

function initMainChart(priceData, labels) {
    const canvas = document.getElementById('mainChart');
    if (!canvas) {
        console.error('Main chart canvas not found!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context!');
        return;
    }

    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'KDA/USD',
                data: priceData,
                borderColor: '#ff0080',
                backgroundColor: 'rgba(255, 0, 128, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ff0080',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#ff0080',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    titleFont: { size: 12, weight: 'bold' },
                    bodyFont: { size: 14, weight: 'bold' },
                    padding: 10,
                    callbacks: {
                        title: () => 'KDA Price',
                        label: (context) => '$' + context.parsed.y.toFixed(4)
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#666',
                        font: { size: 9 },
                        maxTicksLimit: window.innerWidth < 768 ? 4 : 8,
                        callback: function(value, index) {
                            return index % (window.innerWidth < 768 ? 12 : 6) === 0 ? this.getLabelForValue(value) : '';
                        }
                    }
                },
                y: {
                    display: true,
                    position: 'right',
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#666',
                        font: { size: 9 },
                        maxTicksLimit: 5,
                        callback: function(value) {
                            return '$' + value.toFixed(4);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initNetworkChart() {
    const netCtx = document.getElementById('networkChart')?.getContext('2d');
    if (!netCtx) return;

    const networkData = Array.from({length: 12}, () => Math.floor(Math.random() * 1200) + 800);
    
    networkChart = new Chart(netCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 12}, (_, i) => i + 'h'),
            datasets: [{
                data: networkData,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                x: { display: false }, 
                y: { display: false } 
            }
        }
    });
}

function initDefiChart() {
    const defiCtx = document.getElementById('defiChart')?.getContext('2d');
    if (!defiCtx) return;

    const defiData = [45.7, 47.2, 46.8, 48.1, 49.3, 47.9, 45.7];
    
    defiChart = new Chart(defiCtx, {
        type: 'bar',
        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
                data: defiData,
                backgroundColor: 'rgba(121, 40, 202, 0.4)',
                borderColor: '#7928ca',
                borderWidth: 1,
                borderRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                x: { display: false }, 
                y: { display: false } 
            }
        }
    });
}

function initAdoptionChart() {
    const adoptCtx = document.getElementById('adoptionChart')?.getContext('2d');
    if (!adoptCtx) return;

    adoptionChart = new Chart(adoptCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [60, 25, 15],
                backgroundColor: ['#ff0080', '#7928ca', '#00ff88'],
                borderWidth: 0,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

// ========================================
// REAL-TIME DATA UPDATES
// ========================================

function startLiveUpdates() {
    // Update main chart data every 3 seconds
    setInterval(() => {
        updateMainChart();
    }, 3000);

    // Update network stats every 5 seconds
    setInterval(() => {
        updateNetworkChart();
    }, 5000);

    // Update UI stats every 4 seconds
    setInterval(() => {
        updateUIStats();
    }, 4000);
}

function updateMainChart() {
    if (!mainChart) return;
    
    const data = mainChart.data.datasets[0].data;
    const lastPrice = data[data.length - 1];
    const variation = (Math.random() - 0.5) * 0.02;
    const newPrice = Math.max(0.001, lastPrice + variation);
    
    // Remove first point and add new one
    data.shift();
    data.push(newPrice);
    
    // Update labels
    const labels = mainChart.data.labels;
    labels.shift();
    labels.push(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    }));
    
    // Update price display
    const priceEl = document.getElementById('price');
    if (priceEl) {
        priceEl.textContent = `$${newPrice.toFixed(4)}`;
    }
    
    mainChart.update('none');
}

function updateNetworkChart() {
    if (!networkChart) return;
    
    const data = networkChart.data.datasets[0].data;
    data.shift();
    data.push(Math.floor(Math.random() * 1200) + 800);
    networkChart.update('none');
}

function updateUIStats() {
    const elements = document.querySelectorAll('.pulse');
    elements.forEach(el => {
        if (el.textContent.includes('TPS')) {
            const current = parseInt(el.textContent.replace(/[^0-9]/g, ''));
            const change = Math.floor((Math.random() - 0.5) * 200);
            el.textContent = `${Math.max(800, current + change)} TPS`;
        }
        if (el.textContent.includes(',')) {
            const current = parseInt(el.textContent.replace(/[^0-9]/g, ''));
            const change = Math.floor((Math.random() - 0.5) * 100);
            el.textContent = (current + change).toLocaleString();
        }
    });
}

// ========================================
// DATA SIMULATION FUNCTIONS
// ========================================

function simulateDataUpdates() {
    // Price fluctuations every 2 seconds
    setInterval(() => {
        updatePriceData();
    }, 2000);

    // Volume changes every 7 seconds
    setInterval(() => {
        updateVolumeData();
    }, 7000);

    // Market cap changes every 9 seconds
    setInterval(() => {
        updateMarketCapData();
    }, 9000);
}

function updatePriceData() {
    const priceEl = document.getElementById('price');
    if (!priceEl) return;
    
    const currentPrice = parseFloat(priceEl.textContent.replace('$', ''));
    const variation = (Math.random() - 0.5) * 0.01;
    const newPrice = Math.max(0.001, currentPrice + variation);
    priceEl.textContent = `$${newPrice.toFixed(4)}`;

    // Update change percentage
    const changeEl = document.getElementById('priceChange');
    if (changeEl) {
        const change = ((newPrice - 0.4285) / 0.4285) * 100;
        changeEl.textContent = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
        changeEl.className = `stat-change ${change > 0 ? 'positive' : 'negative'}`;
    }
}

function updateVolumeData() {
    const volumeEl = document.getElementById('volume');
    if (!volumeEl) return;
    
    const base = 14.2;
    const variation = (Math.random() - 0.5) * 4;
    const newVolume = Math.max(1, base + variation);
    volumeEl.textContent = `$${newVolume.toFixed(1)}M`;
}

function updateMarketCapData() {
    const capEl = document.getElementById('marketCap');
    if (!capEl) return;
    
    const base = 1.08;
    const variation = (Math.random() - 0.5) * 0.2;
    const newCap = Math.max(0.1, base + variation);
    capEl.textContent = `$${newCap.toFixed(2)}B`;
}

// ========================================
// ANIMATION & VISUAL EFFECTS
// ========================================

function initializeAnimations() {
    // Pulse animation for stat cards every 10 seconds
    setInterval(() => {
        const stats = document.querySelectorAll('.stat-card');
        stats.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'pulse 0.6s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 600);
            }, index * 200);
        });
    }, 10000);

    // Mobile entrance animations
    if (window.innerWidth <= 768) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'slideIn 0.5s ease forwards';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.stat-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// ========================================
// EVENT LISTENERS SETUP
// ========================================

function setupEventListeners() {
    // Window resize handler
    window.addEventListener('resize', handleResize);
    
    // Keyboard event handler for messaging
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// ========================================
// RESPONSIVE DESIGN HANDLERS
// ========================================

function handleResize() {
    // No social-specific logic needed
}

// ========================================
// INITIALIZATION FUNCTIONS
// ========================================

function initializeApp() {
    console.log('Initializing Kadena Dashboard...');
    
    // Initialize market data
    initializeMarketData();
    
    // Handle responsive design
    handleResize();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Start animations
    initializeAnimations();
    
    console.log('Dashboard initialized successfully');
}

function startDataUpdates() {
    console.log('Starting data updates...');
    
    // Start all update intervals
    simulateDataUpdates();
    
    console.log('Data updates started');
}
// ========================================
// DOM READY INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components...');
    
    // Initialize basic app functionality
    initializeApp();
    
    // Initialize social section
    initializeSocialSection();
    
    // Initialize charts after a short delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('Initializing charts...');
        initCharts();
        startDataUpdates();
    }, 100);
    
    console.log('All components initialized');
});


function initializeAnimations() {
  // Pulse animation for stat cards every 10 seconds
  setInterval(() => {
    const stats = document.querySelectorAll('.stat-card');
    stats.forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
          card.style.animation = '';
        }, 600);
      }, index * 200);
    });
  }, 10000);

  // Update member counts every 30 seconds
  setInterval(() => {
    const memberCounts = document.querySelectorAll('.community-members');
    memberCounts.forEach(count => {
      const current = parseInt(count.textContent.replace(/[^\d]/g, ''));
      const newCount = current + Math.floor(Math.random() * 5);
      count.textContent = `${newCount.toLocaleString()} members`;
    });
  }, 30000);

  // Trigger entrance animation for visible elements on mobile
  if (window.innerWidth <= 768) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.5s ease forwards';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.stat-card, .wallet-card, .post, .community-card').forEach(el => {
      observer.observe(el);
    });
  }
}

// Toggle Sidebar and Overlay
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const overlay = document.getElementById('sidebarOverlay');

  sidebar.classList.toggle('active');
  mainContent.classList.toggle('sidebar-active');
  if (overlay) {
    overlay.classList.toggle('active');
  }
}

// Updated setupEventListeners to Handle Overlay Click
function setupEventListeners() {
  // Existing event listeners (e.g., for nav links, wallet tabs, etc.) should remain
  // Add this block to ensure overlay click closes sidebar
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) { // Only trigger when clicking the overlay, not the close button
        toggleSidebar();
      }
    });
  }

  // Existing resize handler
  window.addEventListener('resize', handleResize);

  // Add any other existing event listeners here (e.g., for nav links, tabs, etc.)
}

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(sectionId).classList.add('active');
  
  // Update navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  event.target.classList.add('active');
  
  currentSection = sectionId;
  
  // Close sidebar and overlay on mobile when selecting a section
  if (window.innerWidth <= 768) {
    toggleSidebar();
  }
  
  // Handle responsive design for social section
  if (sectionId === 'social') {
    const trending = document.getElementById('trendingDesktop');
    if (window.innerWidth > 1200) {
      trending.style.display = 'block';
      document.querySelector('.social-layout').style.gridTemplateColumns = '2fr 1fr';
    }
  }
}

function initializeAnimations() {
  setInterval(() => {
    const stats = document.querySelectorAll('.stat-card');
    stats.forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
          card.style.animation = '';
        }, 600);
      }, index * 200);
    });
  }, 10000);
  setInterval(() => {
    const memberCounts = document.querySelectorAll('.community-members');
    memberCounts.forEach(count => {
      const current = parseInt(count.textContent.replace(/[^\d]/g, ''));
      const newCount = current + Math.floor(Math.random() * 5);
      count.textContent = `${newCount.toLocaleString()} members`;
    });
  }, 30000);
  if (window.innerWidth <= 768) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.5s ease forwards';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.stat-card, .wallet-card, .post, .community-card, .p2p-offer').forEach(el => {
      observer.observe(el);
    });
  }
}

// ========================================
// DOM READY INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components...');
    
    // Initialize basic app functionality
    initializeApp();
    
    // Initialize charts after a short delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('Initializing charts...');
        initCharts();
        startDataUpdates();
    }, 100);
    
    console.log('All components initialized');
});
