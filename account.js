// Tab Switching
function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Toggle Switch
function toggleSwitch(element) {
    element.classList.toggle('active');
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Form submission handlers
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Form submitted! (This is a demo)');
    });
});

// Copy wallet address on click
document.querySelectorAll('.wallet-address-display').forEach(element => {
    element.style.cursor = 'pointer';
    element.title = 'Click to copy';
    element.addEventListener('click', function () {
        navigator.clipboard.writeText(this.textContent);
        const original = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
            this.textContent = original;
        }, 1000);
    });
});
