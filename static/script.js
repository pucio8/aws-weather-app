/**
 * Configuration & Endpoints
 * Toggle USE_CLOUD_BACKEND to true to test with AWS without Docker.
 */
const CONFIG = {
    USE_CLOUD_BACKEND: true, 
    LOCAL_URL: "http://127.0.0.1:8000/weather",
    PROD_URL: "https://hattwbf3ve.execute-api.eu-central-1.amazonaws.com/Prod/weather",
    
    get BASE_URL() {
        if (this.USE_CLOUD_BACKEND) return this.PROD_URL;
        
        const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
        return isLocal ? this.LOCAL_URL : this.PROD_URL;
    }
};

/**
 * DOM Elements
 * Cached for performance and cleaner code.
 */
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    weatherResult: document.getElementById('weatherResult'),
    loader: document.getElementById('loader'),
    cityName: document.getElementById('cityName'),
    localTime: document.getElementById('localTime'),
    temperature: document.getElementById('temperature'),
    description: document.getElementById('description'),
    weatherIcon: document.getElementById('weatherIcon')
};

/**
 * UI State Management
 * Handles visibility and data rendering using BEM utility classes.
 */
const ui = {
    showLoader() {
        elements.weatherResult.classList.add('u-hidden');
        elements.loader.classList.remove('u-hidden');
    },

    showResult(data) {
        // Populate text data
        elements.cityName.textContent = data.city;
        elements.localTime.textContent = data.time;
        elements.temperature.textContent = `${Math.round(data.temp)}°C`;
        elements.description.textContent = data.description;
        
        // Update weather icon
        elements.weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
        elements.weatherIcon.alt = data.description;

        // Toggle visibility
        elements.loader.classList.add('u-hidden');
        elements.weatherResult.classList.remove('u-hidden');
    },

    showError(msg) {
        elements.loader.classList.add('u-hidden');
        alert(msg);
    }
};

/**
 * API Logic
 * Pure function to fetch data from the backend.
 */
async function fetchWeatherData(city) {
    const response = await fetch(`${CONFIG.BASE_URL}?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
}

/**
 * Event Handlers
 * Orchestrates the search flow.
 */
async function handleWeatherSearch() {
    const city = elements.cityInput.value.trim();
    
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    ui.showLoader();

    try {
        const data = await fetchWeatherData(city);
        ui.showResult(data);
    } catch (error) {
        console.error("Application Error:", error);
        ui.showError("Could not fetch data. Check your Internet connection or API status.");
    }
}

/**
 * Event Listeners
 */
elements.searchBtn.addEventListener('click', handleWeatherSearch);

elements.cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleWeatherSearch();
    }
});