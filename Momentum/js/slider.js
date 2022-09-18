const body = document.querySelector("body"),
  slidePrev = document.querySelector(".slide-prev"),
  slideNext = document.querySelector(".slide-next"),
  select = document.querySelector(".change-back select");
selectTheme = document.querySelector(".change-theme select");

let maxImg = 20,
  randomNum,
  timeDay,
  backKey;

let orient = "landscape",
  theme,
  key = "XRQujX-e65uYI8l0DbmwVXGU68Uvf0os4Os-Ko0n3CU",
  key2 = "5f4892e0470768319ee838877650396a";

backKey = localStorage.getItem("imagesSource") / 1 || 1;
theme = localStorage.getItem("imageTheme") || "nature";

async function getLinkToImage() {
  const url = `https://api.unsplash.com/photos/random?orientation=${orient}&query=${theme}&client_id=${key}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.urls.regular;
}

async function getLinkToImage2() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key2}&tags=${theme}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.photos.photo[randomNum].url_l;
}

getLinkToImage2();
function getRandomNum(max) {
  randomNum = Math.floor(Math.random() * max) + 1;
}
function getTimeOfDayForSlider() {
  let date = new Date().getHours();
  if (date > 5 && date < 12) {
    return "morning";
  }
  if (date > 11 && date < 18) {
    return "afternoon";
  }
  if (date > 17 && date <= 23) {
    return "evening";
  } else {
    return "night";
  }
}
async function setBackground(time, num) {
  const img = new Image();
  let number = num.toString().padStart(2, "0");
  let src;
  if (backKey == 1) {
    src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${number}.jpg`;
  } else {
    if (backKey == 2) {
      await getLinkToImage().then((val) => (src = val));
    } else {
      await getLinkToImage2().then((val) => (src = val));
    }
  }
  img.src = `${src}`;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

function setRandomBackground() {
  getRandomNum(maxImg);
  timeDay = getTimeOfDayForSlider();
  setBackground(timeDay, randomNum);
}
function getSlidePrev() {
  timeDay = getTimeOfDayForSlider();
  if (randomNum > 1) {
    randomNum--;
    setBackground(timeDay, randomNum);
  } else {
    randomNum = 20;
    setBackground(timeDay, randomNum);
  }
}
function getSlideNext() {
  timeDay = getTimeOfDayForSlider();
  if (randomNum < 20) {
    randomNum++;
    setBackground(timeDay, randomNum);
  } else {
    randomNum = 1;
    setBackground(timeDay, randomNum);
  }
}

function changeTheme() {
  if (backKey == 1) {
    selectTheme.setAttribute("disabled", "disabled");
  } else {
    selectTheme.removeAttribute("disabled", "disabled");
  }
}

setRandomBackground();
slidePrev.addEventListener("click", getSlidePrev);
slideNext.addEventListener("click", getSlideNext);

select.onchange = (e) => {
  backKey = e.target.value;
  localStorage.setItem("imagesSource", e.target.value);
  changeTheme();
  setRandomBackground();
};
selectTheme.onchange = (el) => {
  theme = el.target.value;
  localStorage.setItem("imageTheme", theme);
  setRandomBackground();
};
