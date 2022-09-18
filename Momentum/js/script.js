const time = document.querySelector(".time"),
  date = document.querySelector(".date"),
  greeting = document.querySelector(".greeting"),
  inputName = document.querySelector(".name");

let dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  },
  langDate = "ru-RU" || "en-US",
  dayTime = {
    morning: "Доброе утро" || "Good morning",
    day: "Добрый день" || "Good afternoon",
    evening: "Добрый вечер" || "Good evening",
    night: "Спокойной ночи" || "Good night",
  },
  placeholderName = "[Введите имя]" || "[Enter name]";

function showTimeDate() {
  time.textContent = new Date().toLocaleTimeString();
  date.textContent = new Date().toLocaleDateString(langDate, dateOptions);
  setTimeout(showTimeDate, 1000);
}
function showGreeting() {
  greeting.textContent = `${getTimeOfDay()}`;
  setTimeout(showGreeting, 1000);
}
function getTimeOfDay() {
  let date = new Date().getHours();
  if (date > 5 && date < 12) {
    return dayTime.morning;
  }
  if (date > 11 && date < 18) {
    return dayTime.day;
  }
  if (date > 17 && date <= 23) {
    return dayTime.evening;
  } else {
    return dayTime.night;
  }
}

function setName() {
  inputName.value = localStorage.getItem("name");
  inputName.oninput = () => {
    localStorage.setItem("name", inputName.value);
  };
}

inputName.setAttribute("placeholder", placeholderName);
showTimeDate();
showGreeting();
setName();
