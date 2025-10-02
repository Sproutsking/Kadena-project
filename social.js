// Tab Navigation
function socialSwitchTab(event) {
    const tabs = document.querySelectorAll('.social-platform .social-nav-tab');
    const contents = document.querySelectorAll('.social-platform [data-content]');
    const targetTab = event.currentTarget.getAttribute('data-tab');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    event.currentTarget.classList.add('active');
    document.querySelector(`.social-platform [data-content="${targetTab}"]`).classList.add('active');
}

// Post Menu
function socialTogglePostMenu(postId, userId) {
    const menu = document.getElementById(`socialPostMenu${postId}`);
    const isOwnPost = userId === 'emmanuel'; // Replace with actual user ID check
    menu.innerHTML = `
        <div class="social-menu-item" onclick="socialCopyPostLink(${postId})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 5v3h2.21l-3.42 8H5v3h8v-3h-2.21l3.42-8H19V5h-9z"/>
            </svg>
            Copy Link
        </div>
        ${isOwnPost ? `
        <div class="social-menu-item" onclick="socialEditPost(${postId})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit Post
        </div>
        <div class="social-menu-item danger" onclick="socialDeletePost(${postId})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
            Delete Post
        </div>` : ''}
    `;
    menu.classList.toggle('show');
}

// Post Actions
function socialToggleLike(button) {
    const isLiked = button.getAttribute('data-liked') === 'true';
    const countElement = button.querySelector('.count');
    let count = parseInt(countElement.textContent.replace(/[^0-9]/g, ''));

    if (isLiked) {
        button.setAttribute('data-liked', 'false');
        button.classList.remove('active');
        count--;
    } else {
        button.setAttribute('data-liked', 'true');
        button.classList.add('active');
        count++;
    }

    countElement.textContent = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
}

function socialOpenPostModal(postId) {
    const modal = document.getElementById(`socialPostModal${postId}`);
    modal.classList.add('active');
}

function socialClosePostModal(postId) {
    const modal = document.getElementById(`socialPostModal${postId}`);
    modal.classList.remove('active');
}

function socialRepostPost(postId) {
    const countElement = document.querySelector(`.social-post[data-post-id="${postId}"] .social-repost-btn .count`);
    let count = parseInt(countElement.textContent.replace(/[^0-9]/g, '')) + 1;
    countElement.textContent = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
    alert(`Post ${postId} reposted!`);
}

function socialSharePost(postId) {
    const countElement = document.querySelector(`.social-post[data-post-id="${postId}"] .social-share-btn .count`);
    let count = parseInt(countElement.textContent.replace(/[^0-9]/g, '')) + 1;
    countElement.textContent = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
    socialCopyPostLink(postId);
}

function socialCopyPostLink(postId) {
    const link = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(link).then(() => alert('Link copied to clipboard!'));
}

function socialEditPost(postId) {
    alert(`Editing post ${postId}`);
    // Implement edit functionality
}

function socialDeletePost(postId) {
    if (confirm(`Are you sure you want to delete post ${postId}?`)) {
        const post = document.querySelector(`.social-post[data-post-id="${postId}"]`);
        post.remove();
    }
}

// Comment Actions
function socialToggleCommentLike(button) {
    button.classList.toggle('active');
    const countElement = button.querySelector('span');
    let count = parseInt(countElement.textContent);
    countElement.textContent = button.classList.contains('active') ? count + 1 : count - 1;
}

function socialReplyToComment(commentId) {
    const replyContainer = document.getElementById(`socialReplies${commentId}`);
    replyContainer.classList.toggle('expanded');
    if (replyContainer.classList.contains('expanded')) {
        const textarea = replyContainer.parentElement.querySelector('.social-comment-textarea');
        if (textarea) textarea.focus();
    }
}

// Livestream Controls
function socialPlayStream() {
    const video = document.querySelector('.social-stream-video');
    video.classList.toggle('playing');
    // Implement actual video play/pause
    alert(video.classList.contains('playing') ? 'Stream playing' : 'Stream paused');
}

