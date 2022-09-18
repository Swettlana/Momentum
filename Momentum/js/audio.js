import playList from "../playList.js";

const playButton = document.querySelector(".play");
const activeTrackName = document.querySelector(".audio-name");
const playNextButton = document.querySelector(".play-next");
const playPrevButton = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
const progressAudio = document.querySelector(".audio-progress");
const time = document.querySelector(".audio-time");
const audioName = document.querySelector(".audio-name");
const audioMuteButton = document.querySelector(".audio-volume-button");
const progressVolume = document.querySelector(".audio-volume-progress");

const audio = new Audio();

let isPlay = false;
let playNum = 0;
let lengthAudioList = playList.length;

progressAudio.value = 0;
progressVolume.value = 10;
time.innerHTML = `00:00/${playList[0].duration}`;
audioName.innerHTML = `${playList[0].title}`;
progressAudio.style.background = `linear-gradient(to right, #ac9d55 0%, #ac9d55 ${progressAudio.value}%, #c4c4c4 ${progressAudio.value}%, #c4c4c4 100%)`;
progressVolume.style.background = `linear-gradient(to right, #ac9d55 0%, #ac9d55 ${progressVolume.value}%, #c4c4c4 ${progressVolume.value}%, #c4c4c4 100%)`;

playList.forEach((el, i) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.id = i;
  li.textContent = el.title;
  playListContainer.append(li);
});
const allPlayTracks = playListContainer.querySelectorAll("li");

function playAudio() {
  let timeAudio;
  if (allPlayTracks[playNum].classList.contains("item-active")) {
    timeAudio = audio.currentTime;
  } else {
    timeAudio = 0;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = timeAudio;
  audio.play();
  playButton.classList.add("pause");
  allPlayTracks[playNum].classList.add("item-active");
  isPlay = true;
}

function stopAudio() {
  audio.pause();
  playButton.classList.remove("pause");
  isPlay = false;
}

function playNextAudio() {
  allPlayTracks[playNum].classList.remove("item-active");
  if (playNum < lengthAudioList - 1) {
    playNum++;
  } else {
    playNum = 0;
  }
  audioName.innerHTML = `${playList[playNum].title}`;
  playAudio();
}

function playPrevAudio() {
  allPlayTracks[playNum].classList.remove("item-active");
  if (playNum > 0) {
    playNum--;
  } else {
    playNum = lengthAudioList - 1;
  }
  audioName.innerHTML = `${playList[playNum].title}`;
  playAudio();
}

function playStopAudio() {
  if (!isPlay) {
    playAudio();
  } else {
    stopAudio();
  }
}

function updateProgressAudio() {
  progressAudio.value = (audio.currentTime / audio.duration) * 100;
  progressAudio.style.background = `linear-gradient(to right, #ac9d55 0%, #ac9d55 ${progressAudio.value}%, #c4c4c4 ${progressAudio.value}%, #c4c4c4 100%)`;
  let minutes = Math.floor(audio.currentTime / 60);
  if (minutes < 10) {
    minutes = "0" + `${minutes}`;
  }
  let seconds = Math.floor(audio.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + `${seconds}`;
  }
  time.innerHTML = `${minutes}:${seconds}/${playList[playNum].duration}`;
}

function changeProgressAudio() {
  audio.currentTime = (progressAudio.value * audio.duration) / 100;
}

function audioChangeVolume() {
  let volume = progressVolume.value / 100;
  audio.volume = volume;
  progressVolume.style.background = `linear-gradient(to right, #ac9d55 0%, #ac9d55 ${progressVolume.value}%, #c4c4c4 ${progressVolume.value}%, #c4c4c4 100%)`;
  if (audio.volume == 0) {
    audioMuteButton.classList.add("audio-mute");
  } else {
    audioMuteButton.classList.remove("audio-mute");
  }
}
function muteAudio() {
  if (audio.volume == 0) {
    audio.volume = progressVolume.value / 100;
    progressVolume.style.background = `linear-gradient(to right, #ac9d55 0%, #ac9d55 ${progressVolume.value}%, #c4c4c4 ${progressVolume.value}%, #c4c4c4 100%)`;
    audioMuteButton.classList.remove("audio-mute");
  } else {
    audio.volume = 0;
    audioMuteButton.classList.add("audio-mute");
  }
}

playButton.onclick = () => {
  playStopAudio();
};
playNextButton.onclick = () => {
  playNextAudio();
};
playPrevButton.onclick = () => {
  playPrevAudio();
};
playListContainer.addEventListener("click", (e) => {
  activeTrackName.textContent = e.target.textContent;
  if (e.target.classList.contains("item-active")) {
    e.target.classList.remove("item-active");
    stopAudio();
  } else {
    playNum = e.target.id;
    allPlayTracks.forEach((el) => {
      el.classList.remove("item-active");
    });
    playAudio();
  }
});

audio.addEventListener("timeupdate", updateProgressAudio);
progressAudio.addEventListener("input", changeProgressAudio);
audioMuteButton.addEventListener("click", muteAudio);
progressVolume.addEventListener("input", audioChangeVolume);
audio.addEventListener("ended", playNextAudio);
audio.addEventListener("ended", playNextAudio);
