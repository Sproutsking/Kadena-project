// Section Navigation
        function openCreatorDashboard() {
            document.getElementById('socialSection').classList.remove('active');
            document.getElementById('creatorDashboard').classList.add('active');
        }

        function backToSocial() {
            document.getElementById('creatorDashboard').classList.remove('active');
            document.getElementById('socialSection').classList.add('active');
        }

        // Creator Dashboard State
        const cdState = {
            contentLibrary: [],
            soundLibrary: [],
            selectedSound: null,
            currentStory: null,
            currentPage: 0,
            userStats: {
                followers: 5000,
                viewsPerDay: 800,
                premiumSubs: 50,
                premiumPlusSubs: 10
            }
        };

        // Initialize demo data
        function cdInitializeDemoContent() {
            cdState.soundLibrary = [
                { id: 1001, title: 'Chill Vibes', creator: 'DJ Producer', royalty: 15, genre: 'Electronic' },
                { id: 1002, title: 'Epic Adventure', creator: 'Composer Pro', royalty: 20, genre: 'Classical' },
                { id: 1003, title: 'Summer Beat', creator: 'Beat Maker', royalty: 18, genre: 'Pop' }
            ];

            const demoBooks = [
                { id: 2001, title: 'The Digital Renaissance', price: 12.99, type: 'book' },
                { id: 2002, title: 'Blockchain Dreams', price: 9.99, type: 'book' },
                { id: 2003, title: 'Creator Economy 2.0', price: 15.99, type: 'book' },
                { id: 2004, title: 'Web3 Revolution', price: 11.99, type: 'book' }
            ];

            demoBooks.forEach(book => cdState.contentLibrary.push(book));
            cdUpdateProfileStats();
        }

        // Tab switching
        function cdSwitchTab(tabName) {
            document.querySelectorAll('.cd-tab-content').forEach(content => {
                content.classList.remove('cd-active');
            });
            document.querySelectorAll('.cd-tab-btn').forEach(btn => {
                btn.classList.remove('cd-active');
            });
            
            document.getElementById('cd-' + tabName + '-tab').classList.add('cd-active');
            event.target.classList.add('cd-active');

            if (tabName === 'manager') {
                cdUpdateContentLibrary();
            }
        }

        // Modal management
        function cdOpenCreationModal(type) {
            const modal = document.getElementById('cd-creation-modal');
            const modalBody = document.getElementById('cd-modal-body');
            
            const forms = {
                video: cdGetVideoForm(),
                audio: cdGetAudioForm(),
                story: cdGetStoryForm(),
                book: cdGetBookForm(),
                status: cdGetStatusForm()
            };
            
            modalBody.innerHTML = forms[type] || '';
            modal.classList.add('cd-active');
        }

        function cdCloseModal(modalId) {
            document.getElementById(modalId).classList.remove('cd-active');
        }

        // Form generators
        function cdGetVideoForm() {
            return `
                <h2>🎥 Create Video Content</h2>
                <form onsubmit="cdSaveContent(event, 'video')">
                    <div class="cd-form-group">
                        <label>Video Title</label>
                        <input type="text" name="title" required placeholder="Enter video title">
                    </div>
                    <div class="cd-form-group">
                        <label>Description</label>
                        <textarea name="description" placeholder="Describe your video..."></textarea>
                    </div>
                    <div class="cd-form-group">
                        <label>Upload Video</label>
                        <div class="cd-file-upload" onclick="document.getElementById('cd-video-file').click()">
                            <input type="file" id="cd-video-file" name="file" accept="video/*" required>
                            <div>📹 Click to upload video file</div>
                            <div style="font-size: 11px; color: var(--cd-text-secondary); margin-top: 8px;">MP4, MOV, AVI (Max 500MB)</div>
                        </div>
                    </div>
                    <div class="cd-form-group">
                        <label>Set Royalty Percentage</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="number" name="royalty" min="0" max="50" value="15" required style="width: 80px;">
                            <span style="font-size: 12px;">% when others use your content</span>
                        </div>
                    </div>
                    <div class="cd-alert cd-alert-info">
                        <strong>🔐 Blockchain Verification:</strong> Your content will be tokenized and verified on the blockchain.
                    </div>
                    <button type="submit" class="cd-btn-primary">💾 Save to Library</button>
                </form>
            `;
        }

        function cdGetAudioForm() {
            return `
                <h2>🎵 Create Audio/Sound</h2>
                <form onsubmit="cdSaveContent(event, 'audio')">
                    <div class="cd-form-group">
                        <label>Sound Title</label>
                        <input type="text" name="title" required placeholder="Name your sound">
                    </div>
                    <div class="cd-form-group">
                        <label>Upload Audio</label>
                        <div class="cd-file-upload" onclick="document.getElementById('cd-audio-file').click()">
                            <input type="file" id="cd-audio-file" name="file" accept="audio/*" required>
                            <div>🎵 Click to upload audio file</div>
                        </div>
                    </div>
                    <div class="cd-form-group">
                        <label>Royalty Percentage</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="number" name="royalty" min="0" max="50" value="20" required style="width: 80px;">
                            <span style="font-size: 12px;">% when others use this sound</span>
                        </div>
                    </div>
                    <div class="cd-form-group">
                        <label>Genre</label>
                        <select name="genre">
                            <option>Pop</option>
                            <option>Hip Hop</option>
                            <option>Electronic</option>
                            <option>Rock</option>
                        </select>
                    </div>
                    <button type="submit" class="cd-btn-primary">💾 Save & Add to Library</button>
                </form>
            `;
        }

        function cdGetStoryForm() {
            return `
                <h2>📖 Write Story</h2>
                <form onsubmit="cdSaveContent(event, 'story')">
                    <div class="cd-form-group">
                        <label>Story Title</label>
                        <input type="text" name="title" required placeholder="Enter story title">
                    </div>
                    <div class="cd-form-group">
                        <label>Story Description</label>
                        <textarea name="description" required placeholder="Brief description..."></textarea>
                    </div>
                    <div class="cd-form-group">
                        <label>Story Content</label>
                        <textarea name="content" style="min-height: 200px;" required placeholder="Write your story..."></textarea>
                    </div>
                    <div class="cd-form-group">
                        <label>Monetization</label>
                        <select name="monetization" onchange="cdToggleStoryPrice(this)">
                            <option value="free">Free to Read</option>
                            <option value="paid">Paid Story</option>
                        </select>
                    </div>
                    <div class="cd-form-group" id="cd-story-price-group" style="display: none;">
                        <label>Price (USD)</label>
                        <input type="number" name="price" min="0" step="0.01" value="2.99">
                    </div>
                    <button type="submit" class="cd-btn-primary">💾 Save Story</button>
                </form>
            `;
        }

        function cdGetBookForm() {
            return `
                <h2>📚 Write Book</h2>
                <form onsubmit="cdSaveContent(event, 'book')">
                    <div class="cd-form-group">
                        <label>Book Title</label>
                        <input type="text" name="title" required>
                    </div>
                    <div class="cd-form-group">
                        <label>Description</label>
                        <textarea name="description" required></textarea>
                    </div>
                    <div class="cd-form-group">
                        <label>Price (USD)</label>
                        <input type="number" name="price" min="0" step="0.01" value="9.99" required>
                    </div>
                    <div class="cd-form-group">
                        <label>Upload Book File</label>
                        <div class="cd-file-upload" onclick="document.getElementById('cd-book-file').click()">
                            <input type="file" id="cd-book-file" name="file" accept=".pdf,.doc,.docx">
                            <div>📄 Click to upload</div>
                        </div>
                    </div>
                    <button type="submit" class="cd-btn-primary">💾 Save Book</button>
                </form>
            `;
        }

        function cdGetStatusForm() {
            return `
                <h2>💬 Create Status Post</h2>
                <form onsubmit="cdSaveContent(event, 'status')">
                    <div class="cd-form-group">
                        <label>Status Message</label>
                        <textarea name="content" maxlength="500" required></textarea>
                    </div>
                    <div class="cd-form-group">
                        <label>Mintable as NFT?</label>
                        <select name="nft">
                            <option value="no">Regular Status</option>
                            <option value="yes">Mintable NFT</option>
                        </select>
                    </div>
                    <button type="submit" class="cd-btn-primary">💾 Save Status</button>
                </form>
            `;
        }

        function cdToggleStoryPrice(select) {
            const priceGroup = document.getElementById('cd-story-price-group');
            if (priceGroup) {
                priceGroup.style.display = select.value === 'paid' ? 'block' : 'none';
            }
        }

        // Save content
        function cdSaveContent(event, type) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const content = {
                id: Date.now(),
                type: type,
                title: formData.get('title'),
                description: formData.get('description'),
                content: formData.get('content'),
                royalty: formData.get('royalty'),
                monetization: formData.get('monetization'),
                price: formData.get('price'),
                verified: true,
                createdAt: new Date()
            };

            cdState.contentLibrary.push(content);

            if (type === 'audio') {
                cdState.soundLibrary.push({
                    id: content.id,
                    title: content.title,
                    creator: 'You',
                    royalty: content.royalty,
                    genre: formData.get('genre')
                });
            }

            alert('✅ Content saved and tokenized on blockchain!');
            cdCloseModal('cd-creation-modal');
            cdUpdateContentLibrary();
        }

        // Update content library
        function cdUpdateContentLibrary() {
            const grid = document.getElementById('cd-content-library');
            if (cdState.contentLibrary.length === 0) {
                grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--cd-text-secondary); padding: 40px; font-size: 13px;">No content yet. Visit Creators Lab to start creating!</div>';
                return;
            }

            const icons = { video: '🎥', audio: '🎵', story: '📖', book: '📚', status: '💬' };
            grid.innerHTML = cdState.contentLibrary.map(item => `
                <div class="cd-content-item" onclick="cdViewContent(${item.id})">
                    <div class="cd-content-thumbnail">${icons[item.type]}</div>
                    <div class="cd-content-info">
                        <div class="cd-content-type">${item.type}</div>
                        <div class="cd-content-title">${item.title}</div>
                        ${item.verified ? '<div class="cd-verification-badge">✓ Verified</div>' : ''}
                        ${item.royalty ? `<div class="cd-royalty-badge">${item.royalty}% Royalty</div>` : ''}
                    </div>
                </div>
            `).join('');
        }

        function cdViewContent(contentId) {
            const content = cdState.contentLibrary.find(c => c.id === contentId);
            if (!content) return;

            if (content.type === 'story') {
                cdOpenStory(content);
            } else {
                alert(`Viewing: ${content.title}\n\nThis is a demo. Full content viewer would be displayed here.`);
            }
        }

        // Story reader functions
        function cdOpenStory(content) {
            if (content.monetization === 'paid') {
                document.getElementById('cd-payment-amount').textContent = `${content.price}`;
                cdState.currentStory = content;
                document.getElementById('cd-payment-modal').classList.add('cd-active');
                return;
            }
            cdLoadStory(content);
        }

        function cdProcessPayment() {
            alert('🔐 Processing blockchain payment...');
            setTimeout(() => {
                alert('✅ Payment successful! Content unlocked.');
                cdCloseModal('cd-payment-modal');
                cdLoadStory(cdState.currentStory);
            }, 1500);
        }

        function cdLoadStory(content) {
            cdState.currentStory = content;
            cdState.currentPage = 0;
            document.getElementById('cd-story-title').textContent = content.title;

            const pages = cdSplitIntoPages(content.content, 500);
            const container = document.getElementById('cd-story-pages-container');
            container.innerHTML = pages.map((page, i) => `
                <div class="cd-story-page ${i === 0 ? 'cd-active' : ''}" id="cd-page-${i}">
                    ${page}
                </div>
            `).join('');

            const pagination = document.getElementById('cd-story-pagination');
            pagination.innerHTML = pages.map((_, i) => `
                <div class="cd-page-dot ${i === 0 ? 'cd-active' : ''}" onclick="cdGoToPage(${i})"></div>
            `).join('');

            document.getElementById('cd-story-reader').classList.add('cd-active');
        }

        function cdSplitIntoPages(text, charsPerPage) {
            const words = text.split(' ');
            const pages = [];
            let currentPage = '';

            words.forEach(word => {
                if ((currentPage + word).length > charsPerPage && currentPage.length > 0) {
                    pages.push(currentPage.trim());
                    currentPage = word + ' ';
                } else {
                    currentPage += word + ' ';
                }
            });

            if (currentPage) pages.push(currentPage.trim());
            return pages;
        }

        function cdNextPage() {
            const pages = document.querySelectorAll('.cd-story-page');
            if (cdState.currentPage < pages.length - 1) {
                pages[cdState.currentPage].classList.remove('cd-active');
                cdState.currentPage++;
                pages[cdState.currentPage].classList.add('cd-active');
                cdUpdatePagination();
            }
        }

        function cdPreviousPage() {
            if (cdState.currentPage > 0) {
                const pages = document.querySelectorAll('.cd-story-page');
                pages[cdState.currentPage].classList.remove('cd-active');
                cdState.currentPage--;
                pages[cdState.currentPage].classList.add('cd-active');
                cdUpdatePagination();
            }
        }

        function cdGoToPage(index) {
            const pages = document.querySelectorAll('.cd-story-page');
            pages[cdState.currentPage].classList.remove('cd-active');
            cdState.currentPage = index;
            pages[cdState.currentPage].classList.add('cd-active');
            cdUpdatePagination();
        }

        function cdUpdatePagination() {
            document.querySelectorAll('.cd-page-dot').forEach((dot, i) => {
                dot.classList.toggle('cd-active', i === cdState.currentPage);
            });
        }

        function cdCloseStoryReader() {
            document.getElementById('cd-story-reader').classList.remove('cd-active');
        }

        // Profile functions
        function cdUpdateProfileStats() {
            document.getElementById('cd-stat-followers').textContent = cdState.userStats.followers >= 1000 
                ? (cdState.userStats.followers / 1000).toFixed(0) + 'K' 
                : cdState.userStats.followers;
            document.getElementById('cd-stat-views').textContent = cdState.userStats.viewsPerDay;
            document.getElementById('cd-stat-premium').textContent = cdState.userStats.premiumSubs;
            document.getElementById('cd-stat-premium-plus').textContent = cdState.userStats.premiumPlusSubs;
        }

        function cdCheckTokenEligibility() {
            const eligible = cdState.userStats.followers >= 10000 && 
                           cdState.userStats.viewsPerDay >= 1000 && 
                           cdState.userStats.premiumSubs >= 100;
            if (eligible) {
                alert('🎉 Congratulations! You are eligible to create your own token!');
            } else {
                alert('📊 Keep growing! Requirements:\n\n' +
                      `Followers: ${cdState.userStats.followers.toLocaleString()}/10,000\n` +
                      `Daily Views: ${cdState.userStats.viewsPerDay.toLocaleString()}/1,000\n` +
                      `Premium Subs: ${cdState.userStats.premiumSubs}/100`);
            }
        }

        // Click outside modal to close
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('cd-modal')) {
                e.target.classList.remove('cd-active');
            }
        });

        // Initialize on load
        window.addEventListener('load', function() {
            cdInitializeDemoContent();
            cdUpdateContentLibrary();
        });