function socialMuteStream(button) {
    const isMuted = button.getAttribute('data-muted') === 'true';
    button.setAttribute('data-muted', !isMuted);
    // Implement mute/unmute
    alert(isMuted ? 'Stream unmuted' : 'Stream muted');
}

function socialFullscreenStream() {
    const video = document.querySelector('.social-stream-video');
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
}

function socialStartVideoStream() {
    alert('Starting video stream...');
    // Implement video stream start
}

function socialStartAudioStream() {
    alert('Starting audio stream...');
    // Implement audio stream start
}

// Gifting System
const socialGifts = [
    { name: 'Ruby', emoji: '💎', cost: 10 },
    { name: 'Sapphire', emoji: '🔷', cost: 20 },
    { name: 'Emerald', emoji: '💚', cost: 30 },
    { name: 'Diamond', emoji: '💠', cost: 50 },
    { name: 'Amethyst', emoji: '🟣', cost: 15 },
    { name: 'Topaz', emoji: '🟡', cost: 25 },
    { name: 'Opal', emoji: '🌈', cost: 35 },
    { name: 'Garnet', emoji: '🔴', cost: 12 },
    { name: 'Aquamarine', emoji: '🌊', cost: 18 },
    { name: 'Peridot', emoji: '🍈', cost: 22 },
    { name: 'Tourmaline', emoji: '🎨', cost: 28 },
    { name: 'Onyx', emoji: '⚫', cost: 40 }
];

function socialOpenGiftPanel() {
    const popup = document.getElementById('socialGiftPopup');
    popup.innerHTML = `
        <div class="social-gift-popup-content">
            <button class="social-gift-close-btn" onclick="socialCloseGiftPopup()">✕</button>
            <div class="social-gift-popup-title">Send a Gift</div>
            <div class="social-gift-grid">
                ${socialGifts.map(gift => `
                    <div class="social-gift-item" onclick="socialSelectGift('${gift.name}')">
                        <div class="social-gift-preview">${gift.emoji}</div>
                        <div class="social-gift-name">${gift.name}</div>
                        <div class="social-gift-cost">${gift.cost} Coins</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    popup.classList.add('active');
}

function socialCloseGiftPopup() {
    const popup = document.getElementById('socialGiftPopup');
    popup.classList.remove('active');
    popup.innerHTML = '';
}

function socialSelectGift(giftName) {
    const gift = socialGifts.find(g => g.name === giftName);
    const popup = document.getElementById('socialGiftPopup');
    popup.innerHTML = `
        <div class="social-gift-popup-content">
            <button class="social-gift-close-btn" onclick="socialCloseGiftPopup()">✕</button>
            <div class="social-gift-popup-title">Confirm Gift</div>
            <div class="social-gift-details">
                <div class="social-gift-preview">${gift.emoji}</div>
                <div class="social-gift-name">${gift.name}</div>
                <div class="social-gift-cost">${gift.cost} Coins</div>
            </div>
            <div class="social-gift-actions">
                <button class="social-gift-proceed-btn" onclick="socialSendGift('${gift.name}')">Send</button>
                <button class="social-gift-cancel-btn" onclick="socialOpenGiftPanel()">Back</button>
            </div>
        </div>
    `;
}

