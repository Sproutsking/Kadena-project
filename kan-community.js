// ============================================================================
// COMMUNITY CHAT SYSTEM - FIXED & ENHANCED
// ============================================================================
// All functions prefixed with 'comm_' to prevent conflicts with message system
// Based on working simple version with memes/gifs and scrollable panels added
// ============================================================================

// ============================================================================
// SECTION 1: DATA STRUCTURES & CONSTANTS
// ============================================================================

// Communities data
const comm_communities = [
    {
        id: 'africa',
        name: 'Africa KDA Hub',
        emoji: '🌍',
        members: 3245,
        online: 1127,
        preview: 'Discussing DeFi growth across Africa with passionate blockchain enthusiasts and developers.'
    },
    {
        id: 'developers',
        name: 'Kadena Developers',
        emoji: '💻',
        members: 1892,
        online: 567,
        preview: 'Building the future with Pact smart contracts and sharing cutting-edge development techniques.'
    },
    {
        id: 'traders',
        name: 'KDA Traders',
        emoji: '📈',
        members: 2134,
        online: 789,
        preview: 'Advanced market analysis, trading strategies, and real-time insights from professional traders.'
    }
];

// Members list
const comm_members = [
    { id: 'alice', name: 'Alice Okafor', role: 'Admin', avatar: 'A', status: 'online' },
    { id: 'bob', name: 'Bob Wilson', role: 'Moderator', avatar: 'B', status: 'online' },
    { id: 'carol', name: 'Carol Adebayo', role: 'Member', avatar: 'C', status: 'offline' },
    { id: 'david', name: 'David Chen', role: 'Member', avatar: 'D', status: 'online' },
    { id: 'emma', name: 'Emma Davis', role: 'Member', avatar: 'E', status: 'offline' },
    { id: 'frank', name: 'Frank Okeke', role: 'Member', avatar: 'F', status: 'online' },
    { id: 'grace', name: 'Grace Nwosu', role: 'Member', avatar: 'G', status: 'online' },
    { id: 'henry', name: 'Henry Lee', role: 'Member', avatar: 'H', status: 'offline' },
    { id: 'irene', name: 'Irene Obi', role: 'Member', avatar: 'I', status: 'online' },
    { id: 'jack', name: 'Jack Brown', role: 'Member', avatar: 'J', status: 'offline' },
    { id: 'kate', name: 'Kate Mensah', role: 'Member', avatar: 'K', status: 'online' },
    { id: 'liam', name: 'Liam Patel', role: 'Member', avatar: 'L', status: 'online' },
    { id: 'mia', name: 'Mia Johnson', role: 'Member', avatar: 'M', status: 'offline' },
    { id: 'noah', name: 'Noah Ade', role: 'Member', avatar: 'N', status: 'online' },
    { id: 'olivia', name: 'Olivia Smith', role: 'Member', avatar: 'O', status: 'offline' },
    { id: 'peter', name: 'Peter Kim', role: 'Member', avatar: 'P', status: 'online' },
    { id: 'quinn', name: 'Quinn Eze', role: 'Member', avatar: 'Q', status: 'online' },
    { id: 'rachel', name: 'Rachel Wong', role: 'Member', avatar: 'R', status: 'offline' },
    { id: 'sam', name: 'Sam Ojo', role: 'Member', avatar: 'S', status: 'online' },
    { id: 'tina', name: 'Tina Gupta', role: 'Member', avatar: 'T', status: 'offline' }
];

