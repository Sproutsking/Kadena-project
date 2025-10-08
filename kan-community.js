// Community data
const communities = {
    africa: {
        name: 'Africa KDA Hub',
        flag: '🌍',
        members: 3245,
        online: 1127,
        preview: 'Discussing DeFi growth across Africa with passionate blockchain enthusiasts and developers.'
    },
    developers: {
        name: 'Kadena Developers',
        flag: '💻',
        members: 1892,
        online: 567,
        preview: 'Building the future with Pact smart contracts and sharing cutting-edge development techniques.'
    },
    traders: {
        name: 'KDA Traders',
        flag: '📈',
        members: 2134,
        online: 789,
        preview: 'Advanced market analysis, trading strategies, and real-time insights from professional traders.'
    }
};

let currentCommunity = null;
let messageCount = 0;

// Initialize floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Join community function
function joinCommunity(communityKey) {
    const community = communities[communityKey];
    if (!community) return;

    currentCommunity = communityKey;

    // Update chat header
    document.getElementById('communityChatTitle').textContent = community.name;
    document.getElementById('communityOnlineCount').textContent = `${community.online.toLocaleString()} Online`;

    // Show chat container with animation
    const chatContainer = document.getElementById('communityChatContainer');
    const communityGrid = document.getElementById('communityGrid');

    // Hide community grid
    communityGrid.style.opacity = '0';
    communityGrid.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        communityGrid.style.display = 'none';
        chatContainer.style.display = 'block';
        chatContainer.scrollIntoView({ behavior: 'smooth' });

        // Focus on input
        setTimeout(() => {
            document.getElementById('communityMessageInput').focus();
        }, 500);
    }, 300);

    // Simulate typing indicator
    showTypingIndicator();
}

// Leave community function
function leaveCommunity() {
    const chatContainer = document.getElementById('communityChatContainer');
    const communityGrid = document.getElementById('communityGrid');

    // Animate out chat container
    chatContainer.style.opacity = '0';
    chatContainer.style.transform = 'translateY(20px)';

    setTimeout(() => {
        chatContainer.style.display = 'none';
        chatContainer.style.opacity = '1';
        chatContainer.style.transform = 'translateY(0)';

        // Show community grid
        communityGrid.style.display = 'grid';
        setTimeout(() => {
            communityGrid.style.opacity = '1';
            communityGrid.style.transform = 'translateY(0)';
        }, 50);
    }, 300);

    currentCommunity = null;
}

// Send message function
function sendCommunityMessage() {
    const input = document.getElementById('communityMessageInput');
    const message = input.value.trim();

    if (!message) return;

    const messagesContainer = document.getElementById('communityChatMessages');
    const messageElement = createMessageElement(message, true);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    input.value = '';
    messageCount++;

    // Simulate response after a delay
    setTimeout(() => {
        simulateResponse();
    }, Math.random() * 3000 + 1000);
}

// Create message element
function createMessageElement(text, isSent = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `community-message ${isSent ? 'sent' : ''}`;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!isSent) {
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = getRandomAvatar();
        messageDiv.appendChild(avatar);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'community-message-content';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'community-message-header';

    const authorSpan = document.createElement('span');
    authorSpan.className = 'community-message-author';
    authorSpan.textContent = isSent ? 'You' : getRandomName();

    const timeSpan = document.createElement('span');
    timeSpan.className = 'community-message-time';
    timeSpan.textContent = timeString;

    headerDiv.appendChild(authorSpan);
    headerDiv.appendChild(timeSpan);

    const textDiv = document.createElement('div');
    textDiv.className = 'community-message-text';
    textDiv.textContent = text;

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

// Simulate response
function simulateResponse() {
    const responses = [
        "Great point! I totally agree with your perspective on this.",
        "Thanks for sharing! This gives me a lot to think about.",
        "Interesting approach. Have you considered the scalability implications?",
        "This is exactly what we need in the ecosystem right now! 🔥",
        "I've been working on something similar. Would love to collaborate!",
        "Solid analysis! The technical implementation looks promising.",
        "This could be a game-changer for the African market specifically.",
        "Love the innovation! When do you think this will be ready for mainnet?"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const messagesContainer = document.getElementById('communityChatMessages');
    const messageElement = createMessageElement(randomResponse, false);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    setTimeout(() => {
        const messagesContainer = document.getElementById('communityChatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'community-message';
        typingDiv.id = 'tempTypingMessage';

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = getRandomAvatar();

        const contentDiv = document.createElement('div');
        contentDiv.className = 'community-message-content';

        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

        contentDiv.appendChild(typingIndicator);
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(contentDiv);

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Remove typing indicator after a few seconds
        setTimeout(() => {
            const tempMessage = document.getElementById('tempTypingMessage');
            if (tempMessage) {
                tempMessage.remove();
            }
        }, 3000);
    }, 2000);
}

// Handle enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendCommunityMessage();
    }
}

// Get random avatar
function getRandomAvatar() {
    const avatars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    return avatars[Math.floor(Math.random() * avatars.length)];
}

// Get random name
function getRandomName() {
    const names = [
        'Alex Chen', 'Sarah Johnson', 'Michael Brown', 'Emma Davis',
        'David Wilson', 'Lisa Garcia', 'James Miller', 'Anna Martinez',
        'Chris Taylor', 'Maria Rodriguez', 'Kevin Lee', 'Jennifer White',
        'Daniel Harris', 'Amanda Clark', 'Ryan Lewis', 'Jessica Walker'
    ];
    return names[Math.floor(Math.random() * names.length)];
}

// Open community settings
function openCommunitySettings() {
    alert('Community settings panel would open here in a real application!');
}

// Simulate live member count updates
function updateMemberCounts() {
    Object.keys(communities).forEach(key => {
        const community = communities[key];
        // Randomly adjust online count by ±5
        const change = Math.floor(Math.random() * 11) - 5;
        community.online = Math.max(0, community.online + change);

        // Update display if it's the current community
        if (currentCommunity === key) {
            document.getElementById('communityOnlineCount').textContent = `${community.online.toLocaleString()} Online`;
        }
    });

    // Update community cards
    document.querySelectorAll('.community-card').forEach(card => {
        const communityKey = card.getAttribute('data-community');
        const community = communities[communityKey];
        const membersElement = card.querySelector('.community-members');
        if (membersElement && community) {
            membersElement.innerHTML = `<span class="online-indicator"></span> ${community.members.toLocaleString()} Members • ${community.online.toLocaleString()} Online`;
        }
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    addEnhancedInteractions();

    // Update member counts every 30 seconds
    setInterval(updateMemberCounts, 30000);

    // Add some initial variance to make it feel more alive
    setTimeout(updateMemberCounts, 5000);
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