function socialSendGift(giftName) {
    const gift = socialGifts.find(g => g.name === giftName);
    const animation = document.getElementById('socialGiftAnimation');
    animation.innerHTML = `<div>${gift.emoji}</div>`;
    animation.classList.add('active');
    setTimeout(() => {
        animation.classList.remove('active');
        animation.innerHTML = '';
    }, 1500);

    const popup = document.getElementById('socialGiftPopup');
    popup.innerHTML = `
        <div class="social-gift-popup-content">
            <div class="social-gift-popup-title">Gift Sent!</div>
            <div class="social-gift-details">
                <div class="social-gift-preview">${gift.emoji}</div>
                <div class="social-gift-name">${gift.name}</div>
                <div class="social-gift-cost">Sent for ${gift.cost} Coins</div>
            </div>
            <div class="social-gift-actions">
                <button class="social-gift-success-btn" onclick="socialCloseGiftPopup()">Close</button>
            </div>
        </div>
    `;

    // Update rewards
    const rewards = document.getElementById('socialRewardsPanel');
    const pointsElement = rewards.querySelector('div');
    let points = parseInt(pointsElement.textContent) + gift.cost;
    pointsElement.textContent = `Points: ${points}`;
}

// Stage Management
function socialRequestStage() {
    const requests = document.getElementById('socialStageRequests');
    const requestId = `req${Math.random().toString(36).substr(2, 9)}`;
    requests.innerHTML += `
        <div class="social-stage-request" id="${requestId}">
            <span>User requesting to join</span>
            <div>
                <button class="social-stage-action-btn" onclick="socialAcceptStageRequest('${requestId}')">Accept</button>
                <button class="social-stage-action-btn" onclick="socialRejectStageRequest('${requestId}')">Reject</button>
            </div>
        </div>
    `;
}

function socialAcceptStageRequest(requestId) {
    const request = document.getElementById(requestId);
    const participants = document.getElementById('socialStageParticipants');
    participants.innerHTML += `
        <div class="social-stage-participant">
            <span>User on stage</span>
            <button class="social-stage-action-btn" onclick="socialRemoveFromStage(this)">Remove</button>
        </div>
    `;
    request.remove();
}

function socialRejectStageRequest(requestId) {
    document.getElementById(requestId).remove();
}

function socialRemoveFromStage(button) {
    button.parentElement.parentElement.remove();
}

function socialInviteToStage() {
    alert('Inviting user to stage...');
    // Implement invite functionality
}

function socialStartCoStream() {
    alert('Starting co-stream...');
    // Implement co-stream functionality
}

// Engagement Analytics
function socialUpdateEngagementAnalytics() {
    const analytics = document.getElementById('socialEngagementAnalytics');
    const viewerCount = Math.floor(Math.random() * 5000) + 1000;
    const engagementScore = Math.floor(Math.random() * 100);
    const highlightClips = Math.floor(Math.random() * 10);
    analytics.innerHTML = `
        <div>Peak Viewers: ${viewerCount}</div>
        <div>Engagement Score: ${engagementScore}</div>
        <div>Highlight Clips Generated: ${highlightClips}</div>
    `;
}

// Interactive Overlays
function socialLaunchPoll() {
    const overlays = document.getElementById('socialStreamOverlays');
    overlays.innerHTML = `
        <div class="social-poll-overlay">
            <div class="social-poll-title">Live Poll</div>
            <div class="social-poll-option">
                <input type="radio" name="poll" id="pollOption1">
                <label for="pollOption1">Option 1</label>
            </div>
            <div class="social-poll-option">
                <input type="radio" name="poll" id="pollOption2">
                <label for="pollOption2">Option 2</label>
            </div>
            <button class="social-poll-submit" onclick="socialSubmitPoll()">Submit</button>
        </div>
    `;
}

function socialSubmitPoll() {
    alert('Poll submitted!');
    document.getElementById('socialStreamOverlays').innerHTML = '';
}

function socialLaunchQA() {
    const overlays = document.getElementById('socialStreamOverlays');
    overlays.innerHTML = `
        <div class="social-qa-overlay">
            <div class="social-qa-title">Live Q&A</div>
            <textarea class="social-qa-input" placeholder="Ask a question..."></textarea>
            <button class="social-qa-submit" onclick="socialSubmitQA()">Submit</button>
        </div>
    `;
}

function socialSubmitQA() {
    alert('Question submitted!');
    document.getElementById('socialStreamOverlays').innerHTML = '';
}

