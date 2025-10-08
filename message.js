// Global variables
let currentChatId = null;
let messageIdCounter = 4;
let currentContextMessageId = null;
let isReplying = false;
let replyingToText = '';

// Emoji data
const emojiData = {
    smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘'],
    gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖'],
    symbols: ['✨', '⭐', '🌟', '💫', '✅', '❌', '🔥', '💯', '🎉', '🎊', '🎈', '🎁', '🏆', '🎯', '💎', '👑']
};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initializeEmojis('smileys');
    initializeSearch();
    initializeMessageInput();
    initializeOptionsPanel();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('kanSearchInput');
    const searchClear = document.getElementById('kanSearchClear');

    searchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase().trim();
        searchClear.classList.toggle('visible', query.length > 0);
        filterChats(query);
    });
}

function filterChats(query) {
    const chatItems = document.querySelectorAll('.kan-chat-item');
    const noResults = document.getElementById('kanNoResults');
    let visibleCount = 0;

    chatItems.forEach(item => {
        const searchText = item.getAttribute('data-search-text');
        if (searchText.includes(query)) {
            item.classList.remove('kan-hidden');
            visibleCount++;
        } else {
            item.classList.add('kan-hidden');
        }
    });

    noResults.classList.toggle('visible', visibleCount === 0);
}

function kanClearSearch() {
    const searchInput = document.getElementById('kanSearchInput');
    const searchClear = document.getElementById('kanSearchClear');
    searchInput.value = '';
    searchClear.classList.remove('visible');
    filterChats('');
}

// Chat navigation
function kanOpenChat(chatId, avatar, name, status) {
    currentChatId = chatId;

    // Update active state in chat list
    document.querySelectorAll('.kan-chat-item').forEach(item => {
        item.classList.remove('kan-active');
    });
    event.currentTarget.classList.add('kan-active');

    // Update chat header
    document.getElementById('kanChatAvatar').textContent = avatar;
    document.getElementById('kanChatName').textContent = name;
    const statusEl = document.getElementById('kanChatStatus');
    statusEl.textContent = status;
    statusEl.className = status.toLowerCase() === 'online' ? 'kan-status' : 'kan-status offline';

    // Show chat interface
    document.getElementById('kanWelcomeScreen').style.display = 'none';
    document.getElementById('kanActiveChat').classList.add('active');

    // Mobile: slide to chat view
    if (window.innerWidth <= 768) {
        document.getElementById('kanChatList').classList.add('kan-hidden');
        document.getElementById('kanChatContainer').classList.add('kan-active');
    }

    // Scroll to bottom
    scrollToBottom();
}

function kanGoBackToList() {
    document.getElementById('kanChatList').classList.remove('kan-hidden');
    document.getElementById('kanChatContainer').classList.remove('kan-active');
}

// Message input
function initializeMessageInput() {
    const input = document.getElementById('kanMessageInput');

    // Auto-resize textarea
    input.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Send on Enter (not Shift+Enter)
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            kanSendMessage();
        }
    });
}

function kanSendMessage() {
    const input = document.getElementById('kanMessageInput');
    const message = input.value.trim();

    if (!message || !currentChatId) return;

    // Create message element
    const messageEl = createMessageElement(message, true);

    // Add to chat
    const messagesContainer = document.getElementById('kanChatMessages');
    messagesContainer.appendChild(messageEl);

    // Clear input and reply state
    input.value = '';
    input.style.height = 'auto';
    if (isReplying) {
        cancelReply();
    }

    // Scroll to bottom
    scrollToBottom();

    // Simulate response (for demo)
    setTimeout(() => {
        const response = createMessageElement('Thanks for your message! Our team will get back to you shortly.', false);
        messagesContainer.appendChild(response);
        scrollToBottom();
    }, 1000);
}

