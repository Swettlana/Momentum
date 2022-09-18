const settingsButton = document.querySelector(".settings");
const modal = document.querySelector(".settings-modal");
const switchLangText = document.querySelector(".change-lang p");
const switchLang = document.querySelector(".switch-on");
const closeModal = document.querySelector(".settings-modal-close");
const switchBackText = document.querySelector(".change-back p");
const switchThemeText = document.querySelector(".change-theme p");
const switchThemeOptions = document.querySelectorAll(".change-theme option");
const playerTextLang = document.querySelector(".show-audio p");
const timeTextLang = document.querySelector(".show-time p");
const dateTextLang = document.querySelector(".show-date p");
const greeatingTextLang = document.querySelector(".show-text p");
const quotesTextLang = document.querySelector(".show-quote p");
const weatherTextLang = document.querySelector(".show-weather p");

let themeOptions = {
  1: "Природа",
  2: "Животные",
  3: "Автомобили",
  4: "Nature",
  5: "Animals",
  6: "Auto",
};

settingsButton.onclick = () => {
  modal.classList.toggle("settings-modal-active");
};
closeModal.onclick = () => {
  modal.classList.remove("settings-modal-active");
};

function changeLanguage() {
  getQuotes();
  if (switchLang.classList.contains("switch-off")) {
    localStorage.setItem("language", "switch-off");
    switchBackText.textContent = "Select image source";
    switchThemeText.textContent = "Select a theme for images";
    playerTextLang.textContent = "Audio";
    timeTextLang.textContent = "Time";
    dateTextLang.textContent = "Date";
    greeatingTextLang.textContent = "Greeating";
    quotesTextLang.textContent = "Quotes";
    weatherTextLang.textContent = "Weather";
    switchThemeOptions.forEach((el, i) => {
      el.text = themeOptions[i + 4];
    });
    switchLang.textContent = "EN";
    switchLangText.textContent = "Change language";
    langDate = "en-US";
    dayTime.morning = "Good morning";
    dayTime.day = "Good afternoon";
    dayTime.evening = "Good evening";
    dayTime.night = "Good night";
    langWeather = "lang=en";
    cityDefault = "Minsk";
    langHumidity = "Humidity";
    langWind = "Wind speed";
    langTextError = "Enter the correct value";

    getCity();
    getWeather();
    changePlaceholder("[Enter name]");
  } else {
    switchLang.textContent = "РУС";
    localStorage.setItem("language", "switch-on");
    switchBackText.textContent = "Выберите источник получения изображений";
    switchThemeText.textContent = "Выберите тему изображений";
    playerTextLang.textContent = "Аудиоплеер";
    timeTextLang.textContent = "Время";
    dateTextLang.textContent = "Дата";
    greeatingTextLang.textContent = "Приветствие";
    quotesTextLang.textContent = "Цитаты";
    weatherTextLang.textContent = "Прогноз погоды";
    switchThemeOptions.forEach((el, i) => {
      el.text = themeOptions[i + 1];
    });
    langDate = "ru-RU";
    switchLangText.textContent = "Изменить язык приложения";
    dayTime.morning = "Доброе утро";
    dayTime.day = "Добрый день";
    dayTime.evening = "Добрый вечер";
    dayTime.night = "Спокойной ночи";
    langWeather = "lang=ru";
    cityDefault = "Минск";
    langHumidity = "Влажность воздуха";
    langWind = "Скорость ветра";
    langTextError = "Введите корректное значение населенного пункта ";
    getCity();
    getWeather();
    changePlaceholder("[Введите имя]");
  }
}

function changePlaceholder(string) {
  inputName.setAttribute("placeholder", string);
}

switchLang.onclick = () => {
  switchLang.classList.toggle("switch-off");
  changeLanguage();
};

window.onload = () => {
  switchLang.classList.add(`${localStorage.getItem("language")}`);
  changeLanguage();
};