// Enhanced Emoji data with memes and gifs
const comm_emojiData = {
    emoji: [
        '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇',
        '🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚',
        '😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩',
        '🥳','😏','😒','😞','😔','😟','🙁','☹️','😣','😖',
        '😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯',
        '😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔',
        '🤭','🤫','🤥','😶','🫥','😑','😐','😬','🤐','🤢',
        '🤮','🤧','😷','🤒','🤕','🥴','💤','💫','⭐','✨'
    ],
    memes: [
        '💀', '💯', '🔥', '👀', '🧠', '💪', '🚀', '💎', '🌊', '⚡',
        '✨', '🎯', '🎪', '🎭', '🎨', '🎬', '📈', '📉', '🤝', '🙏',
        '👑', '🐐', '🦁', '🐻', '🐂', '🌙', '☀️', '⭐', '🌟', '💫',
        '🌈', '🍕', '🍔', '🌮', '🍿', '☕', '🎮', '🎲', '🎰', '🎪',
        '🎉', '👻', '🤖', '👽', '🦄', '🐉', '🔮', '💊', '💉', '🧪',
        '🔬', '📱', '💻', '⌨️', '🖱️', '🖥️', '🤡', '😏', '🤔', '😎',
        '🥶', '🥵', '💩', '👹', '👺', '☠️', '🎃', '🤠', '🥳', '🤯',
        '🧐', '🤓', '😈', '👿', '🙈', '🙉', '🙊', '💝', '💘', '💖',
        '💗', '💓', '💞', '💕', '❣️', '💔', '❤️‍🔥', '❤️‍🩹', '❤️', '🧡',
        '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💢', '💥', '💨'
    ],
    gifs: [
        '🎬', '🕺', '💃', '🎉', '🎊', '👏', '🙌', '🤝', '👋', '✋',
        '💪', '🤸', '🏃', '🚶', '🧘', '😂', '🤣', '😭', '😱', '🤯',
        '🔥', '⚡', '💥', '✨', '🌟', '🎯', '🎪', '🎭', '🎬', '📹',
        '🚀', '🛸', '✈️', '🏎️', '⚽', '🎮', '🎲', '🎰', '🎪', '🎢',
        '👻', '🦖', '🐉', '🦄', '🌈', '💎', '👑', '🏆', '🥇', '🎖️',
        '🔊', '🎵', '🎸', '🥁', '🎤', '📱', '💬', '💌', '💝', '🎁',
        '🌊', '🏄', '🤿', '🚴', '🏋️', '🤾', '🏌️', '🎣', '🎿', '⛷️',
        '🏂', '🪂', '🏇', '🤺', '🥊', '🥋', '⛹️', '🏐', '🏈', '🏉',
        '🎾', '🥏', '🎳', '🏏', '🏑', '🏒', '🥍', '🏓', '🏸', '🥊',
        '🪃', '🥅', '⛳', '⛸️', '🎣', '🤖', '👾', '🕹️', '🎰', '🎲'
    ]
};

// ============================================================================
// SECTION 2: STATE MANAGEMENT
// ============================================================================

let comm_currentCommunity = null;
let comm_currentMessage = null;

// ============================================================================
// SECTION 3: INITIALIZATION & RENDERING
// ============================================================================

function comm_renderCommunities() {
    const grid = document.getElementById('communitiesGrid');
    grid.innerHTML = comm_communities.map(community => `
        <div class="community-card" onclick="comm_joinCommunity('${community.id}')">
            <div class="activity-pulse"></div>
            <button class="community-btn mobile" onclick="event.stopPropagation(); comm_joinCommunity('${community.id}')" aria-label="Join ${community.name} community">Join</button>
            <div class="community-header">
                <div class="community-emoji">${community.emoji}</div>
                <div class="community-info">
                    <div class="community-name">${community.name}</div>
                    <div class="community-members">
                        <span class="online-indicator"></span> ${community.members.toLocaleString()} Members • ${community.online.toLocaleString()} Online
                    </div>
                </div>
            </div>
            <div class="community-preview">${community.preview}</div>
            <button class="community-btn desktop" onclick="event.stopPropagation(); comm_joinCommunity('${community.id}')" aria-label="Join ${community.name} community">Join Community</button>
        </div>
    `).join('');
}

function comm_joinCommunity(communityId) {
    try {
        console.log(`Joining community: ${communityId}`);
        const community = comm_communities.find(c => c.id === communityId);
        if (!community) {
            console.error(`Community with ID ${communityId} not found`);
            alert('Error: Community not found!');
            return;
        }

        comm_currentCommunity = community;

        // Update header
        document.getElementById('headerEmoji').textContent = community.emoji;
        document.getElementById('communityTitle').textContent = community.name;
        document.getElementById('onlineCount').textContent = `${community.online.toLocaleString()} Online`;
        document.getElementById('totalMembers').textContent = community.members.toLocaleString();
        document.getElementById('onlineMembers').textContent = community.online.toLocaleString();

        // Update members list
        comm_renderMembers();
        comm_loadMessages();

        // Switch view with smooth transition
        const communitiesView = document.getElementById('communitiesView');
        const chatView = document.getElementById('chatView');
        communitiesView.style.opacity = '0';
        setTimeout(() => {
            communitiesView.classList.add('hidden');
            chatView.classList.remove('hidden');
            chatView.style.opacity = '1';
        }, 300);
    } catch (error) {
        console.error('Error joining community:', error);
        alert('An error occurred while joining the community. Please try again.');
    }
}

