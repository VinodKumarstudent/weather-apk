const apiKey = 'a3dc669a163d8c9939a4f1b71d5e322d'; 
const weatherDataDiv = document.getElementById('weatherData');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const getLocationBtn = document.getElementById('getLocationBtn');
const locationInput = document.getElementById('locationInput');

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherDataByCoords(latitude, longitude);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherDataByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const { name, main, weather } = data;
    weatherDataDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Condition: ${weather[0].description}</p>
    `;
}
