let currentModalType = '';
    let currentItemName = '';
    let currentRating = 0;
    let selectedPaymentMethod = '';
    let currentBookPrice = 0;
    let currentBookIsFree = false;
    let currentBookOwned = false;

    // Sample data for different leaderboards
    const leaderboardData = {
      streams: [
        { name: 'AlexTheStreamer', avatar: 'A', followers: '45.2K', time: '127h', score: 9847 },
        { name: 'MarinaGaming', avatar: 'M', followers: '38.9K', time: '115h', score: 8523 },
        { name: 'DavidStreams', avatar: 'D', followers: '32.1K', time: '98h', score: 7891 },
        { name: 'SarahCreates', avatar: 'S', followers: '28.5K', time: '87h', score: 6754 },
        { name: 'JohnnyLive', avatar: 'J', followers: '25.7K', time: '82h', score: 6234 },
        { name: 'EmilyPlays', avatar: 'E', followers: '23.4K', time: '76h', score: 5892 },
        { name: 'MikeContent', avatar: 'M', followers: '21.8K', time: '71h', score: 5456 },
        { name: 'LisaCreative', avatar: 'L', followers: '19.2K', time: '65h', score: 5123 },
        { name: 'TomStreamer', avatar: 'T', followers: '17.5K', time: '59h', score: 4789 },
        { name: 'AnnaLive', avatar: 'A', followers: '16.1K', time: '54h', score: 4456 }
      ],
      followers: [
        { name: 'MegaInfluencer', avatar: 'M', followers: '2.5M', posts: '1.2K', score: 9985 },
        { name: 'TopCreator', avatar: 'T', followers: '1.8M', posts: '987', score: 8765 },
        { name: 'ViralKing', avatar: 'V', followers: '1.5M', posts: '856', score: 7654 },
        { name: 'TrendSetter', avatar: 'T', followers: '1.2M', posts: '743', score: 6543 },
        { name: 'ContentQueen', avatar: 'C', followers: '980K', posts: '654', score: 5432 },
        { name: 'SocialStar', avatar: 'S', followers: '875K', posts: '589', score: 4987 },
        { name: 'FamousCreator', avatar: 'F', followers: '756K', posts: '512', score: 4567 },
        { name: 'PopularArtist', avatar: 'P', followers: '634K', posts: '478', score: 4234 },
        { name: 'RisingTalent', avatar: 'R', followers: '567K', posts: '423', score: 3987 },
        { name: 'NewWave', avatar: 'N', followers: '498K', posts: '389', score: 3654 }
      ],
      creators: [
        { name: 'ProCreator', avatar: 'P', content: '234', engagement: '98%', score: 9876 },
        { name: 'ArtistPro', avatar: 'A', content: '198', engagement: '95%', score: 8654 },
        { name: 'DesignMaster', avatar: 'D', content: '176', engagement: '92%', score: 7543 },
        { name: 'VideoWizard', avatar: 'V', content: '154', engagement: '89%', score: 6432 },
        { name: 'PhotoGenius', avatar: 'P', content: '132', engagement: '86%', score: 5321 },
        { name: 'MusicMaker', avatar: 'M', content: '118', engagement: '83%', score: 4987 },
        { name: 'ContentKing', avatar: 'C', content: '105', engagement: '80%', score: 4567 },
        { name: 'CreativeX', avatar: 'C', content: '94', engagement: '77%', score: 4234 },
        { name: 'TalentHub', avatar: 'T', content: '87', engagement: '74%', score: 3987 },
        { name: 'ArtFlow', avatar: 'A', content: '79', engagement: '71%', score: 3654 }
      ],
      sounds: [
        { name: 'HitSound2024', avatar: '🎵', plays: '5.2M', uses: '234K', score: 9945 },
        { name: 'ViralBeat', avatar: '🎶', plays: '4.8M', uses: '198K', score: 8876 },
        { name: 'TrendAudio', avatar: '🎧', plays: '4.1M', uses: '176K', score: 7765 },
        { name: 'TopTrack', avatar: '🎼', plays: '3.7M', uses: '154K', score: 6654 },
        { name: 'BestMix', avatar: '🎵', plays: '3.2M', uses: '132K', score: 5543 },
        { name: 'PopularTune', avatar: '🎶', plays: '2.9M', uses: '118K', score: 4987 },
        { name: 'VibesMusic', avatar: '🎧', plays: '2.5M', uses: '105K', score: 4567 },
        { name: 'ChillBeats', avatar: '🎼', plays: '2.2M', uses: '94K', score: 4234 },
        { name: 'EpicSound', avatar: '🎵', plays: '1.9M', uses: '87K', score: 3987 },
        { name: 'FreshTrack', avatar: '🎶', plays: '1.7M', uses: '79K', score: 3654 }
      ],
      videos: [
        { name: 'ViralVideo2024', avatar: '🎬', views: '12.5M', likes: '890K', score: 9967 },
        { name: 'TrendingClip', avatar: '📹', views: '10.2M', likes: '756K', score: 8854 },
        { name: 'EpicContent', avatar: '🎥', views: '8.9M', likes: '654K', score: 7743 },
        { name: 'BestVideo', avatar: '🎬', views: '7.6M', likes: '589K', score: 6632 },
        { name: 'TopClip', avatar: '📹', views: '6.4M', likes: '512K', score: 5521 },
        { name: 'PopularReel', avatar: '🎥', views: '5.8M', likes: '478K', score: 4987 },
        { name: 'TrendyVideo', avatar: '🎬', views: '5.1M', likes: '423K', score: 4567 },
        { name: 'ViralMoment', avatar: '📹', views: '4.5M', likes: '389K', score: 4234 },
        { name: 'HotContent', avatar: '🎥', views: '3.9M', likes: '356K', score: 3987 },
        { name: 'FreshClip', avatar: '🎬', views: '3.4M', likes: '323K', score: 3654 }
      ],
      books: [
        { name: 'BestSeller2024', avatar: '📖', reads: '890K', rating: '4.9⭐', score: 9923 },
        { name: 'TopNovel', avatar: '📚', reads: '756K', rating: '4.8⭐', score: 8812 },
        { name: 'MustRead', avatar: '📕', reads: '654K', rating: '4.7⭐', score: 7701 },
        { name: 'EpicStory', avatar: '📗', reads: '589K', rating: '4.6⭐', score: 6590 },
        { name: 'GreatBook', avatar: '📘', reads: '512K', rating: '4.5⭐', score: 5479 },
        { name: 'PopularRead', avatar: '📙', reads: '478K', rating: '4.4⭐', score: 4987 },
        { name: 'TrendingBook', avatar: '📖', reads: '423K', rating: '4.3⭐', score: 4567 },
        { name: 'NewHit', avatar: '📚', reads: '389K', rating: '4.2⭐', score: 4234 },
        { name: 'RisingNovel', avatar: '📕', reads: '356K', rating: '4.1⭐', score: 3987 },
        { name: 'FreshRead', avatar: '📗', reads: '323K', rating: '4.0⭐', score: 3654 }
      ],
      futures: [
        { name: 'TradeMaster', avatar: 'T', profit: '+$234K', roi: '185%', score: 9956 },
        { name: 'FuturesPro', avatar: 'F', profit: '+$198K', roi: '168%', score: 8845 },
        { name: 'TradeKing', avatar: 'T', profit: '+$176K', roi: '152%', score: 7734 },
        { name: 'ProfitMaker', avatar: 'P', profit: '+$154K', roi: '137%', score: 6623 },
        { name: 'MarketWhiz', avatar: 'M', profit: '+$132K', roi: '123%', score: 5512 },
        { name: 'TradingGuru', avatar: 'T', profit: '+$118K', roi: '110%', score: 4987 },
        { name: 'InvestorX', avatar: 'I', profit: '+$105K', roi: '98%', score: 4567 },
        { name: 'ProTrader', avatar: 'P', profit: '+$94K', roi: '87%', score: 4234 },
        { name: 'FinanceExpert', avatar: 'F', profit: '+$87K', roi: '76%', score: 3987 },
        { name: 'TradeStar', avatar: 'T', profit: '+$79K', roi: '65%', score: 3654 }
      ],
      forex: [
        { name: 'ForexMaster', avatar: 'F', profit: '+$345K', pairs: '12', score: 9989 },
        { name: 'CurrencyKing', avatar: 'C', profit: '+$298K', pairs: '10', score: 8878 },
        { name: 'FXTrader', avatar: 'F', profit: '+$267K', pairs: '9', score: 7767 },
        { name: 'PipHunter', avatar: 'P', profit: '+$234K', pairs: '8', score: 6656 },
        { name: 'ForexPro', avatar: 'F', profit: '+$198K', pairs: '7', score: 5545 },
        { name: 'TradingNinja', avatar: 'T', profit: '+$176K', pairs: '6', score: 4987 },
        { name: 'MarketGuru', avatar: 'M', profit: '+$154K', pairs: '6', score: 4567 },
        { name: 'CurrencyExpert', avatar: 'C', profit: '+$132K', pairs: '5', score: 4234 },
        { name: 'FXGenius', avatar: 'F', profit: '+$118K', pairs: '5', score: 3987 },
        { name: 'PipMaster', avatar: 'P', profit: '+$105K', pairs: '4', score: 3654 }
      ],
      p2p: [
        { name: 'P2PChampion', avatar: 'P', trades: '1.2K', rating: '99%', score: 9978 },
        { name: 'TrustTrader', avatar: 'T', trades: '987', rating: '98%', score: 8867 },
        { name: 'ReliableDealer', avatar: 'R', trades: '856', rating: '97%', score: 7756 },
        { name: 'TopMerchant', avatar: 'T', trades: '743', rating: '96%', score: 6645 },
        { name: 'SafeTrader', avatar: 'S', trades: '654', rating: '95%', score: 5534 },
        { name: 'QuickDeal', avatar: 'Q', trades: '589', rating: '94%', score: 4987 },
        { name: 'FastExchange', avatar: 'F', trades: '512', rating: '93%', score: 4567 },
        { name: 'SecureP2P', avatar: 'S', trades: '478', rating: '92%', score: 4234 },
        { name: 'TrustedSeller', avatar: 'T', trades: '423', rating: '91%', score: 3987 },
        { name: 'ProMerchant', avatar: 'P', trades: '389', rating: '90%', score: 3654 }
      ],
      hashtags: [
        { name: '#Trending2024', avatar: '#', uses: '2.5M', posts: '890K', score: 9934 },
        { name: '#ViralNow', avatar: '#', uses: '2.1M', posts: '756K', score: 8823 },
        { name: '#TopTrend', avatar: '#', uses: '1.8M', posts: '654K', score: 7712 },
        { name: '#MustSee', avatar: '#', uses: '1.5M', posts: '589K', score: 6601 },
        { name: '#ForYou', avatar: '#', uses: '1.3M', posts: '512K', score: 5490 },
        { name: '#Trending', avatar: '#', uses: '1.1M', posts: '478K', score: 4987 },
        { name: '#Viral', avatar: '#', uses: '980K', posts: '423K', score: 4567 },
        { name: '#Popular', avatar: '#', uses: '875K', posts: '389K', score: 4234 },
        { name: '#Hot', avatar: '#', uses: '756K', posts: '356K', score: 3987 },
        { name: '#NewTrend', avatar: '#', uses: '654K', posts: '323K', score: 3654 }
      ],
      plays: [
        { name: 'MostPlayed2024', avatar: '▶', plays: '25M', hours: '2.1M', score: 9991 },
        { name: 'TopPlay', avatar: '▶', plays: '21M', hours: '1.8M', score: 8880 },
        { name: 'BestContent', avatar: '▶', plays: '18M', hours: '1.5M', score: 7769 },
        { name: 'PopularPlay', avatar: '▶', plays: '15M', hours: '1.3M', score: 6658 },
        { name: 'TrendingPlay', avatar: '▶', plays: '13M', hours: '1.1M', score: 5547 },
        { name: 'HotPlay', avatar: '▶', plays: '11M', hours: '980K', score: 4987 },
        { name: 'ViralPlay', avatar: '▶', plays: '9.5M', hours: '875K', score: 4567 },
        { name: 'TopHit', avatar: '▶', plays: '8.2M', hours: '756K', score: 4234 },
        { name: 'MustPlay', avatar: '▶', plays: '7.1M', hours: '654K', score: 3987 },
        { name: 'FreshPlay', avatar: '▶', plays: '6.3M', hours: '589K', score: 3654 }
      ],
      views: [
        { name: 'MostViewed', avatar: '👁', views: '50M', unique: '12M', score: 9998 },
        { name: 'TopViews', avatar: '👁', views: '42M', unique: '10M', score: 8887 },
        { name: 'BestViewed', avatar: '👁', views: '36M', unique: '8.5M', score: 7776 },
        { name: 'PopularView', avatar: '👁', views: '31M', unique: '7.2M', score: 6665 },
        { name: 'TrendingView', avatar: '👁', views: '27M', unique: '6.1M', score: 5554 },
        { name: 'HotViews', avatar: '👁', views: '23M', unique: '5.3M', score: 4987 },
        { name: 'ViralViews', avatar: '👁', views: '20M', unique: '4.7M', score: 4567 },
        { name: 'TopWatch', avatar: '👁', views: '17M', unique: '4.1M', score: 4234 },
        { name: 'MustWatch', avatar: '👁', views: '15M', unique: '3.6M', score: 3987 },
        { name: 'FreshViews', avatar: '👁', views: '13M', unique: '3.2M', score: 3654 }
      ]
    };

    // Open specific leaderboard
    function openLeaderboard(category, icon, name) {
      document.getElementById('categoryButtons').classList.add('hidden');
      document.getElementById('leaderboardView').classList.add('active');
      document.getElementById('leaderboardIcon').textContent = icon;
      document.getElementById('leaderboardName').textContent = name;
      
      // Load data for selected category
      loadLeaderboardData(category);
    }

    // Go back to category buttons
    function backToCategories() {
      document.getElementById('categoryButtons').classList.remove('hidden');
      document.getElementById('leaderboardView').classList.remove('active');
    }

    // Load leaderboard data
    function loadLeaderboardData(category) {
      const listContainer = document.getElementById('leaderboardList');
      const data = leaderboardData[category] || [];
      
      if (data.length === 0) {
        listContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">🏆</div>
            <div class="empty-text">No data available yet</div>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = data.map((item, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        const rankBadge = rank === 1 ? '👑' : rank;
        
        // Determine stats and action button based on category
        let stat1, stat2, actionButton = '';
        
        switch(category) {
          case 'streams':
            stat1 = `<span class="user-stat"><span class="stat-icon">👥</span><span>${item.followers}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">⏱️</span><span>${item.time}</span></span>`;
            actionButton = `<button class="item-action-btn follow-btn" onclick="followCreator('${item.name}')">Follow</button>`;
            break;
          case 'followers':
            stat1 = `<span class="user-stat"><span class="stat-icon">👥</span><span>${item.followers}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">📝</span><span>${item.posts}</span></span>`;
            actionButton = `<button class="item-action-btn follow-btn" onclick="followCreator('${item.name}')">Follow</button>`;
            break;
          case 'creators':
            stat1 = `<span class="user-stat"><span class="stat-icon">📊</span><span>${item.content} posts</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">💯</span><span>${item.engagement}</span></span>`;
            actionButton = `<button class="item-action-btn follow-btn" onclick="followCreator('${item.name}')">Follow</button>`;
            break;
          case 'sounds':
            stat1 = `<span class="user-stat"><span class="stat-icon">▶️</span><span>${item.plays}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">🎵</span><span>${item.uses}</span></span>`;
            actionButton = `<button class="item-action-btn" onclick="openFeeModal('sound', '${item.name}', 15)">Use Sound</button>`;
            break;
          case 'videos':
            stat1 = `<span class="user-stat"><span class="stat-icon">👁️</span><span>${item.views}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">❤️</span><span>${item.likes}</span></span>`;
            actionButton = `<button class="item-action-btn" onclick="openFeeModal('video', '${item.name}', 12)">Use Video</button>`;
            break;
          case 'books':
            stat1 = `<span class="user-stat"><span class="stat-icon">📖</span><span>${item.reads}</span></span>`;
            stat2 = '';
            actionButton = `
              <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-end;">
                <div style="display: flex; gap: 6px;">
                  <button class="item-action-btn" onclick="openBookAccessModal('${item.name}', ${index % 2 === 0}, ${index % 3 === 0})" style="font-size: 10px; padding: 6px 12px;">Read</button>
                  <button class="item-action-btn follow-btn" onclick="openRatingModal('${item.name}')" style="font-size: 10px; padding: 6px 12px;">Rate</button>
                </div>
                <div style="font-size: 11px; color: #ffd700; font-weight: 700;">${item.rating}</div>
              </div>
            `;
            break;
          case 'futures':
            stat1 = `<span class="user-stat"><span class="stat-icon">💰</span><span>${item.profit}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">📈</span><span>${item.roi}</span></span>`;
            actionButton = `<button class="item-action-btn follow-btn" onclick="followCreator('${item.name}')">Follow</button>`;
            break;
          case 'forex':
            stat1 = `<span class="user-stat"><span class="stat-icon">💱</span><span>${item.profit}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">📊</span><span>${item.pairs} pairs</span></span>`;
            actionButton = `<button class="item-action-btn follow-btn" onclick="followCreator('${item.name}')">Follow</button>`;
            break;
          case 'p2p':
            stat1 = `<span class="user-stat"><span class="stat-icon">🤝</span><span>${item.trades} trades</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">⭐</span><span>${item.rating}</span></span>`;
            break;
          case 'hashtags':
            stat1 = `<span class="user-stat"><span class="stat-icon">#️⃣</span><span>${item.uses}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">📝</span><span>${item.posts}</span></span>`;
            break;
          case 'plays':
            stat1 = `<span class="user-stat"><span class="stat-icon">▶️</span><span>${item.plays}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">⏱️</span><span>${item.hours}</span></span>`;
            break;
          case 'views':
            stat1 = `<span class="user-stat"><span class="stat-icon">👁️</span><span>${item.views}</span></span>`;
            stat2 = `<span class="user-stat"><span class="stat-icon">👤</span><span>${item.unique}</span></span>`;
            break;
          default:
            stat1 = stat2 = '';
        }
        
        return `
          <div class="leaderboard-item ${rankClass}">
            <div class="rank-badge">${rankBadge}</div>
            <div class="user-avatar">${item.avatar}</div>
            <div class="user-info">
              <div class="user-name">${item.name}</div>
              <div class="user-stats">
                ${stat1}
                ${stat2}
              </div>
            </div>
            ${actionButton}
            <div class="score-badge">
              <div class="score-value">${item.score.toLocaleString()}</div>
              <div class="score-label">Score</div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Open fee modal for sounds/videos
    function openFeeModal(type, itemName, feePercent) {
      currentModalType = type;
      currentItemName = itemName;
      
      const modal = document.getElementById('feeModal');
      const modalIcon = document.getElementById('modalIcon');
      const modalTitle = document.getElementById('modalTitle');
      const modalSubtitle = document.getElementById('modalSubtitle');
      const feePercentage = document.getElementById('feePercentage');
      const feeNotice = document.getElementById('feeNotice');
      
      if (type === 'sound') {
        modalIcon.textContent = '🎵';
        modalTitle.textContent = 'Use This Sound';
        feeNotice.textContent = `By using this sound, ${feePercent}% of your net earnings from content featuring this audio will be paid to the creator. Platform fee of 2.5% applies to all transactions.`;
      } else if (type === 'video') {
        modalIcon.textContent = '🎬';
        modalTitle.textContent = 'Use This Video';
        feeNotice.textContent = `By using this video, ${feePercent}% of your net earnings from content featuring this video will be paid to the creator. Platform fee of 2.5% applies to all transactions.`;
      }
      
      modalSubtitle.textContent = itemName;
      feePercentage.textContent = `${feePercent}%`;
      
      const platformFee = 2.5;
      const yourEarnings = 100 - feePercent - platformFee;
      document.querySelector('.fee-value.highlight').textContent = `${yourEarnings}%`;
      
      modal.classList.add('active');
    }

    function closeFeeModal() {
      document.getElementById('feeModal').classList.remove('active');
    }

    function proceedWithAction() {
      closeFeeModal();
      showSuccessAlert(
        `${currentModalType === 'sound' ? 'Sound' : 'Video'} Added!`,
        `You can now use "${currentItemName}" in your content. The royalty agreement is active.`
      );
    }

    // Follow creator
    function followCreator(name) {
      const btn = event.target;
      if (btn.classList.contains('following')) {
        btn.classList.remove('following');
        btn.textContent = 'Follow';
        showSuccessAlert('Unfollowed', `You have unfollowed ${name}`);
      } else {
        btn.classList.add('following');
        btn.textContent = 'Following';
        showSuccessAlert('Following!', `You are now following ${name}. You'll see their latest content in your feed.`);
      }
    }

    // Rating Modal Functions
    function openRatingModal(bookName) {
      currentItemName = bookName;
      currentRating = 0;
      document.getElementById('ratingBookName').textContent = bookName;
      document.getElementById('ratingText').textContent = 'Tap a star to rate';
      
      document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
      });
      
      document.getElementById('ratingModal').classList.add('active');
    }

    function closeRatingModal() {
      document.getElementById('ratingModal').classList.remove('active');
    }

    function setRating(rating) {
      currentRating = rating;
      const stars = document.querySelectorAll('.star');
      const ratingText = document.getElementById('ratingText');
      
      const ratingMessages = [
        '',
        'Poor - Not recommended',
        'Fair - Could be better',
        'Good - Worth reading',
        'Great - Highly recommended',
        'Excellent - Masterpiece!'
      ];
      
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
      
      ratingText.textContent = ratingMessages[rating];
    }

    function submitRating() {
      if (currentRating === 0) {
        showErrorAlert('No Rating Selected', 'Please select a star rating before submitting.');
        return;
      }
      
      closeRatingModal();
      showSuccessAlert(
        'Rating Submitted!',
        `Thank you for rating "${currentItemName}" with ${currentRating} star${currentRating > 1 ? 's' : ''}!`
      );
    }

    // Book Access Modal Functions
    function openBookAccessModal(bookName, isFree, isOwned) {
      currentItemName = bookName;
      currentBookIsFree = isFree;
      currentBookOwned = isOwned;
      currentBookPrice = isFree ? 0 : 9.99;
      
      const modal = document.getElementById('bookAccessModal');
      const statusBadge = document.getElementById('bookStatusBadge');
      const priceElement = document.getElementById('bookPrice');
      const notice = document.getElementById('bookNotice');
      const actionBtn = document.getElementById('bookActionBtn');
      
      document.getElementById('bookAccessName').textContent = bookName;
      document.getElementById('bookAccessTitle').textContent = isOwned ? 'Continue Reading' : 'Read Book';
      
      if (isOwned) {
        statusBadge.classList.add('paid');
        statusBadge.innerHTML = '<span>✓</span><span>Owned</span>';
        priceElement.style.display = 'none';
        notice.textContent = 'You own this book. Continue reading from where you left off.';
        actionBtn.textContent = 'Continue Reading';
      } else if (isFree) {
        statusBadge.classList.remove('paid');
        statusBadge.innerHTML = '<span>✓</span><span>Free Book</span>';
        priceElement.style.display = 'none';
        notice.textContent = 'This book is free to read. Enjoy unlimited access to all chapters.';
        actionBtn.textContent = 'Start Reading';
      } else {
        statusBadge.classList.add('paid');
        statusBadge.innerHTML = '<span>💎</span><span>Premium Book</span>';
        priceElement.style.display = 'block';
        priceElement.textContent = `${currentBookPrice.toFixed(2)}`;
        notice.textContent = 'This is a premium book. Purchase once and keep it forever in your library.';
        actionBtn.textContent = 'Purchase & Read';
      }
      
      modal.classList.add('active');
    }

    function closeBookAccessModal() {
      document.getElementById('bookAccessModal').classList.remove('active');
    }

    function handleBookAction() {
      if (currentBookOwned || currentBookIsFree) {
        closeBookAccessModal();
        showSuccessAlert(
          'Opening Book...',
          `Enjoy reading "${currentItemName}"!`
        );
      } else {
        closeBookAccessModal();
        openPaymentModal();
      }
    }

    // Payment Modal Functions
    function openPaymentModal() {
      const modal = document.getElementById('paymentModal');
      document.getElementById('paymentBookName').textContent = currentItemName;
      document.getElementById('paymentBookPrice').textContent = `${currentBookPrice.toFixed(2)}`;
      
      const platformFee = 0.50;
      const total = currentBookPrice + platformFee;
      document.getElementById('paymentTotal').textContent = `${total.toFixed(2)}`;
      
      selectedPaymentMethod = '';
      document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
      });
      document.getElementById('payNowBtn').disabled = true;
      
      modal.classList.add('active');
    }

    function closePaymentModal() {
      document.getElementById('paymentModal').classList.remove('active');
    }

    function selectPaymentMethod(method) {
      selectedPaymentMethod = method;
      
      document.querySelectorAll('.payment-method').forEach(m => {
        m.classList.remove('selected');
      });
      event.currentTarget.classList.add('selected');
      
      document.getElementById('payNowBtn').disabled = false;
    }

    function processPayment() {
      if (!selectedPaymentMethod) {
        showErrorAlert('Payment Method Required', 'Please select a payment method to continue.');
        return;
      }
      
      const payBtn = document.getElementById('payNowBtn');
      const originalText = payBtn.textContent;
      payBtn.disabled = true;
      payBtn.textContent = 'Processing...';
      
      setTimeout(() => {
        const success = Math.random() > 0.1;
        
        payBtn.disabled = false;
        payBtn.textContent = originalText;
        closePaymentModal();
        
        if (success) {
          currentBookOwned = true;
          showSuccessAlert(
            'Payment Successful!',
            `Congratulations! You now have full access to "${currentItemName}". Happy reading!`
          );
        } else {
          showErrorAlert(
            'Payment Failed',
            'We couldn\'t process your payment. Please check your payment method and try again.'
          );
        }
      }, 2000);
    }

    // Alert Functions
    function showSuccessAlert(title, message) {
      const modal = document.getElementById('successAlert');
      document.querySelector('#successAlert .alert-title').textContent = title;
      document.getElementById('successMessage').textContent = message;
      modal.classList.add('active');
    }

    function closeSuccessAlert() {
      document.getElementById('successAlert').classList.remove('active');
    }

    function showErrorAlert(title, message) {
      const modal = document.getElementById('errorAlert');
      document.querySelector('#errorAlert .alert-title').textContent = title;
      document.getElementById('errorMessage').textContent = message;
      modal.classList.add('active');
    }

    function closeErrorAlert() {
      document.getElementById('errorAlert').classList.remove('active');
    }

    // Close modals when clicking outside
    document.getElementById('feeModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeFeeModal();
      }
    });

    document.getElementById('ratingModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeRatingModal();
      }
    });

    document.getElementById('bookAccessModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeBookAccessModal();
      }
    });

    document.getElementById('paymentModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closePaymentModal();
      }
    });

    // Switch time filter
    function switchTime(btn, period) {
      document.querySelectorAll('.time-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const periodText = {
        'week': 'This Week',
        'month': 'This Month',
        'year': 'This Year',
        'all': 'All Time'
      };
      document.getElementById('leaderboardSubtitle').textContent = `${periodText[period]} • Top 20`;
    }