function createMessageElement(text, isSent) {
    const messageId = messageIdCounter++;
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const messageDiv = document.createElement('div');
    messageDiv.className = 'kan-message' + (isSent ? ' kan-sent' : '');
    messageDiv.setAttribute('data-message-id', messageId);
    messageDiv.style.position = 'relative';

    const bubbleContent = `
                ${!isSent ? `<div class="kan-avatar">${document.getElementById('kanChatAvatar').textContent}</div>` : ''}
                <div class="kan-message-bubble">
                    ${text}
                    <span class="kan-message-time">${time}</span>
                    <button class="kan-message-options-btn" onclick="toggleOptionsPanel(event, ${messageId}, ${isSent})">⋮</button>
                </div>
            `;

    messageDiv.innerHTML = bubbleContent;
    return messageDiv;
}

function scrollToBottom() {
    const messagesContainer = document.getElementById('kanChatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Emoji picker
function initializeEmojis(category = 'smileys') {
    kanFilterEmojis(category, true);
}

function kanToggleEmojiPicker() {
    const picker = document.getElementById('kanEmojiPicker');
    picker.classList.toggle('kan-active');
}

function kanFilterEmojis(category, isInit = false) {
    const grid = document.getElementById('kanEmojiGrid');
    const emojis = emojiData[category];

    // Update active category button only if not initialization
    if (!isInit) {
        document.querySelectorAll('.kan-emoji-category').forEach(btn => {
            btn.classList.remove('kan-active');
        });
        event.currentTarget.classList.add('kan-active');
    }

    // Populate emoji grid
    grid.innerHTML = emojis.map(emoji =>
        `<button class="kan-emoji-item" onclick="kanInsertEmoji('${emoji}')">${emoji}</button>`
    ).join('');
}

function kanInsertEmoji(emoji) {
    const input = document.getElementById('kanMessageInput');
    input.value += emoji;
    input.focus();
}

// File upload
function kanTriggerFileUpload() {
    document.getElementById('kanFileInput').click();
}

function kanHandleFileUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        const input = document.getElementById('kanMessageInput');
        input.value = `📎 Attached: ${fileNames}`;
    }
}

// Options Panel / Dropdown Menu
let currentOpenPanel = null;

function initializeOptionsPanel() {
    // Close panel on click outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.kan-options-panel') && !e.target.closest('.kan-message-options-btn')) {
            closeAllOptionsPanels();
        }
    });

    // Close panel on scroll
    document.getElementById('kanChatMessages').addEventListener('scroll', closeAllOptionsPanels);
}

function toggleOptionsPanel(event, messageId, isSent) {
    event.stopPropagation();

    const messageBubble = event.currentTarget.closest('.kan-message-bubble');
    const messageEl = event.currentTarget.closest('.kan-message');

    // Close any open panels first
    closeAllOptionsPanels();

    // Check if clicking the same button
    if (currentOpenPanel === messageId) {
        currentOpenPanel = null;
        return;
    }

    currentOpenPanel = messageId;

    // Create options panel
    const panel = createOptionsPanel(messageId, isSent);
    messageBubble.appendChild(panel);

    // Show panel with animation
    setTimeout(() => panel.classList.add('kan-active'), 10);
}

function createOptionsPanel(messageId, isSent) {
    const panel = document.createElement('div');
    panel.className = 'kan-options-panel';
    panel.setAttribute('data-panel-id', messageId);

    // Different options for sent vs received messages
    const menuItems = isSent ? [
        { section: 'Actions' },
        { icon: '💬', text: 'Reply to Message', action: 'reply' },
        { icon: '📋', text: 'Copy Text', action: 'copy' },
        { icon: '🔄', text: 'Forward', action: 'forward' },
        { icon: '⭐', text: 'Add to Favorites', action: 'star' },
        'divider',
        { section: 'Modify' },
        { icon: '✏️', text: 'Edit Message', action: 'edit' },
        { icon: '📌', text: 'Pin to Top', action: 'pin' },
        'divider',
        { section: 'Remove' },
        { icon: '🗑️', text: 'Delete for Everyone', action: 'deleteEveryone', danger: true },
        { icon: '❌', text: 'Delete for Me', action: 'deleteMe', danger: true }
    ] : [
        { section: 'Actions' },
        { icon: '💬', text: 'Reply to Message', action: 'reply' },
        { icon: '📋', text: 'Copy Text', action: 'copy' },
        { icon: '🔄', text: 'Forward', action: 'forward' },
        { icon: '⭐', text: 'Add to Favorites', action: 'star' },
        'divider',
        { section: 'More' },
        { icon: '📌', text: 'Pin to Top', action: 'pin' },
        { icon: 'ℹ️', text: 'Message Details', action: 'info' },
        'divider',
        { section: 'Report' },
        { icon: '🚫', text: 'Report Message', action: 'report', danger: true },
        { icon: '❌', text: 'Delete for Me', action: 'deleteMe', danger: true }
    ];

    // Build panel HTML
    panel.innerHTML = menuItems.map(item => {
        if (item === 'divider') {
            return '<div class="kan-option-divider"></div>';
        }
        if (item.section) {
            return `<div class="kan-option-section-title">${item.section}</div>`;
        }
        return `
                    <button class="kan-option-item ${item.danger ? 'danger' : ''}" onclick="handleOptionAction(event, ${messageId}, '${item.action}')">
                        <span class="kan-option-icon">${item.icon}</span>
                        <span>${item.text}</span>
                    </button>
                `;
    }).join('');

    return panel;
}

