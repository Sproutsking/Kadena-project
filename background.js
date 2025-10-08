// Particle System
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            connectParticles();
            requestAnimationFrame(animate);
        }

        animate();

        // Generate Digital Rain
        const rainContainer = document.getElementById('rainContainer');
        for (let i = 0; i < 30; i++) {
            const rain = document.createElement('div');
            rain.className = 'rain-column';
            rain.style.left = `${Math.random() * 100}%`;
            rain.style.animationDuration = `${Math.random() * 3 + 2}s`;
            rain.style.animationDelay = `${Math.random() * 5}s`;
            rainContainer.appendChild(rain);
        }

        // Generate Data Blocks
        const blocksContainer = document.getElementById('dataBlocksContainer');
        for (let i = 0; i < 8; i++) {
            const block = document.createElement('div');
            block.className = 'data-block';
            block.style.left = `${Math.random() * 90}%`;
            block.style.top = `${Math.random() * 90}%`;
            block.style.animationDelay = `${Math.random() * 5}s`;
            block.style.animationDuration = `${15 + Math.random() * 10}s`;
            blocksContainer.appendChild(block);
        }

        // Generate Hexagons
        const hexContainer = document.getElementById('hexContainer');
        for (let i = 0; i < 15; i++) {
            const hex = document.createElement('div');
            hex.className = 'hexagon';
            hex.style.left = `${Math.random() * 90}%`;
            hex.style.top = `${Math.random() * 90}%`;
            hex.style.animationDelay = `${Math.random() * 4}s`;
            hexContainer.appendChild(hex);
        }

        // Generate Circuit Paths
        const circuitSvg = document.getElementById('circuitSvg');
        circuitSvg.setAttribute('width', '100%');
        circuitSvg.setAttribute('height', '100%');

        for (let i = 0; i < 10; i++) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const x1 = Math.random() * 100;
            const y1 = Math.random() * 100;
            const x2 = Math.random() * 100;
            const y2 = Math.random() * 100;
            
            path.setAttribute('d', `M ${x1}% ${y1}% L ${x2}% ${y2}%`);
            path.setAttribute('class', 'circuit-path');
            path.style.animationDelay = `${Math.random() * 3}s`;
            circuitSvg.appendChild(path);
        }

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Optionally, regenerate particles or adjust positions
        });
