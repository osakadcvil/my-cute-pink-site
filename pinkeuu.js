const playlistItems = document.querySelectorAll('#playlist li');
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
let currentTrack = 0;
let isPlaying = false;

playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentTrack = index;
    playSong(item.dataset.src);
  });
});

playPauseBtn.addEventListener('click', () => {
  if (!audio.src) {
    const first = playlistItems[0];
    if (first) {
      playSong(first.dataset.src);
    }
  } else {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.textContent = '▶️ Play';
    } else {
      audio.play();
      playPauseBtn.textContent = '⏸ Pause';
    }
    isPlaying = !isPlaying;
  }
});

function playSong(src) {
  audio.src = src;
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸ Pause';
}


