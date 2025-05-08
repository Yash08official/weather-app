const apiKey = "5174e4658538d74444a822e2883e62e5";
//const apiURL = `https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=${apiKey}&units=metric`;

const cityInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const loadingText = document.querySelector(".loading");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  loadingText.style.display = "block";

  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const condition = data.weather[0].main.toLowerCase();
    switch (condition) {
      case "clouds":
        weatherIcon.src = "./images/clouds.png";
        break;
      case "rain":
        weatherIcon.src = "./images/rain.png";
        break;
      case "clear":
        weatherIcon.src = "./images/clear.png";
        break;
      case "snow":
        weatherIcon.src = "./images/snow.png";
        break;
      case "haze":
      case "mist":
      case "fog":
        weatherIcon.src = "./images/haze.png";
        break;
      default:
        weatherIcon.src = "./images/default.png";
    }
    console.log(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "-";
    document.querySelector(".humidity").innerHTML = "-";
    document.querySelector(".wind").innerHTML = "-";
    weatherIcon.src = "./images/default.png";
  } finally {
    loadingText.style.display = "none";
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  
  if (!/^[a-zA-Z\s]+$/.test(city)) {
    alert("Please enter a valid city name.");
    return;
  }

  checkWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
