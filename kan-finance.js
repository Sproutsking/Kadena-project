// Store current state
let currentBillType = '';
let currentBillUnit = 'kWh';
let currentReceiptMethod = 'email';

// Conversion rates (example rates)
const conversionRates = {
    electricity: { rate: 2.8, unit: 'kWh', perKDA: 2.8 },
    water: { rate: 5.5, unit: 'm³', perKDA: 5.5 },
    internet: { rate: 10, unit: 'GB', perKDA: 10 },
    cable: { rate: 0.5, unit: 'months', perKDA: 0.5 },
    mobile: { rate: 100, unit: 'units', perKDA: 100 },
    gas: { rate: 8, unit: 'kg', perKDA: 8 }
};

// Switch main tabs
function switchMainTab(tabName) {
    // Remove active from all main tabs and content
    document.querySelectorAll('.finance-main-tab').forEach(tab => {
        tab.classList.remove('finance-tab-active');
    });
    document.querySelectorAll('.finance-main-content').forEach(content => {
        content.classList.remove('finance-content-active');
    });
    document.querySelectorAll('.finance-mobile-nav-item').forEach(item => {
        item.classList.remove('finance-mobile-active');
    });

    // Add active to selected tab
    const tabMap = {
        'manager': 'Finance Manager',
        'bills': 'Pay Bills',
        'staking': 'Staking'
    };

    const desktopTab = Array.from(document.querySelectorAll('.finance-main-tab')).find(
        tab => tab.textContent.includes(tabMap[tabName])
    );
    if (desktopTab) desktopTab.classList.add('finance-tab-active');

    const mobileLabels = {
        'manager': 'Finance',
        'bills': 'Pay Bills',
        'staking': 'Staking'
    };

    const mobileTab = Array.from(document.querySelectorAll('.finance-mobile-nav-item')).find(
        item => item.querySelector('.finance-mobile-nav-label').textContent === mobileLabels[tabName]
    );
    if (mobileTab) mobileTab.classList.add('finance-mobile-active');

    document.getElementById('finance-' + tabName).classList.add('finance-content-active');

    // Activate first sub tab
    if (tabName === 'manager') {
        switchSubTab('manager', 'overview');
    } else if (tabName === 'bills') {
        switchSubTab('bills', 'categories');
    } else if (tabName === 'staking') {
        switchSubTab('staking', 'dashboard');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Switch sub tabs
function switchSubTab(parent, subName) {
    // Get all sub tabs for this parent
    const parentElement = document.getElementById('finance-' + parent);
    if (!parentElement) return;

    const subTabs = parentElement.querySelectorAll('.finance-sub-tab');
    const subContents = parentElement.querySelectorAll('.finance-sub-content');

    // Remove active from all
    subTabs.forEach(tab => tab.classList.remove('finance-subtab-active'));
    subContents.forEach(content => content.classList.remove('finance-subcontent-active'));

    // Add active to selected
    const selectedTab = Array.from(subTabs).find(tab => {
        const tabText = tab.textContent.toLowerCase();
        return tabText.includes(subName.toLowerCase());
    });
    if (selectedTab) selectedTab.classList.add('finance-subtab-active');

    const contentId = parent + '-' + subName;
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) selectedContent.classList.add('finance-subcontent-active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to bill payment
function navigateToBillPayment(type, icon, title, unit) {
    currentBillType = type;
    currentBillUnit = unit;

    // Update bill payment header
    document.getElementById('payment-bill-icon').textContent = icon;
    document.getElementById('payment-bill-title').textContent = title + ' Payment';

    // Update conversion rate display
    const rateInfo = conversionRates[type];
    document.getElementById('conversion-rate').textContent = rateInfo.rate.toFixed(2);

    // Update quick amount buttons
    updateQuickAmountButtons(type);

    // Update provider options
    updateProviderOptions(type);

    // Switch to payment sub content
    switchSubTab('bills', 'payment');
}

// Back to bill categories
function backToBillCategories() {
    switchSubTab('bills', 'categories');

    // Reset form
    document.getElementById('payment-provider').value = '';
    document.getElementById('payment-account').value = '';
    document.getElementById('payment-amount').value = '';
    updateConversion();
}

// Update provider options
function updateProviderOptions(type) {
    const providerSelect = document.getElementById('payment-provider');
    providerSelect.innerHTML = '<option value="">Select Provider</option>';

    const providers = {
        electricity: ['PHCN - Power Holding', 'Eko Electricity Distribution', 'Ikeja Electric', 'Abuja Electricity Distribution', 'Port Harcourt Electricity'],
        water: ['Lagos Water Corporation', 'Abuja Water Board', 'Rivers State Water Board', 'Kaduna Water Corporation'],
        internet: ['MTN Fiber', 'Airtel Fiber', 'Spectranet', 'Smile', 'Swift Networks'],
        cable: ['DSTV', 'GOtv', 'Startimes', 'Netflix', 'Showmax'],
        mobile: ['MTN', 'Airtel', 'Glo', '9mobile'],
        gas: ['Oando Gas', 'Total Gas', 'Gasland', 'NIPCO Gas']
    };

    if (providers[type]) {
        providers[type].forEach(provider => {
            const option = document.createElement('option');
            option.value = provider.toLowerCase().replace(/\s+/g, '-');
            option.textContent = provider;
            providerSelect.appendChild(option);
        });
    }
}

// Update quick amount buttons
function updateQuickAmountButtons(type) {
    const rateInfo = conversionRates[type];

    // Update all quick buttons
    const amounts = [50, 100, 200, 500];
    amounts.forEach(amount => {
        const units = (amount * rateInfo.perKDA).toFixed(1);
        document.getElementById(`quick-${amount}`).textContent = units;
        document.getElementById(`unit-${amount}`).textContent = rateInfo.unit;
    });
}

// Set quick amount
function setQuickAmount(amount) {
    document.getElementById('payment-amount').value = amount;
    updateConversion();
}

// Update conversion display
function updateConversion() {
    const amount = parseFloat(document.getElementById('payment-amount').value) || 0;
    const rateInfo = conversionRates[currentBillType] || conversionRates.electricity;

    const units = (amount * rateInfo.perKDA).toFixed(2);
    document.getElementById('unit-display').textContent = `${units} ${rateInfo.unit}`;

    // Update summary
    const serviceFee = 0.50;
    const gasFee = 0.01;
    const total = amount + serviceFee + gasFee;

    document.getElementById('summary-amount').textContent = amount.toFixed(2) + ' KDA';
    document.getElementById('summary-total').textContent = total.toFixed(2) + ' KDA';
}

// Toggle receipt method
function toggleReceiptMethod(method) {
    currentReceiptMethod = method;

    // Update toggle buttons
    document.querySelectorAll('.finance-toggle-option').forEach(option => {
        option.classList.remove('finance-toggle-active');
    });
    event.target.closest('.finance-toggle-option').classList.add('finance-toggle-active');

    // Show/hide inputs
    if (method === 'email') {
        document.getElementById('receipt-input-email').style.display = 'block';
        document.getElementById('receipt-input-phone').style.display = 'none';
    } else {
        document.getElementById('receipt-input-email').style.display = 'none';
        document.getElementById('receipt-input-phone').style.display = 'block';
    }
}

// Process bill payment
function processBillPayment(event) {
    event.preventDefault();

    const provider = document.getElementById('payment-provider').value;
    const accountNumber = document.getElementById('payment-account').value;
    const amount = document.getElementById('payment-amount').value;
    const receiptContact = currentReceiptMethod === 'email'
        ? document.getElementById('receipt-email').value
        : document.getElementById('receipt-phone').value;

    if (!provider || !accountNumber || !amount) {
        alert('Please fill in all required fields');
        return false;
    }

    // Simulate payment processing
    const rateInfo = conversionRates[currentBillType];
    const units = (parseFloat(amount) * rateInfo.perKDA).toFixed(2);

    alert(`Processing payment...\n\nProvider: ${provider}\nAccount: ${accountNumber}\nAmount: ${amount} KDA\nUnits: ${units} ${rateInfo.unit}\nReceipt: ${receiptContact}\n\nPayment will be confirmed shortly!`);

    // Reset and go back
    setTimeout(() => {
        backToBillCategories();
    }, 1000);

    return false;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    // Set default conversion rate
    updateConversion();
});