function comm_renderMembers() {
    const sidebar = document.getElementById('membersList');
    const mobile = document.getElementById('mobileMembers');

    const memberHtml = comm_members.map(member => `
        <div class="member-item">
            <div class="member-avatar">${member.avatar}</div>
            <div class="member-info">
                <div class="member-name">${member.name}</div>
                <div class="member-role">${member.role}</div>
            </div>
            <div class="member-status ${member.status}"></div>
        </div>
    `).join('');

    const mobileHtml = comm_members.map(member => `
        <div class="member-list-item">
            <div class="member-list-avatar">${member.avatar}</div>
            <div class="member-list-info">
                <div class="member-list-name">${member.name}</div>
                <div class="member-list-role">${member.role}</div>
            </div>
            <div class="member-list-status ${member.status}"></div>
        </div>
    `).join('');

    sidebar.innerHTML = memberHtml;
    mobile.innerHTML = mobileHtml;
}

function comm_loadMessages() {
    const messages = [
        { author: 'Alice Okafor', avatar: 'A', text: 'Excited about the new DeFi protocol launch! 🚀', time: '10:15 AM', isSent: false },
        { author: 'Bob Wilson', avatar: 'B', text: 'Count me in! Let\'s discuss use cases.', time: '10:20 AM', isSent: false },
        { author: 'You', avatar: 'Y', text: 'Microfinance could be a game-changer!', time: '10:22 AM', isSent: true }
    ];
    document.getElementById('messagesContent').innerHTML = messages.map((m, i) => comm_createMessageHTML(m, i)).join('');
    comm_scrollToBottom();
}

