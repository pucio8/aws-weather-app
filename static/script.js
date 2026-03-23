const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const loader = document.getElementById('loader');

async function getWeather() {
    const city = cityInput.value.trim();
    const cityPattern = /^[a-zA-Z\s\-żźćńółęąśŻŹĆŃÓŁĘĄŚ]+$/;

    if (!city) {
        alert("Proszę wpisać nazwę miasta.");
        return;
    }

    if (!cityPattern.test(city)) {
        alert("Nieprawidłowe znaki! Wpisz poprawną nazwę miasta.");
        cityInput.value = "";
        return;
    }

    weatherResult.classList.add('hidden');
    loader.classList.remove('hidden');
    
    document.getElementById('cityName').textContent = "Szukam...";

    try {
        const response = await fetch(`${window.BACKEND_API_URL}?city=${encodeURIComponent(city)}`);
        
        if (!response.ok) throw new Error("Błąd API");

        const data = await response.json();

        document.getElementById('cityName').textContent = data.city;
        document.getElementById('localTime').textContent = new Date().toLocaleTimeString();
        document.getElementById('temperature').textContent = `${Math.round(data.temp)}°C`;
        document.getElementById('description').textContent = data.description;
        
        const iconContainer = document.getElementById('weatherIcon');
        iconContainer.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
        iconContainer.alt = data.description;

        loader.classList.add('hidden');
        weatherResult.classList.remove('hidden');

    } catch (error) {
        loader.classList.add('hidden');
        alert("Nie udało się pobrać danych. Sprawdź połączenie lub nazwę miasta.");
    }
}

searchBtn.addEventListener('click', getWeather);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});