function closeAllOptionsPanels() {
    document.querySelectorAll('.kan-options-panel').forEach(panel => {
        panel.classList.remove('kan-active');
        setTimeout(() => panel.remove(), 200);
    });
    currentOpenPanel = null;
}

function handleOptionAction(event, messageId, action) {
    event.stopPropagation();

    const messageEl = document.querySelector(`[data-message-id="${messageId}"]`);
    const messageBubble = messageEl.querySelector('.kan-message-bubble');
    const messageText = messageBubble.childNodes[0].textContent.trim();

    switch (action) {
        case 'copy':
            navigator.clipboard.writeText(messageText);
            showToast('📋 Message copied to clipboard');
            break;
        case 'reply':
            startReply(messageText);
            showToast('💬 Reply started');
            break;
        case 'star':
            showToast('⭐ Added to favorites');
            break;
        case 'edit':
            const input2 = document.getElementById('kanMessageInput');
            input2.value = messageText;
            input2.focus();
            input2.style.height = 'auto';
            input2.style.height = input2.scrollHeight + 'px';
            messageEl.style.opacity = '0.5';
            showToast('✏️ Editing message...');
            break;
        case 'forward':
            showToast('🔄 Forward feature coming soon');
            break;
        case 'pin':
            showToast('📌 Message pinned to top');
            break;
        case 'info':
            const time = messageBubble.querySelector('.kan-message-time').textContent;
            showToast(`ℹ️ Delivered at ${time}`);
            break;
        case 'report':
            if (confirm('Report this message as inappropriate?')) {
                showToast('🚫 Message reported to moderators');
            }
            break;
        case 'deleteMe':
            if (confirm('Delete this message for you only?')) {
                messageEl.style.animation = 'kanMessageSlide 0.3s ease reverse';
                setTimeout(() => messageEl.remove(), 300);
                showToast('✅ Message deleted');
            }
            break;
        case 'deleteEveryone':
            if (confirm('Delete this message for everyone? This cannot be undone.')) {
                messageEl.style.animation = 'kanMessageSlide 0.3s ease reverse';
                setTimeout(() => messageEl.remove(), 300);
                showToast('✅ Deleted for everyone');
            }
            break;
    }

    closeAllOptionsPanels();
}
function showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--surface);
                color: var(--text-primary);
                padding: 12px 24px;
                border-radius: 8px;
                border: 1px solid var(--border);
                z-index: 10001;
                animation: kanSlideUp 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'kanSlideUp 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Close emoji picker when clicking outside
document.addEventListener('click', function (e) {
    const emojiPicker = document.getElementById('kanEmojiPicker');
    const emojiBtn = document.querySelector('[onclick="kanToggleEmojiPicker()"]');

    if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
        emojiPicker.classList.remove('kan-active');
    }
});

// Handle window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        document.getElementById('kanChatList').classList.remove('kan-hidden');
        document.getElementById('kanChatContainer').classList.remove('kan-active');
    }
});