function comm_createMessageHTML(m, idx) {
    const sentClass = m.isSent ? 'sent' : '';
    return `
        <div class="message ${sentClass}" data-idx="${idx}">
            <div class="avatar">${m.avatar}</div>
            <div class="message-bubble">
                <div class="message-header">
                    <span class="message-author">${m.author}</span>
                    <span class="message-time">${m.time}</span>
                </div>
                <div class="message-content">
                    <div class="message-text-wrapper">
                        <div class="msg-actn-div">
                            <div class="message-text">${m.text}</div>
                            <button class="message-actions-btn" onclick="comm_openMessageMenu(event, ${m.isSent})" aria-label="Message actions">⋯</button>
                        </div>
                        <div class="message-reactions">
                            <div class="reaction-item" onclick="comm_toggleReaction(this, '🔥')">🔥 <span>2</span></div>
                            <div class="reaction-item" onclick="comm_toggleReaction(this, '👍')">👍 <span>3</span></div>
                            <div class="reaction-item" onclick="comm_toggleReaction(this, '🚀')">🚀 <span>3</span></div>
                            <div class="add-reaction-btn" onclick="comm_showReactionPanel(event)">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================================================
// SECTION 4: NAVIGATION
// ============================================================================

function comm_goBackToCommunities() {
    const communitiesView = document.getElementById('communitiesView');
    const chatView = document.getElementById('chatView');
    chatView.style.opacity = '0';
    setTimeout(() => {
        chatView.classList.add('hidden');
        communitiesView.classList.remove('hidden');
        communitiesView.style.opacity = '1';
        document.getElementById('emojiPanel').classList.remove('active');
        document.getElementById('searchBar').classList.remove('active');
    }, 300);
    comm_currentCommunity = null;
}

// ============================================================================
// SECTION 5: SEARCH
// ============================================================================

function comm_toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    } else {
        document.getElementById('searchInput').value = '';
        comm_searchMessages('');
    }
}

function comm_searchMessages(query) {
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        const text = msg.textContent.toLowerCase();
        msg.style.display = text.includes(query.toLowerCase()) || !query ? '' : 'none';
    });
}

// ============================================================================
// SECTION 6: EMOJI PANEL (INPUT 😊) - FULL TABS: EMOJI/MEMES/GIFS
// ============================================================================

function comm_toggleEmojiPanel() {
    const panel = document.getElementById('emojiPanel');
    const isActive = panel.classList.contains('active');
    
    if (isActive) {
        panel.classList.remove('active');
    } else {
        panel.classList.add('active');
        // Make panel scrollable with 50vh max height
        panel.style.maxHeight = '50vh';
        panel.style.overflowY = 'auto';
        
        // Rebuild panel with all tabs
        const tabContent = document.getElementById('emojiTabContent');
        if (tabContent) {
            tabContent.innerHTML = `
                <div class="emoji-tabs">
                    <button class="emoji-tab active" onclick="comm_switchEmojiTab('emoji')">😊 Emoji</button>
                    <button class="emoji-tab" onclick="comm_switchEmojiTab('memes')">🔥 Memes</button>
                    <button class="emoji-tab" onclick="comm_switchEmojiTab('gifs')">🎬 GIFs</button>
                    <button class="emoji-panel-close" onclick="comm_closeEmojiPanel()" style="margin-left: auto; padding: 8px 12px; background: var(--danger); color: white; border: none; border-radius: 5px; cursor: pointer;">✕</button>
                </div>
                <div class="emoji-grid" id="emojiGrid" style="max-height: calc(50vh - 60px); overflow-y: auto;"></div>
            `;
        }
        
        comm_switchEmojiTab('emoji');
    }
}

function comm_switchEmojiTab(tab) {
    const tabs = document.querySelectorAll('.emoji-tab');
    const grid = document.getElementById('emojiGrid');
    
    tabs.forEach(t => t.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    if (grid) {
        grid.innerHTML = comm_emojiData[tab].map(e => `
            <div class="emoji-item" onclick="comm_insertEmoji('${e}')">${e}</div>
        `).join('');
    }
}

function comm_insertEmoji(emoji) {
    const input = document.getElementById('messageInput');
    input.value += emoji;
    input.focus();
}

function comm_closeEmojiPanel() {
    document.getElementById('emojiPanel').classList.remove('active');
}

// ============================================================================
// SECTION 7: REACTION PANEL (+ IN MESSAGES) - EMOJI ONLY, 50VH, SCROLLABLE
// ============================================================================

function comm_showReactionPanel(e) {
    e.stopPropagation();
    const panel = document.getElementById('reactionPanel');
    comm_currentMessage = e.target.closest('.message') || e.target.closest('.announcement-item');
    
    // Simple emoji-only panel with close button
    panel.innerHTML = `
        <div class="reaction-panel-content" style="width: 250px; max-height: 60vh; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: var(--surface); z-index: 10;">
               <button onclick="comm_closeReactionPanel()" style="padding: 5px 10px; border: none; background: var(--danger); color: white; border-radius: 5px; cursor: pointer; font-weight: bold;">✕</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); gap: 8px; padding: 10px; max-height: calc(50vh - 60px); overflow-y: auto;">
               ${comm_emojiData.emoji.map(em => `
                   <div class="reaction-item-panel" onclick="comm_addReaction('${em}')" style="font-size: 24px; cursor: pointer; text-align: center; padding: 8px; border-radius: 5px; transition: background 0.2s; hover:background: var(--background);">${em}</div>
                `).join('')}
            </div>
        </div>
    `;
    
    const rect = e.target.getBoundingClientRect();
    panel.style.top = (rect.top - 300) + 'px';
    panel.style.left = (rect.left - 100) + 'px';
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'hidden';
    panel.classList.add('active');
    
    setTimeout(() => document.addEventListener('click', comm_handleReactionPanelClick, { once: true }), 100);
}

function comm_handleReactionPanelClick(e) {
    const panel = document.getElementById('reactionPanel');
    if (!panel.contains(e.target)) {
        comm_closeReactionPanel();
    }
}

function comm_closeReactionPanel() {
    document.getElementById('reactionPanel').classList.remove('active');
}

function comm_addReaction(emoji) {
    const target = comm_currentMessage;
    if (!target) return;
    
    const reactions = target.querySelector('.message-reactions');
    const existing = Array.from(reactions.querySelectorAll('.reaction-item')).find(r => r.textContent.includes(emoji));
    
    if (existing) {
        const count = existing.querySelector('span');
        count.textContent = parseInt(count.textContent) + 1;
        existing.classList.add('reacted');
    } else {
        const newReaction = document.createElement('div');
        newReaction.className = 'reaction-item reacted';
        newReaction.innerHTML = `${emoji} <span>1</span>`;
        newReaction.onclick = function() { comm_toggleReaction(this, emoji); };
        reactions.insertBefore(newReaction, reactions.querySelector('.add-reaction-btn'));
    }
    comm_closeReactionPanel();
}

function comm_toggleReaction(el, emoji) {
    const count = el.querySelector('span');
    const num = parseInt(count.textContent);
    if (el.classList.contains('reacted')) {
        if (num > 1) {
            count.textContent = num - 1;
            el.classList.remove('reacted');
        } else {
            el.remove();
        }
    } else {
        count.textContent = num + 1;
        el.classList.add('reacted');
    }
}

// ============================================================================
// SECTION 8: MESSAGE HANDLING
// ============================================================================

function comm_uploadFile() {
    alert('📎 File upload feature coming soon!');
}

function comm_handleTyping() {
    // Placeholder for typing indicator logic
}

function comm_handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        comm_sendMessage();
    }
}

function comm_sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (!message) return;

    const messagesContent = document.getElementById('messagesContent');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <div class="avatar">Y</div>
        <div class="message-bubble">
            <div class="message-header">
                <span class="message-author">You</span>
                <span class="message-time">${timeString}</span>
            </div>
            <div class="message-content">
                <div class="message-text-wrapper">
                    <div class="msg-actn-div">
                        <div class="message-text">${message}</div>
                        <button class="message-actions-btn" onclick="comm_openMessageMenu(event, true)" aria-label="Message actions">⋯</button>
                    </div>
                    <div class="message-reactions">
                        <div class="add-reaction-btn" onclick="comm_showReactionPanel(event)">+</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    messagesContent.appendChild(messageDiv);
    input.value = '';
    comm_scrollToBottom();

    setTimeout(() => comm_simulateReply(), 1500);
}

function comm_simulateReply() {
    const responses = [
        'Great point!', 
        'Totally agree!', 
        'Bitcoin looking bullish so far🚀', 
        'Kadena has caught my attention 💪', 
        'Bullish on kadena, infinite sprouts, novarex, navatan and axe capital', 
        'This is excellent! 🔥', 
        'Love this idea!'
    ];
    const idx = Math.floor(Math.random() * responses.length);
    const member = comm_members[Math.floor(Math.random() * comm_members.length)];

    const messagesContent = document.getElementById('messagesContent');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <div class="avatar">${member.avatar}</div>
        <div class="message-bubble">
            <div class="message-header">
                <span class="message-author">${member.name}</span>
                <span class="message-time">${timeString}</span>
            </div>
            <div class="message-content">
                <div class="message-text-wrapper">
                    <div class="msg-actn-div">
                      <div class="message-text">${responses[idx]}</div>
                      <button class="message-actions-btn" onclick="comm_openMessageMenu(event, false)" aria-label="Message actions">⋯</button>
                    </div>
                    <div class="message-reactions">
                      <div class="add-reaction-btn" onclick="comm_showReactionPanel(event)">+</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    messagesContent.appendChild(messageDiv);
    comm_scrollToBottom();
}

// ============================================================================
// SECTION 9: MESSAGE ACTIONS MENU
// ============================================================================

function comm_openMessageMenu(event, isSent) {
    event.stopPropagation();
    comm_currentMessage = event.target.closest('.message');
    const menu = document.getElementById('messageActionMenu');
    
    document.getElementById('editBtn').style.display = isSent ? 'block' : 'none';
    document.getElementById('deleteBtn').style.display = isSent ? 'block' : 'none';

    const rect = event.target.getBoundingClientRect();
    const isSentMessage = comm_currentMessage.classList.contains('sent');
    menu.style.top = (rect.top - 100) + 'px';
    menu.style.left = isSentMessage ? (rect.left - 140) + 'px' : (rect.right + 10) + 'px';
    menu.classList.add('active');

    document.addEventListener('click', comm_closeMessageMenu, { once: true });
}

function comm_closeMessageMenu() {
    document.getElementById('messageActionMenu').classList.remove('active');
    document.removeEventListener('click', comm_closeMessageMenu);
}

function comm_replyToMessage() {
    alert('Reply feature coming soon!');
    comm_closeMessageMenu();
}

function comm_pinMessage() {
    alert('Message pinned');
    comm_closeMessageMenu();
}

function comm_shareMessage() {
    alert('Share feature coming soon!');
    comm_closeMessageMenu();
}

function comm_editMessage() {
    alert('Edit feature coming soon!');
    comm_closeMessageMenu();
}

function comm_deleteMessage() {
    comm_currentMessage?.remove();
    comm_closeMessageMenu();
}

// ============================================================================
// SECTION 10: MODALS & ACTIONS
// ============================================================================

function comm_openActionMenu() {
    document.getElementById('actionModal').classList.add('active');
}

function comm_closeActionMenu(event) {
    if (event && event.target.id !== 'actionModal') return;
    document.getElementById('actionModal').classList.remove('active');
}

function comm_openNotifications() {
    document.getElementById('notificationsModal').classList.add('active');
}

function comm_closeNotifications(event) {
    if (event && event.target.id !== 'notificationsModal') return;
    document.getElementById('notificationsModal').classList.remove('active');
}

function comm_openCommunityProfile() {
    alert('Community Profile customization coming soon!');
    comm_closeActionMenu();
}

function comm_openSettings() {
    alert('Settings panel coming soon!');
    comm_closeActionMenu();
}

function comm_openMembersView() {
    const width = window.innerWidth;
    if (width < 1024) {
        document.getElementById('membersPage').classList.add('active');
    }
    comm_closeActionMenu();
}

function comm_closeMembersPage() {
    document.getElementById('membersPage').classList.remove('active');
}

function comm_leaveCommunity() {
    if (confirm(`Leave ${comm_currentCommunity.name}?`)) {
        comm_goBackToCommunities();
        comm_closeActionMenu();
    }
}

// ============================================================================
// SECTION 11: UTILITY FUNCTIONS
// ============================================================================

function comm_scrollToBottom() {
    const wrapper = document.getElementById('messagesWrapper');
    wrapper.scrollTop = wrapper.scrollHeight;
}

// ============================================================================
// SECTION 12: INITIALIZATION
// ============================================================================

// Initialize communities on page load
comm_renderCommunities();

// Close emoji panel when clicking outside
document.addEventListener('click', function(e) {
    const emojiPanel = document.getElementById('emojiPanel');
    const emojiBtn = document.querySelector('[onclick*="toggleEmojiPanel"]');
    
    if (emojiPanel && !emojiPanel.contains(e.target) && !e.target.closest('[onclick*="toggleEmojiPanel"]')) {
        emojiPanel.classList.remove('active');
    }
});

// ============================================================================
// SECTION 13: HTML COMPATIBILITY WRAPPERS
// ============================================================================
// These functions match the HTML onclick attributes (without comm_ prefix)
// They simply call the namespaced versions to prevent conflicts

function renderCommunities() { comm_renderCommunities(); }
function joinCommunity(id) { comm_joinCommunity(id); }
function goBackToCommunities() { comm_goBackToCommunities(); }
function toggleSearch() { comm_toggleSearch(); }
function searchMessages(query) { comm_searchMessages(query); }
function toggleEmojiPanel() { comm_toggleEmojiPanel(); }
function switchEmojiTab(tab) { comm_switchEmojiTab(tab); }
function insertEmoji(emoji) { comm_insertEmoji(emoji); }
function uploadFile() { comm_uploadFile(); }
function handleTyping() { comm_handleTyping(); }
function handleKeyPress(event) { comm_handleKeyPress(event); }
function sendMessage() { comm_sendMessage(); }
function openMessageMenu(event, isSent) { comm_openMessageMenu(event, isSent); }
function closeMessageMenu() { comm_closeMessageMenu(); }
function replyToMessage() { comm_replyToMessage(); }
function pinMessage() { comm_pinMessage(); }
function shareMessage() { comm_shareMessage(); }
function editMessage() { comm_editMessage(); }
function deleteMessage() { comm_deleteMessage(); }
function toggleReaction(el, emoji) { comm_toggleReaction(el, emoji); }
function showReactionPanel(e) { comm_showReactionPanel(e); }
function addReaction(emoji) { comm_addReaction(emoji); }
function openActionMenu() { comm_openActionMenu(); }
function closeActionMenu(event) { comm_closeActionMenu(event); }
function openNotifications() { comm_openNotifications(); }
function closeNotifications(event) { comm_closeNotifications(event); }
function openCommunityProfile() { comm_openCommunityProfile(); }
function openSettings() { comm_openSettings(); }
function openMembersView() { comm_openMembersView(); }
function closeMembersPage() { comm_closeMembersPage(); }
function leaveCommunity() { comm_leaveCommunity(); }
