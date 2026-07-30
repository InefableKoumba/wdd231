document.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
  fetchSpotlights();
});

// Weather API integration for Brazzaville, Congo (Lat: -4.2634, Lon: 15.2429)
const API_KEY = "4a18e244b6db6509f6e625a66a1a4c9e"; // Public OpenWeatherMap Key demo format
const LAT = "-4.2634";
const LON = "15.2429";

async function fetchWeather() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

  try {
    const currentResponse = await fetch(currentUrl);
    if (currentResponse.ok) {
      const data = await currentResponse.json();
      displayCurrentWeather(data);
    } else {
      displayFallbackCurrentWeather();
    }

    const forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    } else {
      displayFallbackForecast();
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    displayFallbackCurrentWeather();
    displayFallbackForecast();
  }
}

function displayCurrentWeather(data) {
  const tempSpan = document.getElementById("current-temp");
  const descSpan = document.getElementById("weather-desc");
  const iconImg = document.getElementById("weather-icon");

  if (tempSpan && descSpan) {
    tempSpan.textContent = `${Math.round(data.main.temp)}°C`;
    const desc = data.weather[0].description;
    descSpan.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
  }

  if (iconImg && data.weather[0].icon) {
    iconImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconImg.alt = data.weather[0].description;
    iconImg.style.display = "inline-block";
  }
}

function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast-container");
  if (!forecastContainer) return;

  forecastContainer.innerHTML = "";

  // OpenWeatherMap 5-day forecast provides data every 3 hours (8 items per day)
  // Filter for predictions around noon (12:00:00)
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  ).slice(0, 3);

  dailyForecasts.forEach((dayData) => {
    const date = new Date(dayData.dt * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(dayData.main.temp);

    const dayCard = document.createElement("div");
    dayCard.className = "forecast-day";
    dayCard.innerHTML = `
      <span class="day-name">${dayName}</span>
      <span class="day-temp">${temp}°C</span>
    `;
    forecastContainer.appendChild(dayCard);
  });
}

// Fallbacks in case API rate limits or offline
function displayFallbackCurrentWeather() {
  const tempSpan = document.getElementById("current-temp");
  const descSpan = document.getElementById("weather-desc");

  if (tempSpan) tempSpan.textContent = "31°C";
  if (descSpan) descSpan.textContent = "Partly Cloudy";
}

function displayFallbackForecast() {
  const forecastContainer = document.getElementById("forecast-container");
  if (!forecastContainer) return;

  const today = new Date();
  const fallbackDays = [];
  for (let i = 1; i <= 3; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    fallbackDays.push({
      day: nextDay.toLocaleDateString("en-US", { weekday: "short" }),
      temp: 30 + Math.floor(Math.random() * 3),
    });
  }

  forecastContainer.innerHTML = fallbackDays
    .map(
      (d) => `
    <div class="forecast-day">
      <span class="day-name">${d.day}</span>
      <span class="day-temp">${d.temp}°C</span>
    </div>
  `
    )
    .join("");
}

// Spotlight advertisements logic
async function fetchSpotlights() {
  const container = document.getElementById("spotlights-container");
  if (!container) return;

  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch member JSON");
    const members = await response.json();

    // Filter Silver (2) and Gold (3) members
    const eligibleMembers = members.filter(
      (m) => m.membershipLevel === 2 || m.membershipLevel === 3
    );

    // Shuffle array randomly
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

    // Select 2 or 3 members randomly
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selected = shuffled.slice(0, count);

    container.innerHTML = "";

    selected.forEach((member) => {
      const levelText = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";
      const levelClass = member.membershipLevel === 3 ? "spotlight-gold" : "spotlight-silver";

      const card = document.createElement("div");
      card.className = `spotlight-card ${levelClass}`;
      card.innerHTML = `
        <div class="spotlight-header">
          <h3>${member.name}</h3>
          <span class="spotlight-badge">${levelText}</span>
        </div>
        <div class="spotlight-body">
          <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="80" height="80">
          <div class="spotlight-details">
            <p class="tagline">${member.additionalInfo || ""}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a></p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading member spotlights:", error);
  }
}
