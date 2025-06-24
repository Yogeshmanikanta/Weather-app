// API Configuration
const API_KEY = 'Your API_Key''; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const tempValue = document.getElementById('temp-value');
const tempUnit = document.getElementById('temp-unit');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');

// Event Listeners
searchBtn.addEventListener('click', fetchWeather);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

// Default to user's current location if geolocation is available
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
            console.error("Geolocation error:", error);
            // Default to a popular city if geolocation fails
            fetchWeatherByCity('London');
        }
    );
} else {
    fetchWeatherByCity('London');
}

// Fetch Weather by City Name
function fetchWeather() {
    const city = locationInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    }
}

async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await handleResponse(response);
        updateUI(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Could not fetch weather data. Please try again.");
    }
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await handleResponse(response);
        updateUI(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Could not fetch weather data. Please try again.");
    }
}

// Handle API Response
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    return await response.json();
}

// Update UI with Weather Data
function updateUI(data) {
    // Update location and date
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    currentDate.textContent = formatDate(new Date());
    
    // Update temperature and weather info
    tempValue.textContent = Math.round(data.main.temp);
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    pressure.textContent = data.main.pressure;
    
    // Update weather icon and background
    updateWeatherIcon(data.weather[0].main, data.weather[0].description);
    updateBackground(data.weather[0].main);
}

// Format Date
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update Weather Icon
function updateWeatherIcon(weatherMain, weatherDesc) {
    const iconMap = {
        'Clear': 'fa-sun',
        'Clouds': weatherDesc.includes('few clouds') ? 'fa-cloud-sun' : 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Haze': 'fa-smog',
        'Fog': 'fa-smog',
        'Drizzle': 'fa-cloud-rain'
    };
    
    const iconClass = iconMap[weatherMain] || 'fa-cloud';
    weatherIcon.className = `fas ${iconClass}`;
}

// Update Background Based on Weather
function updateBackground(weatherMain) {
    // Remove all weather classes
    document.body.className = '';
    
    // Add the appropriate weather class
    const weatherClass = weatherMain.toLowerCase();
    document.body.classList.add(weatherClass);
    
    // For weather types that don't have specific backgrounds
    if (!document.body.className) {
        document.body.classList.add('default');
    }
}
