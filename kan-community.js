// COMMUNITY CHAT - COMPLETE VERSION

// Communities data
const communities = [
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
const members = [
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

// Emoji data
const emojiData = {
    emoji: [
        '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇',
        '🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚',
        '😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩',
        '🥳','😏','😒','😞','😔','😟','🙁','☹️','😣','😖',
        '😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯',
        '😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔',
        '🤭','🤫','🤥','😶','🫥','😑','😐','😬'
    ],
    memes: [
        '😏 Smirk', '🤔 Think', '😎 Cool', '🤡 Clown', '💀 Dead',
        '🔥 Fire', '💯 100', '👀 Eyes', '🧠 Brain', '💪 Strong',
        '🚀 Rocket', '💎 Diamond', '🌊 Wave', '⚡ Thunder', '✨ Sparkle',
        '🎯 Target', '🎪 Circus', '🎭 Drama', '🎨 Art', '🎬 Action',
        '📈 Stonks', '📉 Not Stonks', '🤝 Deal', '🙏 Prayer', '👑 King',
        '🐐 GOAT', '🦁 Lion', '🐻 Bear', '🐂 Bull', '🌙 Moon',
        '☀️ Sun', '⭐ Star', '🌟 Glow', '💫 Dizzy', '🌈 Rainbow',
        '🍕 Pizza', '🍔 Burger', '🌮 Taco', '🍿 Popcorn', '☕ Coffee',
        '🎮 Game', '🎲 Dice', '🎰 Slot', '🎪 Party', '🎉 Celebrate',
        '👻 Ghost', '🤖 Robot', '👽 Alien', '🦄 Unicorn', '🐉 Dragon',
        '🔮 Crystal', '💊 Pill', '💉 Shot', '🧪 Lab', '🔬 Science',
        '📱 Phone', '💻 Computer', '⌨️ Keyboard', '🖱️ Mouse', '🖥️ Desktop'
    ],
    gifs: [
        '🎬 Dancing', '🕺 Dance Man', '💃 Dance Woman', '🎉 Party', '🎊 Confetti',
        '👏 Clapping', '🙌 Praise', '🤝 Handshake', '👋 Wave', '✋ High Five',
        '💪 Flex', '🤸 Flip', '🏃 Running', '🚶 Walking', '🧘 Meditation',
        '😂 Laughing', '🤣 ROFL', '😭 Crying', '😱 Shocked', '🤯 Mind Blown',
        '🔥 On Fire', '⚡ Lightning', '💥 Explosion', '✨ Sparkles', '🌟 Shining',
        '🎯 Bullseye', '🎪 Show', '🎭 Performance', '🎬 Movie', '📹 Recording',
        '🚀 Launch', '🛸 UFO', '✈️ Flying', '🏎️ Racing', '⚽ Soccer',
        '🎮 Gaming', '🎲 Rolling', '🎰 Winning', '🎪 Carnival', '🎢 Rollercoaster',
        '👻 Spooky', '🦖 Dino', '🐉 Dragon', '🦄 Magic', '🌈 Rainbow',
        '💎 Bling', '👑 Crown', '🏆 Trophy', '🥇 Gold', '🎖️ Medal',
        '🔊 Loud', '🎵 Music', '🎸 Guitar', '🥁 Drums', '🎤 Singing',
        '📱 Texting', '💬 Chatting', '💌 Love Letter', '💝 Gift', '🎁 Present'
    ]
};

let currentCommunity = null;
let currentMessage = null;

function renderCommunities() {
    const grid = document.getElementById('communitiesGrid');
    grid.innerHTML = communities.map(community => `
        <div class="community-card" onclick="joinCommunity('${community.id}')">
            <div class="activity-pulse"></div>
            <button class="community-btn mobile" onclick="event.stopPropagation(); joinCommunity('${community.id}')" aria-label="Join ${community.name} community">Join</button>
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
            <button class="community-btn desktop" onclick="event.stopPropagation(); joinCommunity('${community.id}')" aria-label="Join ${community.name} community">Join Community</button>
        </div>
    `).join('');
}

function joinCommunity(communityId) {
    try {
        console.log(`Joining community: ${communityId}`);
        const community = communities.find(c => c.id === communityId);
        if (!community) {
            console.error(`Community with ID ${communityId} not found`);
            alert('Error: Community not found!');
            return;
        }

        currentCommunity = community;

        // Update header
        document.getElementById('headerEmoji').textContent = community.emoji;
        document.getElementById('communityTitle').textContent = community.name;
        document.getElementById('onlineCount').textContent = `${community.online.toLocaleString()} Online`;
        document.getElementById('totalMembers').textContent = community.members.toLocaleString();
        document.getElementById('onlineMembers').textContent = community.online.toLocaleString();

        // Update members list
        renderMembers();
        loadMessages();

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

function renderMembers() {
    const sidebar = document.getElementById('membersList');
    const mobile = document.getElementById('mobileMembers');

    const memberHtml = members.map(member => `
        <div class="member-item">
            <div class="member-avatar">${member.avatar}</div>
            <div class="member-info">
                <div class="member-name">${member.name}</div>
                <div class="member-role">${member.role}</div>
            </div>
            <div class="member-status ${member.status}"></div>
        </div>
    `).join('');

    const mobileHtml = members.map(member => `
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

function loadMessages() {
    const messages = [
        { author: 'Alice Okafor', avatar: 'A', text: 'Excited about the new DeFi protocol launch! 🚀', time: '10:15 AM', isSent: false },
        { author: 'Bob Wilson', avatar: 'B', text: 'Count me in! Let\'s discuss use cases.', time: '10:20 AM', isSent: false },
        { author: 'You', avatar: 'Y', text: 'Microfinance could be a game-changer!', time: '10:22 AM', isSent: true }
    ];
    document.getElementById('messagesContent').innerHTML = messages.map((m, i) => createMessageHTML(m, i)).join('');
    scrollToBottom();
}

function createMessageHTML(m, idx) {
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
                            <button class="message-actions-btn" onclick="openMessageMenu(event, ${m.isSent})" aria-label="Message actions">⋯</button>
                        </div>
                        <div class="message-reactions">
                            <div class="reaction-item" onclick="toggleReaction(this, '🔥')">🔥 <span>2</span></div>
                            <div class="reaction-item" onclick="toggleReaction(this, '👍')">👍 <span>3</span></div>
                            <div class="reaction-item" onclick="toggleReaction(this, '🚀')">🚀 <span>3</span></div>
                            <div class="add-reaction-btn" onclick="showReactionPanel(event)">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function goBackToCommunities() {
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
    currentCommunity = null;
}

function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    } else {
        document.getElementById('searchInput').value = '';
        searchMessages('');
    }
}

function searchMessages(query) {
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        const text = msg.textContent.toLowerCase();
        msg.style.display = text.includes(query.toLowerCase()) || !query ? '' : 'none';
    });
}

function toggleEmojiPanel() {
    const panel = document.getElementById('emojiPanel');
    panel.classList.toggle('active');
    if (panel.classList.contains('active')) {
        switchEmojiTab('emoji');
    }
}

function switchEmojiTab(tab) {
    const tabs = document.querySelectorAll('.emoji-tab');
    const grid = document.getElementById('emojiGrid');
    
    tabs.forEach(t => t.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    if (tab === 'emoji') {
        grid.innerHTML = emojiData.emoji.map(e => `
            <div class="emoji-item" onclick="insertEmoji('${e}')">${e}</div>
        `).join('');
    } else if (tab === 'memes') {
        grid.innerHTML = emojiData.memes.map(m => `
            <div class="meme-item" onclick="insertEmoji('${m}')">${m}</div>
        `).join('');
    } else if (tab === 'gifs') {
        grid.innerHTML = emojiData.gifs.map(g => `
            <div class="gif-item" onclick="insertEmoji('${g}')">${g}</div>
        `).join('');
    }
}

function insertEmoji(emoji) {
    const input = document.getElementById('messageInput');
    input.value += emoji;
    input.focus();
}

function uploadFile() {
    alert('📎 File upload feature coming soon!');
}

function handleTyping() {
    // Placeholder for typing indicator logic
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
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
                        <button class="message-actions-btn" onclick="openMessageMenu(event, true)" aria-label="Message actions">⋯</button>
                    </div>
                    <div class="message-reactions">
                        <div class="add-reaction-btn" onclick="showReactionPanel(event)">+</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    messagesContent.appendChild(messageDiv);
    input.value = '';
    scrollToBottom();

    setTimeout(() => simulateReply(), 1500);
}

function simulateReply() {
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
    const member = members[Math.floor(Math.random() * members.length)];

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
                      <button class="message-actions-btn" onclick="openMessageMenu(event, false)" aria-label="Message actions">⋯</button>
                    </div>
                    <div class="message-reactions">
                      <div class="add-reaction-btn" onclick="showReactionPanel(event)">+</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    messagesContent.appendChild(messageDiv);
    scrollToBottom();
}

function openMessageMenu(event, isSent) {
    event.stopPropagation();
    currentMessage = event.target.closest('.message');
    const menu = document.getElementById('messageActionMenu');
    
    document.getElementById('editBtn').style.display = isSent ? 'block' : 'none';
    document.getElementById('deleteBtn').style.display = isSent ? 'block' : 'none';

    const rect = event.target.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Center on mobile
        menu.style.top = (rect.top - 100) + 'px';
        menu.style.left = '50%';
        menu.style.transform = 'translateX(-50%)';
    } else {
        const isSentMessage = currentMessage.classList.contains('sent');
        menu.style.top = (rect.top - 100) + 'px';
        menu.style.left = isSentMessage ? (rect.left - 140) + 'px' : (rect.right + 10) + 'px';
        menu.style.transform = 'none';
    }
    
    menu.classList.add('active');

    document.addEventListener('click', closeMessageMenu, { once: true });
}

function closeMessageMenu() {
    document.getElementById('messageActionMenu').classList.remove('active');
    document.removeEventListener('click', closeMessageMenu);
}

function replyToMessage() {
    alert('Reply feature coming soon!');
    closeMessageMenu();
}

function pinMessage() {
    alert('Message pinned');
    closeMessageMenu();
}

function shareMessage() {
    alert('Share feature coming soon!');
    closeMessageMenu();
}

function editMessage() {
    alert('Edit feature coming soon!');
    closeMessageMenu();
}

function deleteMessage() {
    currentMessage?.remove();
    closeMessageMenu();
}

function toggleReaction(el, emoji) {
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

function showReactionPanel(e) {
    e.stopPropagation();
    const panel = document.getElementById('reactionPanel');
    currentMessage = e.target.closest('.message') || e.target.closest('.announcement-item');
    
    panel.innerHTML = emojiData.emoji.map(em => `
        <div class="reaction-item-panel" onclick="addReaction('${em}')">${em}</div>
    `).join('');
    
    const rect = e.target.getBoundingClientRect();
    panel.style.top = (rect.top - 120) + 'px';
    panel.style.left = (rect.left - 50) + 'px';
    panel.classList.add('active');
    
    setTimeout(() => document.addEventListener('click', () => panel.classList.remove('active'), { once: true }), 100);
}

function addReaction(emoji) {
    const target = currentMessage;
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
        newReaction.onclick = function() { toggleReaction(this, emoji); };
        reactions.insertBefore(newReaction, reactions.querySelector('.add-reaction-btn'));
    }
    document.getElementById('reactionPanel').classList.remove('active');
}

function openActionMenu() {
    document.getElementById('actionModal').classList.add('active');
}

function closeActionMenu(event) {
    if (event && event.target.id !== 'actionModal') return;
    document.getElementById('actionModal').classList.remove('active');
}

function openNotifications() {
    document.getElementById('notificationsModal').classList.add('active');
}

function closeNotifications(event) {
    if (event && event.target.id !== 'notificationsModal') return;
    document.getElementById('notificationsModal').classList.remove('active');
}

function openCommunityProfile() {
    alert('Community Profile customization coming soon!');
    closeActionMenu();
}

function openSettings() {
    alert('Settings panel coming soon!');
    closeActionMenu();
}

function openMembersView() {
    const width = window.innerWidth;
    if (width < 1024) {
        document.getElementById('membersPage').classList.add('active');
    }
    closeActionMenu();
}

function closeMembersPage() {
    document.getElementById('membersPage').classList.remove('active');
}

function leaveCommunity() {
    if (confirm(`Leave ${currentCommunity.name}?`)) {
        goBackToCommunities();
        closeActionMenu();
    }
}

function scrollToBottom() {
    const wrapper = document.getElementById('messagesWrapper');
    wrapper.scrollTop = wrapper.scrollHeight;
}

// Initialize
renderCommunities();
