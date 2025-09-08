 // Generate floating particles
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                container.appendChild(particle);
            }
        }

function joinCommunity(button, communityName) {
    // If user already joined → just open community
    if (button.classList.contains('joined')) {
        openCommunityChat(communityName);
        return;
    }

    // First time joining
    button.textContent = 'Enter Community';
    button.classList.add('joined');

    // Celebration
    createCelebration(button);

    // Open chat after celebration
    setTimeout(() => {
        openCommunityChat(communityName);
    }, 600);
}

function openCommunityChat(communityName) {
    document.getElementById("communityModal").style.display = "flex";
    document.getElementById("communityName").textContent = communityName;
}

function closeCommunityChat() {
    document.getElementById("communityModal").style.display = "none";
}



        // Create celebration particles
        function createCelebration(element) {
            const rect = element.getBoundingClientRect();
            const particles = 15;
            
            for (let i = 0; i < particles; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = rect.left + rect.width/2 + 'px';
                particle.style.top = rect.top + rect.height/2 + 'px';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = '#8b5cf6';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                
                document.body.appendChild(particle);
                
                const angle = (i / particles) * Math.PI * 2;
                const velocity = 100;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                let x = 0;
                let y = 0;
                let opacity = 1;
                
                function animate() {
                    x += vx * 0.02;
                    y += vy * 0.02 + 2;
                    opacity -= 0.02;
                    
                    particle.style.transform = `translate(${x}px, ${y}px)`;
                    particle.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        document.body.removeChild(particle);
                    }
                }
                
                animate();
            }
        }