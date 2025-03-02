class LivePrice {
    constructor({ apiUrl, targetElement, refreshRate = 5000, currency = 'usd' }) {
        this.apiUrl = apiUrl;
        this.targetElement = document.querySelector(targetElement);
        this.refreshRate = refreshRate;
        this.currency = currency;
        this.init();
    }

    async fetchPrice() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            
            // Assuming the API returns an object with a price
            const price = data.market_data?.current_price?.[this.currency] || 'N/A';
            
            this.updateUI(price);
        } catch (error) {
            console.error('Error fetching price:', error);
            this.targetElement.innerHTML = 'Error fetching price';
        }
    }

    updateUI(price) {
        this.targetElement.innerHTML = `Current Price: $${price}`;
    }

    init() {
        if (!this.targetElement) {
            console.error('Invalid target element selector');
            return;
        }
        this.fetchPrice();
        setInterval(() => this.fetchPrice(), this.refreshRate);
    }
}

// Usage Example
document.addEventListener('DOMContentLoaded', () => {
    new LivePrice({
        apiUrl: 'https://api.coingecko.com/api/v3/coins/bitcoin', // Example for Bitcoin price
        targetElement: '#price-display',
        refreshRate: 3000, // Updates every 3 seconds
        currency: 'usd'
    });
});
