const allSettingsSnow = document.querySelectorAll(".show .switch-on");
const showPlayer = document.querySelector(".player");
const switchShowPlayer = document.querySelector(".show-audio .switch-on");
const showTime = document.querySelector(".time");
const switchShowTime = document.querySelector(".show-time .switch-on");
const showDate = document.querySelector(".date");
const switchShowDate = document.querySelector(".show-date .switch-on");
const showTextGreeating = document.querySelector(".greeting-container");
const switchShowTextGreeating = document.querySelector(".show-text .switch-on");
const showQuotes = document.querySelector(".quotesBlock");
const switchShowQuotes = document.querySelector(".show-quote .switch-on");
const showWeather = document.querySelector(".weather");
const switchShowWeather = document.querySelector(".show-weather .switch-on");

switchShowPlayer.onclick = () => {
  switchShowPlayer.classList.toggle("switch-off");
  showPlayer.classList.toggle("hidden");
};

switchShowTime.onclick = () => {
  switchShowTime.classList.toggle("switch-off");
  showTime.classList.toggle("hidden");
};

switchShowDate.onclick = () => {
  switchShowDate.classList.toggle("switch-off");
  showDate.classList.toggle("hidden");
};

switchShowTextGreeating.onclick = () => {
  switchShowTextGreeating.classList.toggle("switch-off");
  showTextGreeating.classList.toggle("hidden");
};

switchShowQuotes.onclick = () => {
  switchShowQuotes.classList.toggle("switch-off");
  showQuotes.classList.toggle("hidden");
};

switchShowWeather.onclick = () => {
  switchShowWeather.classList.toggle("switch-off");
  showWeather.classList.toggle("hidden");
};

function saveInLocalStorage() {
  allSettingsSnow.forEach((el, i) => {
    if (el.classList.contains("switch-off")) {
      localStorage.setItem(`${i}`, "switch-off");
    } else {
      localStorage.setItem(`${i}`, "switch-on");
    }
  });
}
function getLocalStorage() {
  allSettingsSnow.forEach((el, i) => {
    el.classList.add(localStorage.getItem(`${i}`));
  });
}

function changeWithLokalStorage() {
  allSettingsSnow.forEach((el, ind) => {
    if (el.classList.contains("switch-off")) {
      arrForHiddenItem[ind].classList.add("hidden");
    }
  });
}

window.addEventListener("beforeunload", saveInLocalStorage);

const arrForHiddenItem = [
  showPlayer,
  showTime,
  showDate,
  showTextGreeating,
  showQuotes,
  showWeather,
];

window.addEventListener("load", () => {
  getLocalStorage();
  changeWithLokalStorage();
});
