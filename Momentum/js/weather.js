const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const cityValue = document.querySelector(".city");
const error = document.querySelector(".weather-error");

let APIkay = "27d05001f64106405ae34cd3925dec36";
let langWeather = "lang=ru" || "lang=en";
let langHumidity = "Влажность воздуха" || "Humidity";
let langWind = "Скорость ветра" || "Wind speed";
let langTextError =
  "Введите корректное значение населенного пункта " ||
  "Enter the correct value";
let cityDefault = "Минск" || "Minsk";

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue.value}&${langWeather}&appid=${APIkay}&units=metric`;
  const res = await fetch(url);
  if (res.ok) {
    error.textContent = "";
    const data = await res.json();

    let temperatureValue = Math.round(data.main.temp);
    let humidityValue = Math.round(data.main.humidity);
    let windValue = Math.round(data.wind.speed);

    weatherIcon.style.display = "block";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${temperatureValue}°C`;
    humidity.textContent = `${langHumidity} ${humidityValue} %`;
    wind.textContent = `${langWind} ${windValue} м/с`;
    weatherDescription.textContent = data.weather[0].description;
  } else {
    error.textContent = `${langTextError}`;
    weatherIcon.style.display = "none";
    temperature.textContent = "";
    humidity.textContent = "";
    wind.textContent = "";
    weatherDescription.textContent = "";
  }
}

function getCity() {
  cityValue.value = localStorage.getItem("city") || cityDefault;
  cityValue.onchange = () => {
    localStorage.setItem("city", cityValue.value);
    getWeather();
  };
}

getCity();
getWeather();