// AI-Powered Highlight Generation
function socialGenerateHighlight() {
    alert('Generating highlight clip...');
    // Implement AI-powered highlight generation
    const analytics = document.getElementById('socialEngagementAnalytics');
    const clipsElement = analytics.querySelector('div:last-child');
    let clips = parseInt(clipsElement.textContent.match(/\d+/)[0]) + 1;
    clipsElement.textContent = `Highlight Clips Generated: ${clips}`;
}

// Chat Functionality
function socialSendChatMessage() {
    const input = document.querySelector('.social-chat-input');
    const message = input.value.trim();
    if (message) {
        const chatMessages = document.getElementById('socialChatMessages');
        chatMessages.innerHTML += `
            <div class="social-chat-message">
                <strong class="social-chat-user">You:</strong>
                <span class="social-chat-text">${message}</span>
            </div>
        `;
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Post Submission
function socialSubmitPost() {
    const textarea = document.querySelector('.social-composer-input');
    const content = textarea.value.trim();
    if (content) {
        const postsFeed = document.querySelector('.social-posts-feed');
        const postId = Math.random().toString(36).substr(2, 9);
        postsFeed.insertAdjacentHTML('afterbegin', `
            <div class="social-post" data-post-id="${postId}" data-user-id="emmanuel">
                <div class="social-post-header">
                    <div class="social-user-avatar">E</div>
                    <div class="social-user-info">
                        <div class="social-user-name">Emmanuel</div>
                        <div class="social-user-handle">@emmanuel_kda • Verified Creator</div>
                    </div>
                    <div class="social-post-time">Just now</div>
                    <div class="social-post-menu-btn" onclick="socialTogglePostMenu('${postId}', 'emmanuel')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                        <div class="social-post-menu" id="socialPostMenu${postId}"></div>
                    </div>
                </div>
                <div class="social-post-content">
                    <div class="social-post-text">${content}</div>
                </div>
                <div class="social-post-reactions">
                    <div class="social-reaction-buttons">
                        <button class="social-reaction-btn social-like-btn" data-liked="false" onclick="socialToggleLike(this)">
                            <span class="social-reaction-icon">👍</span>
                            <span class="count">0</span>
                        </button>
                        <button class="social-reaction-btn social-comment-btn" onclick="socialOpenPostModal('${postId}')">
                            <span class="social-reaction-icon">💬</span>
                            <span class="count">0</span>
                        </button>
                        <button class="social-reaction-btn social-repost-btn" onclick="socialRepostPost('${postId}')">
                            <span class="social-reaction-icon">🔄</span>
                            <span class="count">0</span>
                        </button>
                        <button class="social-reaction-btn social-share-btn" onclick="socialSharePost('${postId}')">
                            <span class="social-reaction-icon">📤</span>
                            <span class="count">0</span>
                        </button>
                        <button class="social-reaction-btn social-view-btn">
                            <span class="social-reaction-icon">👁️</span>
                            <span class="count">0</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="social-post-modal" id="socialPostModal${postId}">
                <div class="social-post-modal-content">
                    <button class="social-modal-close-btn" onclick="socialClosePostModal('${postId}')">✕</button>
                    <div class="social-modal-post">
                        <div class="social-post-header">
                            <div class="social-user-avatar">E</div>
                            <div class="social-user-info">
                                <div class="social-user-name">Emmanuel</div>
                                <div class="social-user-handle">@emmanuel_kda • Verified Creator</div>
                            </div>
                            <div class="social-post-time">Just now</div>
                        </div>
                        <div class="social-post-content">
                            <div class="social-post-text">${content}</div>
                        </div>
                        <div class="social-post-reactions">
                            <div class="social-reaction-buttons">
                                <button class="social-reaction-btn social-like-btn" data-liked="false" onclick="socialToggleLike(this)">
                                    <span class="social-reaction-icon">👍</span>
                                    <span class="count">0</span>
                                </button>
                                <button class="social-reaction-btn social-comment-btn" onclick="socialOpenPostModal('${postId}')">
                                    <span class="social-reaction-icon">💬</span>
                                    <span class="count">0</span>
                                </button>
                                <button class="social-reaction-btn social-repost-btn" onclick="socialRepostPost('${postId}')">
                                    <span class="social-reaction-icon">🔄</span>
                                    <span class="count">0</span>
                                </button>
                                <button class="social-reaction-btn social-share-btn" onclick="socialSharePost('${postId}')">
                                    <span class="social-reaction-icon">📤</span>
                                    <span class="count">0</span>
                                </button>
                                <button class="social-reaction-btn social-view-btn">
                                    <span class="social-reaction-icon">👁️</span>
                                    <span class="count">0</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="social-modal-comments">
                        <div class="social-comments-container">
                            <div class="social-comment-input">
                                <div class="social-comment-avatar">E</div>
                                <textarea class="social-comment-textarea" placeholder="Add a comment..."></textarea>
                                <button class="social-comment-submit" onclick="socialSubmitComment('${postId}')">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        textarea.value = '';
    }
}

function socialSubmitComment(postId) {
    const modal = document.getElementById(`socialPostModal${postId}`);
    const textarea = modal.querySelector('.social-comment-textarea');
    const content = textarea.value.trim();
    if (content) {
        const commentsContainer = modal.querySelector('.social-comments-container');
        const commentId = `c${Math.random().toString(36).substr(2, 9)}`;
        commentsContainer.insertAdjacentHTML('afterbegin', `
            <div class="social-comment" data-comment-id="${commentId}">
                <div class="social-comment-avatar">E</div>
                <div class="social-comment-content">
                    <div class="social-comment-header">
                        <span class="social-comment-author">Emmanuel</span>
                        <span class="social-comment-time">Just now</span>
                    </div>
                    <div class="social-comment-text">${content}</div>
                    <div class="social-comment-actions">
                        <button class="social-comment-action" onclick="socialToggleCommentLike(this)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>0</span>
                        </button>
                        <button class="social-comment-action" onclick="socialReplyToComment('${commentId}')">Reply</button>
                    </div>
                    <div class="social-comment-reply" id="socialReplies${commentId}"></div>
                </div>
            </div>
        `);
        textarea.value = '';
        const countElement = document.querySelector(`.social-post[data-post-id="${postId}"] .social-comment-btn .count`);
        let count = parseInt(countElement.textContent.replace(/[^0-9]/g, '')) + 1;
        countElement.textContent = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
    }
}

// Trending Tabs
function socialSwitchTrendingTab(event) {
    const tabs = document.querySelectorAll('.social-trending-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // Implement filtering logic based on tab (e.g., 'crypto', 'defi', 'nft')
    alert(`Switched to ${event.currentTarget.getAttribute('data-trend')} trending tab`);
}

// Initialize Event Listeners
function socialInit() {
    // Tab Navigation
    document.querySelectorAll('.social-platform .social-nav-tab').forEach(tab => {
        tab.addEventListener('click', socialSwitchTab);
    });

    // Post Submission
    document.querySelector('.social-composer-submit').addEventListener('click', socialSubmitPost);

    // Chat Submission
    document.querySelector('.social-chat-send').addEventListener('click', socialSendChatMessage);
    document.querySelector('.social-chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            socialSendChatMessage();
        }
    });

    // Volume Slider
    document.querySelector('.social-volume-slider').addEventListener('input', (e) => {
        // Implement volume control
        console.log(`Volume set to ${e.target.value}%`);
    });

    // Trending Tabs
    document.querySelectorAll('.social-trending-tab').forEach(tab => {
        tab.addEventListener('click', socialSwitchTrendingTab);
    });

    // Periodic Analytics Update
    setInterval(socialUpdateEngagementAnalytics, 10000);
}

// Run Initialization
document.addEventListener('DOMContentLoaded', socialInit);
