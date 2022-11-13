let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Echo",
    artist: "Gumi",
    image: "https://i.pinimg.com/564x/cf/ce/40/cfce400fed9fadc2f219ce81f9bfbb0a.jpg",
    path: "echo_gumi.mp3"
  },
  {
    name: "Daymare",
    artist: "DEX",
    image: "https://i.pinimg.com/564x/10/37/cb/1037cb6527a2107e90fce9cf5d79e405.jpg",
    path: "daymare_dex.mp3"
  },
  {
    name: "Conqueror",
    artist: "IA",
    image: "https://i.pinimg.com/564x/a3/25/99/a325999883fe3b443244937da1533446.jpg",
    path: "conqueror_ia.mp3",
  },
  {
    name: "World is Mine",
    artist: "Hatsune Miku",
    image: "https://i.pinimg.com/564x/8c/f0/5f/8cf05f0e7f9f67ce6d5631f4d395c08e.jpg",
    path: "worldismine_hm.mp3",
  },
  {
    name: "Dancing Samurai",
    artist: "Camui Gakpo",
    image: "https://i.pinimg.com/564x/69/3e/11/693e117ca5692156c80ce72f82c0b540.jpg",
    path: "dancingsamurai_gakpo.mp3",
  },
  {
    name: "Electric Angel",
    artist: "Kagamine Rin & Len",
    image: "https://i.pinimg.com/564x/e4/1c/3e/e41c3e28d91dc5f0d48438ca95562772.jpg",
    path: "electricangel_kagamine.mp3",
  },
  {
    name: "Dreaming Chu Chu",
    artist: "Megurine Luka",
    image: "https://i.pinimg.com/564x/39/55/82/395582bccf4dfce5450b97d1ff4d6bed.jpg",
    path: "dreamingchuchu_luka.mp3",
  },
  {
    name: "Lemon",
    artist: "Megurine Luka X Camui Gakpo",
    image: "https://i.pinimg.com/564x/94/1f/64/941f64e5e56fca9835c7e765a535aabb.jpg",
    path: "lemon.mp3",
  },
];

// random background
function random_bg_color() {
  // for lighter colors
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  //  Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}