let hours = 0;
function getCurrentTime() {
  const now = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday ",
  ];
  const dayName = days[now.getDay()];

  hours = now.getHours().toString();
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return `${dayName} ${hours}:${minutes}`;
}

function updateTime() {
  const currentTimeElement = document.getElementById("current-time");
  currentTimeElement.textContent = getCurrentTime();
}

setInterval(updateTime, 1000); // تحديث الوقت كل ثانية
updateTime(); // تعيين الوقت الحالي عند التحميل الأولي

// Replace with your API key
const apiKey = "00a0d439d4272f4a3ef4341bf95e212a";

// صور لحالات الطقس المختلفة
const weatherImages = {
  Clear:
    hours < 4
      ? "img/half-moon.png"
      : hours < 7
      ? "img/sunrise.png"
      : hours < 17
      ? "img/sunny.png"
      : hours < 19
      ? "img/sunset.png"
      : "img/half-moon.png",
  Clouds:
    hours < 4
      ? "img/cloudy.png"
      : hours < 7
      ? "img/sunrise.png"
      : hours < 17
      ? "img/sunny.png"
      : hours < 19
      ? "img/sunset.png"
      : "img/cloudy.png",
  Rain: "img/rain.png",
  Snow: "images/snowy.png",
  Drizzle: "images/drizzle.png",
  Thunderstorm: "images/thunderstorm.png",
  Mist: "images/mist.png",
  // يمكنك إضافة المزيد من الحالات حسب الحاجة
};

// Function to fetch weather data based on coordinates
function fetchWeatherData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      if (data.weather && data.weather.length > 0) {
        const mainWeather = data.weather[0].main; // الحالة الرئيسية للطقس
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const myLocation = data.name;
        const windSpeed = data.wind;
        // الحصول على الصورة المناسبة للحالة الرئيسية للطقس
        const weatherImage = weatherImages[mainWeather] || "images/default.png";

        document.getElementById(
          "weather-icon"
        ).innerHTML = `<img class="weather-icon" src="${weatherImage}" alt="Weather Icon">`;
        document.getElementById("weather-description").textContent =
          weatherDescription;
        document.getElementById(
          "temperature"
        ).innerHTML = `${temperature.toFixed(0)} <sup>°C</sup>`;
        document.getElementById(
          "wind"
        ).innerHTML = `the wind speed : ${windSpeed.speed} m/s <br> the wind deg : ${windSpeed.deg}&deg`;
        document.getElementById("loc").textContent= myLocation;

      } else {
        document.getElementById("weather-description").textContent =
          "No weather data available";
        document.getElementById("temperature").textContent = "";
      }

    })
    .catch((error) => console.error("Error fetching weather data", error));
}

// Get user's location and fetch weather data
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(lat, lon);
      },
      (error) => {
        console.error("Error getting location", error);
        // استخدام موقع افتراضي في حالة الفشل في الحصول على الموقع
        const defaultLat = 30.0444; // Latitude of Cairo
        const defaultLon = 31.2357; // Longitude of Cairo
        fetchWeatherData(defaultLat, defaultLon);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    // استخدام موقع افتراضي في حالة عدم دعم المتصفح لتحديد الموقع
    const defaultLat = 30.0444; // Latitude of Cairo
    const defaultLon = 31.2357; // Longitude of Cairo
    fetchWeatherData(defaultLat, defaultLon);
  }
}

// طلب الإذن للوصول إلى الموقع عند تحميل الصفحة
window.onload = function () {
  getUserLocation();
};
